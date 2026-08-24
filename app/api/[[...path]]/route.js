import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import crypto from 'crypto'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { put } from '@vercel/blob'
import { readDb, writeDb, verifyAdmin } from '@/lib/jsonDb'
import { checkRateLimit } from '@/lib/rateLimit'
import { sendLeadNotification } from '@/lib/notifications'
import { BLOG_POSTS } from '@/data/blogs'
import { SEED_PROJECTS } from '@/data/projects'
import { DEFAULT_REVIEWS } from '@/data/reviews'
import { SOLAR_CAPACITIES_DATA, sortCapacitiesAscending } from '@/data/capacities'

async function ensureCapacitiesSeeded(db) {
  if (!Array.isArray(db.capacities) || db.capacities.length === 0) {
    db.capacities = SOLAR_CAPACITIES_DATA.map((c, idx) => ({
      ...c,
      order: c.order !== undefined ? c.order : idx,
      createdAt: c.createdAt || new Date().toISOString(),
      updatedAt: c.updatedAt || new Date().toISOString()
    }))
    await writeDb(db)
  }
}

async function ensureProjectsSeeded(db) {
  if (!Array.isArray(db.projects) || db.projects.length === 0) {
    db.projects = SEED_PROJECTS.map((p, idx) => ({
      ...p,
      order: p.order !== undefined ? p.order : idx,
      createdAt: p.createdAt || new Date().toISOString(),
      updatedAt: p.updatedAt || new Date().toISOString()
    }))
    await writeDb(db)
  }
}

async function ensureReviewsSeeded(db) {
  if (!Array.isArray(db.reviews) || db.reviews.length === 0) {
    db.reviews = DEFAULT_REVIEWS.map((r, idx) => ({
      ...r,
      order: r.order !== undefined ? r.order : idx + 1,
      createdAt: r.createdAt || new Date().toISOString(),
      updatedAt: r.updatedAt || new Date().toISOString()
    }))
    await writeDb(db)
  }
}

async function ensureBlogsSeeded(db) {
  if (!Array.isArray(db.blogs) || db.blogs.length === 0) {
    db.blogs = BLOG_POSTS.map((p, idx) => ({
      ...p,
      status: p.status || 'published',
      order: p.order !== undefined ? p.order : idx,
      content: p.content || (p.sections ? p.sections.map(s => `## ${s.heading}\n\n${s.content || ''}`).join('\n\n') : ''),
      createdAt: p.publishedAt ? new Date(p.publishedAt).toISOString() : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }))
    await writeDb(db)
  }
}

function getProjectCapacityInKw(p) {
  const mwMatch = p.title.match(/(\d+(?:\.\d+)?)\s*MW/i)
  if (mwMatch) return parseFloat(mwMatch[1]) * 1000

  const kwMatch = p.title.match(/(\d+(?:\.\d+)?)\s*KW/i)
  if (kwMatch) return parseFloat(kwMatch[1])

  if (p.capacity) {
    const parsed = parseFloat(p.capacity)
    if (!isNaN(parsed)) return parsed
  }

  const startMatch = p.title.match(/^\s*(\d+(?:\.\d+)?)/)
  if (startMatch) return parseFloat(startMatch[1])

  return 0
}

function sortByOrderThenCreated(list) {
  return [...list].sort((a, b) => {
    const capA = getProjectCapacityInKw(a)
    const capB = getProjectCapacityInKw(b)
    if (capB !== capA) return capB - capA
    return (a.order ?? 999) - (b.order ?? 999) || new Date(a.createdAt) - new Date(b.createdAt)
  })
}

function sortByOrder(list) {
  return [...(list || [])].sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || new Date(b.createdAt) - new Date(a.createdAt))
}

function sortByCreatedDesc(list) {
  return [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

// -------- Admin Auth --------
const JWT_SECRET = () => process.env.ADMIN_JWT_SECRET || 'ivr-fallback-dev'

function signAdminToken(username) {
  const payload = `${username}|${Date.now()}`
  const sig = crypto.createHmac('sha256', JWT_SECRET()).update(payload).digest('base64url')
  return Buffer.from(`${payload}|${sig}`).toString('base64url')
}

function verifyAdminToken(token) {
  try {
    if (!token) return null
    const decoded = Buffer.from(token, 'base64url').toString()
    const parts = decoded.split('|')
    if (parts.length !== 3) return null
    const [username, tsStr, sig] = parts
    const expected = crypto.createHmac('sha256', JWT_SECRET()).update(`${username}|${tsStr}`).digest('base64url')
    if (sig !== expected) return null
    if (Date.now() - Number(tsStr) > 7 * 24 * 3600 * 1000) return null // 7-day expiry
    return { username }
  } catch { return null }
}

function authFromRequest(request) {
  const h = request.headers.get('authorization') || ''
  const token = h.startsWith('Bearer ') ? h.slice(7) : null
  return verifyAdminToken(token)
}

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: cors })
}

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: cors })
}

export async function GET(request, { params }) {
  const p = (await params).path || []
  const route = p.join('/')
  try {
    const db = await readDb()
    if (route === '' || route === 'health') {
      return NextResponse.json({ status: 'ok', service: 'IVR Energy API', time: new Date().toISOString() }, { headers: cors })
    }
    if (route === 'projects') {
      await ensureProjectsSeeded(db)
      return NextResponse.json({ projects: sortByOrderThenCreated(db.projects) }, { headers: cors })
    }
    if (route === 'leads') {
      return NextResponse.json({ leads: sortByCreatedDesc(db.leads).slice(0, 100) }, { headers: cors })
    }
    if (route === 'content') {
      return NextResponse.json({ content: db.content || {} }, { headers: cors })
    }
    if (route === 'reviews') {
      await ensureReviewsSeeded(db)
      return NextResponse.json({ reviews: sortByOrder(db.reviews) }, { headers: cors })
    }
    if (route === 'capacities') {
      await ensureCapacitiesSeeded(db)
      return NextResponse.json({ capacities: sortCapacitiesAscending(db.capacities) }, { headers: cors })
    }
    if (route === 'blogs') {
      await ensureBlogsSeeded(db)
      const published = (db.blogs || []).filter(b => b.status !== 'draft')
      return NextResponse.json({ blogs: published }, { headers: cors })
    }
    // ---- Admin ----
    if (route === 'admin/verify') {
      const user = authFromRequest(request)
      if (!user) return unauthorized()
      return NextResponse.json({ user }, { headers: cors })
    }
    if (route === 'admin/capacities') {
      const user = authFromRequest(request)
      if (!user) return unauthorized()
      await ensureCapacitiesSeeded(db)
      return NextResponse.json({ capacities: sortCapacitiesAscending(db.capacities) }, { headers: cors })
    }
    if (route === 'admin/leads') {
      const user = authFromRequest(request)
      if (!user) return unauthorized()
      return NextResponse.json({ leads: sortByCreatedDesc(db.leads) }, { headers: cors })
    }
    if (route === 'admin/projects') {
      const user = authFromRequest(request)
      if (!user) return unauthorized()
      await ensureProjectsSeeded(db)
      return NextResponse.json({ projects: sortByOrderThenCreated(db.projects) }, { headers: cors })
    }
    if (route === 'admin/blogs') {
      const user = authFromRequest(request)
      if (!user) return unauthorized()
      await ensureBlogsSeeded(db)
      return NextResponse.json({ blogs: db.blogs || [] }, { headers: cors })
    }
    if (route === 'admin/content') {
      const user = authFromRequest(request)
      if (!user) return unauthorized()
      return NextResponse.json({ content: db.content || {} }, { headers: cors })
    }
    if (route === 'admin/reviews') {
      const user = authFromRequest(request)
      if (!user) return unauthorized()
      await ensureReviewsSeeded(db)
      return NextResponse.json({ reviews: sortByOrder(db.reviews) }, { headers: cors })
    }
    if (route === 'admin/stats') {
      const user = authFromRequest(request)
      if (!user) return unauthorized()
      await ensureProjectsSeeded(db)
      const now = new Date()
      const today = new Date(now); today.setHours(0, 0, 0, 0)
      const weekAgo = new Date(now.getTime() - 7 * 24 * 3600 * 1000)
      const monthAgo = new Date(now.getTime() - 30 * 24 * 3600 * 1000)
      const totalLeads = db.leads.length
      const todayLeads = db.leads.filter(l => new Date(l.createdAt) >= today).length
      const weekLeads = db.leads.filter(l => new Date(l.createdAt) >= weekAgo).length
      const monthLeads = db.leads.filter(l => new Date(l.createdAt) >= monthAgo).length
      const totalProjects = db.projects.length
      const byInterest = {}
      db.leads.forEach(l => { const k = l.interest || 'Unknown'; byInterest[k] = (byInterest[k] || 0) + 1 })
      const recentLeads = sortByCreatedDesc(db.leads).slice(0, 10)
      return NextResponse.json({
        totalLeads, todayLeads, weekLeads, monthLeads, totalProjects,
        byInterest,
        recentLeads,
      }, { headers: cors })
    }
    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: cors })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500, headers: cors })
  }
}

export async function POST(request, { params }) {
  const p = (await params).path || []
  const route = p.join('/')
  try {
    // ---- File upload (multipart) ----
    if (route === 'admin/upload') {
      const user = authFromRequest(request)
      if (!user) return unauthorized()
      const form = await request.formData()
      const files = form.getAll('files')
      if (!files.length) return NextResponse.json({ error: 'No files provided' }, { status: 400, headers: cors })

      const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
      const ALLOWED_MIMES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
      const ALLOWED_EXTS = ['jpg', 'jpeg', 'png', 'webp', 'gif']

      const token = process.env.BLOB_READ_WRITE_TOKEN
      const urls = []
      for (const file of files) {
        if (!file || typeof file === 'string') continue

        // Security check: validate max size (5MB)
        if (file.size > MAX_FILE_SIZE) {
          return NextResponse.json({ error: `File "${file.name || 'image'}" exceeds the 5MB size limit.` }, { status: 400, headers: cors })
        }

        // Security check: validate mime type
        if (file.type && !ALLOWED_MIMES.includes(file.type.toLowerCase())) {
          return NextResponse.json({ error: `File type "${file.type}" is not allowed. Only images (JPG, PNG, WEBP, GIF) can be uploaded.` }, { status: 400, headers: cors })
        }

        const bytes = Buffer.from(await file.arrayBuffer())
        const ext = (file.name || 'img').split('.').pop().toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg'
        const safeExt = ALLOWED_EXTS.includes(ext) ? ext : 'jpg'
        const filename = `${Date.now()}-${uuidv4().slice(0, 8)}.${safeExt}`

        if (token) {
          // Upload to Vercel Blob Storage if token is available
          const blob = await put(filename, bytes, { access: 'public', token })
          urls.push(blob.url)
        } else {
          // Fallback to local public/projects/uploads/ storage
          const uploadDir = path.join(process.cwd(), 'public', 'projects', 'uploads')
          await mkdir(uploadDir, { recursive: true })
          await writeFile(path.join(uploadDir, filename), bytes)
          urls.push(`/projects/uploads/${filename}`)
        }
      }
      return NextResponse.json({ success: true, urls }, { headers: cors })
    }

    const body = await request.json().catch(() => ({}))
    const db = await readDb()

    if (route === 'admin/login') {
      const limitRes = checkRateLimit(request, { limit: 10, windowMs: 60 * 1000, keyPrefix: 'admin_login' })
      if (!limitRes.allowed) {
        return NextResponse.json(
          { error: `Too many login attempts. Please try again in ${limitRes.retryAfterSec} seconds.` },
          { status: 429, headers: { ...cors, 'Retry-After': String(limitRes.retryAfterSec) } }
        )
      }
      const { username, password } = body
      if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
        return NextResponse.json({ error: 'Username and password are required' }, { status: 400, headers: cors })
      }
      const found = await verifyAdmin(username, password)
      if (!found) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401, headers: cors })
      const token = signAdminToken(username)
      return NextResponse.json({ token, user: { username } }, { headers: cors })
    }

    if (route === 'admin/projects') {
      const user = authFromRequest(request)
      if (!user) return unauthorized()
      const now = new Date().toISOString()
      const doc = {
        id: uuidv4(),
        title: String(body.title || 'Untitled Project').replace(/</g, '&lt;').replace(/>/g, '&gt;'),
        client: String(body.client || '').replace(/</g, '&lt;').replace(/>/g, '&gt;'),
        location: String(body.location || '').replace(/</g, '&lt;').replace(/>/g, '&gt;'),
        capacity: body.capacity !== undefined ? String(body.capacity) : '',
        type: String(body.type || 'Commercial').replace(/</g, '&lt;').replace(/>/g, '&gt;'),
        img: String(body.img || ''),
        gallery: Array.isArray(body.gallery) ? body.gallery : [],
        order: Number(body.order) || 999,
        createdAt: now, updatedAt: now,
      }
      db.projects.push(doc)
      await writeDb(db)
      return NextResponse.json({ success: true, project: doc }, { headers: cors })
    }

    if (route === 'admin/reviews') {
      const user = authFromRequest(request)
      if (!user) return unauthorized()
      const now = new Date().toISOString()
      const doc = {
        id: uuidv4(),
        name: String(body.name || 'Anonymous').replace(/</g, '&lt;').replace(/>/g, '&gt;'),
        role: String(body.role || '').replace(/</g, '&lt;').replace(/>/g, '&gt;'),
        avatar: String(body.avatar || body.img || body.image || ''),
        rating: Math.min(5, Math.max(1, Number(body.rating) || 5)),
        text: String(body.text || '').replace(/</g, '&lt;').replace(/>/g, '&gt;'),
        order: Number(body.order) || 999,
        createdAt: now, updatedAt: now,
      }
      db.reviews.push(doc)
      await writeDb(db)
      return NextResponse.json({ success: true, review: doc }, { headers: cors })
    }

    if (route === 'admin/blogs') {
      const user = authFromRequest(request)
      if (!user) return unauthorized()
      await ensureBlogsSeeded(db)
      const now = new Date().toISOString()
      const title = String(body.title || 'Untitled Blog Post').trim()
      const rawSlug = body.slug ? String(body.slug) : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      const slug = rawSlug || `blog-${Date.now()}`
      
      const doc = {
        id: uuidv4(),
        slug,
        title,
        excerpt: String(body.excerpt || ''),
        category: String(body.category || 'Rooftop Solar'),
        readTime: String(body.readTime || '5 min read'),
        publishedAt: body.publishedAt || now.split('T')[0],
        formattedDate: body.formattedDate || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        author: {
          name: String(body.author?.name || 'IVR Energy Editorial Team'),
          role: String(body.author?.role || 'Solar Engineering Specialist'),
          avatar: String(body.author?.avatar || '/projects/svs-1mw/1.jpg')
        },
        coverImage: String(body.coverImage || '/projects/svs-1mw/1.jpg'),
        featured: Boolean(body.featured),
        status: body.status === 'draft' ? 'draft' : 'published',
        tags: Array.isArray(body.tags) ? body.tags : (body.tags ? String(body.tags).split(',').map(t => t.trim()).filter(Boolean) : []),
        keyTakeaways: Array.isArray(body.keyTakeaways) ? body.keyTakeaways : (body.keyTakeaways ? String(body.keyTakeaways).split('\n').map(t => t.trim()).filter(Boolean) : []),
        sections: Array.isArray(body.sections) ? body.sections : [],
        content: String(body.content || ''),
        createdAt: now,
        updatedAt: now,
      }
      db.blogs = [doc, ...(db.blogs || [])]
      await writeDb(db)
      return NextResponse.json({ success: true, blog: doc }, { headers: cors })
    }

    if (route === 'admin/capacities') {
      const user = authFromRequest(request)
      if (!user) return unauthorized()
      await ensureCapacitiesSeeded(db)
      const now = new Date().toISOString()
      const kw = String(body.kw || '3 kW').trim()
      const cleanId = String(body.id || kw.toLowerCase().replace(/[^a-z0-9]/g, '') || `cap-${Date.now()}`)
      const cleanSlug = body.slug ? String(body.slug) : (kw ? kw.toLowerCase().replace(/[^a-z0-9]/g, '') : cleanId)
      const dailyUnits = String(body.dailyUnits || '')
      const roofArea = String(body.roofArea || '')
      const monthlySavings = String(body.monthlySavings || '')
      const subsidy = String(body.subsidy || '')
      const doc = {
        id: cleanId,
        slug: cleanSlug,
        aliases: Array.isArray(body.aliases) ? body.aliases : [cleanId, cleanSlug],
        kw: kw,
        tag: String(body.tag || ''),
        badge: String(body.badge || ''),
        title: String(body.title || `${kw} Rooftop Solar System`),
        subtitle: String(body.subtitle || ''),
        description: String(body.description || ''),
        heroHighlights: [
          { label: 'Daily Generation', value: dailyUnits ? dailyUnits.replace(/\s*\/\s*Day/i, '') : '12 – 15 Units' },
          { label: 'Roof Area Required', value: roofArea ? roofArea.replace(/\s*\(.*?\)/g, '') : '270 – 300 Sq. Ft.' },
          { label: 'Monthly Bill Savings', value: monthlySavings ? monthlySavings.replace(/\s*\/\s*Month/i, '') : '₹2,500 – ₹3,500' },
          { label: 'Govt Subsidy Credit', value: subsidy ? (subsidy.includes('₹') ? subsidy.split(' under ')[0].split(' Direct ')[0] + ' Direct DBT' : subsidy) : (body.badge || '₹78,000 Direct DBT') },
        ],
        dailyUnits,
        monthlyUnits: String(body.monthlyUnits || ''),
        yearlyUnits: String(body.yearlyUnits || ''),
        roofArea,
        monthlySavings,
        yearlySavings: String(body.yearlySavings || ''),
        twentyFiveYearSavings: String(body.twentyFiveYearSavings || ''),
        subsidy,
        payback: String(body.payback || ''),
        warranty: String(body.warranty || '25 Years Panel Performance Warranty | 5–10 Years Inverter Warranty'),
        suitableFor: String(body.suitableFor || ''),
        panelsCount: String(body.panelsCount || ''),
        inverterSpec: String(body.inverterSpec || ''),
        structureSpec: String(body.structureSpec || ''),
        appliances: Array.isArray(body.appliances) ? body.appliances : [],
        inclusions: Array.isArray(body.inclusions) ? body.inclusions : [],
        faqs: Array.isArray(body.faqs) ? body.faqs : [],
        order: body.order !== undefined ? Number(body.order) : (db.capacities || []).length,
        createdAt: now,
        updatedAt: now,
      }
      db.capacities = [...(db.capacities || []), doc]
      await writeDb(db)
      return NextResponse.json({ success: true, capacity: doc }, { headers: cors })
    }

    if (route === 'leads' || route === 'contact' || route === 'quote') {
      const limitRes = checkRateLimit(request, { limit: 6, windowMs: 60 * 1000, keyPrefix: 'leads_submit' })
      if (!limitRes.allowed) {
        return NextResponse.json(
          { error: `Too many submissions. Please wait ${limitRes.retryAfterSec} seconds before submitting again.` },
          { status: 429, headers: { ...cors, 'Retry-After': String(limitRes.retryAfterSec) } }
        )
      }
      const cleanString = (val) => typeof val === 'string' ? val.replace(/</g, '&lt;').replace(/>/g, '&gt;').trim() : ''
      const lead = {
        id: uuidv4(),
        type: route === 'quote' ? 'quote' : route === 'contact' ? 'contact' : (cleanString(body.type) || 'lead'),
        name: cleanString(body.name),
        email: cleanString(body.email),
        phone: cleanString(body.phone),
        city: cleanString(body.city),
        address: cleanString(body.address),
        interest: cleanString(body.interest),
        message: cleanString(body.message),
        monthlyBill: Number(body.monthlyBill) || null,
        roofArea: Number(body.roofArea) || null,
        systemSize: Number(body.systemSize) || null,
        status: 'new',
        createdAt: new Date().toISOString(),
      }
      db.leads.push(lead)
      await writeDb(db)

      // Asynchronously trigger real-time notification (Webhook / Email)
      sendLeadNotification(lead).catch(() => {})

      return NextResponse.json({ success: true, lead }, { headers: cors })
    }
    if (route === 'calculator') {
      const bill = Number(body.monthlyBill || 0)
      const calc = db.content?.calculator || {}
      const tariff = Number(body.tariff || calc.tariff || 8)
      const billPerKw = Number(calc.billPerKw || 2000) // ₹ per 1 kW
      const costPerKw = Number(calc.costPerKw || 70000)
      const unitsPerKwYear = Number(calc.unitsPerKwYear || 1400)
      const lifespan = Number(calc.lifespan || 25)
      const co2PerKwh = Number(calc.co2PerKwh || 0.82)
      let recommendedKW = Math.max(1, Math.round((bill / billPerKw) * 10) / 10)
      const annualGeneration = recommendedKW * unitsPerKwYear
      const annualSavings = Math.round(annualGeneration * tariff)
      const systemCost = Math.round(recommendedKW * costPerKw)
      const paybackYears = Math.round((systemCost / Math.max(annualSavings, 1)) * 10) / 10
      const lifetimeSavings = Math.round(annualSavings * lifespan - systemCost)
      const co2Reduction = Math.round(annualGeneration * co2PerKwh)
      return NextResponse.json({ recommendedKW, annualGeneration: Math.round(annualGeneration), annualSavings, systemCost, paybackYears, lifetimeSavings, co2Reduction }, { headers: cors })
    }
    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: cors })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500, headers: cors })
  }
}

export async function PATCH(request, { params }) {
  const p = (await params).path || []
  const route = p.join('/')
  try {
    const body = await request.json().catch(() => ({}))
    const db = await readDb()

    if (route === 'admin/content') {
      const user = authFromRequest(request)
      if (!user) return unauthorized()
      const update = { ...body }
      delete update.id
      db.content = { ...db.content, ...update, updatedAt: new Date().toISOString() }
      await writeDb(db)
      return NextResponse.json({ success: true, content: db.content }, { headers: cors })
    }

    if (route === 'admin/leads') {
      const user = authFromRequest(request)
      if (!user) return unauthorized()
      const { id, status, notes, message, name, phone, email, city, address, interest } = body
      if (!id) return NextResponse.json({ error: 'id required' }, { status: 400, headers: cors })
      const idx = db.leads.findIndex(l => l.id === id)
      if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404, headers: cors })
      if (status !== undefined) db.leads[idx].status = status
      if (notes !== undefined) db.leads[idx].notes = notes
      if (message !== undefined) db.leads[idx].message = message
      if (name !== undefined) db.leads[idx].name = name
      if (phone !== undefined) db.leads[idx].phone = phone
      if (email !== undefined) db.leads[idx].email = email
      if (city !== undefined) db.leads[idx].city = city
      if (address !== undefined) db.leads[idx].address = address
      if (interest !== undefined) db.leads[idx].interest = interest
      db.leads[idx].updatedAt = new Date().toISOString()
      await writeDb(db)
      return NextResponse.json({ success: true }, { headers: cors })
    }

    if (route === 'admin/projects') {
      const user = authFromRequest(request)
      if (!user) return unauthorized()
      const { id, ...rest } = body
      if (!id) return NextResponse.json({ error: 'id required' }, { status: 400, headers: cors })
      const idx = db.projects.findIndex(pr => pr.id === id)
      if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404, headers: cors })
      const update = { ...rest }
      if (update.capacity !== undefined) update.capacity = String(update.capacity)
      if (update.order !== undefined) update.order = Number(update.order)
      db.projects[idx] = { ...db.projects[idx], ...update, updatedAt: new Date().toISOString() }
      await writeDb(db)
      return NextResponse.json({ success: true, project: db.projects[idx] }, { headers: cors })
    }
    if (route === 'admin/reviews') {
      const user = authFromRequest(request)
      if (!user) return unauthorized()
      const { id, ...rest } = body
      if (!id) return NextResponse.json({ error: 'id required' }, { status: 400, headers: cors })
      const idx = db.reviews.findIndex(r => r.id === id)
      if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404, headers: cors })
      const update = { ...rest }
      if (update.rating !== undefined) update.rating = Number(update.rating)
      if (update.order !== undefined) update.order = Number(update.order)
      db.reviews[idx] = { ...db.reviews[idx], ...update, updatedAt: new Date().toISOString() }
      await writeDb(db)
      return NextResponse.json({ success: true, review: db.reviews[idx] }, { headers: cors })
    }
    if (route === 'admin/blogs') {
      const user = authFromRequest(request)
      if (!user) return unauthorized()
      const { id, ...rest } = body
      if (!id) return NextResponse.json({ error: 'id required' }, { status: 400, headers: cors })
      await ensureBlogsSeeded(db)
      const idx = db.blogs.findIndex(b => b.id === id)
      if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404, headers: cors })
      
      const update = { ...rest }
      if (update.title && !update.slug && !db.blogs[idx].slug) {
        update.slug = update.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      }
      db.blogs[idx] = { ...db.blogs[idx], ...update, updatedAt: new Date().toISOString() }
      await writeDb(db)
      return NextResponse.json({ success: true, blog: db.blogs[idx] }, { headers: cors })
    }
    if (route === 'admin/capacities') {
      const user = authFromRequest(request)
      if (!user) return unauthorized()
      await ensureCapacitiesSeeded(db)
      const { id, ...rest } = body
      if (!id) return NextResponse.json({ error: 'id required' }, { status: 400, headers: cors })
      const idx = db.capacities.findIndex(c => c.id === id || c.slug === id)
      if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404, headers: cors })
      const update = { ...rest }
      if (update.order !== undefined) update.order = Number(update.order)
      const merged = { ...db.capacities[idx], ...update }
      merged.heroHighlights = [
        { label: 'Daily Generation', value: merged.dailyUnits ? String(merged.dailyUnits).replace(/\s*\/\s*Day/i, '') : '12 – 15 Units' },
        { label: 'Roof Area Required', value: merged.roofArea ? String(merged.roofArea).replace(/\s*\(.*?\)/g, '').trim() : '270 – 300 Sq. Ft.' },
        { label: 'Monthly Bill Savings', value: merged.monthlySavings ? String(merged.monthlySavings).replace(/\s*\/\s*Month/i, '').trim() : '₹2,500 – ₹3,500' },
        { label: 'Govt Subsidy Credit', value: merged.subsidy ? (String(merged.subsidy).includes('₹') ? String(merged.subsidy).split(' under ')[0].split(' Direct ')[0] + ' Direct DBT' : String(merged.subsidy)) : (merged.badge || '₹78,000 Direct DBT') },
      ]
      merged.updatedAt = new Date().toISOString()
      db.capacities[idx] = merged
      await writeDb(db)
      return NextResponse.json({ success: true, capacity: db.capacities[idx] }, { headers: cors })
    }
    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: cors })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500, headers: cors })
  }
}

export async function DELETE(request, { params }) {
  const p = (await params).path || []
  const route = p.join('/')
  try {
    const db = await readDb()
    const url = new URL(request.url)
    const id = url.searchParams.get('id')

    if (route === 'admin/capacities') {
      const user = authFromRequest(request)
      if (!user) return unauthorized()
      if (!id) return NextResponse.json({ error: 'id required' }, { status: 400, headers: cors })
      await ensureCapacitiesSeeded(db)
      db.capacities = db.capacities.filter(c => c.id !== id && c.slug !== id)
      await writeDb(db)
      return NextResponse.json({ success: true }, { headers: cors })
    }

    if (route === 'admin/leads') {
      const user = authFromRequest(request)
      if (!user) return unauthorized()
      if (!id) return NextResponse.json({ error: 'id required' }, { status: 400, headers: cors })
      db.leads = db.leads.filter(l => l.id !== id)
      await writeDb(db)
      return NextResponse.json({ success: true }, { headers: cors })
    }
    if (route === 'admin/projects') {
      const user = authFromRequest(request)
      if (!user) return unauthorized()
      if (!id) return NextResponse.json({ error: 'id required' }, { status: 400, headers: cors })
      db.projects = db.projects.filter(pr => pr.id !== id)
      await writeDb(db)
      return NextResponse.json({ success: true }, { headers: cors })
    }
    if (route === 'admin/reviews') {
      const user = authFromRequest(request)
      if (!user) return unauthorized()
      if (!id) return NextResponse.json({ error: 'id required' }, { status: 400, headers: cors })
      db.reviews = db.reviews.filter(r => r.id !== id)
      await writeDb(db)
      return NextResponse.json({ success: true }, { headers: cors })
    }
    if (route === 'admin/blogs') {
      const user = authFromRequest(request)
      if (!user) return unauthorized()
      if (!id) return NextResponse.json({ error: 'id required' }, { status: 400, headers: cors })
      await ensureBlogsSeeded(db)
      db.blogs = db.blogs.filter(b => b.id !== id)
      await writeDb(db)
      return NextResponse.json({ success: true }, { headers: cors })
    }
    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: cors })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500, headers: cors })
  }
}
