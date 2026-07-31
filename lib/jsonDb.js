import { Pool } from 'pg'
import fs from 'fs/promises'
import path from 'path'

// Postgres pool initialization using env variables.
const connectionString = process.env.DATABASE_URL
const dbPath = path.join(process.cwd(), 'data', 'db.json')

// Helper for local JSON DB fallback when DATABASE_URL is not set
async function readJsonDb() {
  try {
    const data = await fs.readFile(dbPath, 'utf8')
    return JSON.parse(data)
  } catch (err) {
    console.error('Error reading local db.json:', err)
    return { projects: [], leads: [], reviews: [], content: {} }
  }
}

async function writeJsonDb(data) {
  try {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf8')
  } catch (err) {
    console.error('Error writing local db.json:', err)
  }
}

if (!connectionString && process.env.NODE_ENV !== 'production') {
  console.warn('Warning: DATABASE_URL not found. Database connections will fall back to local data/db.json.')
}

const pool = new Pool({
  connectionString,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
  ssl: connectionString ? { rejectUnauthorized: false } : false
})

export async function readDb() {
  if (!connectionString) {
    return await readJsonDb()
  }
  const client = await pool.connect()
  try {
    const projectsRes = await client.query('SELECT * FROM projects')
    const leadsRes = await client.query('SELECT * FROM leads')
    const reviewsRes = await client.query('SELECT * FROM reviews')
    const contentRes = await client.query("SELECT value FROM content WHERE key = 'site_content'")
    
    // Map PostgreSQL snake_case columns back to existing camelCase keys used by frontend
    const projects = projectsRes.rows.map(r => ({
      id: r.id,
      title: r.title,
      client: r.client,
      location: r.location,
      capacity: r.capacity || '',
      type: r.type,
      img: r.img,
      gallery: r.gallery || [],
      order: r.order_index,
      createdAt: r.created_at,
      updatedAt: r.updated_at
    }))

    const leads = leadsRes.rows.map(r => ({
      id: r.id,
      type: r.type,
      name: r.name,
      email: r.email,
      phone: r.phone,
      city: r.city,
      address: r.address,
      interest: r.interest,
      message: r.message,
      monthlyBill: r.monthly_bill !== null && r.monthly_bill !== undefined ? Number(r.monthly_bill) : null,
      roofArea: r.roof_area !== null && r.roof_area !== undefined ? Number(r.roof_area) : null,
      systemSize: r.system_size !== null && r.system_size !== undefined ? Number(r.system_size) : null,
      status: r.status,
      notes: r.notes,
      createdAt: r.created_at
    }))

    const reviews = reviewsRes.rows.map(r => ({
      id: r.id,
      name: r.name,
      role: r.role,
      rating: Number(r.rating),
      text: r.text,
      order: r.order_index,
      createdAt: r.created_at,
      updatedAt: r.updated_at
    }))

    const content = contentRes.rows[0]?.value || {}

    return { projects, leads, reviews, content }
  } catch (err) {
    console.error('PostgreSQL readDb error:', err)
    return { projects: [], leads: [], reviews: [], content: {} }
  } finally {
    client.release()
  }
}

export async function writeDb(data) {
  if (!connectionString) {
    await writeJsonDb(data)
    return
  }
  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    // 1. Sync content (JSONB payload)
    if (data.content) {
      await client.query(`
        INSERT INTO content (key, value) VALUES ('site_content', $1)
        ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
      `, [JSON.stringify(data.content)])
    }

    // 2. Sync projects table (Insert/Update and delete removed ones)
    if (Array.isArray(data.projects)) {
      const currentIdsRes = await client.query('SELECT id FROM projects')
      const currentIds = currentIdsRes.rows.map(r => r.id)
      const newIds = data.projects.map(p => p.id)
      const toDelete = currentIds.filter(id => !newIds.includes(id))

      if (toDelete.length > 0) {
        await client.query('DELETE FROM projects WHERE id = ANY($1)', [toDelete])
      }

      for (const p of data.projects) {
        await client.query(`
          INSERT INTO projects (id, title, client, location, capacity, type, img, gallery, order_index, created_at, updated_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
          ON CONFLICT (id) DO UPDATE SET
            title = EXCLUDED.title,
            client = EXCLUDED.client,
            location = EXCLUDED.location,
            capacity = EXCLUDED.capacity,
            type = EXCLUDED.type,
            img = EXCLUDED.img,
            gallery = EXCLUDED.gallery,
            order_index = EXCLUDED.order_index,
            updated_at = EXCLUDED.updated_at
        `, [
          p.id,
          p.title,
          p.client || null,
          p.location || null,
          p.capacity || '',
          p.type || 'Commercial',
          p.img || null,
          JSON.stringify(Array.isArray(p.gallery) ? p.gallery : []),
          p.order !== undefined ? Number(p.order) : 999,
          p.createdAt || new Date().toISOString(),
          p.updatedAt || new Date().toISOString()
        ])
      }
    }

    // 3. Sync leads table (Insert/Update and delete removed ones)
    if (Array.isArray(data.leads)) {
      const currentIdsRes = await client.query('SELECT id FROM leads')
      const currentIds = currentIdsRes.rows.map(r => r.id)
      const newIds = data.leads.map(l => l.id)
      const toDelete = currentIds.filter(id => !newIds.includes(id))

      if (toDelete.length > 0) {
        await client.query('DELETE FROM leads WHERE id = ANY($1)', [toDelete])
      }

      for (const l of data.leads) {
        await client.query(`
          INSERT INTO leads (id, type, name, email, phone, city, address, interest, message, monthly_bill, roof_area, system_size, status, notes, created_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
          ON CONFLICT (id) DO UPDATE SET
            type = EXCLUDED.type,
            name = EXCLUDED.name,
            email = EXCLUDED.email,
            phone = EXCLUDED.phone,
            city = EXCLUDED.city,
            address = EXCLUDED.address,
            interest = EXCLUDED.interest,
            message = EXCLUDED.message,
            monthly_bill = EXCLUDED.monthly_bill,
            roof_area = EXCLUDED.roof_area,
            system_size = EXCLUDED.system_size,
            status = EXCLUDED.status,
            notes = EXCLUDED.notes
        `, [
          l.id,
          l.type || 'lead',
          l.name,
          l.email || null,
          l.phone,
          l.city || null,
          l.address || null,
          l.interest || null,
          l.message || null,
          l.monthlyBill !== null && l.monthlyBill !== undefined ? Number(l.monthlyBill) : null,
          l.roofArea !== null && l.roofArea !== undefined ? Number(l.roofArea) : null,
          l.systemSize !== null && l.systemSize !== undefined ? Number(l.systemSize) : null,
          l.status || 'new',
          l.notes || null,
          l.createdAt || new Date().toISOString()
        ])
      }
    }

    // 4. Sync reviews table (Insert/Update and delete removed ones)
    if (Array.isArray(data.reviews)) {
      const currentIdsRes = await client.query('SELECT id FROM reviews')
      const currentIds = currentIdsRes.rows.map(r => r.id)
      const newIds = data.reviews.map(r => r.id)
      const toDelete = currentIds.filter(id => !newIds.includes(id))

      if (toDelete.length > 0) {
        await client.query('DELETE FROM reviews WHERE id = ANY($1)', [toDelete])
      }

      for (const r of data.reviews) {
        await client.query(`
          INSERT INTO reviews (id, name, role, rating, text, order_index, created_at, updated_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name,
            role = EXCLUDED.role,
            rating = EXCLUDED.rating,
            text = EXCLUDED.text,
            order_index = EXCLUDED.order_index,
            updated_at = EXCLUDED.updated_at
        `, [
          r.id,
          r.name,
          r.role || null,
          Number(r.rating) || 5,
          r.text,
          r.order !== undefined ? Number(r.order) : 999,
          r.createdAt || new Date().toISOString(),
          r.updatedAt || new Date().toISOString()
        ])
      }
    }

    await client.query('COMMIT')
  } catch (err) {
    await client.query('ROLLBACK')
    console.error('PostgreSQL writeDb error:', err)
    throw err
  } finally {
    client.release()
  }
}

export async function verifyAdmin(username, password) {
  if (!connectionString) {
    const db = await readJsonDb()
    const defaultAdmins = [
      { username: 'admin@ivr', password: 'IVRenergy.2026' },
      { username: 'admin@ivrenergy.com', password: 'Solar@IVR.2026' }
    ]
    const localAdmins = Array.isArray(db.admins) && db.admins.length > 0 ? db.admins : defaultAdmins
    const found = localAdmins.find(a => a.username === username && a.password === password)
    return found ? { username: found.username } : null
  }
  const client = await pool.connect()
  try {
    const res = await client.query('SELECT username FROM admins WHERE username = $1 AND password = $2', [username, password])
    if (res.rows[0]) {
      return { username: res.rows[0].username }
    }
    return null
  } catch (err) {
    console.error('verifyAdmin error:', err)
    return null
  } finally {
    client.release()
  }
}
