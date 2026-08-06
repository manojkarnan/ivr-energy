'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import {
  Sun, LogOut, Users, TrendingUp, Calendar, Zap, LayoutDashboard, MessageSquare,
  FolderKanban, Search, Trash2, Phone, Mail, MapPin, Edit3, Plus, X, Save,
  Eye, EyeOff, ArrowRight, Loader2, Download, CheckCircle2, Clock, Sparkles, Upload, ImageIcon, Star,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const TOKEN_KEY = 'ivr_admin_token'
const USER_KEY = 'ivr_admin_user'

// -------- Login --------
function Login({ onLogin }) {
  const [u, setU] = useState('')
  const [p, setP] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const r = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: u, password: p }) })
      const j = await r.json()
      if (r.ok && j.token) {
        localStorage.setItem(TOKEN_KEY, j.token)
        localStorage.setItem(USER_KEY, JSON.stringify(j.user))
        toast.success(`Welcome, ${j.user.username}`)
        onLogin(j.user, j.token)
      } else {
        toast.error(j.error || 'Login failed')
      }
    } catch { toast.error('Network error') }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-[#1a0505] to-neutral-950 flex items-center justify-center p-4 relative overflow-hidden" >
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#D71920]/40 blur-3xl"  />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-orange-500/20 blur-3xl"  />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-md" >
        <div className="text-center mb-8" >
          <div className="inline-flex flex-col items-center gap-3 mb-4" >
            <div className="bg-white rounded-2xl px-6 py-4 shadow-2xl" >
              <img src="/ivr-logo.webp"  alt="IVR Energy"  className="h-16 md:h-20 w-auto object-contain"  />
            </div>
            <div className="text-xs uppercase tracking-widest text-neutral-400 mt-1" >Admin Panel</div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl" >
          <div className="mb-6" >
            <div className="text-2xl font-bold text-white" >Welcome back</div>
            <div className="text-sm text-neutral-400 mt-1" >Sign in to manage leads & projects</div>
          </div>
          <form onSubmit={submit} className="space-y-4" >
            <div>
              <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider" >Username</label>
              <Input value={u} onChange={e => setU(e.target.value)} placeholder="admin@ivr"  className="mt-2 h-12 rounded-xl bg-white/10 border-white/10 text-white placeholder:text-neutral-500 focus:border-[#D71920]"  autoComplete="username"  />
            </div>
            <div>
              <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider" >Password</label>
              <div className="relative mt-2" >
                <Input type={show ? 'text' : 'password'} value={p} onChange={e => setP(e.target.value)} placeholder="Enter password"  className="h-12 rounded-xl bg-white/10 border-white/10 text-white placeholder:text-neutral-500 focus:border-[#D71920] pr-11"  autoComplete="current-password"  />
                <button type="button"  onClick={() => setShow(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white" >
                  {show ? <EyeOff className="h-4 w-4"  /> : <Eye className="h-4 w-4"  />}
                </button>
              </div>
            </div>
            <Button type="submit"  disabled={loading} className="w-full h-12 bg-[#D71920] hover:bg-[#a5121a] rounded-xl text-white font-semibold shadow-glow-red mt-2" >
              {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"  /> Signing in...</> : <>Sign In <ArrowRight className="ml-2 h-4 w-4"  /></>}
            </Button>
          </form>
        </div>
        <div className="text-center mt-6 text-xs text-neutral-500" >Authorized personnel only</div>
      </motion.div>
    </div>
  )
}

// -------- Dashboard --------
function Dashboard({ token }) {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/stats', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(j => { setStats(j); setLoading(false) })
      .catch(() => setLoading(false))
  }, [token])

  if (loading) return <div className="p-12 flex justify-center" ><Loader2 className="h-8 w-8 animate-spin text-[#D71920]"  /></div>
  if (!stats) return <div className="p-12 text-center text-neutral-500" >Could not load stats</div>

  const cards = [
    { label: 'Total Leads', value: stats.totalLeads, icon: Users, color: 'from-[#D71920] to-[#ff5a4e]' },
    { label: 'Today', value: stats.todayLeads, icon: Zap, color: 'from-green-500 to-emerald-500' },
    { label: 'This Week', value: stats.weekLeads, icon: Calendar, color: 'from-blue-500 to-indigo-500' },
    { label: 'This Month', value: stats.monthLeads, icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
    { label: 'Projects', value: stats.totalProjects, icon: FolderKanban, color: 'from-orange-500 to-amber-500' },
  ]

  return (
    <div className="space-y-6" >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4" >
        {cards.map(c => (
          <div key={c.label} className="rounded-2xl bg-white border border-neutral-100 p-5 shadow-soft hover:shadow-lg transition-shadow" >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center mb-3`}>
              <c.icon className="h-5 w-5 text-white"  />
            </div>
            <div className="text-3xl font-bold text-neutral-900" >{c.value}</div>
            <div className="text-xs text-neutral-500 uppercase tracking-wider mt-1" >{c.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6" >
        {/* Leads by interest */}
        <div className="rounded-2xl bg-white border border-neutral-100 p-6 shadow-soft" >
          <div className="text-lg font-bold text-neutral-900 mb-4" >Leads by Interest</div>
          {Object.keys(stats.byInterest || {}).length === 0 && <div className="text-sm text-neutral-500" >No leads yet</div>}
          <div className="space-y-3" >
            {Object.entries(stats.byInterest || {}).sort((a, b) => b[1] - a[1]).map(([k, v]) => {
              const total = Object.values(stats.byInterest).reduce((a, b) => a + b, 0)
              const pct = Math.round((v / total) * 100)
              return (
                <div key={k}>
                  <div className="flex justify-between text-sm mb-1" ><span className="font-semibold text-neutral-800" >{k || 'Other'}</span><span className="text-neutral-500" >{v} ({pct}%)</span></div>
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden" >
                    <div className="h-full bg-gradient-to-r from-[#D71920] to-[#ff5a4e]"  style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent leads */}
        <div className="rounded-2xl bg-white border border-neutral-100 p-6 shadow-soft" >
          <div className="text-lg font-bold text-neutral-900 mb-4" >Recent Leads</div>
          <div className="space-y-3 max-h-80 overflow-auto no-scrollbar" >
            {(stats.recentLeads || []).length === 0 && <div className="text-sm text-neutral-500" >No leads yet</div>}
            {(stats.recentLeads || []).map(l => (
              <div key={l.id} className="p-3 rounded-xl bg-neutral-50 hover:bg-red-50 transition-colors" >
                <div className="flex items-start justify-between" >
                  <div>
                    <div className="font-semibold text-sm text-neutral-900" >{l.name || 'Unnamed'}</div>
                    <div className="text-xs text-neutral-500 mt-0.5" >{l.phone} · {l.city || '"'} · {l.interest || '"'}</div>
                  </div>
                  <div className="text-[10px] text-neutral-400 whitespace-nowrap">{new Date(l.createdAt).toLocaleDateString('en-IN')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// -------- Leads Manager --------
function Leads({ token }) {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [adding, setAdding] = useState(false)

  async function load() {
    setLoading(true)
    const r = await fetch('/api/admin/leads', { headers: { Authorization: `Bearer ${token}` } })
    const j = await r.json()
    setLeads(j.leads || [])
    setLoading(false)
  }
  useEffect(() => { load() /* eslint-disable-next-line */ }, [])

  async function updateStatus(id, s) {
    await fetch('/api/admin/leads', { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ id, status: s }) })
    toast.success(`Marked as ${s}`)
    load()
  }

  async function del(id) {
    if (!confirm('Delete this lead permanently?')) return
    await fetch(`/api/admin/leads?id=${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    toast.success('Deleted')
    load()
  }

  function exportCsv() {
    const cols = ['id', 'name', 'phone', 'email', 'city', 'address', 'interest', 'status', 'message', 'createdAt']
    const csv = [cols.join(',')].concat(leads.map(l => cols.map(c => `"${String(l[c] || '').replace(/"/g, '" "')}" `).join(','))).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `ivr-leads-${new Date().toISOString().slice(0,10)}.csv`; a.click()
    URL.revokeObjectURL(url)
  }

  const filtered = leads.filter(l => {
    if (status !== 'all' && (l.status || 'new') !== status) return false
    if (!search) return true
    const s = search.toLowerCase()
    return (l.name || '').toLowerCase().includes(s) || (l.phone || '').includes(s) || (l.city || '').toLowerCase().includes(s) || (l.email || '').toLowerCase().includes(s) || (l.address || '').toLowerCase().includes(s)
  })

  const statusColors = {
    new: 'bg-blue-100 text-blue-700',
    contacted: 'bg-yellow-100 text-yellow-700',
    converted: 'bg-green-100 text-green-700',
    lost: 'bg-red-100 text-red-700',
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3 items-center mb-6" >
        <div className="relative flex-1 min-w-[240px]" >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400"  />
          <Input placeholder="Search name, phone, email, city, address..."  value={search} onChange={e => setSearch(e.target.value)} className="pl-10 h-11 rounded-xl"  />
        </div>
        <div className="flex gap-1 bg-neutral-100 p-1 rounded-full" >
          {['all', 'new', 'contacted', 'converted', 'lost'].map(s => (
            <button key={s} onClick={() => setStatus(s)} className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${status === s ? 'bg-white text-[#D71920] shadow' : 'text-neutral-600'}`}>{s}</button>
          ))}
        </div>
        <Button onClick={() => setAdding(true)} className="bg-[#D71920] hover:bg-[#a5121a] text-white rounded-xl h-11" ><Plus className="h-4 w-4 mr-2"  /> Add Lead</Button>
        <Button onClick={exportCsv} variant="outline"  className="rounded-xl h-11" ><Download className="h-4 w-4 mr-2"  /> Export CSV</Button>
        <Button onClick={load} variant="outline"  className="rounded-xl h-11" >Refresh</Button>
      </div>

      {loading ? (
        <div className="p-12 flex justify-center" ><Loader2 className="h-8 w-8 animate-spin text-[#D71920]"  /></div>
      ) : (
        <div className="rounded-2xl bg-white border border-neutral-100 overflow-hidden shadow-soft" >
          <div className="overflow-x-auto" >
            <table className="w-full text-sm" >
              <thead className="bg-neutral-50" >
                <tr className="text-left text-xs uppercase tracking-wider text-neutral-500" >
                  <th className="px-4 py-3" >Lead</th>
                  <th className="px-4 py-3" >Contact</th>
                  <th className="px-4 py-3" >City / Address</th>
                  <th className="px-4 py-3" >Interest</th>
                  <th className="px-4 py-3" >Status</th>
                  <th className="px-4 py-3" >Date</th>
                  <th className="px-4 py-3" >Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && <tr><td colSpan={7} className="px-4 py-12 text-center text-neutral-500" >No leads found</td></tr>}
                {filtered.map(l => (
                  <tr key={l.id} className="border-t border-neutral-100 hover:bg-neutral-50/50" >
                    <td className="px-4 py-3" >
                      <div className="font-semibold text-neutral-900" >{l.name || '"'}</div>
                      {l.message && <div className="text-xs text-neutral-500 mt-1 max-w-xs truncate"  title={l.message}>{l.message}</div>}
                    </td>
                    <td className="px-4 py-3" >
                      <a href={`tel:${l.phone}`} className="flex items-center gap-1 text-neutral-800 hover:text-[#D71920] font-medium" ><Phone className="h-3 w-3"  /> {l.phone}</a>
                      {l.email && <a href={`mailto:${l.email}`} className="flex items-center gap-1 text-xs text-neutral-500 hover:text-[#D71920] mt-0.5" ><Mail className="h-3 w-3"  /> {l.email}</a>}
                    </td>
                    <td className="px-4 py-3 text-neutral-700" >
                      <div>{l.city || '"'}</div>
                      {l.address && <div className="text-xs text-neutral-500 mt-0.5 max-w-[200px] truncate"  title={l.address}>{l.address}</div>}
                    </td>
                    <td className="px-4 py-3" ><span className="text-xs rounded-full bg-red-50 text-[#D71920] px-2.5 py-1 font-medium" >{l.interest || '"'}</span></td>
                    <td className="px-4 py-3" >
                      <select value={l.status || 'new'} onChange={e => updateStatus(l.id, e.target.value)} className={`text-xs rounded-full px-2.5 py-1 font-semibold border-0 cursor-pointer ${statusColors[l.status || 'new']}`}>
                        <option value="new" >new</option>
                        <option value="contacted" >contacted</option>
                        <option value="converted" >converted</option>
                        <option value="lost" >lost</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-neutral-500 text-xs whitespace-nowrap" >{new Date(l.createdAt).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}</td>
                    <td className="px-4 py-3" >
                      <div className="flex gap-1" >
                        <a href={`https://wa.me/${(l.phone || '').replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(l.name || 'there')}%2C%20thanks%20for%20reaching%20out%20to%20IVR%20Energy%21`} target="_blank"  rel="noreferrer"  className="w-8 h-8 rounded-lg bg-green-100 text-green-700 hover:bg-green-500 hover:text-white flex items-center justify-center transition-colors"  title="WhatsApp" ><MessageSquare className="h-4 w-4"  /></a>
                        <button onClick={() => del(l.id)} className="w-8 h-8 rounded-lg bg-red-100 text-red-700 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors"  title="Delete" ><Trash2 className="h-4 w-4"  /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 bg-neutral-50 text-xs text-neutral-500 border-t" >Showing {filtered.length} of {leads.length} leads</div>
        </div>
      )}

      <AnimatePresence>
        {adding && (
          <LeadCreator
            onClose={() => setAdding(false)}
            onSave={async (newLead) => {
              try {
                const r = await fetch('/api/leads', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(newLead)
                })
                const j = await r.json()
                if (j.success) {
                  toast.success('Lead created successfully')
                  setAdding(false)
                  load()
                } else {
                  toast.error(j.error || 'Failed to create lead')
                }
              } catch {
                toast.error('Network error')
              }
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function LeadCreator({ onClose, onSave }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', address: '', interest: 'Residential', message: '', type: 'lead' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone) {
      toast.error('Name and Mobile Number are required')
      return
    }
    setLoading(true)
    await onSave(form)
    setLoading(false)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur flex items-center justify-center p-4 overflow-y-auto"  onClick={onClose}>
      <motion.form initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }} onClick={e => e.stopPropagation()} onSubmit={handleSubmit} className="bg-white rounded-3xl w-full max-w-lg shadow-2xl my-8" >
        <div className="p-6 border-b flex items-center justify-between" >
          <div className="text-xl font-bold" >Add New Lead</div>
          <button type="button"  onClick={onClose} className="w-9 h-9 rounded-full hover:bg-neutral-100 flex items-center justify-center" ><X className="h-5 w-5"  /></button>
        </div>
        <div className="p-6 space-y-4 text-neutral-900" >
          <div>
            <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider" >Full Name *</label>
            <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Customer name"  className="mt-2 h-11 rounded-xl"  />
          </div>
          <div>
            <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider" >Mobile Number *</label>
            <Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="e.g. +91 98765 43210"  className="mt-2 h-11 rounded-xl"  />
          </div>
          <div>
            <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider" >Email ID</label>
            <Input type="email"  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="customer@example.com"  className="mt-2 h-11 rounded-xl"  />
          </div>
          <div className="grid grid-cols-2 gap-4" >
            <div>
              <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider" >City</label>
              <Input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} placeholder="Chennai"  className="mt-2 h-11 rounded-xl"  />
            </div>
            <div>
              <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider" >Interest</label>
              <select value={form.interest} onChange={e => setForm({ ...form, interest: e.target.value })} className="mt-2 w-full h-11 rounded-xl border border-neutral-200 px-3 bg-white text-neutral-900" >
                <option>Residential</option>
                <option>Commercial</option>
                <option>Industrial</option>
                <option>Ground Mounted</option>
                <option>O&M</option>
                <option>Consultancy</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider" >Full Address</label>
            <Textarea value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="Enter street name, area, door number..."  rows={2} className="mt-2 rounded-xl"  />
          </div>
          <div>
            <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider" >Message / Requirements</label>
            <Textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="e.g. 5KW requirements"  rows={2} className="mt-2 rounded-xl"  />
          </div>
        </div>
        <div className="p-6 border-t flex justify-end gap-3 bg-neutral-50 rounded-b-3xl" >
          <Button type="button"  variant="outline"  onClick={onClose} className="rounded-xl" >Cancel</Button>
          <Button type="submit"  disabled={loading} className="bg-[#D71920] hover:bg-[#a5121a] rounded-xl" >{loading ? 'Saving...' : 'Save Lead'}</Button>
        </div>
      </motion.form>
    </motion.div>
  )
}

// -------- Projects Manager --------
function Projects({ token }) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null) // project object or 'new'

  async function load() {
    setLoading(true)
    const r = await fetch('/api/admin/projects', { headers: { Authorization: `Bearer ${token}` } })
    const j = await r.json()
    setProjects(j.projects || [])
    setLoading(false)
  }
  useEffect(() => { load() /* eslint-disable-next-line */ }, [])

  async function save(p) {
    const isNew = !p.id
    const url = '/api/admin/projects'
    const method = isNew ? 'POST' : 'PATCH'
    const r = await fetch(url, { method, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(p) })
    const j = await r.json()
    if (j.success) { toast.success(isNew ? 'Project created' : 'Project updated'); setEditing(null); load() }
    else toast.error(j.error || 'Save failed')
  }

  async function del(id) {
    if (!confirm('Delete this project permanently?')) return
    await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    toast.success('Deleted')
    load()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6" >
        <div className="text-neutral-600 text-sm" >Manage projects displayed on the website. Changes reflect live.</div>
        <Button onClick={() => setEditing({ title: '', client: '', location: '', capacity: '', type: 'Commercial', img: '', gallery: [], order: 999 })} className="bg-[#D71920] hover:bg-[#a5121a] rounded-xl" >
          <Plus className="h-4 w-4 mr-2"  /> Add Project
        </Button>
      </div>
      {loading ? (
        <div className="p-12 flex justify-center" ><Loader2 className="h-8 w-8 animate-spin text-[#D71920]"  /></div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" >
          {projects.map(p => (
            <div key={p.id} className="rounded-2xl bg-white border border-neutral-100 overflow-hidden shadow-soft group" >
              <div className="aspect-[4/3] relative overflow-hidden bg-neutral-100" >
                {p.img && <img src={p.img} alt={p.title} className="w-full h-full object-cover"  />}
                <div className="absolute top-3 left-3 rounded-full bg-[#D71920] text-white text-xs font-semibold px-2.5 py-1" >{p.type}</div>
                <div className="absolute top-3 right-3 rounded-full bg-black/60 backdrop-blur text-white text-xs font-semibold px-2.5 py-1" >{p.gallery?.length || 0} photos</div>
              </div>
              <div className="p-4" >
                <div className="font-bold text-neutral-900" >{p.title}</div>
                <div className="text-xs text-neutral-500 mt-1" >{p.client} · {p.location}</div>
                <div className="mt-2 text-lg font-bold text-[#D71920]" >{p.capacity}</div>
                <div className="flex gap-2 mt-4" >
                  <Button onClick={() => setEditing(p)} variant="outline"  size="sm"  className="flex-1 rounded-lg" ><Edit3 className="h-3.5 w-3.5 mr-1.5"  /> Edit</Button>
                  <Button onClick={() => del(p.id)} variant="outline"  size="sm"  className="rounded-lg text-red-600 border-red-200 hover:bg-red-50" ><Trash2 className="h-3.5 w-3.5"  /></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {editing && <ProjectEditor project={editing} onSave={save} onClose={() => setEditing(null)} token={token} />}
      </AnimatePresence>
    </div>
  )
}

function ProjectEditor({ project, onSave, onClose, token }) {
  const [p, setP] = useState({ ...project, gallery: project.gallery || [] })
  const [uploading, setUploading] = useState(false)

  async function uploadFiles(files, target) {
    if (!files || !files.length) return
    setUploading(true)
    try {
      const form = new FormData()
      for (const f of files) form.append('files', f)
      const r = await fetch('/api/admin/upload', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: form })
      const j = await r.json()
      if (j.success && j.urls?.length) {
        if (target === 'front') {
          setP(prev => ({ ...prev, img: j.urls[0], gallery: prev.gallery.length ? prev.gallery : j.urls }))
        } else {
          setP(prev => ({ ...prev, gallery: [...prev.gallery, ...j.urls], img: prev.img || j.urls[0] }))
        }
        toast.success(`Uploaded ${j.urls.length} image${j.urls.length > 1 ? 's' : ''}`)
      } else { toast.error(j.error || 'Upload failed') }
    } catch (e) { toast.error('Upload failed: ' + e.message) }
    setUploading(false)
  }

  function removeGalleryImg(url) {
    setP(prev => ({ ...prev, gallery: prev.gallery.filter(u => u !== url), img: prev.img === url ? (prev.gallery.filter(u => u !== url)[0] || '') : prev.img }))
  }

  function submit(e) {
    e.preventDefault()
    if (!p.title) { toast.error('Title is required'); return }
    if (!p.img && !p.gallery.length) { toast.error('Upload at least one image'); return }
    onSave({ ...p, img: p.img || p.gallery[0], capacity: p.capacity })
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur flex items-center justify-center p-4 overflow-y-auto"  onClick={onClose}>
      <motion.form initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }} onClick={e => e.stopPropagation()} onSubmit={submit} className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl my-8" >
        <div className="p-6 border-b flex items-center justify-between" >
          <div className="text-xl font-bold" >{p.id ? 'Edit Project' : 'Add New Project'}</div>
          <button type="button"  onClick={onClose} className="w-9 h-9 rounded-full hover:bg-neutral-100 flex items-center justify-center" ><X className="h-5 w-5"  /></button>
        </div>
        <div className="p-6 grid grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto" >
          <div className="col-span-2" >
            <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider" >Title *</label>
            <Input value={p.title} onChange={e => setP({ ...p, title: e.target.value })} placeholder="1 MW Solar Rooftop"  className="mt-2 h-11 rounded-xl"  />
          </div>
          <div>
            <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider" >Client</label>
            <Input value={p.client} onChange={e => setP({ ...p, client: e.target.value })} placeholder="Company name"  className="mt-2 h-11 rounded-xl"  />
          </div>
          <div>
            <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider" >Location</label>
            <Input value={p.location} onChange={e => setP({ ...p, location: e.target.value })} placeholder="City, State"  className="mt-2 h-11 rounded-xl"  />
          </div>
          <div>
            <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider" >Capacity</label>
            <Input
              type="text" 
              value={p.capacity}
              onChange={e => setP({ ...p, capacity: e.target.value })}
              placeholder="e.g. 1 MW or 500 KW" 
              className="mt-2 h-11 rounded-xl" 
            />
            <div className="text-xs text-neutral-500 mt-1" >Type the system capacity (e.g. 1 MW, 500 KW, etc.)</div>
          </div>
          <div>
            <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider" >Type</label>
            <select value={p.type} onChange={e => setP({ ...p, type: e.target.value })} className="mt-2 w-full h-11 rounded-xl border border-neutral-200 px-3 bg-white text-neutral-900" >
              <option>Industrial</option>
              <option>Commercial</option>
              <option>Residential</option>
              <option>Government</option>
            </select>
          </div>

          {/* Front image */}
          <div className="col-span-2" >
            <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider" >Front Image (Card Thumbnail)</label>
            <div className="mt-2 flex items-start gap-4" >
              <div className="w-40 h-32 rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50 flex items-center justify-center overflow-hidden" >
                {p.img ? <img src={p.img} alt=""  className="w-full h-full object-cover"  /> : <ImageIcon className="h-8 w-8 text-neutral-300"  />}
              </div>
              <div className="flex-1" >
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D71920] hover:bg-[#a5121a] text-white text-sm font-semibold transition-colors" >
                  <Upload className="h-4 w-4"  />
                  {uploading ? 'Uploading...' : 'Choose Front Image'}
                  <input type="file"  accept="image/*"  className="hidden"  disabled={uploading} onChange={e => { uploadFiles(e.target.files, 'front'); e.target.value = '' }} />
                </label>
                <div className="text-xs text-neutral-500 mt-2" >Recommended: 4:3 ratio, min 800×600px. JPG/PNG/WebP.</div>
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div className="col-span-2" >
            <div className="flex justify-between items-center" >
              <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider" >Gallery ({p.gallery.length} photos)</label>
              <label className="cursor-pointer inline-flex items-center gap-1.5 text-sm font-semibold text-[#D71920] hover:text-[#a5121a]" >
                <Upload className="h-4 w-4"  />
                {uploading ? 'Uploading...' : 'Add photos'}
                <input type="file"  accept="image/*"  multiple className="hidden"  disabled={uploading} onChange={e => { uploadFiles(e.target.files, 'gallery'); e.target.value = '' }} />
              </label>
            </div>
            {p.gallery.length === 0 ? (
              <label className="mt-2 cursor-pointer flex flex-col items-center justify-center gap-2 h-32 rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50 hover:border-red-200 hover:bg-red-50/30 transition-colors" >
                <Upload className="h-6 w-6 text-neutral-400"  />
                <div className="text-sm text-neutral-500" >Click to upload gallery images (multi-select supported)</div>
                <input type="file"  accept="image/*"  multiple className="hidden"  disabled={uploading} onChange={e => { uploadFiles(e.target.files, 'gallery'); e.target.value = '' }} />
              </label>
            ) : (
              <div className="mt-2 grid grid-cols-4 sm:grid-cols-5 gap-2" >
                {p.gallery.map(url => (
                  <div key={url} className={`relative group rounded-lg overflow-hidden aspect-square ${p.img === url ? 'ring-2 ring-[#D71920]' : ''}`}>
                    <img src={url} alt=""  className="w-full h-full object-cover"  />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1" >
                      <button type="button"  onClick={() => setP(prev => ({ ...prev, img: url }))} className="w-8 h-8 rounded-full bg-white/90 text-neutral-900 flex items-center justify-center text-xs font-bold hover:bg-white"  title="Set as front image" >★</button>
                      <button type="button"  onClick={() => removeGalleryImg(url)} className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600"  title="Remove" ><Trash2 className="h-3.5 w-3.5"  /></button>
                    </div>
                    {p.img === url && <div className="absolute top-1 left-1 rounded-full bg-[#D71920] text-white text-[9px] font-bold px-1.5 py-0.5" >FRONT</div>}
                  </div>
                ))}
              </div>
            )}
            <div className="text-xs text-neutral-500 mt-2" >Hover an image → ★ to set as front, 🗑 to remove.</div>
          </div>
        </div>
        <div className="p-6 border-t flex justify-end gap-3 bg-neutral-50 rounded-b-3xl" >
          <Button type="button"  variant="outline"  onClick={onClose} className="rounded-xl" >Cancel</Button>
          <Button type="submit"  disabled={uploading} className="bg-[#D71920] hover:bg-[#a5121a] rounded-xl" ><Save className="h-4 w-4 mr-2"  /> Save Project</Button>
        </div>
      </motion.form>
    </motion.div>
  )
}

// -------- Site Content Manager --------
function Content({ token }) {
  const [content, setContent] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingKey, setUploadingKey] = useState(null)
  const [subTab, setSubTab] = useState('text')

  async function load() {
    setLoading(true)
    const r = await fetch('/api/admin/content', { headers: { Authorization: `Bearer ${token}` } })
    const j = await r.json()
    setContent(j.content || {})
    setLoading(false)
  }
  useEffect(() => { load() /* eslint-disable-next-line */ }, [])

  async function save(patch) {
    setSaving(true)
    const payload = { ...content, ...patch }
    const r = await fetch('/api/admin/content', { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(payload) })
    const j = await r.json()
    setSaving(false)
    if (j.success) { setContent(j.content); toast.success('Saved'); return j }
    toast.error(j.error || 'Save failed'); return j
  }

  async function uploadFor(key, file) {
    if (!file) return
    setUploadingKey(key)
    try {
      const form = new FormData(); form.append('files', file)
      const r = await fetch('/api/admin/upload', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: form })
      const j = await r.json()
      if (j.success && j.urls?.[0]) { await save({ [key]: j.urls[0] }); toast.success('Image updated') }
      else toast.error(j.error || 'Upload failed')
    } catch (e) { toast.error('Upload failed: ' + e.message) }
    setUploadingKey(null)
  }

  if (loading) return <div className="p-12 flex justify-center" ><Loader2 className="h-8 w-8 animate-spin text-[#D71920]"  /></div>

  const subTabs = [
    { id: 'text', label: 'Hero Text' },
    { id: 'badges', label: 'Trust Badges' },
    { id: 'stats', label: 'Stats' },
    { id: 'subsidy', label: 'Subsidy Banner' },
    { id: 'about', label: 'About Section' },
    { id: 'services', label: 'Services' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'whyUs', label: 'Why Us' },
    { id: 'process', label: 'Process' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'projects', label: 'Projects Text' },
    { id: 'calculator', label: 'Calculator' },
    { id: 'contact', label: 'Contact Info' },
    { id: 'images', label: 'Section Images' },
    { id: 'clients', label: 'Client Logos' },
    { id: 'visibility', label: 'Section Visibility' },
    { id: 'legal', label: 'Terms & Privacy' },
  ]

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex gap-1 bg-neutral-100 p-1 rounded-full flex-wrap">
          {subTabs.map(t => (
            <button key={t.id} onClick={() => setSubTab(t.id)} className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${subTab === t.id ? 'bg-white text-[#D71920] shadow' : 'text-neutral-600 hover:text-neutral-900'}`}>{t.label}</button>
          ))}
        </div>
        {saving && <span className="text-xs inline-flex items-center gap-1 text-[#D71920]"><Loader2 className="h-3 w-3 animate-spin" /> Saving...</span>}
      </div>

      {subTab === 'text' && <HeroTextEditor content={content} save={save} />}
      {subTab === 'badges' && <BadgesEditor content={content} save={save} />}
      {subTab === 'stats' && <StatsEditor content={content} save={save} />}
      {subTab === 'subsidy' && <SubsidyEditor content={content} save={save} />}
      {subTab === 'about' && <AboutSectionEditor content={content} save={save} />}
      {subTab === 'services' && <ServicesSectionEditor content={content} save={save} />}
      {subTab === 'solutions' && <SolutionsSectionEditor content={content} save={save} />}
      {subTab === 'whyUs' && <WhyUsSectionEditor content={content} save={save} />}
      {subTab === 'process' && <ProcessSectionEditor content={content} save={save} />}
      {subTab === 'faqs' && <FaqsSectionEditor content={content} save={save} />}
      {subTab === 'projects' && <ProjectsTextEditor content={content} save={save} />}
      {subTab === 'calculator' && <CalculatorEditor content={content} save={save} />}
      {subTab === 'contact' && <ContactInfoEditor content={content} save={save} />}
      {subTab === 'images' && <ImagesEditor content={content} uploadFor={uploadFor} uploadingKey={uploadingKey} save={save} />}
      {subTab === 'clients' && <ClientsEditor content={content} save={save} token={token} />}
      {subTab === 'visibility' && <VisibilityEditor content={content} save={save} />}
      {subTab === 'legal' && <LegalEditor content={content} save={save} />}
    </div>
  )
}

function FieldRow({ label, hint, children }) {
  return (
    <div>
      <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider" >{label}</label>
      <div className="mt-2" >{children}</div>
      {hint && <div className="text-xs text-neutral-500 mt-1" >{hint}</div>}
    </div>
  )
}

function HeroTextEditor({ content, save }) {
  const [f, setF] = useState({
    heroBadge: content.heroBadge || 'Government Approved Solar EPC Company',
    heroHeadline: content.heroHeadline || 'Powering India with <span class="text-gradient-red" >Clean, Smart</span> & <span class="text-gradient-red" >Sustainable</span> Solar Energy',
    heroSubheadline: content.heroSubheadline || 'Engineering • Procurement • Construction • Solar Consultancy • Turnkey EPC Solutions across Residential, Commercial & Industrial sectors.',
    heroCtaPrimary: content.heroCtaPrimary || 'Get Free Consultation',
    heroCtaSecondary: content.heroCtaSecondary || 'View Projects',
    aboutExperienceVal: content.aboutExperienceVal || '12+ Years',
    aboutExperienceLabel: content.aboutExperienceLabel || 'Solar Expertise',
  })
  return (
    <div className="rounded-2xl bg-white p-6 shadow-soft border border-neutral-100 space-y-5" >
      <div className="text-sm font-bold text-neutral-900 border-b pb-2" >Hero Section Content</div>
      <FieldRow label="Hero badge (small pill)" ><Input value={f.heroBadge} onChange={e => setF({ ...f, heroBadge: e.target.value })} className="h-11 rounded-xl"  /></FieldRow>
      <FieldRow label="Main headline (HTML supported)"  hint='Use &lt;span class="text-gradient-red" &gt;text&lt;/span&gt; for red gradient words'>
        <Textarea value={f.heroHeadline} onChange={e => setF({ ...f, heroHeadline: e.target.value })} rows={3} className="rounded-xl"  />
      </FieldRow>
      <FieldRow label="Sub-headline" ><Textarea value={f.heroSubheadline} onChange={e => setF({ ...f, heroSubheadline: e.target.value })} rows={2} className="rounded-xl"  /></FieldRow>
      <div className="grid grid-cols-2 gap-4" >
        <FieldRow label="Primary CTA button" ><Input value={f.heroCtaPrimary} onChange={e => setF({ ...f, heroCtaPrimary: e.target.value })} className="h-11 rounded-xl"  /></FieldRow>
        <FieldRow label="Secondary CTA button" ><Input value={f.heroCtaSecondary} onChange={e => setF({ ...f, heroCtaSecondary: e.target.value })} className="h-11 rounded-xl"  /></FieldRow>
      </div>
      
      <hr className="my-6 border-neutral-200"  />
      <div className="text-sm font-bold text-neutral-900 mb-2 border-b pb-2" >About Section Experience Badge</div>
      <div className="grid grid-cols-2 gap-4" >
        <FieldRow label="Experience Value (e.g. 12+ Years)" ><Input value={f.aboutExperienceVal} onChange={e => setF({ ...f, aboutExperienceVal: e.target.value })} className="h-11 rounded-xl"  /></FieldRow>
        <FieldRow label="Experience Label (e.g. Solar Expertise)" ><Input value={f.aboutExperienceLabel} onChange={e => setF({ ...f, aboutExperienceLabel: e.target.value })} className="h-11 rounded-xl"  /></FieldRow>
      </div>

      <div className="pt-4 flex justify-end" >
        <Button onClick={() => save(f)} className="bg-[#D71920] hover:bg-[#a5121a] rounded-xl" ><Save className="h-4 w-4 mr-2"  /> Save Hero & About Text</Button>
      </div>
    </div>
  )
}

function BadgesEditor({ content, save }) {
  const initial = (content.heroTrustBadges && content.heroTrustBadges.length) ? content.heroTrustBadges : [
    { icon: 'shield', text: 'Tier-1 Panels' },
    { icon: 'badge', text: '25-Year Warranty' },
    { icon: 'rupee', text: 'PM Surya Ghar Subsidy' },
    { icon: 'star', text: '4.9/5 Google Rating' },
  ]
  const [items, setItems] = useState(initial)
  const icons = ['shield', 'badge', 'rupee', 'star', 'check', 'sun', 'sparkle', 'award']

  const update = (i, patch) => setItems(items.map((x, idx) => idx === i ? { ...x, ...patch } : x))
  const remove = (i) => setItems(items.filter((_, idx) => idx !== i))
  const add = () => setItems([...items, { icon: 'check', text: 'New badge' }])

  return (
    <div className="rounded-2xl bg-white p-6 shadow-soft border border-neutral-100" >
      <div className="text-sm text-neutral-600 mb-4" >Small badges shown below the hero CTAs. Add, edit, remove, or reorder as needed.</div>
      <div className="space-y-3" >
        {items.map((b, i) => (
          <div key={i} className="flex items-center gap-3 bg-neutral-50 rounded-xl p-3" >
            <select value={b.icon} onChange={e => update(i, { icon: e.target.value })} className="h-10 rounded-lg border border-neutral-200 px-2 text-sm bg-white" >
              {icons.map(ic => <option key={ic}>{ic}</option>)}
            </select>
            <Input value={b.text} onChange={e => update(i, { text: e.target.value })} className="flex-1 h-10 rounded-lg"  placeholder="Badge text"  />
            <Button variant="outline"  size="sm"  onClick={() => remove(i)} className="rounded-lg text-red-600 border-red-200 hover:bg-red-50" ><Trash2 className="h-4 w-4"  /></Button>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between items-center" >
        <Button onClick={add} variant="outline"  className="rounded-xl" ><Plus className="h-4 w-4 mr-2"  /> Add Badge</Button>
        <Button onClick={() => save({ heroTrustBadges: items })} className="bg-[#D71920] hover:bg-[#a5121a] rounded-xl" ><Save className="h-4 w-4 mr-2"  /> Save Badges</Button>
      </div>
    </div>
  )
}

function StatsEditor({ content, save }) {
  const seed = [
    { value: 15, suffix: '+ MW', label: 'Installed Capacity' },
    { value: 180, suffix: '+', label: 'Happy Clients' },
    { value: 12, suffix: '+', label: 'Years Experience' },
    { value: 250, suffix: '+', label: 'Projects Delivered' },
    { value: 6500, suffix: 'T', label: 'CO₂ Reduced (tons)' },
  ]
  const [items, setItems] = useState((content.stats && content.stats.length) ? content.stats : seed)
  const update = (i, patch) => setItems(items.map((x, idx) => idx === i ? { ...x, ...patch } : x))
  return (
    <div className="rounded-2xl bg-white p-6 shadow-soft border border-neutral-100" >
      <div className="text-sm text-neutral-600 mb-4" >These 5 stats appear in the animated counter row on the hero.</div>
      <div className="grid gap-3" >
        {items.map((s, i) => (
          <div key={i} className="grid grid-cols-3 gap-3 bg-neutral-50 rounded-xl p-3" >
            <Input placeholder="Value (number)"  value={s.value} onChange={e => update(i, { value: e.target.value.replace(/[^0-9.]/g, '') })} className="h-10 rounded-lg"  />
            <Input placeholder="Suffix (e.g. + MW)"  value={s.suffix || ''} onChange={e => update(i, { suffix: e.target.value })} className="h-10 rounded-lg"  />
            <Input placeholder="Label"  value={s.label} onChange={e => update(i, { label: e.target.value })} className="h-10 rounded-lg"  />
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-end" >
        <Button onClick={() => save({ stats: items })} className="bg-[#D71920] hover:bg-[#a5121a] rounded-xl" ><Save className="h-4 w-4 mr-2"  /> Save Stats</Button>
      </div>
    </div>
  )
}

const ICON_OPTIONS = [
  'PenTool', 'HardHat', 'Home', 'Building2', 'Factory', 'PanelsTopLeft', 'Handshake', 'Wrench',
  'IndianRupee', 'ShieldCheck', 'Award', 'Users', 'TrendingUp', 'Gauge', 'BadgeCheck', 'Cpu',
  'PhoneCall', 'Search', 'FileText', 'ClipboardCheck', 'Zap', 'Sparkles', 'Star', 'CheckCircle2', 'Sun'
]

function IconSelect({ value, onChange }) {
  return (
    <select value={value || 'CheckCircle2'} onChange={e => onChange(e.target.value)} className="h-10 rounded-xl border border-neutral-200 px-3 text-xs bg-white text-neutral-800 font-mono">
      {ICON_OPTIONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
    </select>
  )
}

function SubsidyEditor({ content, save }) {
  const [f, setF] = useState({
    subsidyEyebrow: content.subsidyEyebrow || 'Government Scheme',
    subsidyTitle: content.subsidyTitle || 'PM Surya Ghar Yojana — Get up to <span class="text-gradient-red">₹78,000</span> subsidy',
    subsidyDescription: content.subsidyDescription || "India's flagship rooftop solar program pays you to go solar. Our team handles the entire application, DISCOM approval and net-metering paperwork on your behalf.",
    subsidyCta: content.subsidyCta || 'Check Your Eligibility',
    subsidyBullets: content.subsidyBullets || ['Subsidy up to ₹78,000', 'Free application filing', 'DISCOM & net-meter support', 'Bank financing tie-ups', 'Zero paperwork for you', 'Fast disbursal timeline'],
    subsidyCards: content.subsidyCards || [{ v: '₹30k', l: '1 kW subsidy' }, { v: '₹60k', l: '2 kW subsidy' }, { v: '₹78k', l: '3 kW+ subsidy' }, { v: '90%', l: 'Bill reduction' }]
  })

  return (
    <div className="rounded-2xl bg-white p-6 shadow-soft border border-neutral-100 space-y-6">
      <div className="text-sm font-bold text-neutral-900 border-b pb-2">PM Surya Ghar Subsidy Banner Editor</div>
      <FieldRow label="Section Eyebrow"><Input value={f.subsidyEyebrow} onChange={e => setF({ ...f, subsidyEyebrow: e.target.value })} className="h-11 rounded-xl" /></FieldRow>
      <FieldRow label="Title (HTML supported)"><Textarea value={f.subsidyTitle} onChange={e => setF({ ...f, subsidyTitle: e.target.value })} rows={2} className="rounded-xl" /></FieldRow>
      <FieldRow label="Description"><Textarea value={f.subsidyDescription} onChange={e => setF({ ...f, subsidyDescription: e.target.value })} rows={3} className="rounded-xl" /></FieldRow>
      <FieldRow label="CTA Button Text"><Input value={f.subsidyCta} onChange={e => setF({ ...f, subsidyCta: e.target.value })} className="h-11 rounded-xl" /></FieldRow>
      
      <div>
        <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">Bullet Points</label>
        <div className="mt-2 space-y-2">
          {f.subsidyBullets.map((b, idx) => (
            <div key={idx} className="flex gap-2">
              <Input value={b} onChange={e => { const newB = [...f.subsidyBullets]; newB[idx] = e.target.value; setF({ ...f, subsidyBullets: newB }) }} className="h-10 rounded-xl flex-1" />
              <Button variant="outline" size="sm" onClick={() => setF({ ...f, subsidyBullets: f.subsidyBullets.filter((_, i) => i !== idx) })} className="rounded-xl text-red-600 border-red-200"><Trash2 className="h-4 w-4" /></Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => setF({ ...f, subsidyBullets: [...f.subsidyBullets, 'New Point'] })} className="rounded-xl mt-1"><Plus className="h-4 w-4 mr-1" /> Add Bullet</Button>
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">Stats Cards (4 items)</label>
        <div className="grid grid-cols-2 gap-3 mt-2">
          {f.subsidyCards.map((c, idx) => (
            <div key={idx} className="bg-neutral-50 p-3 rounded-xl space-y-2 border border-neutral-100">
              <Input value={c.v} onChange={e => { const newC = [...f.subsidyCards]; newC[idx] = { ...newC[idx], v: e.target.value }; setF({ ...f, subsidyCards: newC }) }} placeholder="Value (e.g. ₹78k)" className="h-9 rounded-lg" />
              <Input value={c.l} onChange={e => { const newC = [...f.subsidyCards]; newC[idx] = { ...newC[idx], l: e.target.value }; setF({ ...f, subsidyCards: newC }) }} placeholder="Label (e.g. 3 kW+ subsidy)" className="h-9 rounded-lg" />
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <Button onClick={() => save(f)} className="bg-[#D71920] hover:bg-[#a5121a] rounded-xl"><Save className="h-4 w-4 mr-2" /> Save Subsidy Banner</Button>
      </div>
    </div>
  )
}

function AboutSectionEditor({ content, save }) {
  const [f, setF] = useState({
    aboutEyebrow: content.aboutEyebrow || 'About IVR Energy',
    aboutTitle: content.aboutTitle || 'A single-vertical solar company built on <span class="text-gradient-red" >expertise & trust</span>.',
    aboutDescription: content.aboutDescription || 'IVR Energy is promoted by experienced professionals with wide knowledge of the solar industry — supported by financial partners and government nodal agencies. We focus on <strong>only solar power generation</strong>, diversified across Residential Rooftop, Commercial Rooftop, Industrial Rooftop and Ground-Mounted solar farms.',
    aboutMission: content.aboutMission || 'Make every home & business a self-sustaining power producer.',
    aboutVision: content.aboutVision || "Accelerate India's transition to 100% clean energy.",
    aboutCards: content.aboutCards || [
      { t: 'Government Approved.', d: 'Empanelled with DISCOM & nodal agencies for subsidy clearance.', icon: 'ShieldCheck' },
      { t: 'Experienced Team.', d: 'Solar-only specialists with 12+ years of field engineering expertise.', icon: 'Award' },
      { t: 'Financial Support.', d: 'Bank tie-ups & subsidy assistance under PM Surya Ghar Yojana.', icon: 'IndianRupee' },
      { t: 'Turnkey Delivery.', d: 'From site shadow analysis to net-metering & 24/7 O&M support.', icon: 'Wrench' }
    ]
  })

  return (
    <div className="rounded-2xl bg-white p-6 shadow-soft border border-neutral-100 space-y-6">
      <div className="text-sm font-bold text-neutral-900 border-b pb-2">About Section Full Editor</div>
      <FieldRow label="Section Eyebrow"><Input value={f.aboutEyebrow} onChange={e => setF({ ...f, aboutEyebrow: e.target.value })} className="h-11 rounded-xl" /></FieldRow>
      <FieldRow label="Title (HTML supported)"><Textarea value={f.aboutTitle} onChange={e => setF({ ...f, aboutTitle: e.target.value })} rows={2} className="rounded-xl" /></FieldRow>
      <FieldRow label="Description (HTML supported)"><Textarea value={f.aboutDescription} onChange={e => setF({ ...f, aboutDescription: e.target.value })} rows={4} className="rounded-xl" /></FieldRow>
      
      <div className="grid grid-cols-2 gap-4">
        <FieldRow label="Our Mission"><Textarea value={f.aboutMission} onChange={e => setF({ ...f, aboutMission: e.target.value })} rows={2} className="rounded-xl" /></FieldRow>
        <FieldRow label="Our Vision"><Textarea value={f.aboutVision} onChange={e => setF({ ...f, aboutVision: e.target.value })} rows={2} className="rounded-xl" /></FieldRow>
      </div>

      <div>
        <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">Feature Grid Cards (4 Cards)</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          {f.aboutCards.map((c, idx) => (
            <div key={idx} className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200/80 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-neutral-500">Card #{idx + 1}</span>
                <IconSelect value={c.icon} onChange={icon => { const newC = [...f.aboutCards]; newC[idx].icon = icon; setF({ ...f, aboutCards: newC }) }} />
              </div>
              <Input value={c.t} onChange={e => { const newC = [...f.aboutCards]; newC[idx].t = e.target.value; setF({ ...f, aboutCards: newC }) }} placeholder="Title" className="h-10 rounded-xl" />
              <Textarea value={c.d} onChange={e => { const newC = [...f.aboutCards]; newC[idx].d = e.target.value; setF({ ...f, aboutCards: newC }) }} placeholder="Description" rows={2} className="rounded-xl" />
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <Button onClick={() => save(f)} className="bg-[#D71920] hover:bg-[#a5121a] rounded-xl"><Save className="h-4 w-4 mr-2" /> Save About Section</Button>
      </div>
    </div>
  )
}

const SEED_EPC_TIMELINE = [
  { step: 'Planning', desc: 'Site assessment, load analysis, and project scope definition.', icon: 'Search' },
  { step: 'Design', desc: 'Engineering drawings, SLD, and structural analysis.', icon: 'PenTool' },
  { step: 'Procurement', desc: 'Tier-1 component sourcing with quality certifications.', icon: 'Box' },
  { step: 'Installation', desc: 'Certified team deployment with safety protocols.', icon: 'HardHat' },
  { step: 'Testing', desc: 'IV curve testing, insulation resistance, and earthing checks.', icon: 'Gauge' },
  { step: 'Commissioning', desc: 'Grid synchronization and performance benchmarking.', icon: 'Zap' },
  { step: 'Maintenance', desc: '24/7 monitoring and annual preventive maintenance.', icon: 'Wrench' }
]

const SEED_APPROVAL_STEPS = [
  { step: 'Eligibility', desc: 'Verify site and consumer eligibility criteria.', icon: 'CheckCircle2' },
  { step: 'Application', desc: 'Submit application with required documentation.', icon: 'FileText' },
  { step: 'Government Approval', desc: 'DISCOM review and technical feasibility clearance.', icon: 'ClipboardCheck' },
  { step: 'PPA', desc: 'Power Purchase Agreement execution.', icon: 'Handshake' },
  { step: 'Grid Connection', desc: 'Bi-directional meter installation and grid tie-in.', icon: 'Zap' },
  { step: 'Commissioning', desc: 'Final inspection, testing, and commissioning certificate.', icon: 'BadgeCheck' }
]

const SEED_SUPPLY_ITEMS = [
  { title: 'Solar Panels', icon: 'Sun', desc: 'Mono-PERC / TOPCon / HJT modules from Tier-1 manufacturers.' },
  { title: 'Inverters', icon: 'Gauge', desc: 'String, central, and micro inverters with MPPT technology.' },
  { title: 'Transformers', icon: 'Plug', desc: 'Step-up and auxiliary transformers for grid synchronization.' },
  { title: 'SCADA', icon: 'Monitor', desc: 'Supervisory control with real-time monitoring dashboards.' },
  { title: 'Junction Boxes', icon: 'Box', desc: 'IP65-rated junction boxes with surge protection.' },
  { title: 'Lightning Protection', icon: 'Shield', desc: 'LA systems and chemical earthing kits per IEC 62305.' },
  { title: 'LT Panel', icon: 'CircuitBoard', desc: 'MCCB/MCB panels with metering and protection relays.' },
  { title: 'HT Panel', icon: 'BatteryCharging', desc: 'Vacuum circuit breakers and relay protection panels.' },
  { title: 'Cables', icon: 'Cable', desc: 'DC, AC, and control cables with UV-resistant insulation.' },
  { title: 'Mounting Structure', icon: 'LandPlot', desc: 'Hot-dip galvanized structures certified for wind zone compliance.' }
]

const SEED_COMPARISON_DATA = [
  { dim: 'Experience', ivr: '12+ years with 500+ projects', trad: 'Varies, often limited' },
  { dim: 'Component Quality', ivr: 'Tier-1 only, 25-yr warranty', trad: 'Mixed quality, shorter warranty' },
  { dim: 'Government Support', ivr: 'Full liaison & subsidy processing', trad: 'Customer responsibility' },
  { dim: 'Warranty', ivr: 'Comprehensive 5-year workmanship', trad: '1-year standard' },
  { dim: 'Execution Speed', ivr: '2-4 days residential, 2-6 weeks commercial', trad: 'Unpredictable timelines' },
  { dim: 'Monitoring', ivr: 'Real-time app with WiFi/GPRS', trad: 'Basic or no monitoring' },
  { dim: 'Maintenance', ivr: 'SLA-backed annual O&M contracts', trad: 'On-call, no SLA' }
]

const SEED_WORKFLOW_STEPS = [
  { title: 'Consultation', desc: 'Free site visit & requirement analysis.', icon: 'PhoneCall' },
  { title: 'Site Survey', desc: 'Shadow analysis, structural review & metering plan.', icon: 'Search' },
  { title: 'Design', desc: 'Detailed engineering, SLD & layout drawings.', icon: 'PenTool' },
  { title: 'Approval', desc: 'DISCOM & subsidy paperwork by our team.', icon: 'ClipboardCheck' },
  { title: 'Installation', desc: 'Certified installers with premium structures.', icon: 'HardHat' },
  { title: 'Inspection', desc: 'Quality checks and safety compliance.', icon: 'Gauge' },
  { title: 'Commissioning', desc: 'Grid sync, testing & performance benchmarking.', icon: 'Zap' },
  { title: 'After-Sales Support', desc: '24/7 monitoring and annual maintenance.', icon: 'Wrench' }
]

function ServicesSectionEditor({ content, save }) {
  const seedServices = [
    {
      icon: 'PenTool',
      title: 'Solar Consultancy',
      desc: 'End-to-end consulting with international partners for feasibility, DPR & funding.',
      features: ['Feasibility Study', 'DPR Preparation', 'ROI Analysis', 'Technical Consulting'],
      longDesc: 'Our expert solar consultants perform detailed technical feasibility assessments, solar irradiance analysis, DPR preparation, and financial modeling with international engineering standards to maximize your return on investment.'
    },
    {
      icon: 'HardHat',
      title: 'Solar EPC Services',
      desc: 'Turnkey Engineering, Procurement & Construction — from land to commissioning.',
      features: ['Engineering Design', 'Procurement', 'Construction', 'Testing & Commissioning'],
      longDesc: 'We handle the entire EPC lifecycle — from precision engineering and Tier-1 component procurement to certified structural mounting, electrical cabling, grid integration, and final plant commissioning.'
    },
    {
      icon: 'Home',
      title: 'Residential Rooftop',
      desc: 'Slash your EB bill to zero with premium home solar systems.',
      features: ['Net Metering', 'Subsidy Support', 'Premium Panels', 'App Monitoring'],
      longDesc: 'Transform your home rooftop into a self-sustaining power generator. Enjoy up to 80% reduction in electricity bills, zero-cost solar power for 25+ years, hassle-free net metering, and PM Surya Ghar subsidy support.'
    },
    {
      icon: 'Building2',
      title: 'Commercial Rooftop',
      desc: 'Cut operating costs for offices, hotels, hospitals & IT parks.',
      features: ['Load Analysis', 'Custom Design', 'OPEX/CAPEX Models', 'Grid Tie-In'],
      longDesc: 'Optimize corporate operating costs for offices, hospitals, hotels, and IT parks. Our custom commercial solar plants reduce peak tariff charges, provide accelerated depreciation tax benefits, and boost corporate sustainability.'
    },
    {
      icon: 'Factory',
      title: 'Industrial Solar',
      desc: 'Captive solar power for textiles, cement, chemical & manufacturing.',
      features: ['High-Voltage Systems', 'Transformer Integration', 'SCADA Monitoring', 'Power Evacuation'],
      longDesc: 'Designed for energy-intensive manufacturing plants, textiles, and chemical industries. We engineer high-voltage captive solar power systems equipped with real-time SCADA monitoring, step-up transformers, and robust power evacuation.'
    },
    {
      icon: 'PanelsTopLeft',
      title: 'Ground Mounted Solar',
      desc: 'Utility-scale solar farms with grid tie-in and net metering.',
      features: ['Land Assessment', 'Module Mounting', 'HT Infrastructure', 'Grid Synchronization'],
      longDesc: 'Utility-scale ground mounted solar farms engineered for maximum generation yield. We handle topography land surveying, civil piling, HT transmission infrastructure, substations, and DISCOM grid synchronization.'
    },
    {
      icon: 'Handshake',
      title: 'Government Approvals',
      desc: 'Subsidy applications, TANGEDCO net-metering & policy compliance.',
      features: ['DISCOM Liaison', 'Net Metering', 'Subsidy Processing', 'Regulatory Compliance'],
      longDesc: 'Zero-hassle administrative paperwork. Our dedicated liaison team manages TANGEDCO / DISCOM net-metering applications, CEIG safety inspection approvals, grid connectivity agreements, and government subsidy disbursal.'
    },
    {
      icon: 'Wrench',
      title: 'O&M Services',
      desc: 'Inverter, transformer & MV switchgear preventive maintenance.',
      features: ['Preventive Maintenance', 'Performance Monitoring', 'Spare Parts', 'Annual Contracts'],
      longDesc: 'Keep your solar power plant running at peak efficiency year-round. We offer 24/7 remote IoT generation tracking, thermal drone imaging, panel washing, inverter diagnostics, and SLA-backed preventive maintenance.'
    },
    {
      icon: 'IndianRupee',
      title: 'Solar Financing',
      desc: 'Bank tie-ups, EMI options & PM Surya Ghar subsidy support.',
      features: ['Bank Loans', 'EMI Options', 'Subsidy Guidance', 'ROI Documentation'],
      longDesc: 'Make your solar transition affordable through our banking network. Benefit from low-interest green energy loans, zero-down-payment OPEX/CAPEX models, flexible EMI tenures, and maximum PM Surya Ghar subsidy assistance.'
    }
  ]

  const [activeTab, setActiveTab] = useState('cards')

  const [f, setF] = useState({
    servicesHeroBadge: content.servicesHeroBadge || 'Complete Solar Energy Solutions',
    servicesHeroTitle: content.servicesHeroTitle || 'Complete Solar <span class="text-gradient-red">Energy Solutions</span>',
    servicesHeroSubtitle: content.servicesHeroSubtitle || 'From Consultation to Commissioning, IVR Energy delivers complete turnkey solar EPC solutions for Residential, Commercial, Industrial and Utility Scale Projects.',
    servicesEyebrow: content.servicesEyebrow || 'What we do',
    servicesTitle: content.servicesTitle || 'Complete <span class="text-gradient-red">turnkey solar</span> services',
    servicesSubtitle: content.servicesSubtitle || 'From consultancy to commissioning — one accountable partner for every step of your solar journey.',
    servicesList: (content.servicesList && content.servicesList.length > 0) ? content.servicesList : seedServices,

    // 1. Solar EPC Timeline
    epcEyebrow: content.epcEyebrow || 'SOLAR EPC',
    epcTitle: content.epcTitle || 'Engineering, Procurement & <span class="text-gradient-red">Construction</span>',
    epcSubtitle: content.epcSubtitle || 'Our turnkey EPC process ensures quality at every step — from initial planning to final commissioning and ongoing maintenance.',
    epcTimeline: (content.epcTimeline && content.epcTimeline.length > 0) ? content.epcTimeline : SEED_EPC_TIMELINE,

    // 2. Government Approvals
    approvalEyebrow: content.approvalEyebrow || 'GOVERNMENT APPROVALS',
    approvalTitle: content.approvalTitle || 'Hassle-free <span class="text-gradient-red">approval process</span>',
    approvalSubtitle: content.approvalSubtitle || 'Our liaison team handles the complete DISCOM approval, net metering, and subsidy documentation process.',
    approvalSteps: (content.approvalSteps && content.approvalSteps.length > 0) ? content.approvalSteps : SEED_APPROVAL_STEPS,

    // 3. Scope of Supply
    supplyEyebrow: content.supplyEyebrow || 'SCOPE OF SUPPLY',
    supplyTitle: content.supplyTitle || 'Premium <span class="text-gradient-red">Tier-1 components</span>',
    supplySubtitle: content.supplySubtitle || 'We source exclusively from certified Tier-1 manufacturers to ensure maximum performance, reliability, and warranty coverage.',
    supplyItems: (content.supplyItems && content.supplyItems.length > 0) ? content.supplyItems : SEED_SUPPLY_ITEMS,

    // 4. Comparison Table / Advantage
    comparisonEyebrow: content.comparisonEyebrow || 'WHY CHOOSE US',
    comparisonTitle: content.comparisonTitle || 'The IVR Energy <span class="text-gradient-red">advantage</span>',
    comparisonSubtitle: content.comparisonSubtitle || 'See how our engineering-first approach delivers superior outcomes compared to traditional solar EPC providers.',
    comparisonData: (content.comparisonData && content.comparisonData.length > 0) ? content.comparisonData : SEED_COMPARISON_DATA,

    // 5. 8-Step Workflow
    workflowEyebrow: content.workflowEyebrow || 'OUR PROCESS',
    workflowTitle: content.workflowTitle || 'Your solar journey in <span class="text-gradient-red">8 seamless steps</span>',
    workflowSubtitle: content.workflowSubtitle || 'A refined, transparent execution playbook honed across 500+ projects.',
    workflowSteps: (content.workflowSteps && content.workflowSteps.length > 0) ? content.workflowSteps : SEED_WORKFLOW_STEPS
  })

  const editorTabs = [
    { id: 'cards', label: '1. Hero & Service Cards' },
    { id: 'epc', label: '2. Solar EPC Timeline' },
    { id: 'approvals', label: '3. Government Approvals' },
    { id: 'supply', label: '4. Scope of Supply' },
    { id: 'comparison', label: '5. Advantage Comparison Table' },
    { id: 'workflow', label: '6. 8-Step Workflow' }
  ]

  return (
    <div className="rounded-2xl bg-white p-6 shadow-soft border border-neutral-100 space-y-6">
      <div className="text-sm font-bold text-neutral-900 border-b pb-2 flex items-center justify-between">
        <span>Services Page Complete Content Editor</span>
        <span className="text-xs text-[#D71920] font-semibold">Live Real-time Sync to /services</span>
      </div>

      {/* Sub-tab pills */}
      <div className="flex flex-wrap gap-2 bg-neutral-100 p-1.5 rounded-2xl">
        {editorTabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === t.id
                ? 'bg-white text-[#D71920] shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1: CARDS */}
      {activeTab === 'cards' && (
        <div className="space-y-6">
          <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-600">Services Page Hero Banner</div>
            <FieldRow label="Hero Badge Text"><Input value={f.servicesHeroBadge} onChange={e => setF({ ...f, servicesHeroBadge: e.target.value })} className="h-11 rounded-xl bg-white" /></FieldRow>
            <FieldRow label="Hero Title (HTML supported)"><Textarea value={f.servicesHeroTitle} onChange={e => setF({ ...f, servicesHeroTitle: e.target.value })} rows={2} className="rounded-xl bg-white font-mono text-xs" /></FieldRow>
            <FieldRow label="Hero Subtitle"><Textarea value={f.servicesHeroSubtitle} onChange={e => setF({ ...f, servicesHeroSubtitle: e.target.value })} rows={2} className="rounded-xl bg-white" /></FieldRow>
          </div>

          <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-600">Services Grid Header</div>
            <FieldRow label="Eyebrow"><Input value={f.servicesEyebrow} onChange={e => setF({ ...f, servicesEyebrow: e.target.value })} className="h-11 rounded-xl bg-white" /></FieldRow>
            <FieldRow label="Section Title (HTML supported)"><Textarea value={f.servicesTitle} onChange={e => setF({ ...f, servicesTitle: e.target.value })} rows={2} className="rounded-xl bg-white font-mono text-xs" /></FieldRow>
            <FieldRow label="Section Subtitle"><Textarea value={f.servicesSubtitle} onChange={e => setF({ ...f, servicesSubtitle: e.target.value })} rows={2} className="rounded-xl bg-white" /></FieldRow>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">Services Cards ({f.servicesList.length} Total)</label>
              <Button variant="outline" size="sm" onClick={() => setF({ ...f, servicesList: [...f.servicesList, { icon: 'Sun', title: 'New Service', desc: 'Short service summary...', features: ['Feature 1', 'Feature 2'], longDesc: 'Detailed description when expanded...' }] })} className="rounded-xl"><Plus className="h-4 w-4 mr-1" /> Add New Service Card</Button>
            </div>

            <div className="space-y-4">
              {f.servicesList.map((s, idx) => (
                <div key={idx} className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200 space-y-4 relative">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#D71920] bg-red-50 px-2.5 py-1 rounded-full border border-red-100">Service #{idx + 1}</span>
                      <IconSelect value={typeof s.icon === 'string' ? s.icon : 'Sun'} onChange={icon => { const list = [...f.servicesList]; list[idx].icon = icon; setF({ ...f, servicesList: list }) }} />
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setF({ ...f, servicesList: f.servicesList.filter((_, i) => i !== idx) })} className="rounded-xl text-red-600 border-red-200 hover:bg-red-50"><Trash2 className="h-4 w-4 mr-1" /> Delete Service</Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FieldRow label="Service Title">
                      <Input value={s.title || ''} onChange={e => { const list = [...f.servicesList]; list[idx].title = e.target.value; setF({ ...f, servicesList: list }) }} placeholder="Service Title" className="h-11 rounded-xl bg-white font-bold text-neutral-900" />
                    </FieldRow>
                    <FieldRow label="Features Bullet Points (comma separated)">
                      <Input
                        value={Array.isArray(s.features) ? s.features.join(', ') : (s.features || '')}
                        onChange={e => {
                          const list = [...f.servicesList]
                          list[idx].features = e.target.value.split(',').map(item => item.trim())
                          setF({ ...f, servicesList: list })
                        }}
                        placeholder="e.g. Net Metering, Subsidy Support, App Monitoring"
                        className="h-11 rounded-xl bg-white"
                      />
                    </FieldRow>
                  </div>

                  <FieldRow label="Short Card Summary">
                    <Textarea value={s.desc || ''} onChange={e => { const list = [...f.servicesList]; list[idx].desc = e.target.value; setF({ ...f, servicesList: list }) }} placeholder="Short description..." rows={2} className="rounded-xl bg-white text-sm" />
                  </FieldRow>

                  <FieldRow label="Detailed Description (Expanded View)">
                    <Textarea value={s.longDesc || ''} onChange={e => { const list = [...f.servicesList]; list[idx].longDesc = e.target.value; setF({ ...f, servicesList: list }) }} placeholder="Detailed full description..." rows={3} className="rounded-xl bg-white text-sm" />
                  </FieldRow>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SOLAR EPC TIMELINE */}
      {activeTab === 'epc' && (
        <div className="space-y-6">
          <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-600">Solar EPC Timeline Section Header</div>
            <FieldRow label="Eyebrow"><Input value={f.epcEyebrow} onChange={e => setF({ ...f, epcEyebrow: e.target.value })} className="h-11 rounded-xl bg-white" /></FieldRow>
            <FieldRow label="Title (HTML supported)"><Textarea value={f.epcTitle} onChange={e => setF({ ...f, epcTitle: e.target.value })} rows={2} className="rounded-xl bg-white font-mono text-xs" /></FieldRow>
            <FieldRow label="Subtitle"><Textarea value={f.epcSubtitle} onChange={e => setF({ ...f, epcSubtitle: e.target.value })} rows={2} className="rounded-xl bg-white" /></FieldRow>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">EPC Timeline Steps ({f.epcTimeline.length} Steps)</label>
              <Button variant="outline" size="sm" onClick={() => setF({ ...f, epcTimeline: [...f.epcTimeline, { step: 'New Step', desc: 'Step details...', icon: 'CheckCircle2' }] })} className="rounded-xl"><Plus className="h-4 w-4 mr-1" /> Add EPC Step</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {f.epcTimeline.map((item, idx) => (
                <div key={idx} className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 space-y-3 relative">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[#D71920]">Step #{idx + 1}</span>
                    <div className="flex items-center gap-2">
                      <IconSelect value={typeof item.icon === 'string' ? item.icon : 'Search'} onChange={icon => { const list = [...f.epcTimeline]; list[idx].icon = icon; setF({ ...f, epcTimeline: list }) }} />
                      <Button variant="outline" size="sm" onClick={() => setF({ ...f, epcTimeline: f.epcTimeline.filter((_, i) => i !== idx) })} className="rounded-xl text-red-600 border-red-200"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </div>
                  <Input value={item.step || ''} onChange={e => { const list = [...f.epcTimeline]; list[idx].step = e.target.value; setF({ ...f, epcTimeline: list }) }} placeholder="Step Name" className="h-10 rounded-xl bg-white font-bold" />
                  <Textarea value={item.desc || ''} onChange={e => { const list = [...f.epcTimeline]; list[idx].desc = e.target.value; setF({ ...f, epcTimeline: list }) }} placeholder="Step Description" rows={2} className="rounded-xl bg-white text-sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: GOVERNMENT APPROVALS */}
      {activeTab === 'approvals' && (
        <div className="space-y-6">
          <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-600">Government Approvals Header</div>
            <FieldRow label="Eyebrow"><Input value={f.approvalEyebrow} onChange={e => setF({ ...f, approvalEyebrow: e.target.value })} className="h-11 rounded-xl bg-white" /></FieldRow>
            <FieldRow label="Title (HTML supported)"><Textarea value={f.approvalTitle} onChange={e => setF({ ...f, approvalTitle: e.target.value })} rows={2} className="rounded-xl bg-white font-mono text-xs" /></FieldRow>
            <FieldRow label="Subtitle"><Textarea value={f.approvalSubtitle} onChange={e => setF({ ...f, approvalSubtitle: e.target.value })} rows={2} className="rounded-xl bg-white" /></FieldRow>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">Approval Steps ({f.approvalSteps.length} Steps)</label>
              <Button variant="outline" size="sm" onClick={() => setF({ ...f, approvalSteps: [...f.approvalSteps, { step: 'New Approval Step', desc: 'Approval details...', icon: 'ClipboardCheck' }] })} className="rounded-xl"><Plus className="h-4 w-4 mr-1" /> Add Approval Step</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {f.approvalSteps.map((step, idx) => (
                <div key={idx} className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 space-y-3 relative">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[#D71920]">Step #{idx + 1}</span>
                    <div className="flex items-center gap-2">
                      <IconSelect value={typeof step.icon === 'string' ? step.icon : 'CheckCircle2'} onChange={icon => { const list = [...f.approvalSteps]; list[idx].icon = icon; setF({ ...f, approvalSteps: list }) }} />
                      <Button variant="outline" size="sm" onClick={() => setF({ ...f, approvalSteps: f.approvalSteps.filter((_, i) => i !== idx) })} className="rounded-xl text-red-600 border-red-200"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </div>
                  <Input value={step.step || ''} onChange={e => { const list = [...f.approvalSteps]; list[idx].step = e.target.value; setF({ ...f, approvalSteps: list }) }} placeholder="Step Name" className="h-10 rounded-xl bg-white font-bold" />
                  <Textarea value={step.desc || ''} onChange={e => { const list = [...f.approvalSteps]; list[idx].desc = e.target.value; setF({ ...f, approvalSteps: list }) }} placeholder="Description" rows={2} className="rounded-xl bg-white text-sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SCOPE OF SUPPLY */}
      {activeTab === 'supply' && (
        <div className="space-y-6">
          <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-600">Scope of Supply Header</div>
            <FieldRow label="Eyebrow"><Input value={f.supplyEyebrow} onChange={e => setF({ ...f, supplyEyebrow: e.target.value })} className="h-11 rounded-xl bg-white" /></FieldRow>
            <FieldRow label="Title (HTML supported)"><Textarea value={f.supplyTitle} onChange={e => setF({ ...f, supplyTitle: e.target.value })} rows={2} className="rounded-xl bg-white font-mono text-xs" /></FieldRow>
            <FieldRow label="Subtitle"><Textarea value={f.supplySubtitle} onChange={e => setF({ ...f, supplySubtitle: e.target.value })} rows={2} className="rounded-xl bg-white" /></FieldRow>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">Supply Components ({f.supplyItems.length} Items)</label>
              <Button variant="outline" size="sm" onClick={() => setF({ ...f, supplyItems: [...f.supplyItems, { title: 'New Component', desc: 'Component specs...', icon: 'Box' }] })} className="rounded-xl"><Plus className="h-4 w-4 mr-1" /> Add Component</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {f.supplyItems.map((item, idx) => (
                <div key={idx} className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 space-y-3 relative">
                  <div className="flex justify-between items-center">
                    <IconSelect value={typeof item.icon === 'string' ? item.icon : 'Sun'} onChange={icon => { const list = [...f.supplyItems]; list[idx].icon = icon; setF({ ...f, supplyItems: list }) }} />
                    <Button variant="outline" size="sm" onClick={() => setF({ ...f, supplyItems: f.supplyItems.filter((_, i) => i !== idx) })} className="rounded-xl text-red-600 border-red-200"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                  <Input value={item.title || ''} onChange={e => { const list = [...f.supplyItems]; list[idx].title = e.target.value; setF({ ...f, supplyItems: list }) }} placeholder="Component Title" className="h-10 rounded-xl bg-white font-bold" />
                  <Textarea value={item.desc || ''} onChange={e => { const list = [...f.supplyItems]; list[idx].desc = e.target.value; setF({ ...f, supplyItems: list }) }} placeholder="Description" rows={2} className="rounded-xl bg-white text-xs" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: ADVANTAGE COMPARISON TABLE */}
      {activeTab === 'comparison' && (
        <div className="space-y-6">
          <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-600">Advantage Comparison Header</div>
            <FieldRow label="Eyebrow"><Input value={f.comparisonEyebrow} onChange={e => setF({ ...f, comparisonEyebrow: e.target.value })} className="h-11 rounded-xl bg-white" /></FieldRow>
            <FieldRow label="Title (HTML supported)"><Textarea value={f.comparisonTitle} onChange={e => setF({ ...f, comparisonTitle: e.target.value })} rows={2} className="rounded-xl bg-white font-mono text-xs" /></FieldRow>
            <FieldRow label="Subtitle"><Textarea value={f.comparisonSubtitle} onChange={e => setF({ ...f, comparisonSubtitle: e.target.value })} rows={2} className="rounded-xl bg-white" /></FieldRow>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">Comparison Table Rows ({f.comparisonData.length} Rows)</label>
              <Button variant="outline" size="sm" onClick={() => setF({ ...f, comparisonData: [...f.comparisonData, { dim: 'New Feature', ivr: 'IVR energy advantage point', trad: 'Traditional downside' }] })} className="rounded-xl"><Plus className="h-4 w-4 mr-1" /> Add Row</Button>
            </div>

            <div className="space-y-3">
              {f.comparisonData.map((row, idx) => (
                <div key={idx} className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                  <Input value={row.dim || ''} onChange={e => { const list = [...f.comparisonData]; list[idx].dim = e.target.value; setF({ ...f, comparisonData: list }) }} placeholder="Dimension (e.g. Experience)" className="h-10 rounded-xl bg-white font-bold" />
                  <Input value={row.ivr || ''} onChange={e => { const list = [...f.comparisonData]; list[idx].ivr = e.target.value; setF({ ...f, comparisonData: list }) }} placeholder="IVR Energy Feature" className="h-10 rounded-xl bg-white text-green-700 font-semibold" />
                  <Input value={row.trad || ''} onChange={e => { const list = [...f.comparisonData]; list[idx].trad = e.target.value; setF({ ...f, comparisonData: list }) }} placeholder="Traditional EPC" className="h-10 rounded-xl bg-white text-neutral-600" />
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm" onClick={() => setF({ ...f, comparisonData: f.comparisonData.filter((_, i) => i !== idx) })} className="rounded-xl text-red-600 border-red-200"><Trash2 className="h-4 w-4 mr-1" /> Remove Row</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: 8-STEP WORKFLOW */}
      {activeTab === 'workflow' && (
        <div className="space-y-6">
          <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-600">8-Step Execution Playbook Header</div>
            <FieldRow label="Eyebrow"><Input value={f.workflowEyebrow} onChange={e => setF({ ...f, workflowEyebrow: e.target.value })} className="h-11 rounded-xl bg-white" /></FieldRow>
            <FieldRow label="Title (HTML supported)"><Textarea value={f.workflowTitle} onChange={e => setF({ ...f, workflowTitle: e.target.value })} rows={2} className="rounded-xl bg-white font-mono text-xs" /></FieldRow>
            <FieldRow label="Subtitle"><Textarea value={f.workflowSubtitle} onChange={e => setF({ ...f, workflowSubtitle: e.target.value })} rows={2} className="rounded-xl bg-white" /></FieldRow>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">Workflow Steps ({f.workflowSteps.length} Steps)</label>
              <Button variant="outline" size="sm" onClick={() => setF({ ...f, workflowSteps: [...f.workflowSteps, { title: 'New Step', desc: 'Step details...', icon: 'PhoneCall' }] })} className="rounded-xl"><Plus className="h-4 w-4 mr-1" /> Add Workflow Step</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {f.workflowSteps.map((step, idx) => (
                <div key={idx} className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 space-y-3 relative">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[#D71920]">Step #{idx + 1}</span>
                    <div className="flex items-center gap-2">
                      <IconSelect value={typeof step.icon === 'string' ? step.icon : 'PhoneCall'} onChange={icon => { const list = [...f.workflowSteps]; list[idx].icon = icon; setF({ ...f, workflowSteps: list }) }} />
                      <Button variant="outline" size="sm" onClick={() => setF({ ...f, workflowSteps: f.workflowSteps.filter((_, i) => i !== idx) })} className="rounded-xl text-red-600 border-red-200"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </div>
                  <Input value={step.title || ''} onChange={e => { const list = [...f.workflowSteps]; list[idx].title = e.target.value; setF({ ...f, workflowSteps: list }) }} placeholder="Step Name" className="h-10 rounded-xl bg-white font-bold" />
                  <Textarea value={step.desc || ''} onChange={e => { const list = [...f.workflowSteps]; list[idx].desc = e.target.value; setF({ ...f, workflowSteps: list }) }} placeholder="Step Description" rows={2} className="rounded-xl bg-white text-sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="pt-4 flex justify-end border-t border-neutral-200">
        <Button onClick={() => save(f)} className="bg-[#D71920] hover:bg-[#a5121a] rounded-xl text-white font-bold h-12 px-8 text-sm"><Save className="h-4 w-4 mr-2" /> Save All Services Page Sections</Button>
      </div>
    </div>
  )
}

function SolutionsSectionEditor({ content, save }) {
  const seedItems = {
    Residential: ['Homes', 'Villas', 'Apartments', 'Farm Houses', 'Duplex Houses', 'Bungalows'],
    Commercial: ['Offices', 'Hospitals', 'Schools', 'Colleges', 'Hotels', 'Shopping Complexes', 'IT Parks', 'Showrooms'],
    Industrial: ['Textile', 'Steel', 'Cement', 'Chemical', 'Dairy', 'Sugar', 'Pharmaceutical', 'Manufacturing', 'Refineries']
  }
  const [f, setF] = useState({
    solutionsTitle: content.solutionsTitle || 'Tailored solar for every building type',
    solutionsItems: content.solutionsItems || seedItems
  })

  return (
    <div className="rounded-2xl bg-white p-6 shadow-soft border border-neutral-100 space-y-6">
      <div className="text-sm font-bold text-neutral-900 border-b pb-2">Solutions / Building Types Editor</div>
      <FieldRow label="Section Title"><Input value={f.solutionsTitle} onChange={e => setF({ ...f, solutionsTitle: e.target.value })} className="h-11 rounded-xl" /></FieldRow>

      {['Residential', 'Commercial', 'Industrial'].map(cat => (
        <div key={cat} className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200/80 space-y-3">
          <div className="font-bold text-neutral-900 text-sm">{cat} Solar Category Tags</div>
          <div className="flex flex-wrap gap-2">
            {(f.solutionsItems[cat] || []).map((item, idx) => (
              <div key={idx} className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-neutral-200">
                <Input value={item} onChange={e => {
                  const updated = [...(f.solutionsItems[cat] || [])]
                  updated[idx] = e.target.value
                  setF({ ...f, solutionsItems: { ...f.solutionsItems, [cat]: updated } })
                }} className="h-7 w-32 border-none px-1 text-xs" />
                <button type="button" onClick={() => {
                  const updated = (f.solutionsItems[cat] || []).filter((_, i) => i !== idx)
                  setF({ ...f, solutionsItems: { ...f.solutionsItems, [cat]: updated } })
                }} className="text-red-500 hover:text-red-700 text-xs font-bold">✕</button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => {
              const updated = [...(f.solutionsItems[cat] || []), 'New Tag']
              setF({ ...f, solutionsItems: { ...f.solutionsItems, [cat]: updated } })
            }} className="rounded-xl h-8 text-xs"><Plus className="h-3 w-3 mr-1" /> Add Tag</Button>
          </div>
        </div>
      ))}

      <div className="pt-4 flex justify-end">
        <Button onClick={() => save(f)} className="bg-[#D71920] hover:bg-[#a5121a] rounded-xl"><Save className="h-4 w-4 mr-2" /> Save Solutions Settings</Button>
      </div>
    </div>
  )
}

function WhyUsSectionEditor({ content, save }) {
  const seedWhyUs = [
    { icon: 'ShieldCheck', title: 'Government Approved', desc: 'Empanelled with nodal agencies & TANGEDCO for subsidy.' },
    { icon: 'Award', title: 'Tier-1 Panels Only', desc: 'Premium modules with 25-year performance warranty.' },
    { icon: 'Users', title: 'Experienced EPC Team', desc: 'Solar-only specialists with 12+ years of field expertise.' },
    { icon: 'TrendingUp', title: 'High ROI', desc: '3 - 4 year payback and 25+ years of free electricity.' },
    { icon: 'Handshake', title: 'End-to-End Execution', desc: 'From feasibility to O&M  — one accountable partner.' },
    { icon: 'Gauge', title: 'Performance Guarantee', desc: 'Monitored generation with SLA-backed uptime.' },
    { icon: 'BadgeCheck', title: 'Subsidy Assistance', desc: 'Up to ₹78,000 under PM Surya Ghar Yojana.' },
    { icon: 'Cpu', title: 'Smart Monitoring', desc: 'Real-time app-based generation & health tracking.' }
  ]

  const [f, setF] = useState({
    whyUsEyebrow: content.whyUsEyebrow || 'Why Choose IVR Energy',
    whyUsTitle: content.whyUsTitle || 'Built for <span class="text-gradient-red">performance</span>, engineered for <span class="text-gradient-red">longevity</span>',
    whyUsList: content.whyUsList || seedWhyUs
  })

  return (
    <div className="rounded-2xl bg-white p-6 shadow-soft border border-neutral-100 space-y-6">
      <div className="text-sm font-bold text-neutral-900 border-b pb-2">Why Choose Us Section Editor</div>
      <FieldRow label="Section Eyebrow"><Input value={f.whyUsEyebrow} onChange={e => setF({ ...f, whyUsEyebrow: e.target.value })} className="h-11 rounded-xl" /></FieldRow>
      <FieldRow label="Title (HTML supported)"><Textarea value={f.whyUsTitle} onChange={e => setF({ ...f, whyUsTitle: e.target.value })} rows={2} className="rounded-xl" /></FieldRow>

      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">Feature Items ({f.whyUsList.length})</label>
          <Button variant="outline" size="sm" onClick={() => setF({ ...f, whyUsList: [...f.whyUsList, { icon: 'Award', title: 'New Feature', desc: 'Feature description...' }] })} className="rounded-xl"><Plus className="h-4 w-4 mr-1" /> Add Feature</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {f.whyUsList.map((w, idx) => (
            <div key={idx} className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200/80 space-y-3">
              <div className="flex justify-between items-center">
                <IconSelect value={w.icon} onChange={icon => { const list = [...f.whyUsList]; list[idx].icon = icon; setF({ ...f, whyUsList: list }) }} />
                <Button variant="outline" size="sm" onClick={() => setF({ ...f, whyUsList: f.whyUsList.filter((_, i) => i !== idx) })} className="rounded-xl text-red-600 border-red-200"><Trash2 className="h-4 w-4" /></Button>
              </div>
              <Input value={w.title} onChange={e => { const list = [...f.whyUsList]; list[idx].title = e.target.value; setF({ ...f, whyUsList: list }) }} placeholder="Title" className="h-10 rounded-xl" />
              <Textarea value={w.desc} onChange={e => { const list = [...f.whyUsList]; list[idx].desc = e.target.value; setF({ ...f, whyUsList: list }) }} placeholder="Description" rows={2} className="rounded-xl" />
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <Button onClick={() => save(f)} className="bg-[#D71920] hover:bg-[#a5121a] rounded-xl"><Save className="h-4 w-4 mr-2" /> Save Why Choose Us</Button>
      </div>
    </div>
  )
}

function ProcessSectionEditor({ content, save }) {
  const seedProcess = [
    { t: 'Consultation', d: 'Free site visit & requirement analysis.', icon: 'PhoneCall' },
    { t: 'Site Survey', d: 'Shadow analysis, structural review & metering plan.', icon: 'Search' },
    { t: 'Proposal', d: 'Custom techno-commercial proposal with ROI.', icon: 'FileText' },
    { t: 'Engineering •Design', d: 'Detailed engineering, single-line & layout drawings.', icon: 'PenTool' },
    { t: 'Government Approval', d: 'DISCOM & subsidy paperwork handled by our team.', icon: 'ClipboardCheck' },
    { t: 'Installation', d: 'Certified installers with premium mounting structures.', icon: 'HardHat' },
    { t: 'Net Metering', d: 'Bi-directional meter installation & grid tie-in.', icon: 'Zap' },
    { t: 'Commissioning & O&M', d: '24/7 monitoring and annual preventive maintenance.', icon: 'Wrench' }
  ]

  const [f, setF] = useState({
    processEyebrow: content.processEyebrow || 'Our Process',
    processTitle: content.processTitle || 'Your solar journey in <span class="text-gradient-red" >8 seamless steps</span>',
    processSubtitle: content.processSubtitle || 'A refined, transparent execution playbook honed across 180+ projects.',
    processSteps: content.processSteps || seedProcess
  })

  return (
    <div className="rounded-2xl bg-white p-6 shadow-soft border border-neutral-100 space-y-6">
      <div className="text-sm font-bold text-neutral-900 border-b pb-2">Process / How We Work Section Editor</div>
      <FieldRow label="Section Eyebrow"><Input value={f.processEyebrow} onChange={e => setF({ ...f, processEyebrow: e.target.value })} className="h-11 rounded-xl" /></FieldRow>
      <FieldRow label="Title (HTML supported)"><Textarea value={f.processTitle} onChange={e => setF({ ...f, processTitle: e.target.value })} rows={2} className="rounded-xl" /></FieldRow>
      <FieldRow label="Subtitle"><Textarea value={f.processSubtitle} onChange={e => setF({ ...f, processSubtitle: e.target.value })} rows={2} className="rounded-xl" /></FieldRow>

      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">Execution Steps ({f.processSteps.length} Steps)</label>
          <Button variant="outline" size="sm" onClick={() => setF({ ...f, processSteps: [...f.processSteps, { icon: 'CheckCircle2', t: 'New Step', d: 'Step description...' }] })} className="rounded-xl"><Plus className="h-4 w-4 mr-1" /> Add Step</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {f.processSteps.map((p, idx) => (
            <div key={idx} className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200/80 space-y-3 relative">
              <span className="absolute top-2 right-2 text-xs font-bold text-neutral-400">Step #{idx + 1}</span>
              <div className="flex items-center gap-2">
                <IconSelect value={p.icon} onChange={icon => { const list = [...f.processSteps]; list[idx].icon = icon; setF({ ...f, processSteps: list }) }} />
                <Button variant="outline" size="sm" onClick={() => setF({ ...f, processSteps: f.processSteps.filter((_, i) => i !== idx) })} className="rounded-xl text-red-600 border-red-200 ml-auto"><Trash2 className="h-4 w-4" /></Button>
              </div>
              <Input value={p.t} onChange={e => { const list = [...f.processSteps]; list[idx].t = e.target.value; setF({ ...f, processSteps: list }) }} placeholder="Step Title" className="h-10 rounded-xl" />
              <Textarea value={p.d} onChange={e => { const list = [...f.processSteps]; list[idx].d = e.target.value; setF({ ...f, processSteps: list }) }} placeholder="Description" rows={2} className="rounded-xl" />
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <Button onClick={() => save(f)} className="bg-[#D71920] hover:bg-[#a5121a] rounded-xl"><Save className="h-4 w-4 mr-2" /> Save Process Steps</Button>
      </div>
    </div>
  )
}

const SEED_FAQS = [
  { q: "How do solar panels work, and what is the difference between On-Grid and Off-Grid systems?", a: "Solar panels convert direct sunlight into direct current (DC) electricity using photovoltaic (PV) cells. A solar inverter then converts this DC power into alternating current (AC) electricity to power your household appliances.\n\nOn-Grid (Grid-Tied) Systems: Connected directly to your local utility power grid. Excess power generated during the day is sent back to the grid for credits, and you draw from the grid when needed.\n\nOff-Grid Systems: Completely independent of the utility grid, using battery storage systems to store daytime energy for nighttime or emergency use." },
  { q: "Is my home suitable for solar panel installation?", a: "Most homes with an unshaded roof that receives 4–6 hours of direct sunlight daily are suitable for solar. Our engineers perform a free site assessment to confirm feasibility." },
  { q: "How do I calculate the right solar system for my electricity bill?", a: "The ideal system size is determined by your monthly electricity consumption (kWh), available roof space, and future energy needs." },
  { q: "Can I install solar panels without changing my existing electrical wiring?", a: "In most cases, yes. Our team evaluates your electrical system and makes only the necessary upgrades to ensure a safe installation." },
  { q: "What happens if I move to a new house?", a: "Your solar system is a permanent asset attached to your property. If you're relocating, our team can advise you on possible options." },
  { q: "What happens if one solar panel stops working?", a: "Modern solar systems are designed to continue operating even if one panel underperforms. Our service team can identify and replace faulty components if needed." },
  { q: "Can solar panels withstand heavy rain and strong winds?", a: "Yes. High-quality solar panels are designed to withstand harsh weather conditions, including heavy rain, strong winds, and high temperatures." },
  { q: "Will birds or animals damage my solar panels?", a: "Solar panels are durable, but birds may occasionally nest underneath them. Protective mesh and regular inspections help prevent such issues." },
  { q: "Can I expand my solar system in the future?", a: "Yes. If your electricity demand increases, many solar systems can be upgraded with additional panels, subject to available roof space and inverter capacity." },
  { q: "What is the best time of year to install solar panels?", a: "Solar panels can be installed throughout the year. Installing earlier allows you to start saving on electricity bills sooner." },
  { q: "Will solar panels affect my roof warranty?", a: "Professional installation is designed to minimize impact on your roof. We use appropriate mounting methods to protect the roof structure." },
  { q: "How much weight do solar panels add to my roof?", a: "A typical rooftop solar system adds only a moderate load, which most properly constructed roofs can support after structural assessment." },
  { q: "Can I monitor my solar system from my mobile phone?", a: "Yes. Many modern solar inverters include mobile apps that allow you to monitor power generation and system performance in real time." },
  { q: "What maintenance is required after installation?", a: "Routine cleaning, visual inspections, and occasional professional servicing help maintain optimal system efficiency." },
  { q: "Do solar panels need direct sunlight?", a: "Solar panels perform best in direct sunlight but can still generate electricity under indirect sunlight and cloudy conditions." },
  { q: "Can I install solar panels on a terrace instead of a roof?", a: "Yes. Solar mounting structures can be installed on terraces, provided there is adequate space and sunlight." },
  { q: "How much carbon emissions can solar panels reduce?", a: "A residential solar system can significantly reduce carbon emissions over its lifetime by replacing electricity generated from fossil fuels." },
  { q: "What certifications should I look for when choosing solar panels?", a: "Look for internationally recognized certifications and products that comply with Indian standards for quality, safety, and performance." },
  { q: "Will installing solar increase my property's value?", a: "Many buyers consider solar-powered homes more attractive because they offer lower electricity costs and improved energy efficiency." },
  { q: "Can solar panels be installed on commercial buildings?", a: "Yes. Commercial buildings, offices, factories, schools, hospitals, and warehouses can all benefit from solar installations." },
  { q: "How often should solar panels be cleaned?", a: "Cleaning every 3–6 months is generally recommended, depending on dust levels, pollution, and local weather conditions." },
  { q: "Is a site survey necessary before installation?", a: "Yes. A site survey helps determine roof strength, available space, shading, electrical infrastructure, and the best system design." },
  { q: "What should I check before choosing a solar installer?", a: "Consider the company's experience, certifications, customer reviews, warranty support, product quality, and after-sales service." },
  { q: "How do I know if my inverter is working properly?", a: "Most modern inverters display system status and generation data on a screen or mobile app, making it easy to monitor performance." },
  { q: "Can solar panels help during rising electricity prices?", a: "Yes. By generating your own electricity, solar reduces dependence on grid power and helps protect against future tariff increases." },
  { q: "Is solar energy environmentally friendly?", a: "Yes. Solar energy is clean, renewable, and produces electricity without air pollution or greenhouse gas emissions during operation." },
  { q: "Can I install solar panels if my roof has partial shade?", a: "Yes, but shading can reduce performance. During the site survey, we assess shading and recommend the most efficient system layout." },
  { q: "Do I need permission before installing rooftop solar?", a: "Depending on your location and system type, approvals and utility permissions may be required. IVR Energy assists with the necessary documentation." },
  { q: "What happens after I submit an enquiry?", a: "Our team contacts you, schedules a site visit, assesses your energy needs, provides a customized proposal, and guides you through every step until installation." },
  { q: "How do I maintain maximum solar efficiency?", a: "Keep the panels clean, avoid shading, monitor system performance regularly, and schedule periodic professional inspections." },
  { q: "Are solar panels worth it?", a: "Yes. Solar panels can significantly reduce electricity bills over time and offer an excellent long-term return on investment. Most systems pay for themselves through energy savings while also increasing property value." },
  { q: "How much does a solar panel system cost?", a: "The cost depends on the system size, panel brand, inverter, roof type, and installation requirements. Contact IVR Energy for a free customized quotation based on your electricity consumption." },
  { q: "How many solar panels do I need?", a: "The number of panels depends on your monthly electricity usage and the wattage of the panels. A site assessment helps determine the ideal system size." },
  { q: "How much electricity can solar panels generate?", a: "A well-designed solar system can generate enough electricity to meet a large portion of your daily energy needs. Actual output depends on sunlight, location, weather, and system capacity." },
  { q: "How long do solar panels last, and what maintenance do they require?", a: "The industry standard lifespan for solar panels is 25 to 30 years, and they will continue producing energy even beyond that point. They are incredibly low-maintenance, generally only requiring occasional cleaning to remove dust and debris so sunlight can reach the cells. However, secondary components like the solar inverter or battery storage may need to be replaced after 10 to 15 years." },
  { q: "Do solar panels work at night?", a: "No. Solar panels generate electricity only when sunlight is available. For nighttime power, you can use battery storage or electricity from the grid." },
  { q: "Do solar panels still generate electricity on cloudy or rainy days?", a: "Yes. Solar panels can use both direct and indirect sunlight to generate energy. While they are most efficient in direct sunlight, they will continue to produce power during overcast weather, typically operating at 10% to 25% of their normal output depending on cloud cover." },
  { q: "Will my solar panels provide electricity during a neighborhood power outage?", a: "Standard Grid-Tied Systems: No. For safety reasons, grid-tied solar inverters automatically shut down during a utility power outage to prevent sending electricity back into power lines while technicians restore service.\n\nHybrid or Battery-Backed Systems: Yes. If you install a hybrid inverter paired with battery backup, your system will isolate itself from the grid and continue powering your essential home appliances during an outage." },
  { q: "How much space is required for a rooftop solar system?", a: "As a general rule, a 1-kilowatt (kW) solar power system requires roughly 90 to 100 square feet (around 10 square meters) of shadow-free roof area. A typical 3 kW to 5 kW residential system requires between 300 and 500 square feet of clean area. Your installation partner will calculate the exact space and system size needed." },
  { q: "Can solar panels reduce my electricity bill to zero?", a: "Depending on your electricity consumption, system size, and net metering policy, your electricity bill can be reduced substantially and, in some cases, nearly eliminated." },
  { q: "What happens if my solar panels produce more energy than my home uses?", a: "If your system is tied to the local utility grid and your region supports net metering, excess electricity is sent back into the grid. Your utility provider will credit your account for this surplus power, which further reduces your overall electricity bill." },
  { q: "Is solar energy safe for my home?", a: "Yes. Professionally installed solar systems are designed to meet safety standards and are safe for residential, commercial, and industrial use." },
  { q: "Are solar panels waterproof?", a: "Yes. Solar panels are built to withstand rain, dust, humidity, and various weather conditions." },
  { q: "Do I need to replace or reinforce my roof before installing a solar system?", a: "Because solar panels are designed to last for 25 years or more, your roof should be structurally stable enough to support them for that duration. Unless your roof already has damage or is nearing the end of its lifespan, you likely do not need to replace it, but performing any necessary repairs beforehand is highly recommended." },
  { q: "What is the best direction for solar panels?", a: "In India, solar panels generally perform best when facing south with the appropriate tilt angle for maximum sunlight exposure." },
  { q: "How long does solar installation take?", a: "Residential installations are typically completed within 1–3 days, depending on system size and site conditions." },
  { q: "What is Net Metering, and how does it lower my electricity bill?", a: "Net metering is a billing mechanism that credits solar system owners for the excess electricity they add to the grid. When your solar panels produce more electricity than your home consumes during peak daytime hours, the surplus is exported to the local utility grid. Your electricity meter records this export, and your utility company credits your account—significantly reducing your net monthly electricity bill." },
  { q: "Are there government subsidies, tax credits, or financial incentives available?", a: "Yes. Many national and local government programs offer financial assistance to encourage the adoption of rooftop solar. Residential homeowners can often take advantage of direct capital subsidies (such as PM Surya Ghar Scheme), clean energy tax credits, or low-interest financing programs that significantly reduce the upfront installation cost." },
  { q: "Which is better: On-Grid or Hybrid Solar?", a: "An on-grid system is ideal for reducing electricity bills, while a hybrid system provides both bill savings and battery backup during power outages." },
  { q: "What size solar system do I need?", a: "The right system size depends on your monthly electricity consumption, available roof space, and future energy needs." },
  { q: "Will solar panels run high-power appliances like my air conditioner?", a: "Absolutely. Before installation, a professional will analyze your home's total electrical load to design a system capable of meeting your specific energy demands, including running heavy appliances like air conditioners." },
  { q: "Will solar panels damage my roof?", a: "No. When installed by experienced professionals, solar panels protect the roof rather than damage it." },
  { q: "Which solar panel brand is the best?", a: "The best choice depends on your budget, efficiency requirements, warranty, and installation goals. IVR Energy recommends only trusted, high-quality brands." },
  { q: "Why should I choose IVR Energy?", a: "IVR Energy provides customized solar solutions, premium products, expert installation, competitive pricing, comprehensive warranties, and dependable after-sales support to ensure maximum customer satisfaction." },
]

function FaqsSectionEditor({ content, save }) {
  const [filterSearch, setFilterSearch] = useState('')
  const [f, setF] = useState({
    faqsEyebrow: content.faqsEyebrow || 'FAQs',
    faqsTitle: content.faqsTitle || 'Frequently Asked <span class="text-gradient-red">Questions</span>',
    faqsSubtitle: content.faqsSubtitle || 'Everything you wanted to know about going solar, subsidies, approvals, and O&M.',
    faqsList: (content.faqsList && content.faqsList.length > 0)
      ? content.faqsList
      : ((content.faqs && content.faqs.length > 0) ? content.faqs : SEED_FAQS)
  })

  const visibleFaqs = f.faqsList.map((faq, originalIndex) => ({ faq, originalIndex })).filter(({ faq }) => {
    if (!filterSearch) return true
    const s = filterSearch.toLowerCase()
    return (faq.q || '').toLowerCase().includes(s) || (faq.a || '').toLowerCase().includes(s)
  })

  return (
    <div className="rounded-2xl bg-white p-6 shadow-soft border border-neutral-100 space-y-6">
      <div className="text-sm font-bold text-neutral-900 border-b pb-2 flex items-center justify-between">
        <span>FAQs Page & Homepage Section Editor</span>
        <span className="text-xs text-[#D71920] font-semibold">Changes update /faqs in real-time</span>
      </div>

      <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 space-y-4">
        <FieldRow label="Section Eyebrow"><Input value={f.faqsEyebrow} onChange={e => setF({ ...f, faqsEyebrow: e.target.value })} className="h-11 rounded-xl bg-white" /></FieldRow>
        <FieldRow label="Title (HTML supported)"><Textarea value={f.faqsTitle} onChange={e => setF({ ...f, faqsTitle: e.target.value })} rows={2} className="rounded-xl bg-white font-mono text-xs" /></FieldRow>
        <FieldRow label="Subtitle"><Textarea value={f.faqsSubtitle} onChange={e => setF({ ...f, faqsSubtitle: e.target.value })} rows={2} className="rounded-xl bg-white" /></FieldRow>
      </div>

      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider whitespace-nowrap">
              Questions ({f.faqsList.length} Total)
            </label>
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
              <Input
                placeholder="Filter FAQs..."
                value={filterSearch}
                onChange={e => setFilterSearch(e.target.value)}
                className="pl-9 h-9 rounded-xl text-xs bg-neutral-50"
              />
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const newList = [{ q: 'New Question?', a: 'Answer text here...' }, ...f.faqsList]
              setF({ ...f, faqsList: newList })
              setFilterSearch('')
            }}
            className="rounded-xl bg-[#D71920] text-white hover:bg-[#a5121a] border-0 h-9"
          >
            <Plus className="h-4 w-4 mr-1" /> Add New FAQ
          </Button>
        </div>

        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
          {visibleFaqs.length === 0 ? (
            <div className="text-center py-8 bg-neutral-50 rounded-2xl border border-neutral-200 text-sm text-neutral-500">
              No FAQs match your search query "{filterSearch}".
            </div>
          ) : (
            visibleFaqs.map(({ faq, originalIndex }) => (
              <div key={originalIndex} className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200/80 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-[#D71920] bg-red-50 px-2.5 py-1 rounded-full border border-red-100">FAQ #{originalIndex + 1}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (confirm('Delete this question?')) {
                        const list = f.faqsList.filter((_, i) => i !== originalIndex)
                        setF({ ...f, faqsList: list })
                      }
                    }}
                    className="rounded-xl text-red-600 border-red-200 hover:bg-red-50 h-8 text-xs"
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                  </Button>
                </div>
                <Input
                  value={faq.q}
                  onChange={e => {
                    const list = [...f.faqsList]
                    list[originalIndex].q = e.target.value
                    setF({ ...f, faqsList: list })
                  }}
                  placeholder="Question"
                  className="h-11 rounded-xl font-semibold bg-white text-neutral-900"
                />
                <Textarea
                  value={faq.a}
                  onChange={e => {
                    const list = [...f.faqsList]
                    list[originalIndex].a = e.target.value
                    setF({ ...f, faqsList: list })
                  }}
                  placeholder="Answer"
                  rows={3}
                  className="rounded-xl bg-white text-neutral-700 text-sm"
                />
              </div>
            ))
          )}
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <Button onClick={() => save(f)} className="bg-[#D71920] hover:bg-[#a5121a] rounded-xl text-white font-bold h-12 px-6"><Save className="h-4 w-4 mr-2" /> Save All FAQs</Button>
      </div>
    </div>
  )
}

function VisibilityEditor({ content, save }) {
  const defaultVis = {
    hero: true,
    subsidy: true,
    about: true,
    services: true,
    solutions: true,
    whyUs: true,
    calc: true,
    projects: true,
    testimonials: true,
    clients: true,
    process: true,
    faqs: true,
    contact: true
  }

  const [vis, setVis] = useState({ ...defaultVis, ...(content.sectionVisibility || {}) })

  const sections = [
    { key: 'hero', name: 'Hero Section' },
    { key: 'subsidy', name: 'PM Surya Ghar Subsidy Banner' },
    { key: 'about', name: 'About IVR Energy Section' },
    { key: 'services', name: 'Services Section' },
    { key: 'solutions', name: 'Solutions (Building Types) Section' },
    { key: 'whyUs', name: 'Why Choose Us Section' },
    { key: 'calc', name: 'Savings Calculator Section' },
    { key: 'projects', name: 'Featured Projects Portfolio Section' },
    { key: 'testimonials', name: 'Testimonials / Reviews Section' },
    { key: 'clients', name: 'Client & Partner Logos Section' },
    { key: 'process', name: 'Execution Process Section' },
    { key: 'faqs', name: 'Frequently Asked Questions (FAQs) Section' },
    { key: 'contact', name: 'Contact Form & Map Section' },
  ]

  const toggle = (key) => setVis(prev => ({ ...prev, [key]: !prev[key] }))

  return (
    <div className="rounded-2xl bg-white p-6 shadow-soft border border-neutral-100 space-y-6">
      <div>
        <h3 className="font-bold text-neutral-900 text-lg">Home Page Section Visibility Toggles</h3>
        <p className="text-sm text-neutral-500 mt-1">Enable or disable individual sections of the public home page (`/`) in real time.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map(s => {
          const enabled = vis[s.key] !== false
          return (
            <div key={s.key} className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${enabled ? 'bg-green-50/50 border-green-200' : 'bg-neutral-50 border-neutral-200 opacity-60'}`}>
              <div>
                <div className="font-semibold text-sm text-neutral-900">{s.name}</div>
                <div className="text-xs text-neutral-500">{enabled ? 'Visible on homepage' : 'Hidden from homepage'}</div>
              </div>
              <button
                type="button"
                onClick={() => toggle(s.key)}
                className={`w-12 h-6 rounded-full transition-colors relative p-1 cursor-pointer ${enabled ? 'bg-green-600' : 'bg-neutral-300'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          )
        })}
      </div>

      <div className="pt-4 flex justify-end">
        <Button onClick={() => save({ sectionVisibility: vis })} className="bg-[#D71920] hover:bg-[#a5121a] rounded-xl"><Save className="h-4 w-4 mr-2" /> Save Section Visibility</Button>
      </div>
    </div>
  )
}

function ProjectsTextEditor({ content, save }) {
  const [f, setF] = useState({
    projectsEyebrow: content.projectsEyebrow || 'Featured EPC Projects',
    projectsTitle: content.projectsTitle || 'From <span class="text-gradient-red" >1 KW</span> rooftops to <span class="text-gradient-red">10 MW</span> plants',
    projectsSubtitle: content.projectsSubtitle || 'A portfolio built across Chennai, Coimbatore, Delhi and beyond" spanning industries, campuses and homes.',
  })
  return (
    <div className="rounded-2xl bg-white p-6 shadow-soft border border-neutral-100 space-y-5" >
      <FieldRow label="Section eyebrow" ><Input value={f.projectsEyebrow} onChange={e => setF({ ...f, projectsEyebrow: e.target.value })} className="h-11 rounded-xl"  /></FieldRow>
      <FieldRow label="Title (HTML supported)"  hint='Use &lt;span class="text-gradient-red" &gt;text&lt;/span&gt; for red gradient words'>
        <Textarea value={f.projectsTitle} onChange={e => setF({ ...f, projectsTitle: e.target.value })} rows={2} className="rounded-xl"  />
      </FieldRow>
      <FieldRow label="Subtitle" ><Textarea value={f.projectsSubtitle} onChange={e => setF({ ...f, projectsSubtitle: e.target.value })} rows={2} className="rounded-xl"  /></FieldRow>
      <div className="pt-2 flex justify-end" >
        <Button onClick={() => save(f)} className="bg-[#D71920] hover:bg-[#a5121a] rounded-xl" ><Save className="h-4 w-4 mr-2"  /> Save Projects Text</Button>
      </div>
    </div>
  )
}

function CalculatorEditor({ content, save }) {
  const calc = content.calculator || {}
  const [f, setF] = useState({
    billPerKw: calc.billPerKw || 2000,
    costPerKw: calc.costPerKw || 70000,
    tariff: calc.tariff || 8,
    unitsPerKwYear: calc.unitsPerKwYear || 1400,
    lifespan: calc.lifespan || 25,
    co2PerKwh: calc.co2PerKwh || 0.82,
  })
  return (
    <div className="rounded-2xl bg-white p-6 shadow-soft border border-neutral-100 space-y-5" >
      <div className="text-sm text-neutral-600" >Adjust the formulas used by the on-site savings calculator. Preview values apply instantly on public homepage.</div>
      <div className="grid md:grid-cols-2 gap-5" >
        <FieldRow label="Bill per kW (₹)"  hint="Every ₹X of monthly bill = 1 kW recommendation" >
          <Input value={f.billPerKw} onChange={e => setF({ ...f, billPerKw: e.target.value.replace(/[^0-9.]/g, '') })} className="h-11 rounded-xl"  />
        </FieldRow>
        <FieldRow label="System cost per kW (₹)"  hint="Turnkey installation cost per kW" >
          <Input value={f.costPerKw} onChange={e => setF({ ...f, costPerKw: e.target.value.replace(/[^0-9.]/g, '') })} className="h-11 rounded-xl"  />
        </FieldRow>
        <FieldRow label="EB tariff (₹/unit)"  hint="Used to calculate annual savings" >
          <Input value={f.tariff} onChange={e => setF({ ...f, tariff: e.target.value.replace(/[^0-9.]/g, '') })} className="h-11 rounded-xl"  />
        </FieldRow>
        <FieldRow label="Units per kW per year"  hint="Typical: 1400 in TN, 1500 in Rajasthan" >
          <Input value={f.unitsPerKwYear} onChange={e => setF({ ...f, unitsPerKwYear: e.target.value.replace(/[^0-9.]/g, '') })} className="h-11 rounded-xl"  />
        </FieldRow>
        <FieldRow label="System lifespan (years)" ><Input value={f.lifespan} onChange={e => setF({ ...f, lifespan: e.target.value.replace(/[^0-9.]/g, '') })} className="h-11 rounded-xl"  /></FieldRow>
        <FieldRow label="CO₂ per kWh (kg)"  hint="India grid average: 0.82" ><Input value={f.co2PerKwh} onChange={e => setF({ ...f, co2PerKwh: e.target.value.replace(/[^0-9.]/g, '') })} className="h-11 rounded-xl"  /></FieldRow>
      </div>
      <div className="pt-2 flex justify-end" >
        <Button onClick={() => save({ calculator: {
          billPerKw: Number(f.billPerKw), costPerKw: Number(f.costPerKw), tariff: Number(f.tariff),
          unitsPerKwYear: Number(f.unitsPerKwYear), lifespan: Number(f.lifespan), co2PerKwh: Number(f.co2PerKwh),
        } })} className="bg-[#D71920] hover:bg-[#a5121a] rounded-xl" ><Save className="h-4 w-4 mr-2"/> Save Calculator</Button>
      </div>
    </div>
  )
}

function ContactInfoEditor({ content, save }) {
  const c = content.contact || {}
  const rawEmail = c.email || ''
  const emailParts = rawEmail.includes(',') ? rawEmail.split(',').map(s => s.trim()) : [rawEmail, c.secondaryEmail || '']

  const [f, setF] = useState({
    phone: c.phone || '+91 90477 77936',
    phoneRaw: c.phoneRaw || '919047777936',
    email: emailParts[0] || 'ivrenergysolutions@gmail.com',
    secondaryEmail: emailParts[1] || c.secondaryEmail || 'info@ivrenergy.com',
    whatsapp: c.whatsapp || '919047777936',
    address: c.address || '3rd Floor, Door No - 1, Plot No - A, Manasarovar Nagar, Gerugambakkam, Chennai - 600122.',
    hours: c.hours || 'Mon - Sat, 9:30 AM - 7:30 PM',
    mapLat: c.mapLat || '13.013944',
    mapLng: c.mapLng || '80.136667',
    instagram: c.instagram || 'https://www.instagram.com/ivrenergy/',
    linkedin: c.linkedin || 'https://www.linkedin.com/company/ivr-energy',
    facebook: c.facebook || '',
    youtube: c.youtube || '',
    gstNumber: c.gstNumber || '33BTTPR9122F1ZB',
  })
  return (
    <div className="rounded-2xl bg-white p-6 shadow-soft border border-neutral-100 space-y-5">
      <div className="text-sm text-neutral-600">Update the contact details shown on the site. Displayed in the Contact section, Footer, top nav phone link, floating WhatsApp button, and social links.</div>
      <div className="grid md:grid-cols-2 gap-4">
        <FieldRow label="Display phone number" hint="Shown to visitors (formatted)"><Input value={f.phone} onChange={e => setF({ ...f, phone: e.target.value })} className="h-11 rounded-xl" /></FieldRow>
        <FieldRow label="Phone (raw digits)" hint="For tel: links, e.g. 919047777936"><Input value={f.phoneRaw} onChange={e => setF({ ...f, phoneRaw: e.target.value.replace(/\D/g, '') })} className="h-11 rounded-xl" /></FieldRow>
        <FieldRow label="Primary Email Address" hint="e.g. ivrengysolutions@gmail.com"><Input value={f.email} onChange={e => setF({ ...f, email: e.target.value })} placeholder="ivrenergysolutions@gmail.com" className="h-11 rounded-xl" /></FieldRow>
        <FieldRow label="Secondary Email Address" hint="e.g. info@ivrenergy.com"><Input value={f.secondaryEmail} onChange={e => setF({ ...f, secondaryEmail: e.target.value })} placeholder="info@ivrenergy.com" className="h-11 rounded-xl" /></FieldRow>
        <FieldRow label="WhatsApp number (raw digits)" hint="For wa.me/ links"><Input value={f.whatsapp} onChange={e => setF({ ...f, whatsapp: e.target.value.replace(/\D/g, '') })} className="h-11 rounded-xl" /></FieldRow>
        <FieldRow label="Instagram Profile URL" hint="Displayed under Connect in Footer"><Input value={f.instagram} onChange={e => setF({ ...f, instagram: e.target.value })} placeholder="https://www.instagram.com/ivrenergy/" className="h-11 rounded-xl" /></FieldRow>
        <FieldRow label="LinkedIn Company/Profile URL" hint="Displayed under Connect in Footer"><Input value={f.linkedin} onChange={e => setF({ ...f, linkedin: e.target.value })} placeholder="https://www.linkedin.com/company/ivr-energy" className="h-11 rounded-xl" /></FieldRow>
        <FieldRow label="Facebook Page URL" hint="Optional social icon in Footer"><Input value={f.facebook} onChange={e => setF({ ...f, facebook: e.target.value })} placeholder="https://www.facebook.com/..." className="h-11 rounded-xl" /></FieldRow>
        <FieldRow label="YouTube Channel URL" hint="Optional social icon in Footer"><Input value={f.youtube} onChange={e => setF({ ...f, youtube: e.target.value })} placeholder="https://www.youtube.com/..." className="h-11 rounded-xl" /></FieldRow>
        <FieldRow label="GST Registration Number" hint="Displayed under Connect in Footer"><Input value={f.gstNumber} onChange={e => setF({ ...f, gstNumber: e.target.value })} placeholder="33BTTPR9122F1ZB" className="h-11 rounded-xl font-mono text-sm" /></FieldRow>
        <FieldRow label="Business hours"><Input value={f.hours} onChange={e => setF({ ...f, hours: e.target.value })} className="h-11 rounded-xl" /></FieldRow>
        <div className="grid grid-cols-2 gap-3">
          <FieldRow label="Map latitude"><Input value={f.mapLat} onChange={e => setF({ ...f, mapLat: e.target.value })} className="h-11 rounded-xl" /></FieldRow>
          <FieldRow label="Map longitude"><Input value={f.mapLng} onChange={e => setF({ ...f, mapLng: e.target.value })} className="h-11 rounded-xl" /></FieldRow>
        </div>
        <div className="md:col-span-2">
          <FieldRow label="Office address"><Textarea value={f.address} onChange={e => setF({ ...f, address: e.target.value })} rows={2} className="rounded-xl" /></FieldRow>
        </div>
      </div>
      <div className="pt-2 flex justify-end">
        <Button onClick={() => save({ contact: f })} className="bg-[#D71920] hover:bg-[#a5121a] rounded-xl"><Save className="h-4 w-4 mr-2"/> Save Contact & Social Links</Button>
      </div>
    </div>
  )
}

const DEFAULT_TERMS_HTML = `<section>
  <h2 class="text-xl md:text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
    <span class="w-8 h-8 rounded-lg bg-red-50 text-[#D71920] font-extrabold text-sm flex items-center justify-center border border-red-100">1</span>
    Acceptance of Terms
  </h2>
  <p>
    By accessing our website (<strong>ivrenergysolutions.com</strong>), requesting a quote, or entering into an agreement with <strong>IVR Energy</strong> for solar Engineering, Procurement, and Construction (EPC) services, you agree to be bound by these Terms & Conditions. If you disagree with any part of these terms, please do not use our services.
  </p>
</section>

<section class="pt-6 border-t border-neutral-100">
  <h2 class="text-xl md:text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
    <span class="w-8 h-8 rounded-lg bg-red-50 text-[#D71920] font-extrabold text-sm flex items-center justify-center border border-red-100">2</span>
    Scope of Solar EPC Services
  </h2>
  <p class="mb-3">
    IVR Energy provides turnkey solar energy solutions across Residential, Commercial, and Industrial sectors, including:
  </p>
  <ul class="list-disc pl-6 space-y-2 text-neutral-600">
    <li>Site shadow analysis and structural feasibility studies</li>
    <li>Design, engineering, and equipment supply (Tier-1 PV modules & inverters)</li>
    <li>Erection, testing, and commissioning of rooftop or ground-mounted solar systems</li>
    <li>Assistance with DISCOM net-metering approvals and government solar subsidy processing</li>
    <li>Operations & Maintenance (O&M) contracts as specified in individual agreements</li>
  </ul>
</section>

<section class="pt-6 border-t border-neutral-100">
  <h2 class="text-xl md:text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
    <span class="w-8 h-8 rounded-lg bg-red-50 text-[#D71920] font-extrabold text-sm flex items-center justify-center border border-red-100">3</span>
    Estimates & Pricing
  </h2>
  <p class="mb-3">
    All financial estimates generated on our savings calculator or initial quotations are indicative. Final system sizing and pricing depend on detailed technical site surveys.
  </p>
  <p>
    Government subsidy assistance is subject to eligibility guidelines published by the Ministry of New and Renewable Energy (MNRE) and local DISCOMs (e.g., TANGEDCO). IVR Energy facilitates filing and coordination but is not responsible for delays caused by DISCOM portal downtime or government disbursal schedules.
  </p>
</section>

<section class="pt-6 border-t border-neutral-100">
  <h2 class="text-xl md:text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
    <span class="w-8 h-8 rounded-lg bg-red-50 text-[#D71920] font-extrabold text-sm flex items-center justify-center border border-red-100">4</span>
    Customer Responsibilities
  </h2>
  <p class="mb-3">
    The customer agrees to:
  </p>
  <ul class="list-disc pl-6 space-y-2 text-neutral-600">
    <li>Provide clear, uninhibited access to the rooftop or installation site for installation and testing</li>
    <li>Ensure structural stability of the installation area to support solar mounting structures</li>
    <li>Provide necessary documentation (electricity bills, property proof, identity documents) required for net metering and subsidy applications</li>
    <li>Maintain safe working conditions during site execution</li>
  </ul>
</section>

<section class="pt-6 border-t border-neutral-100">
  <h2 class="text-xl md:text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
    <span class="w-8 h-8 rounded-lg bg-red-50 text-[#D71920] font-extrabold text-sm flex items-center justify-center border border-red-100">5</span>
    Warranties & Guarantees
  </h2>
  <p class="mb-3">
    IVR Energy supplies equipment backed by leading original equipment manufacturer (OEM) warranties:
  </p>
  <ul class="list-disc pl-6 space-y-2 text-neutral-600">
    <li><strong>Solar PV Modules:</strong> 10-Year product warranty and 25-Year performance output warranty (as per manufacturer terms).</li>
    <li><strong>Inverters:</strong> Standard 5 to 10-Year manufacturer warranty depending on model selected.</li>
    <li><strong>Workmanship:</strong> 1-Year workmanship warranty covering installation integrity by IVR Energy.</li>
  </ul>
</section>

<section class="pt-6 border-t border-neutral-100">
  <h2 class="text-xl md:text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
    <span class="w-8 h-8 rounded-lg bg-red-50 text-[#D71920] font-extrabold text-sm flex items-center justify-center border border-red-100">6</span>
    Limitation of Liability
  </h2>
  <p>
    IVR Energy shall not be held liable for indirect, incidental, or consequential damages resulting from power grid outages, extreme weather events, grid instability beyond specified tolerances, or unauthorized tampering with equipment by third parties.
  </p>
</section>

<section class="pt-6 border-t border-neutral-100">
  <h2 class="text-xl md:text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
    <span class="w-8 h-8 rounded-lg bg-red-50 text-[#D71920] font-extrabold text-sm flex items-center justify-center border border-red-100">7</span>
    Governing Law & Jurisdiction
  </h2>
  <p>
    These terms are governed by the laws of India. Any legal disputes or claims arising hereunder shall be subject to the exclusive jurisdiction of the competent courts in <strong>Chennai, Tamil Nadu, India</strong>.
  </p>
</section>`

const DEFAULT_PRIVACY_HTML = `<section>
  <h2 class="text-xl md:text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
    <span class="w-8 h-8 rounded-lg bg-red-50 text-[#D71920] font-extrabold text-sm flex items-center justify-center border border-red-100">1</span>
    Introduction
  </h2>
  <p>
    IVR Energy (OPC) Private Limited ("<strong>IVR Energy</strong>", "we", "our", or "us") respects your privacy. This Privacy Policy explains how we collect, use, disclose, and protect personal and technical information gathered when you visit <strong>ivrenergysolutions.com</strong>, request a quote, or use our solar installation services.
  </p>
</section>

<section class="pt-6 border-t border-neutral-100">
  <h2 class="text-xl md:text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
    <span class="w-8 h-8 rounded-lg bg-red-50 text-[#D71920] font-extrabold text-sm flex items-center justify-center border border-red-100">2</span>
    Information We Collect
  </h2>
  <p class="mb-3">
    We collect information that you voluntarily provide to us, including:
  </p>
  <ul class="list-disc pl-6 space-y-2 text-neutral-600">
    <li><strong>Contact Information:</strong> Name, phone number, email address, and site installation address.</li>
    <li><strong>Electricity Consumption Data:</strong> Average monthly electricity bill amount, unit consumption, phase details (single-phase / three-phase), and DISCOM connection number.</li>
    <li><strong>Technical Site Information:</strong> Rooftop area, shadow constraints, building type (residential, commercial, industrial).</li>
    <li><strong>Documents for Subsidy & Net Metering:</strong> Aadhar, PAN, electricity bill copies, and bank account details required for government PM Surya Ghar subsidy application processing.</li>
  </ul>
</section>

<section class="pt-6 border-t border-neutral-100">
  <h2 class="text-xl md:text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
    <span class="w-8 h-8 rounded-lg bg-red-50 text-[#D71920] font-extrabold text-sm flex items-center justify-center border border-red-100">3</span>
    How We Use Your Information
  </h2>
  <p class="mb-3">
    We use your information exclusively to provide high-quality solar engineering services, including:
  </p>
  <ul class="list-disc pl-6 space-y-2 text-neutral-600">
    <li>Generating accurate solar DPR proposals, system sizing, and financial payback estimates</li>
    <li>Filing official PM Surya Ghar subsidy applications on government portals</li>
    <li>Submitting net-metering applications with DISCOM nodal officers (e.g., TANGEDCO)</li>
    <li>Setting up cloud-based smart inverter monitoring accounts for your system</li>
    <li>Communicating project execution updates, O&M service alerts, and support responses</li>
  </ul>
</section>

<section class="pt-6 border-t border-neutral-100">
  <h2 class="text-xl md:text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
    <span class="w-8 h-8 rounded-lg bg-red-50 text-[#D71920] font-extrabold text-sm flex items-center justify-center border border-red-100">4</span>
    Information Sharing & Disclosure
  </h2>
  <p class="mb-3">
    We do <strong>not</strong> sell, rent, or trade your personal information to third-party marketing companies. We share information only with:
  </p>
  <ul class="list-disc pl-6 space-y-2 text-neutral-600">
    <li><strong>Government & Regulatory Nodal Agencies:</strong> MNRE, National Portal for PM Surya Ghar, and local electricity distribution companies (DISCOMs) for official net-metering & subsidy processing.</li>
    <li><strong>Financial Partners:</strong> Partner banks and Non-Banking Financial Companies (NBFCs) if you request solar loan assistance.</li>
    <li><strong>Authorized Service Engineers:</strong> Our field engineers strictly for conducting site surveys and installing your solar plant.</li>
  </ul>
</section>

<section class="pt-6 border-t border-neutral-100">
  <h2 class="text-xl md:text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
    <span class="w-8 h-8 rounded-lg bg-red-50 text-[#D71920] font-extrabold text-sm flex items-center justify-center border border-red-100">5</span>
    Data Security
  </h2>
  <p>
    We implement industry-standard administrative, technical, and physical security measures to safeguard your personal data against unauthorized access, loss, or disclosure. Cloud-based monitoring and database connections use encrypted SSL/TLS protocols.
  </p>
</section>

<section class="pt-6 border-t border-neutral-100">
  <h2 class="text-xl md:text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
    <span class="w-8 h-8 rounded-lg bg-red-50 text-[#D71920] font-extrabold text-sm flex items-center justify-center border border-red-100">6</span>
    Your Rights & Choices
  </h2>
  <p>
    You have the right to request access to the personal data we hold about you, request corrections, or opt out of non-essential promotional communications at any time by contacting our privacy officer.
  </p>
</section>

<section class="pt-6 border-t border-neutral-100">
  <h2 class="text-xl md:text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
    <span class="w-8 h-8 rounded-lg bg-red-50 text-[#D71920] font-extrabold text-sm flex items-center justify-center border border-red-100">7</span>
    Contact Us
  </h2>
  <p class="mb-2">
    If you have any questions or concerns regarding this Privacy Policy, please reach out to us:
  </p>
  <div class="bg-neutral-50 p-5 rounded-2xl border border-neutral-200 text-sm space-y-1.5">
    <p><strong>IVR Energy (OPC) Private Limited</strong></p>
    <p>3rd Floor, Door No. 1, Plot No. A, Manasarovar Nagar, Gerugambakkam, Chennai - 600122</p>
    <p>Email: ivrengersolutions@gmail.com | Phone: +91 90477 77936</p>
  </div>
</section>`

function LegalEditor({ content, save }) {
  const [f, setF] = useState({
    termsLastUpdated: content.termsLastUpdated || 'July 2026',
    termsText: content.termsText || DEFAULT_TERMS_HTML,
    privacyLastUpdated: content.privacyLastUpdated || 'July 2026',
    privacyText: content.privacyText || DEFAULT_PRIVACY_HTML,
  })

  return (
    <div className="rounded-2xl bg-white p-6 shadow-soft border border-neutral-100 space-y-8">
      <div>
        <div className="flex items-center justify-between mb-1">
          <div className="text-base font-bold text-neutral-900">Terms & Conditions Editor</div>
          <button
            type="button"
            onClick={() => setF({ ...f, termsText: DEFAULT_TERMS_HTML })}
            className="text-xs text-[#D71920] font-semibold hover:underline cursor-pointer"
          >
            Reset to Default HTML Template
          </button>
        </div>
        <div className="text-sm text-neutral-500 mb-4">Edit the terms, legal notices, and conditions shown on the /terms page. Standard HTML formatting supported.</div>
        <div className="space-y-4">
          <FieldRow label="Terms Last Updated Date">
            <Input value={f.termsLastUpdated} onChange={e => setF({ ...f, termsLastUpdated: e.target.value })} placeholder="e.g. July 2026" className="h-11 rounded-xl" />
          </FieldRow>
          <FieldRow label="Terms & Conditions Content (HTML Format)" hint="Editable HTML format. Rendered directly on /terms.">
            <Textarea value={f.termsText} onChange={e => setF({ ...f, termsText: e.target.value })} rows={14} placeholder="Enter customized Terms & Conditions HTML..." className="rounded-xl font-mono text-xs leading-relaxed" />
          </FieldRow>
        </div>
      </div>

      <hr className="border-neutral-200" />

      <div>
        <div className="flex items-center justify-between mb-1">
          <div className="text-base font-bold text-neutral-900">Privacy Policy Editor</div>
          <button
            type="button"
            onClick={() => setF({ ...f, privacyText: DEFAULT_PRIVACY_HTML })}
            className="text-xs text-[#D71920] font-semibold hover:underline cursor-pointer"
          >
            Reset to Default HTML Template
          </button>
        </div>
        <div className="text-sm text-neutral-500 mb-4">Edit the privacy policy and data collection terms shown on the /privacy page. Standard HTML formatting supported.</div>
        <div className="space-y-4">
          <FieldRow label="Privacy Last Updated Date">
            <Input value={f.privacyLastUpdated} onChange={e => setF({ ...f, privacyLastUpdated: e.target.value })} placeholder="e.g. July 2026" className="h-11 rounded-xl" />
          </FieldRow>
          <FieldRow label="Privacy Policy Content (HTML Format)" hint="Editable HTML format. Rendered directly on /privacy.">
            <Textarea value={f.privacyText} onChange={e => setF({ ...f, privacyText: e.target.value })} rows={14} placeholder="Enter customized Privacy Policy HTML..." className="rounded-xl font-mono text-xs leading-relaxed" />
          </FieldRow>
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <Button onClick={() => save(f)} className="bg-[#D71920] hover:bg-[#a5121a] rounded-xl"><Save className="h-4 w-4 mr-2" /> Save Legal Content</Button>
      </div>
    </div>
  )
}

function ImagesEditor({ content, uploadFor, uploadingKey, save }) {
  const sections = [
    { key: 'heroImage', title: 'Hero Background', defaultUrl: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=1200&q=80', aspect: 'aspect-video' },
    { key: 'aboutImage', title: 'About Section', defaultUrl: 'https://images.unsplash.com/photo-1668097613572-40b7c11c8727?w=800&q=80', aspect: 'aspect-[4/5]' },
    { key: 'residentialImage', title: 'Solutions"Residential', defaultUrl: 'https://images.unsplash.com/flagged/photo-1566838616631-f2618f74a6a2?w=800&q=80', aspect: 'aspect-video' },
    { key: 'commercialImage', title: 'Solutions"Commercial', defaultUrl: 'https://images.unsplash.com/photo-1726776230760-ae81dc9d4e55?w=800&q=80', aspect: 'aspect-video' },
    { key: 'industrialImage', title: 'Solutions" Industrial', defaultUrl: 'https://images.unsplash.com/photo-1642950863398-1fc3600a5313?w=800&q=80', aspect: 'aspect-video' },
  ]
  return (
    <div className="grid md:grid-cols-2 gap-5" >
      {sections.map(s => {
        const current = content[s.key] || ''
        const isDefault = !current
        const displayUrl = current || s.defaultUrl
        return (
          <div key={s.key} className="rounded-2xl bg-white border border-neutral-100 p-5 shadow-soft" >
            <div className="flex items-start justify-between mb-3" >
              <div className="font-bold text-neutral-900" >{s.title}</div>
              <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full ${isDefault ? 'bg-neutral-100 text-neutral-500' : 'bg-green-100 text-green-700'}`}>{isDefault ? 'Default' : 'Custom'}</span>
            </div>
            <div className={`relative rounded-xl overflow-hidden bg-neutral-100 ${s.aspect}`}>
              <img src={displayUrl} alt={s.title} className="w-full h-full object-cover"  />
              {uploadingKey === s.key && <div className="absolute inset-0 bg-black/60 flex items-center justify-center" ><Loader2 className="h-8 w-8 text-white animate-spin"  /></div>}
            </div>
            <div className="flex gap-2 mt-3" >
              <label className="cursor-pointer flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#D71920] hover:bg-[#a5121a] text-white text-sm font-semibold transition-colors" >
                <Upload className="h-4 w-4"  /> {uploadingKey === s.key ? 'Uploading...' : 'Upload New'}
                <input type="file"  accept="image/*"  className="hidden"  disabled={uploadingKey === s.key} onChange={e => { uploadFor(s.key, e.target.files?.[0]); e.target.value = '' }} />
              </label>
              {!isDefault && <Button onClick={() => save({ [s.key]: '' })} variant="outline"  className="rounded-xl" >Reset</Button>}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// -------- Reviews Manager --------
function Reviews({ token }) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)

  async function load() {
    setLoading(true)
    const r = await fetch('/api/admin/reviews', { headers: { Authorization: `Bearer ${token}` } })
    const j = await r.json()
    setReviews(j.reviews || [])
    setLoading(false)
  }
  useEffect(() => { load() /* eslint-disable-next-line */ }, [])

  async function save(rv) {
    const isNew = !rv.id
    const r = await fetch('/api/admin/reviews', { method: isNew ? 'POST' : 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(rv) })
    const j = await r.json()
    if (j.success) { toast.success(isNew ? 'Review added' : 'Review updated'); setEditing(null); load() }
    else toast.error(j.error || 'Save failed')
  }
  async function del(id) {
    if (!confirm('Delete this review?')) return
    await fetch(`/api/admin/reviews?id=${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    toast.success('Deleted'); load()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6" >
        <div className="text-sm text-neutral-600" >Manage customer testimonials shown on the public website. If empty, seed reviews from the code will be used.</div>
        <Button onClick={() => setEditing({ name: '', role: '', rating: 5, text: '', order: 999 })} className="bg-[#D71920] hover:bg-[#a5121a] rounded-xl" ><Plus className="h-4 w-4 mr-2"  /> Add Review</Button>
      </div>
      {loading ? <div className="p-12 flex justify-center" ><Loader2 className="h-8 w-8 animate-spin text-[#D71920]"  /></div> : (
        reviews.length === 0 ? <div className="rounded-2xl bg-white p-12 text-center border border-neutral-100" ><div className="text-neutral-500" >No reviews in the database yet.</div><div className="text-xs text-neutral-400 mt-1" >The 6 default reviews from the code will be shown on the site.</div></div> : (
          <div className="grid md:grid-cols-2 gap-4" >
            {reviews.map(rv => (
              <div key={rv.id} className="rounded-2xl bg-white p-5 border border-neutral-100 shadow-soft" >
                <div className="flex justify-between items-start" >
                  <div>
                    <div className="flex gap-0.5" >{Array.from({ length: rv.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-[#D71920] text-[#D71920]"  />)}</div>
                    <div className="mt-3 font-semibold text-neutral-900" >{rv.name}</div>
                    <div className="text-xs text-neutral-500" >{rv.role}</div>
                  </div>
                  <div className="flex gap-1" >
                    <button onClick={() => setEditing(rv)} className="w-8 h-8 rounded-lg bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center" ><Edit3 className="h-4 w-4"  /></button>
                    <button onClick={() => del(rv.id)} className="w-8 h-8 rounded-lg bg-red-100 text-red-700 hover:bg-red-500 hover:text-white flex items-center justify-center" ><Trash2 className="h-4 w-4"  /></button>
                  </div>
                </div>
                <p className="mt-3 text-sm text-neutral-700 line-clamp-3" >"{rv.text}"</p>
              </div>
            ))}
          </div>
        )
      )}
      <AnimatePresence>{editing && <ReviewEditor review={editing} onSave={save} onClose={() => setEditing(null)} />}</AnimatePresence>
    </div>
  )
}

function ReviewEditor({ review, onSave, onClose }) {
  const [r, setR] = useState(review)
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur flex items-center justify-center p-4 overflow-y-auto"  onClick={onClose}>
      <motion.form initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }} onClick={e => e.stopPropagation()} onSubmit={e => { e.preventDefault(); if (!r.name || !r.text) { toast.error('Name and text required'); return } onSave({ ...r, rating: Number(r.rating), order: Number(r.order) }) }} className="bg-white rounded-3xl w-full max-w-lg shadow-2xl" >
        <div className="p-6 border-b flex items-center justify-between" >
          <div className="text-xl font-bold" >{r.id ? 'Edit Review' : 'Add New Review'}</div>
          <button type="button"  onClick={onClose} className="w-9 h-9 rounded-full hover:bg-neutral-100 flex items-center justify-center" ><X className="h-5 w-5"  /></button>
        </div>
        <div className="p-6 space-y-4" >
          <FieldRow label="Customer name" ><Input value={r.name} onChange={e => setR({ ...r, name: e.target.value })} className="h-11 rounded-xl"  /></FieldRow>
          <FieldRow label="Role / location" ><Input value={r.role} onChange={e => setR({ ...r, role: e.target.value })} placeholder="Homeowner · 5 kW"  className="h-11 rounded-xl"  /></FieldRow>
          <FieldRow label="Rating (1 - 5)" ><Input value={r.rating} onChange={e => setR({ ...r, rating: e.target.value.replace(/[^1-5]/g, '') })} placeholder="5"  className="h-11 rounded-xl max-w-[100px]"  /></FieldRow>
          <FieldRow label="Review text" ><Textarea value={r.text} onChange={e => setR({ ...r, text: e.target.value })} rows={5} className="rounded-xl"  /></FieldRow>
          <FieldRow label="Display order" ><Input value={r.order} onChange={e => setR({ ...r, order: e.target.value.replace(/[^0-9]/g, '') })} placeholder="1 = first"  className="h-11 rounded-xl max-w-[150px]"  /></FieldRow>
        </div>
        <div className="p-6 border-t flex justify-end gap-3 bg-neutral-50 rounded-b-3xl" >
          <Button type="button"  variant="outline"  onClick={onClose} className="rounded-xl" >Cancel</Button>
          <Button type="submit"  className="bg-[#D71920] hover:bg-[#a5121a] rounded-xl" ><Save className="h-4 w-4 mr-2"  /> Save Review</Button>
        </div>
      </motion.form>
    </motion.div>
  )
}

// -------- Shell --------
function AdminShell({ user, token, onLogout }) {
  const [tab, setTab] = useState('dashboard')
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'leads', label: 'Leads', icon: Users },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'content', label: 'Site Content', icon: ImageIcon },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare },
  ]
  return (
    <div className="min-h-screen bg-neutral-50" >
      {/* Top nav */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-40" >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16" >
          <a href="/"  className="flex items-center gap-3" >
            <img src="/ivr-logo.webp"  alt="IVR Energy"  className="h-12 md:h-14 w-auto object-contain"  />
            <div className="text-[10px] uppercase tracking-widest text-neutral-500 border-l border-neutral-200 pl-3" >Admin</div>
          </a>
          <div className="flex items-center gap-3" >
            <div className="hidden md:flex items-center gap-2 text-sm text-neutral-600 px-3 py-1.5 rounded-full bg-neutral-100" ><Sparkles className="h-3.5 w-3.5 text-[#D71920]"  /> {user.username}</div>
            <Button onClick={onLogout} variant="outline"  size="sm"  className="rounded-full" ><LogOut className="h-4 w-4 mr-1.5"  /> Logout</Button>
          </div>
        </div>
        <div className="container mx-auto px-4 md:px-6" >
          <div className="flex gap-1 -mb-px" >
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors ${tab === t.id ? 'border-[#D71920] text-[#D71920]' : 'border-transparent text-neutral-600 hover:text-neutral-900'}`}>
                <t.icon className="h-4 w-4"  /> {t.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-8" >
        {tab === 'dashboard' && <Dashboard token={token} />}
        {tab === 'leads' && <Leads token={token} />}
        {tab === 'projects' && <Projects token={token} />}
        {tab === 'content' && <Content token={token} />}
        {tab === 'reviews' && <Reviews token={token} />}
      </main>
    </div>
  )
}

function AdminApp() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Force scroll to top on refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)

    const t = localStorage.getItem(TOKEN_KEY)
    const u = localStorage.getItem(USER_KEY)
    if (t && u) {
      // verify
      fetch('/api/admin/verify', { headers: { Authorization: `Bearer ${t}` } })
        .then(r => r.ok ? r.json() : Promise.reject())
        .then(() => { setToken(t); setUser(JSON.parse(u)); setReady(true) })
        .catch(() => {
          localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(USER_KEY); setReady(true)
        })
    } else { setReady(true) }
  }, [])

  function logout() {
    localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(USER_KEY)
    setToken(null); setUser(null)
    toast.success('Logged out')
  }

  if (!ready) return <div className="min-h-screen flex items-center justify-center bg-neutral-950" ><Loader2 className="h-8 w-8 animate-spin text-[#D71920]"  /></div>
  if (!user) return <Login onLogin={(u, t) => { setUser(u); setToken(t) }} />
  return <AdminShell user={user} token={token} onLogout={logout} />
}

export default AdminApp

function ClientsEditor({ content, save, token }) {
  const clients = content.clients || []
  const [uploading, setUploading] = useState(false)

  async function handleUpload(files) {
    if (!files || !files.length) return
    setUploading(true)
    try {
      const form = new FormData()
      for (const f of files) form.append('files', f)
      const r = await fetch('/api/admin/upload', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: form })
      const j = await r.json()
      if (j.success && j.urls?.length) {
        const newClients = [...clients, ...j.urls]
        await save({ clients: newClients })
        toast.success(`Uploaded ${j.urls.length} client logo(s)`)
      } else {
        toast.error(j.error || 'Upload failed')
      }
    } catch (e) {
      toast.error('Upload failed: ' + e.message)
    }
    setUploading(false)
  }

  async function removeLogo(url) {
    if (!confirm('Are you sure you want to remove this client logo?')) return
    const newClients = clients.filter(c => c !== url)
    await save({ clients: newClients })
    toast.success('Client logo removed')
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-soft border border-neutral-100 space-y-6" >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4" >
        <div>
          <h3 className="font-bold text-neutral-900 text-lg" >Client Logos</h3>
          <p className="text-sm text-neutral-500 mt-1" >These logos are shown on the homepage between Testimonials and the Contact form.</p>
        </div>
        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#D71920] hover:bg-[#a5121a] text-white text-sm font-semibold transition-colors" >
          <Upload className="h-4 w-4"  />
          {uploading ? 'Uploading...' : 'Upload New Logos'}
          <input 
            type="file"  
            accept="image/*"  
            multiple 
            className="hidden"  
            disabled={uploading} 
            onChange={e => { handleUpload(e.target.files); e.target.value = '' }} 
          />
        </label>
      </div>

      {clients.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-neutral-200 rounded-2xl bg-neutral-50/50" >
          <ImageIcon className="h-10 w-10 text-neutral-300 mx-auto mb-2"  />
          <p className="text-neutral-500 text-sm" >No client logos uploaded yet.</p>
          <p className="text-xs text-neutral-400 mt-1" >Upload JPG, PNG, or WebP images using the button above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4" >
          {clients.map((url, index) => (
            <div key={index} className="relative group border border-neutral-200 rounded-2xl p-4 bg-white hover:shadow-soft transition-all aspect-square flex items-center justify-center overflow-hidden" >
              <img src={url} alt={`Client logo ${index + 1}`} className="max-h-full max-w-full object-contain"  />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" >
                <button
                  type="button" 
                  onClick={() => removeLogo(url)}
                  className="w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg transition-colors" 
                  title="Remove Logo" 
                >
                  <Trash2 className="h-5 w-5"  />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
