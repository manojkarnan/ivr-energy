'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import {
  Sun, LogOut, Users, TrendingUp, Calendar, Zap, LayoutDashboard, MessageSquare,
  FolderKanban, Search, Trash2, Phone, Mail, MapPin, Edit3, Plus, X, Save,
  Eye, EyeOff, ArrowRight, Loader2, Download, CheckCircle2, Clock, Sparkles, Upload, ImageIcon, Star,
  BookOpen, ExternalLink, Globe, Tag, FileText, Bold, Italic, List, ListOrdered, Heading1, Heading2, Quote, Code, CheckSquare, Table, ArrowLeft, RefreshCw, HelpCircle,
  Copy, Check
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { BLOG_CATEGORIES } from '@/data/blogs'
import { DEFAULT_FAQS } from '@/data/faqs'
import { sortCapacitiesAscending } from '@/data/capacities'

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
  const [viewingLead, setViewingLead] = useState(null)

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

  async function updateLeadData(id, data) {
    const r = await fetch('/api/admin/leads', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id, ...data })
    })
    const j = await r.json()
    if (j.success) {
      toast.success('Lead updated successfully')
      load()
      if (viewingLead && viewingLead.id === id) {
        setViewingLead(prev => ({ ...prev, ...data }))
      }
    } else {
      toast.error(j.error || 'Failed to update lead')
    }
  }

  async function del(id) {
    if (!confirm('Delete this lead permanently?')) return
    await fetch(`/api/admin/leads?id=${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
    toast.success('Deleted')
    if (viewingLead?.id === id) setViewingLead(null)
    load()
  }

  function exportCsv() {
    const cols = ['id', 'name', 'phone', 'email', 'city', 'address', 'interest', 'status', 'message', 'notes', 'systemSize', 'monthlyBill', 'roofArea', 'createdAt']
    const csv = [cols.join(',')].concat(leads.map(l => cols.map(c => `"${String(l[c] || '').replace(/"/g, '""')}"`).join(','))).join('\n')
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
    return (
      (l.name || '').toLowerCase().includes(s) ||
      (l.phone || '').includes(s) ||
      (l.city || '').toLowerCase().includes(s) ||
      (l.email || '').toLowerCase().includes(s) ||
      (l.address || '').toLowerCase().includes(s) ||
      (l.message || '').toLowerCase().includes(s) ||
      (l.notes || '').toLowerCase().includes(s) ||
      (l.interest || '').toLowerCase().includes(s)
    )
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
          <Input placeholder="Search name, phone, message, city, notes..."  value={search} onChange={e => setSearch(e.target.value)} className="pl-10 h-11 rounded-xl"  />
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
                  <th className="px-4 py-3 min-w-[240px]" >Message & Requirements</th>
                  <th className="px-4 py-3 min-w-[170px]" >Notes & Text</th>
                  <th className="px-4 py-3" >Status</th>
                  <th className="px-4 py-3" >Date</th>
                  <th className="px-4 py-3 text-right" >Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && <tr><td colSpan={9} className="px-4 py-12 text-center text-neutral-500" >No leads found</td></tr>}
                {filtered.map(l => (
                  <tr key={l.id} className="border-t border-neutral-100 hover:bg-neutral-50/60 transition-colors" >
                    <td className="px-4 py-3" >
                      <div className="font-semibold text-neutral-900" >{l.name || '—'}</div>
                      {l.type && l.type !== 'lead' && (
                        <span className="text-[10px] uppercase font-bold text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded mt-1 inline-block" >
                          {l.type}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3" >
                      <a href={`tel:${l.phone}`} className="flex items-center gap-1 text-neutral-800 hover:text-[#D71920] font-medium text-xs whitespace-nowrap" ><Phone className="h-3 w-3 text-neutral-400"  /> {l.phone}</a>
                      {l.email && <a href={`mailto:${l.email}`} className="flex items-center gap-1 text-xs text-neutral-500 hover:text-[#D71920] mt-1 truncate max-w-[150px]"  title={l.email}><Mail className="h-3 w-3 text-neutral-400"  /> {l.email}</a>}
                    </td>
                    <td className="px-4 py-3 text-neutral-700 text-xs" >
                      <div className="font-medium text-neutral-900" >{l.city || '—'}</div>
                      {l.address && <div className="text-neutral-500 mt-0.5 max-w-[180px] truncate"  title={l.address}>{l.address}</div>}
                    </td>
                    <td className="px-4 py-3" ><span className="text-xs rounded-full bg-red-50 text-[#D71920] px-2.5 py-1 font-semibold whitespace-nowrap" >{l.interest || '—'}</span></td>
                    
                    {/* Dedicated Message & Requirements Column */}
                    <td className="px-4 py-3" >
                      {l.message ? (
                        <div
                          onClick={() => setViewingLead(l)}
                          className="cursor-pointer group/msg bg-neutral-50 hover:bg-neutral-100/90 p-2.5 rounded-xl border border-neutral-200/80 transition-all max-w-[280px]"
                          title="Click to view full message"
                        >
                          <div className="text-xs text-neutral-800 line-clamp-2 leading-relaxed font-normal whitespace-pre-wrap" >
                            {l.message}
                          </div>
                          {l.message.length > 50 && (
                            <div className="text-[11px] text-[#D71920] font-semibold mt-1.5 flex items-center gap-1 group-hover/msg:underline" >
                              <Eye className="h-3 w-3"  /> View full text
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-neutral-400 text-xs italic" >No message provided</span>
                      )}
                      {(l.systemSize || l.monthlyBill || l.roofArea) && (
                        <div className="flex flex-wrap gap-1 mt-1.5" >
                          {l.systemSize && <span className="text-[10px] font-medium bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-md border border-emerald-100" >{l.systemSize} kW</span>}
                          {l.monthlyBill && <span className="text-[10px] font-medium bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded-md border border-blue-100" >₹{l.monthlyBill}/mo</span>}
                          {l.roofArea && <span className="text-[10px] font-medium bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded-md border border-purple-100" >{l.roofArea} sq.ft</span>}
                        </div>
                      )}
                    </td>

                    {/* Dedicated Notes / Text Content Column */}
                    <td className="px-4 py-3" >
                      {l.notes ? (
                        <div
                          onClick={() => setViewingLead(l)}
                          className="cursor-pointer bg-amber-50/80 hover:bg-amber-100/80 border border-amber-200/80 text-amber-900 rounded-xl p-2.5 max-w-[200px] transition-colors"
                          title="Click to view or edit notes"
                        >
                          <div className="text-xs line-clamp-2 whitespace-pre-wrap font-normal" >
                            {l.notes}
                          </div>
                          <div className="text-[10px] text-amber-700 font-semibold mt-1 flex items-center gap-1" >
                            <Edit3 className="h-2.5 w-2.5"  /> Edit note
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setViewingLead(l)}
                          className="text-xs text-neutral-400 hover:text-neutral-700 border border-dashed border-neutral-200 hover:border-neutral-400 rounded-lg px-2.5 py-1.5 transition-colors flex items-center gap-1.5 bg-neutral-50/50"
                        >
                          <Plus className="h-3 w-3 text-neutral-400"  /> Add note
                        </button>
                      )}
                    </td>

                    <td className="px-4 py-3" >
                      <select value={l.status || 'new'} onChange={e => updateStatus(l.id, e.target.value)} className={`text-xs rounded-full px-2.5 py-1 font-semibold border-0 cursor-pointer ${statusColors[l.status || 'new']}`}>
                        <option value="new" >new</option>
                        <option value="contacted" >contacted</option>
                        <option value="converted" >converted</option>
                        <option value="lost" >lost</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-neutral-500 text-xs whitespace-nowrap" >{new Date(l.createdAt).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}</td>
                    <td className="px-4 py-3 text-right" >
                      <div className="flex gap-1 justify-end" >
                        <button onClick={() => setViewingLead(l)} className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-700 hover:bg-neutral-200 flex items-center justify-center transition-colors"  title="View Details" ><Eye className="h-4 w-4"  /></button>
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

      <AnimatePresence>
        {viewingLead && (
          <LeadDetailModal
            lead={viewingLead}
            onClose={() => setViewingLead(null)}
            onSave={(updates) => updateLeadData(viewingLead.id, updates)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function LeadDetailModal({ lead, onClose, onSave }) {
  const [notes, setNotes] = useState(lead.notes || '')
  const [status, setStatus] = useState(lead.status || 'new')
  const [copied, setCopied] = useState(false)
  const [saving, setSaving] = useState(false)

  const copyMessage = () => {
    if (!lead.message) return
    navigator.clipboard.writeText(lead.message)
    setCopied(true)
    toast.success('Message copied to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSave = async () => {
    setSaving(true)
    await onSave({ notes, status })
    setSaving(false)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }} onClick={e => e.stopPropagation()} className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl my-8 overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between bg-neutral-50/50">
          <div>
            <div className="text-xl font-bold text-neutral-900">{lead.name || 'Lead Details'}</div>
            <div className="text-xs text-neutral-500 mt-0.5">Submitted on {new Date(lead.createdAt).toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' })}</div>
          </div>
          <button type="button" onClick={onClose} className="w-9 h-9 rounded-full hover:bg-neutral-200 flex items-center justify-center transition-colors">
            <X className="h-5 w-5 text-neutral-600" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-neutral-900">
          {/* Quick Contact & Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
            <div>
              <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">Phone</div>
              <div className="flex items-center gap-2 mt-1">
                <a href={`tel:${lead.phone}`} className="font-semibold text-neutral-900 hover:text-[#D71920] flex items-center gap-1.5 text-sm">
                  <Phone className="h-3.5 w-3.5 text-neutral-400" /> {lead.phone}
                </a>
                <a
                  href={`https://wa.me/${(lead.phone || '').replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(lead.name || 'there')}%2C%20thanks%20for%20reaching%20out%20to%20IVR%20Energy%21`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold hover:bg-green-200 transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            <div>
              <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">Email</div>
              <div className="mt-1">
                {lead.email ? (
                  <a href={`mailto:${lead.email}`} className="font-semibold text-neutral-900 hover:text-[#D71920] flex items-center gap-1.5 text-sm">
                    <Mail className="h-3.5 w-3.5 text-neutral-400" /> {lead.email}
                  </a>
                ) : (
                  <span className="text-neutral-400 text-xs italic">Not provided</span>
                )}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">Interest</div>
              <div className="mt-1">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-50 text-[#D71920] border border-red-100">
                  {lead.interest || 'General Inquiry'}
                </span>
              </div>
            </div>

            <div>
              <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">City & Address</div>
              <div className="mt-1 text-sm font-medium text-neutral-800">
                {lead.city && <span className="font-bold">{lead.city}</span>}
                {lead.address && <div className="text-xs text-neutral-500 mt-0.5">{lead.address}</div>}
                {!lead.city && !lead.address && <span className="text-neutral-400 text-xs italic">Not specified</span>}
              </div>
            </div>
          </div>

          {/* Calculator Specs if available */}
          {(lead.systemSize || lead.monthlyBill || lead.roofArea) && (
            <div className="p-4 bg-emerald-50/70 border border-emerald-100 rounded-2xl">
              <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">Estimated Solar Calculation</div>
              <div className="grid grid-cols-3 gap-2 text-center">
                {lead.systemSize && (
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                    <div className="text-lg font-bold text-emerald-700">{lead.systemSize} kW</div>
                    <div className="text-[11px] text-neutral-500">System Size</div>
                  </div>
                )}
                {lead.monthlyBill && (
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                    <div className="text-lg font-bold text-emerald-700">₹{lead.monthlyBill}</div>
                    <div className="text-[11px] text-neutral-500">Monthly Bill</div>
                  </div>
                )}
                {lead.roofArea && (
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                    <div className="text-lg font-bold text-emerald-700">{lead.roofArea} sq.ft</div>
                    <div className="text-[11px] text-neutral-500">Roof Area</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Message & Text Content Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="h-4 w-4 text-[#D71920]" /> Customer Message & Requirements
              </label>
              {lead.message && (
                <button
                  type="button"
                  onClick={copyMessage}
                  className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 flex items-center gap-1 bg-neutral-100 hover:bg-neutral-200 px-2.5 py-1 rounded-lg transition-colors"
                >
                  {copied ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
                  {copied ? 'Copied' : 'Copy Text'}
                </button>
              )}
            </div>
            <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/90 text-sm text-neutral-800 whitespace-pre-wrap leading-relaxed min-h-[90px]">
              {lead.message ? lead.message : <span className="text-neutral-400 italic">No specific message provided by customer.</span>}
            </div>
          </div>

          {/* Internal Notes / Follow-up Notes */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider flex items-center gap-1.5">
              <Edit3 className="h-4 w-4 text-amber-600" /> Internal Notes / Remarks
            </label>
            <Textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Add follow-up notes, call remarks, quotation status..."
              rows={3}
              className="rounded-2xl border-neutral-200 focus:border-[#D71920]"
            />
          </div>

          {/* Status Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">Lead Status</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="w-full h-11 rounded-xl border border-neutral-200 px-3 bg-white text-neutral-900 font-medium capitalize"
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted</option>
              <option value="lost">Lost</option>
            </select>
          </div>
        </div>

        <div className="p-6 border-t flex justify-end gap-3 bg-neutral-50 rounded-b-3xl">
          <Button type="button" variant="outline" onClick={onClose} className="rounded-xl">
            Close
          </Button>
          <Button type="button" onClick={handleSave} disabled={saving} className="bg-[#D71920] hover:bg-[#a5121a] text-white rounded-xl">
            {saving ? 'Saving...' : 'Save Notes & Status'}
          </Button>
        </div>
      </motion.div>
    </motion.div>
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
      ) : projects.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-neutral-100 p-8">
          <p className="text-neutral-500 mb-4">No projects found in database.</p>
          <Button onClick={() => setEditing({ title: '', client: '', location: '', capacity: '', type: 'Commercial', img: '', gallery: [], order: 999 })} className="bg-[#D71920] hover:bg-[#a5121a] rounded-xl">
            <Plus className="h-4 w-4 mr-2" /> Add Your First Project
          </Button>
        </div>
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
    secondaryPhone: c.secondaryPhone || '+91 90477 77935',
    secondaryPhoneRaw: c.secondaryPhoneRaw || '919047777935',
    email: emailParts[0] || 'ivrenergysolutions@gmail.com',
    secondaryEmail: emailParts[1] || c.secondaryEmail || 'info@ivrenergy.com',
    whatsapp: c.whatsapp || '919047777936',
    address: c.address || '3rd floor, Door No - 1,\nPlot No - A, Manasarovar Nagar,\nGerugambakkam,\nChennai - 600122.',
    hours: c.hours || 'Mon - Sat, 9:30 AM - 7:30 PM',
    mapLat: c.mapLat || '13.013944',
    mapLng: c.mapLng || '80.136667',
    instagram: c.instagram || 'https://www.instagram.com/ivrenergy/',
    linkedin: c.linkedin || 'https://www.linkedin.com/company/ivr-energy',
    facebook: c.facebook || '',
    youtube: c.youtube || '',
    gstNumber: c.gstNumber || '33BTTPR9122F1ZB',
    secondaryAddressTitle: c.secondaryAddressTitle || '',
    secondaryAddress: c.secondaryAddress || '',
    secondaryAddressPhone: c.secondaryAddressPhone || '',
  })
  return (
    <div className="rounded-2xl bg-white p-6 shadow-soft border border-neutral-100 space-y-5">
      <div className="text-sm text-neutral-600">Update the contact details shown on the site. Displayed in the Contact section, Dedicated Contact Page (/contact), Footer, top nav phone link, floating WhatsApp button, and social links.</div>
      <div className="grid md:grid-cols-2 gap-4">
        <FieldRow label="Primary Display phone number" hint="Shown to visitors (e.g. +91 90477 77936)"><Input value={f.phone} onChange={e => setF({ ...f, phone: e.target.value, phoneRaw: e.target.value.replace(/\D/g, '') || f.phoneRaw })} className="h-11 rounded-xl" /></FieldRow>
        <FieldRow label="Primary Phone (raw digits)" hint="For tel: & WhatsApp links, e.g. 919047777936"><Input value={f.phoneRaw} onChange={e => setF({ ...f, phoneRaw: e.target.value.replace(/\D/g, '') })} className="h-11 rounded-xl" /></FieldRow>
        <FieldRow label="Secondary Display phone number" hint="Second hotline on Contact page (e.g. +91 90477 77935)"><Input value={f.secondaryPhone} onChange={e => setF({ ...f, secondaryPhone: e.target.value, secondaryPhoneRaw: e.target.value.replace(/\D/g, '') || f.secondaryPhoneRaw })} className="h-11 rounded-xl" /></FieldRow>
        <FieldRow label="Secondary Phone (raw digits)" hint="For tel: link, e.g. 919047777935"><Input value={f.secondaryPhoneRaw} onChange={e => setF({ ...f, secondaryPhoneRaw: e.target.value.replace(/\D/g, '') })} className="h-11 rounded-xl" /></FieldRow>
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
          <FieldRow label="Primary Office Address (Chennai)"><Textarea value={f.address} onChange={e => setF({ ...f, address: e.target.value })} rows={2} className="rounded-xl" /></FieldRow>
        </div>

        {/* Secondary / Branch Office Address (Optional) */}
        <div className="md:col-span-2 pt-4 border-t border-neutral-100 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-sm text-neutral-900">Secondary / Branch Office Address (Optional)</div>
              <div className="text-xs text-neutral-500">Option to configure an additional regional branch office. Leave empty if you only operate from Chennai.</div>
            </div>
            {f.secondaryAddress && (
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">Configured</span>
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <FieldRow label="Branch Office Title" hint="e.g. Coimbatore Regional Office"><Input value={f.secondaryAddressTitle} onChange={e => setF({ ...f, secondaryAddressTitle: e.target.value })} placeholder="e.g. Coimbatore Regional Office" className="h-11 rounded-xl" /></FieldRow>
            <FieldRow label="Branch Phone Number" hint="e.g. +91 90477 77935"><Input value={f.secondaryAddressPhone} onChange={e => setF({ ...f, secondaryAddressPhone: e.target.value })} placeholder="e.g. +91 90477 77935" className="h-11 rounded-xl" /></FieldRow>
            <div className="md:col-span-2">
              <FieldRow label="Branch Office Full Address" hint="Full street address & pincode"><Textarea value={f.secondaryAddress} onChange={e => setF({ ...f, secondaryAddress: e.target.value })} placeholder="Enter second branch office address (optional)..." rows={2} className="rounded-xl" /></FieldRow>
            </div>
          </div>
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
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-neutral-600">Manage customer testimonials shown on the public website. Add client passport-size photos for authentic social proof.</div>
        <Button onClick={() => setEditing({ name: '', role: '', avatar: '', rating: 5, text: '', order: 999 })} className="bg-[#D71920] hover:bg-[#a5121a] rounded-xl"><Plus className="h-4 w-4 mr-2" /> Add Review</Button>
      </div>
      {loading ? <div className="p-12 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-[#D71920]" /></div> : (
        reviews.length === 0 ? <div className="rounded-2xl bg-white p-12 text-center border border-neutral-100"><div className="text-neutral-500">No reviews in the database yet.</div><div className="text-xs text-neutral-400 mt-1">The 6 default reviews from the code will be shown on the site.</div></div> : (
          <div className="grid md:grid-cols-2 gap-4">
            {reviews.map(rv => (
              <div key={rv.id} className="rounded-2xl bg-white p-5 border border-neutral-100 shadow-soft">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3.5">
                    <div className="h-12 w-12 rounded-2xl bg-neutral-100 border border-neutral-200 overflow-hidden flex items-center justify-center shrink-0 shadow-sm relative">
                      {rv.avatar || rv.img ? (
                        <img src={rv.avatar || rv.img} alt={rv.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-[#D71920] to-[#b3141a] text-white font-bold text-xs flex items-center justify-center">
                          {rv.name ? rv.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '?'}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex gap-0.5">{Array.from({ length: rv.rating || 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-[#D71920] text-[#D71920]" />)}</div>
                      <div className="mt-1 font-semibold text-neutral-900 truncate">{rv.name}</div>
                      <div className="text-xs text-neutral-500 truncate">{rv.role || 'Verified Client'}</div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => setEditing(rv)} className="w-8 h-8 rounded-lg bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center" title="Edit Review"><Edit3 className="h-4 w-4" /></button>
                    <button onClick={() => del(rv.id)} className="w-8 h-8 rounded-lg bg-red-100 text-red-700 hover:bg-red-500 hover:text-white flex items-center justify-center" title="Delete Review"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
                <p className="mt-3.5 text-sm text-neutral-700 line-clamp-3 leading-relaxed">"{rv.text}"</p>
                {rv.avatar && (
                  <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Passport photo attached
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      )}
      <AnimatePresence>{editing && <ReviewEditor review={editing} token={token} onSave={save} onClose={() => setEditing(null)} />}</AnimatePresence>
    </div>
  )
}

function ReviewEditor({ review, token, onSave, onClose }) {
  const [r, setR] = useState({
    name: '',
    role: '',
    avatar: '',
    rating: 5,
    text: '',
    order: 999,
    ...review
  })
  const [uploading, setUploading] = useState(false)

  async function handleAvatarUpload(files) {
    if (!files || !files.length) return
    setUploading(true)
    try {
      const form = new FormData()
      for (const f of files) form.append('files', f)
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: form
      })
      const j = await res.json()
      if (j.success && j.urls?.length) {
        setR(prev => ({ ...prev, avatar: j.urls[0] }))
        toast.success('Passport size photo uploaded successfully')
      } else {
        toast.error(j.error || 'Upload failed')
      }
    } catch (e) {
      toast.error('Upload error: ' + e.message)
    }
    setUploading(false)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <motion.form initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }} onClick={e => e.stopPropagation()} onSubmit={e => { e.preventDefault(); if (!r.name || !r.text) { toast.error('Customer name and review text are required'); return } onSave({ ...r, rating: Number(r.rating) || 5, order: Number(r.order) || 999 }) }} className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden my-8">
        <div className="p-6 border-b flex items-center justify-between">
          <div>
            <div className="text-xl font-bold text-neutral-900">{r.id ? 'Edit Review & Client Photo' : 'Add New Review & Client Photo'}</div>
            <div className="text-xs text-neutral-500 mt-0.5">Manage customer testimonial details and passport photo</div>
          </div>
          <button type="button" onClick={onClose} className="w-9 h-9 rounded-full hover:bg-neutral-100 flex items-center justify-center"><X className="h-5 w-5" /></button>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Client Passport Photo Uploader */}
          <FieldRow label="Client Passport-Size Photo">
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-2xl bg-neutral-100 border-2 border-dashed border-neutral-300 overflow-hidden flex items-center justify-center shrink-0 shadow-sm relative group">
                  {r.avatar ? (
                    <>
                      <img src={r.avatar} alt="Client Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setR({ ...r, avatar: '' })}
                        title="Remove photo"
                        className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-xs font-semibold"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </>
                  ) : (
                    <div className="text-center p-1">
                      <ImageIcon className="h-6 w-6 text-neutral-400 mx-auto" />
                      <span className="text-[10px] text-neutral-400 font-medium block mt-1">No photo</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-all shadow-xs">
                      {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5 text-[#D71920]" />}
                      <span>{uploading ? 'Uploading Photo...' : 'Upload Passport Photo'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={uploading}
                        onChange={e => handleAvatarUpload(e.target.files)}
                      />
                    </label>
                    {r.avatar && (
                      <button
                        type="button"
                        onClick={() => setR({ ...r, avatar: '' })}
                        className="text-xs text-red-600 hover:underline font-semibold px-2 py-1"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-500 leading-tight">
                    Upload client face photo (Square 1:1 or 3:4 passport aspect ratio recommended).
                  </p>
                </div>
              </div>

              <div>
                <Input
                  value={r.avatar || ''}
                  onChange={e => setR({ ...r, avatar: e.target.value })}
                  placeholder="Or enter image URL (e.g. /projects/... or https://...)"
                  className="h-10 rounded-xl text-xs"
                />
              </div>
            </div>
          </FieldRow>

          <FieldRow label="Customer Name *">
            <Input value={r.name} onChange={e => setR({ ...r, name: e.target.value })} placeholder="e.g. Cap. Shankar A" className="h-11 rounded-xl" />
          </FieldRow>
          <FieldRow label="Role / Location">
            <Input value={r.role} onChange={e => setR({ ...r, role: e.target.value })} placeholder="e.g. Homeowner · 5 kW or Commercial Site Manager" className="h-11 rounded-xl" />
          </FieldRow>
          <FieldRow label="Rating (1 - 5)">
            <Input value={r.rating} onChange={e => setR({ ...r, rating: e.target.value.replace(/[^1-5]/g, '') })} placeholder="5" className="h-11 rounded-xl max-w-[100px]" />
          </FieldRow>
          <FieldRow label="Review Text *">
            <Textarea value={r.text} onChange={e => setR({ ...r, text: e.target.value })} rows={4} placeholder="What did the customer say about IVR Energy solar installation..." className="rounded-xl" />
          </FieldRow>
          <FieldRow label="Display Order">
            <Input value={r.order} onChange={e => setR({ ...r, order: e.target.value.replace(/[^0-9]/g, '') })} placeholder="1 = first" className="h-11 rounded-xl max-w-[150px]" />
          </FieldRow>
        </div>

        <div className="p-6 border-t flex justify-end gap-3 bg-neutral-50 rounded-b-3xl">
          <Button type="button" variant="outline" onClick={onClose} className="rounded-xl">Cancel</Button>
          <Button type="submit" disabled={uploading} className="bg-[#D71920] hover:bg-[#a5121a] rounded-xl"><Save className="h-4 w-4 mr-2" /> Save Review</Button>
        </div>
      </motion.form>
    </motion.div>
  )
}

// -------- Solar kW Capacity Packages Manager --------
function CapacityEditorModal({ cap: initialCap, onClose, onSave }) {
  const [c, setC] = useState({
    ...initialCap,
    appliances: Array.isArray(initialCap.appliances) ? initialCap.appliances : [],
    inclusions: Array.isArray(initialCap.inclusions) ? initialCap.inclusions : [],
    faqs: Array.isArray(initialCap.faqs) ? initialCap.faqs : [],
  })
  const [activeTab, setActiveTab] = useState('overview')
  const [saving, setSaving] = useState(false)

  // Appliance state
  const [newAppliance, setNewAppliance] = useState({ name: '', desc: '' })
  // Inclusion state
  const [newInclusion, setNewInclusion] = useState('')
  // FAQ state
  const [newFaq, setNewFaq] = useState({ q: '', a: '' })

  function handleAddAppliance() {
    if (!newAppliance.name.trim()) return
    setC({
      ...c,
      appliances: [...c.appliances, { name: newAppliance.name.trim(), desc: newAppliance.desc.trim() }]
    })
    setNewAppliance({ name: '', desc: '' })
  }

  function handleRemoveAppliance(index) {
    setC({
      ...c,
      appliances: c.appliances.filter((_, i) => i !== index)
    })
  }

  function handleAddInclusion() {
    if (!newInclusion.trim()) return
    setC({
      ...c,
      inclusions: [...c.inclusions, newInclusion.trim()]
    })
    setNewInclusion('')
  }

  function handleRemoveInclusion(index) {
    setC({
      ...c,
      inclusions: c.inclusions.filter((_, i) => i !== index)
    })
  }

  function handleAddFaq() {
    if (!newFaq.q.trim()) return
    setC({
      ...c,
      faqs: [...c.faqs, { q: newFaq.q.trim(), a: newFaq.a.trim() }]
    })
    setNewFaq({ q: '', a: '' })
  }

  function handleRemoveFaq(index) {
    setC({
      ...c,
      faqs: c.faqs.filter((_, i) => i !== index)
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    const payload = {
      ...c,
      heroHighlights: [
        { label: 'Daily Generation', value: c.dailyUnits ? String(c.dailyUnits).replace(/\s*\/\s*Day/i, '') : '12 – 15 Units' },
        { label: 'Roof Area Required', value: c.roofArea ? String(c.roofArea).replace(/\s*\(.*?\)/g, '').trim() : '270 – 300 Sq. Ft.' },
        { label: 'Monthly Bill Savings', value: c.monthlySavings ? String(c.monthlySavings).replace(/\s*\/\s*Month/i, '').trim() : '₹2,500 – ₹3,500' },
        { label: 'Govt Subsidy Credit', value: c.subsidy ? (String(c.subsidy).includes('₹') ? String(c.subsidy).split(' under ')[0].split(' Direct ')[0] + ' Direct DBT' : String(c.subsidy)) : (c.badge || '₹78,000 Direct DBT') },
      ]
    }
    await onSave(payload)
    setSaving(false)
  }

  const tabs = [
    { id: 'overview', label: '1. Overview & Headers' },
    { id: 'yield', label: '2. Generation & Savings' },
    { id: 'hardware', label: '3. Hardware Specs' },
    { id: 'features', label: '4. Appliances & Inclusions' },
    { id: 'faqs', label: '5. Capacity FAQs' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
      onClick={onClose}
    >
      <motion.form
        initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }}
        onClick={e => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl w-full max-w-4xl border border-neutral-200 shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b flex items-center justify-between bg-neutral-50/80">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-[#D71920] text-white flex items-center justify-center font-extrabold text-sm">
              {c.kw || 'kW'}
            </span>
            <div>
              <h3 className="font-extrabold text-neutral-900 text-base sm:text-lg">
                Edit {c.kw || 'Solar System'} Specifications & Page
              </h3>
              <p className="text-xs text-neutral-500">Live URL: <code className="text-[#D71920] font-mono">/services/{c.slug}</code></p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="w-9 h-9 rounded-full hover:bg-neutral-200/70 flex items-center justify-center text-neutral-600 cursor-pointer">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 border-b bg-white flex gap-2 overflow-x-auto no-scrollbar">
          {tabs.map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`py-3 px-3.5 text-xs font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === t.id
                  ? 'border-[#D71920] text-[#D71920]'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar flex-1 max-h-[60vh]">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-3 gap-4">
                <FieldRow label="Capacity Label *">
                  <Input value={c.kw} onChange={e => setC({ ...c, kw: e.target.value })} placeholder="e.g. 3 kW or 10 kW+" className="h-11 rounded-xl font-bold" />
                </FieldRow>
                <FieldRow label="URL Slug *">
                  <Input value={c.slug} onChange={e => setC({ ...c, slug: e.target.value })} placeholder="e.g. 3kw-solar-system" className="h-11 rounded-xl font-mono text-xs" />
                </FieldRow>
                <FieldRow label="Display Order">
                  <Input value={c.order ?? 1} onChange={e => setC({ ...c, order: Number(e.target.value) || 1 })} placeholder="1" className="h-11 rounded-xl" />
                </FieldRow>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <FieldRow label="Marketing Tagline Pill">
                  <Input value={c.tag} onChange={e => setC({ ...c, tag: e.target.value })} placeholder="e.g. Most Popular for Homes" className="h-11 rounded-xl" />
                </FieldRow>
                <FieldRow label="Subsidy / Tax Badge">
                  <Input value={c.badge} onChange={e => setC({ ...c, badge: e.target.value })} placeholder="e.g. ₹78,000 Direct Subsidy (Max CFA)" className="h-11 rounded-xl text-emerald-700 font-semibold" />
                </FieldRow>
              </div>

              <FieldRow label="Main Page Title *">
                <Input value={c.title} onChange={e => setC({ ...c, title: e.target.value })} placeholder="e.g. 3 kW Residential Rooftop Solar System" className="h-11 rounded-xl font-bold" />
              </FieldRow>

              <FieldRow label="Hero Subtitle">
                <Input value={c.subtitle} onChange={e => setC({ ...c, subtitle: e.target.value })} placeholder="Brief 1-sentence value proposition..." className="h-11 rounded-xl" />
              </FieldRow>

              <FieldRow label="Full Description">
                <Textarea value={c.description} onChange={e => setC({ ...c, description: e.target.value })} rows={4} placeholder="Comprehensive description of the system..." className="rounded-xl text-xs leading-relaxed" />
              </FieldRow>

              <FieldRow label="Ideal Household / Property Size">
                <Input value={c.suitableFor} onChange={e => setC({ ...c, suitableFor: e.target.value })} placeholder="e.g. 2–3 BHK Independent Homes & Villas" className="h-11 rounded-xl" />
              </FieldRow>
            </div>
          )}

          {/* TAB 2: YIELD & FINANCIALS */}
          {activeTab === 'yield' && (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-3 gap-4">
                <FieldRow label="Daily Output *">
                  <Input value={c.dailyUnits} onChange={e => setC({ ...c, dailyUnits: e.target.value })} placeholder="e.g. 12 – 15 Units / Day" className="h-11 rounded-xl font-bold" />
                </FieldRow>
                <FieldRow label="Monthly Output">
                  <Input value={c.monthlyUnits} onChange={e => setC({ ...c, monthlyUnits: e.target.value })} placeholder="e.g. 360 – 450 Units / Month" className="h-11 rounded-xl" />
                </FieldRow>
                <FieldRow label="Yearly Output">
                  <Input value={c.yearlyUnits} onChange={e => setC({ ...c, yearlyUnits: e.target.value })} placeholder="e.g. 4,500 – 5,400 Units / Year" className="h-11 rounded-xl" />
                </FieldRow>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <FieldRow label="Roof Space Area *">
                  <Input value={c.roofArea} onChange={e => setC({ ...c, roofArea: e.target.value })} placeholder="e.g. 270 – 300 Sq. Ft." className="h-11 rounded-xl font-bold" />
                </FieldRow>
                <FieldRow label="Monthly Bill Savings *">
                  <Input value={c.monthlySavings} onChange={e => setC({ ...c, monthlySavings: e.target.value })} placeholder="e.g. ₹2,500 – ₹3,500 / Month" className="h-11 rounded-xl text-emerald-700 font-bold" />
                </FieldRow>
                <FieldRow label="Yearly Bill Savings">
                  <Input value={c.yearlySavings} onChange={e => setC({ ...c, yearlySavings: e.target.value })} placeholder="e.g. ₹35,000 – ₹42,000 / Year" className="h-11 rounded-xl" />
                </FieldRow>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <FieldRow label="Govt Subsidy / Financial Support">
                  <Input value={c.subsidy} onChange={e => setC({ ...c, subsidy: e.target.value })} placeholder="e.g. ₹78,000 Direct Bank Credit under PM Surya Ghar" className="h-11 rounded-xl font-semibold" />
                </FieldRow>
                <FieldRow label="ROI Payback Period">
                  <Input value={c.payback} onChange={e => setC({ ...c, payback: e.target.value })} placeholder="e.g. ~3.2 Years Payback Period" className="h-11 rounded-xl" />
                </FieldRow>
              </div>

              <FieldRow label="Warranty Terms">
                <Input value={c.warranty} onChange={e => setC({ ...c, warranty: e.target.value })} placeholder="e.g. 25 Years Panel Performance Warranty | 5–10 Years Inverter Warranty" className="h-11 rounded-xl" />
              </FieldRow>
            </div>
          )}

          {/* TAB 3: HARDWARE SPECS */}
          {activeTab === 'hardware' && (
            <div className="space-y-4">
              <FieldRow label="Solar PV Modules (Panel Count & Tech)">
                <Input value={c.panelsCount} onChange={e => setC({ ...c, panelsCount: e.target.value })} placeholder="e.g. 6 Nos (550Wp / 580Wp TOPCon Bifacial Modules)" className="h-11 rounded-xl" />
              </FieldRow>

              <FieldRow label="Smart Solar Inverter Specs">
                <Input value={c.inverterSpec} onChange={e => setC({ ...c, inverterSpec: e.target.value })} placeholder="e.g. 3 kW High-Efficiency Grid-Tie Inverter (Single Phase / 3-Phase with WiFi)" className="h-11 rounded-xl" />
              </FieldRow>

              <FieldRow label="Mounting Structure & Wind Rating">
                <Input value={c.structureSpec} onChange={e => setC({ ...c, structureSpec: e.target.value })} placeholder="e.g. Hot-Dip Galvanized (HDG) GI Structure (150 km/h wind tested)" className="h-11 rounded-xl" />
              </FieldRow>
            </div>
          )}

          {/* TAB 4: APPLIANCES & INCLUSIONS */}
          {activeTab === 'features' && (
            <div className="space-y-6">
              {/* Appliances */}
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                    Supported Appliance Load ({c.appliances?.length || 0})
                  </span>
                </div>

                <div className="space-y-2">
                  {(c.appliances || []).map((app, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white border border-neutral-200 text-xs">
                      <div className="min-w-0">
                        <div className="font-bold text-neutral-900">{typeof app === 'string' ? app : app.name}</div>
                        {typeof app === 'object' && app.desc && (
                          <div className="text-[11px] text-neutral-500">{app.desc}</div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveAppliance(idx)}
                        className="text-neutral-400 hover:text-red-600 p-1 cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <Input
                    placeholder="Appliance name (e.g. 1–2 Inverter ACs)"
                    value={newAppliance.name}
                    onChange={e => setNewAppliance({ ...newAppliance, name: e.target.value })}
                    className="h-10 rounded-xl text-xs bg-white"
                  />
                  <Input
                    placeholder="Load runtime description..."
                    value={newAppliance.desc}
                    onChange={e => setNewAppliance({ ...newAppliance, desc: e.target.value })}
                    className="h-10 rounded-xl text-xs bg-white"
                  />
                  <Button type="button" onClick={handleAddAppliance} variant="outline" className="rounded-xl h-10 px-4 text-xs font-bold shrink-0">
                    <Plus className="h-3.5 w-3.5 mr-1" /> Add
                  </Button>
                </div>
              </div>

              {/* Turnkey Scope Inclusions */}
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                    Turnkey Engineering Inclusions ({c.inclusions?.length || 0})
                  </span>
                </div>

                <div className="space-y-2">
                  {(c.inclusions || []).map((inc, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white border border-neutral-200 text-xs">
                      <span className="text-neutral-800">{inc}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveInclusion(idx)}
                        className="text-neutral-400 hover:text-red-600 p-1 cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex gap-2">
                  <Input
                    placeholder="Enter inclusion item (e.g. TANGEDCO Net Metering Liaison)..."
                    value={newInclusion}
                    onChange={e => setNewInclusion(e.target.value)}
                    className="h-10 rounded-xl text-xs bg-white"
                  />
                  <Button type="button" onClick={handleAddInclusion} variant="outline" className="rounded-xl h-10 px-4 text-xs font-bold shrink-0">
                    <Plus className="h-3.5 w-3.5 mr-1" /> Add
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: FAQS */}
          {activeTab === 'faqs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                  Capacity-Specific FAQs ({c.faqs?.length || 0})
                </span>
              </div>

              <div className="space-y-3">
                {(c.faqs || []).map((f, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs space-y-1.5 relative group">
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-bold text-neutral-900">Q: {f.q}</div>
                      <button
                        type="button"
                        onClick={() => handleRemoveFaq(idx)}
                        className="text-neutral-400 hover:text-red-600 p-1 cursor-pointer"
                        title="Remove FAQ"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-neutral-600 leading-relaxed">A: {f.a}</div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2.5">
                <span className="text-xs font-bold text-neutral-700 block">Add New FAQ</span>
                <Input
                  placeholder="Question (e.g. How many units will this generate?)"
                  value={newFaq.q}
                  onChange={e => setNewFaq({ ...newFaq, q: e.target.value })}
                  className="h-10 rounded-xl text-xs bg-white"
                />
                <Textarea
                  placeholder="Detailed answer..."
                  value={newFaq.a}
                  onChange={e => setNewFaq({ ...newFaq, a: e.target.value })}
                  rows={2}
                  className="rounded-xl text-xs bg-white"
                />
                <Button type="button" onClick={handleAddFaq} variant="outline" className="rounded-xl h-10 px-4 text-xs font-bold">
                  <Plus className="h-3.5 w-3.5 mr-1" /> Add FAQ
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 sm:p-6 border-t flex items-center justify-between bg-neutral-50 rounded-b-3xl">
          <div className="text-xs text-neutral-500 hidden sm:block">
            Changes will automatically update the public <code className="text-neutral-800 font-semibold">/services/{c.slug}</code> page.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-xl text-xs font-semibold">
              Cancel
            </Button>
            <Button type="submit" disabled={saving} className="bg-[#D71920] hover:bg-[#a5121a] text-white rounded-xl text-xs font-bold px-6 shadow-md cursor-pointer">
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-1.5" /> : <Save className="h-4 w-4 mr-1.5" />}
              Save Package Specifications
            </Button>
          </div>
        </div>
      </motion.form>
    </motion.div>
  )
}

function CapacitiesManager({ token }) {
  const [capacities, setCapacities] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [search, setSearch] = useState('')

  async function load() {
    setLoading(true)
    try {
      const r = await fetch('/api/admin/capacities', { headers: { Authorization: `Bearer ${token}` } })
      const j = await r.json()
      setCapacities(sortCapacitiesAscending(j.capacities || []))
    } catch {
      toast.error('Failed to load capacity packages')
    }
    setLoading(false)
  }

  useEffect(() => { load() /* eslint-disable-next-line */ }, [])

  async function save(cap) {
    const isNew = !capacities.some(c => c.id === cap.id)
    const r = await fetch('/api/admin/capacities', {
      method: isNew ? 'POST' : 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(cap)
    })
    const j = await r.json()
    if (j.success) {
      toast.success(isNew ? 'Solar capacity package added' : 'Capacity specifications updated')
      setEditing(null)
      load()
    } else {
      toast.error(j.error || 'Save failed')
    }
  }

  async function del(id) {
    if (!confirm('Are you sure you want to delete this solar capacity package?')) return
    const r = await fetch(`/api/admin/capacities?id=${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    const j = await r.json()
    if (j.success) {
      toast.success('Capacity package deleted')
      load()
    } else {
      toast.error('Failed to delete')
    }
  }

  const sortedList = sortCapacitiesAscending(capacities)
  const filtered = sortedList.filter(c =>
    (c.kw || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.title || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.tag || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-neutral-900">Solar kW Capacity Packages</h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Edit technical specifications, daily generation yields, roof requirements, subsidies, and appliance checklists for 3 kW, 4 kW, 5 kW, 10 kW+ systems.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => setEditing({
              kw: '6 kW',
              slug: '6kw-solar-system',
              tag: 'High Energy Yield',
              badge: '₹78,000 Direct Subsidy Support',
              title: '6 kW Residential Rooftop Solar System',
              subtitle: 'Tailored for large villas and residential duplexes.',
              description: 'Generates abundant solar energy to zero out high bi-monthly electricity bills.',
              dailyUnits: '24 – 30 Units / Day',
              monthlyUnits: '720 – 900 Units / Month',
              yearlyUnits: '9,000 – 10,800 Units / Year',
              roofArea: '540 – 600 Sq. Ft.',
              monthlySavings: '₹6,000 – ₹8,500 / Month',
              yearlySavings: '₹72,000 – ₹1,00,000 / Year',
              subsidy: '₹78,000 Direct Bank Credit under PM Surya Ghar',
              payback: '~3.1 Years Payback Period',
              warranty: '25 Years Panel Performance Warranty | 5–10 Years Inverter Warranty',
              suitableFor: '4+ BHK Luxury Homes & Duplexes',
              panelsCount: '11–12 Nos (550Wp / 580Wp TOPCon Modules)',
              inverterSpec: '6 kW Grid-Tie Smart Solar Inverter with WiFi',
              structureSpec: 'Hot-Dip Galvanized GI Framing (150 km/h wind tested)',
              appliances: [
                { name: '3–4 Inverter ACs (1.5 Ton)', desc: 'Run multiple ACs all day' },
                { name: 'Domestic Water Pump + Kitchen Loads', desc: 'Continuous morning & evening usage' }
              ],
              inclusions: [
                'Tier-1 TOPCon Solar Modules',
                'Smart Solar Inverter with Cloud Monitoring',
                'HDG Mounting Structure & Dual Chemical Earthing',
                'TANGEDCO Net Metering Liaison'
              ],
              faqs: [
                { q: 'How many units will this generate?', a: 'Generates 24 to 30 units daily on average in Tamil Nadu.' }
              ],
              order: capacities.length + 1
            })}
            className="bg-[#D71920] hover:bg-[#a5121a] rounded-xl text-xs sm:text-sm font-bold shadow-sm cursor-pointer"
          >
            <Plus className="h-4 w-4 mr-1.5" /> Add kW Package
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-neutral-100 shadow-soft">
        <Search className="h-4 w-4 text-neutral-400 ml-2" />
        <Input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search capacity packages (e.g. 3 kW, 4 kW, Homes, Subsidy)..."
          className="border-0 focus-visible:ring-0 text-xs sm:text-sm shadow-none"
        />
        {search && (
          <button onClick={() => setSearch('')} className="text-xs text-neutral-400 hover:text-neutral-600 mr-2">
            Clear
          </button>
        )}
      </div>

      {loading ? (
        <div className="p-16 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-[#D71920]" /></div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl bg-white p-12 text-center border border-neutral-100">
          <Zap className="h-10 w-10 text-neutral-300 mx-auto mb-2" />
          <div className="text-neutral-600 font-semibold">No solar packages found</div>
          <div className="text-xs text-neutral-400 mt-1">Try resetting your search query or add a new capacity package.</div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {filtered.map(cap => (
            <div key={cap.id || cap.slug} className="rounded-2xl bg-white border border-neutral-200/80 p-6 shadow-soft hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl font-extrabold text-white bg-[#D71920] px-3.5 py-1 rounded-xl shadow-xs">
                      {cap.kw}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200">
                      {cap.tag || 'Standard System'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full inline-block">
                      {cap.badge || 'Govt Subsidy Support'}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-extrabold text-neutral-900 text-base mt-1">{cap.title}</h3>
                  <p className="text-xs text-neutral-500 mt-0.5 line-clamp-2">{cap.description}</p>
                </div>

                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-neutral-50 border border-neutral-100 text-xs">
                  <div>
                    <div className="text-[10px] text-neutral-400 font-bold uppercase">Daily Units</div>
                    <div className="font-extrabold text-neutral-900 mt-0.5">{cap.dailyUnits || '—'}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-400 font-bold uppercase">Roof Area</div>
                    <div className="font-extrabold text-neutral-900 mt-0.5">{cap.roofArea || '—'}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-400 font-bold uppercase">Monthly Save</div>
                    <div className="font-extrabold text-emerald-600 mt-0.5">{cap.monthlySavings || '—'}</div>
                  </div>
                </div>

                <div className="text-[11px] text-neutral-500 flex items-center justify-between pt-1">
                  <span>URL: <code className="text-[#D71920] font-mono">/services/{cap.slug}</code></span>
                  <span>Order: <strong className="text-neutral-700">{cap.order ?? 1}</strong></span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-5 mt-4 border-t border-neutral-100">
                <a
                  href={`/services/${cap.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-neutral-600 hover:text-neutral-900 font-semibold transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-[#D71920]" /> View Live Page
                </a>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => del(cap.id || cap.slug)}
                    variant="ghost"
                    size="sm"
                    className="text-neutral-400 hover:text-red-600 rounded-xl h-9 px-2.5 cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => setEditing({ ...cap })}
                    className="bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs h-9 px-4 font-bold shadow-xs cursor-pointer"
                  >
                    <Edit3 className="h-3.5 w-3.5 mr-1.5 text-[#D71920]" /> Edit Specifications
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Capacity Package Editor Drawer / Modal */}
      <AnimatePresence>
        {editing && (
          <CapacityEditorModal
            cap={editing}
            onClose={() => setEditing(null)}
            onSave={save}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// -------- Blogs Manager --------
function BlogsManager({ token }) {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [editing, setEditing] = useState(null)
  const [isNew, setIsNew] = useState(false)

  async function load() {
    setLoading(true)
    try {
      const r = await fetch('/api/admin/blogs', { headers: { Authorization: `Bearer ${token}` } })
      const j = await r.json()
      setBlogs(j.blogs || [])
    } catch {
      toast.error('Failed to load blog posts')
    }
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  async function saveBlog(doc) {
    try {
      const method = isNew ? 'POST' : 'PATCH'
      const r = await fetch('/api/admin/blogs', {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(doc)
      })
      const j = await r.json()
      if (j.success) {
        toast.success(isNew ? 'Blog post created & published successfully' : 'Blog post updated successfully')
        setEditing(null)
        load()
      } else {
        toast.error(j.error || 'Failed to save blog post')
      }
    } catch (e) {
      toast.error('Network error: ' + e.message)
    }
  }

  async function deleteBlog(id) {
    if (!confirm('Are you sure you want to permanently delete this blog post?')) return
    try {
      const r = await fetch(`/api/admin/blogs?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      const j = await r.json()
      if (j.success) {
        toast.success('Blog post deleted')
        load()
      } else {
        toast.error(j.error || 'Delete failed')
      }
    } catch {
      toast.error('Network error')
    }
  }

  async function toggleStatus(blog) {
    const nextStatus = blog.status === 'draft' ? 'published' : 'draft'
    try {
      const r = await fetch('/api/admin/blogs', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id: blog.id, status: nextStatus })
      })
      const j = await r.json()
      if (j.success) {
        toast.success(`Post is now ${nextStatus}`)
        load()
      }
    } catch {
      toast.error('Failed to update status')
    }
  }

  const filtered = blogs.filter((b) => {
    const q = search.toLowerCase().trim()
    const matchSearch =
      !q ||
      (b.title || '').toLowerCase().includes(q) ||
      (b.excerpt || '').toLowerCase().includes(q) ||
      (b.category || '').toLowerCase().includes(q) ||
      (b.author?.name || '').toLowerCase().includes(q)

    const matchCategory = categoryFilter === 'All' || b.category === categoryFilter
    const matchStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Published' && b.status !== 'draft') ||
      (statusFilter === 'Draft' && b.status === 'draft')

    return matchSearch && matchCategory && matchStatus
  })

  const publishedCount = blogs.filter((b) => b.status !== 'draft').length
  const draftCount = blogs.filter((b) => b.status === 'draft').length

  function openCreate() {
    setIsNew(true)
    setEditing({
      id: '',
      title: '',
      slug: '',
      category: 'Residential',
      readTime: '5 min read',
      coverImage: '/projects/svs-1mw/1.jpg',
      excerpt: '',
      content: '',
      sections: [],
      author: {
        name: '',
        role: '',
        avatar: ''
      },
      featured: false,
      status: 'published',
      tags: [],
      keyTakeaways: []
    })
  }

  function openEdit(b) {
    setIsNew(false)
    setEditing({
      ...b,
      author: b.author ? {
        name: b.author.name || '',
        role: b.author.role || '',
        avatar: b.author.avatar || ''
      } : {
        name: '',
        role: '',
        avatar: ''
      },
      tags: Array.isArray(b.tags) ? b.tags : [],
      keyTakeaways: Array.isArray(b.keyTakeaways) ? b.keyTakeaways : []
    })
  }

  return (
    <div className="space-y-6">
      {/* Header & Stats Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-neutral-200 shadow-soft">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-red-50 text-[#D71920] flex items-center justify-center font-bold">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-900">Blog & Technical Knowledge Hub</h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Author, format, optimize SEO, and publish solar guides with real-time live site updates.
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={openCreate}
          className="rounded-xl h-11 px-5 font-bold text-xs bg-[#D71920] hover:bg-[#b5141a] text-white shadow-md hover:shadow-lg transition-all"
        >
          <Plus className="h-4 w-4 mr-1.5" /> New Blog Article
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-neutral-200 shadow-soft">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles by title, author, keyword..."
            className="pl-10 h-10 rounded-xl bg-neutral-50 border-neutral-200 text-xs"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Category Dropdown */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-10 px-3 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-semibold text-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#D71920]/20"
          >
            <option value="All">All Categories</option>
            {BLOG_CATEGORIES.filter((c) => c !== 'All').map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Status Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-neutral-100 border border-neutral-200">
            {['All', 'Published', 'Draft'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  statusFilter === st ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <Button onClick={load} variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl" title="Refresh list">
            <RefreshCw className={`h-4 w-4 text-neutral-500 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Articles List / Table */}
      {loading ? (
        <div className="p-16 flex justify-center bg-white rounded-2xl border border-neutral-200">
          <Loader2 className="h-8 w-8 animate-spin text-[#D71920]" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl bg-white p-16 text-center border border-neutral-200 shadow-soft space-y-3">
          <BookOpen className="h-12 w-12 text-neutral-300 mx-auto" />
          <h3 className="text-base font-bold text-neutral-800">No blog articles match your filters</h3>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            Try adjusting your search terms or create your first blog article using the button above.
          </p>
          <Button onClick={openCreate} className="bg-[#D71920] hover:bg-[#a5121a] text-white rounded-xl text-xs font-bold mt-2">
            <Plus className="h-4 w-4 mr-1.5" /> Create Article Now
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((b) => {
            const isDraft = b.status === 'draft'
            return (
              <div
                key={b.id || b.slug}
                className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-soft hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
              >
                <div className="flex items-start gap-4 flex-1">
                  {/* Thumbnail */}
                  <div className="h-20 w-28 rounded-xl bg-neutral-900 overflow-hidden shrink-0 relative border border-neutral-100 shadow-sm">
                    <img
                      src={b.coverImage || '/projects/svs-1mw/1.jpg'}
                      alt={b.title}
                      className="w-full h-full object-cover"
                    />
                    {b.featured && (
                      <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-[#D71920] text-white text-[9px] font-extrabold uppercase">
                        ★ Featured
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-[#D71920] text-[11px] font-bold border border-red-100">
                        {b.category || 'General'}
                      </span>
                      <button
                        onClick={() => toggleStatus(b)}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border transition-all ${
                          isDraft
                            ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                        }`}
                        title="Click to toggle status"
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${isDraft ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                        {isDraft ? 'Draft' : 'Published'}
                      </button>
                      <span className="text-[11px] text-neutral-400">•</span>
                      <span className="text-[11px] text-neutral-500 font-medium">{b.readTime || '5 min read'}</span>
                      <span className="text-[11px] text-neutral-400">•</span>
                      <span className="text-[11px] text-neutral-400">{b.publishedAt || b.formattedDate}</span>
                    </div>

                    <h3 className="text-base font-bold text-neutral-900 truncate">
                      {b.title}
                    </h3>

                    <p className="text-xs text-neutral-500 line-clamp-1">
                      {b.excerpt || 'No summary excerpt provided.'}
                    </p>

                    <div className="text-[11px] text-neutral-400 flex items-center gap-1.5">
                      <span>Author: <strong className="text-neutral-700">{b.author?.name ? b.author.name : 'None (No Author)'}</strong></span>
                      <span>•</span>
                      <span>Slug: <code className="bg-neutral-100 px-1 py-0.5 rounded text-neutral-600">/blog/{b.slug}</code></span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="rounded-xl h-9 text-xs font-semibold text-neutral-700 hover:text-neutral-900 border-neutral-200"
                  >
                    <a href={`/blog/${b.slug}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3.5 w-3.5 mr-1 text-[#D71920]" /> View Live
                    </a>
                  </Button>

                  <Button
                    onClick={() => openEdit(b)}
                    size="sm"
                    className="bg-neutral-900 hover:bg-black text-white rounded-xl h-9 text-xs font-semibold"
                  >
                    <Edit3 className="h-3.5 w-3.5 mr-1" /> Edit
                  </Button>

                  <button
                    onClick={() => deleteBlog(b.id)}
                    className="h-9 w-9 rounded-xl bg-red-50 hover:bg-red-500 hover:text-white text-red-600 flex items-center justify-center transition-colors border border-red-100"
                    title="Delete post"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Editor Modal */}
      <AnimatePresence>
        {editing && (
          <BlogEditorModal
            blog={editing}
            isNew={isNew}
            onSave={saveBlog}
            onClose={() => setEditing(null)}
            token={token}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// -------- Blog Visual Editor & SEO Modal --------
function BlogEditorModal({ blog, isNew, onSave, onClose, token }) {
  const [b, setB] = useState(blog)
  const [tab, setTab] = useState('editor') // 'editor', 'seo', 'takeaways', 'faqs', 'preview'
  const [uploadingCover, setUploadingCover] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [coverDragOver, setCoverDragOver] = useState(false)
  const [avatarDragOver, setAvatarDragOver] = useState(false)
  const [rawTags, setRawTags] = useState(Array.isArray(blog.tags) ? blog.tags.join(', ') : '')
  const [rawTakeaways, setRawTakeaways] = useState(Array.isArray(blog.keyTakeaways) ? blog.keyTakeaways.join('\n') : '')

  const [faqs, setFaqs] = useState(() => {
    if (Array.isArray(blog.faqs) && blog.faqs.length > 0) {
      return blog.faqs.map((f) => ({
        q: f.q || f.question || '',
        a: f.a || f.answer || ''
      }))
    }
    return []
  })

  function addFaq() {
    setFaqs((prev) => [...prev, { q: '', a: '' }])
  }

  function updateFaq(idx, key, val) {
    setFaqs((prev) => {
      const list = [...prev]
      list[idx] = { ...list[idx], [key]: val }
      return list
    })
  }

  function removeFaq(idx) {
    setFaqs((prev) => prev.filter((_, i) => i !== idx))
  }

  // Content string: merge sections if content is empty
  const [markdownContent, setMarkdownContent] = useState(() => {
    if (blog.content) return blog.content
    if (Array.isArray(blog.sections) && blog.sections.length > 0) {
      return blog.sections
        .map((s) => {
          let str = `## ${s.heading}\n\n${s.content || ''}`
          if (s.table && s.table.headers && s.table.rows) {
            const headerRow = `| ${s.table.headers.join(' | ')} |`
            const dividerRow = `| ${s.table.headers.map(() => '---').join(' | ')} |`
            const dataRows = s.table.rows.map((r) => `| ${r.join(' | ')} |`).join('\n')
            str += `\n\n${headerRow}\n${dividerRow}\n${dataRows}`
          }
          return str
        })
        .join('\n\n')
    }
    return ''
  })

  // Auto-slug generator when typing title (if creating or if slug is clean)
  function handleTitleChange(val) {
    const updated = { ...b, title: val }
    if (isNew || !b.slug) {
      updated.slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    }
    // Auto read time estimate
    const wordCount = (val + ' ' + markdownContent).split(/\s+/).filter(Boolean).length
    const minutes = Math.max(3, Math.ceil(wordCount / 180))
    updated.readTime = `${minutes} min read`
    setB(updated)
  }

  // Cover image upload
  async function handleCoverUpload(files) {
    if (!files || !files.length) return
    setUploadingCover(true)
    try {
      const form = new FormData()
      for (const f of files) form.append('files', f)
      const r = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: form
      })
      const j = await r.json()
      if (j.success && j.urls?.length) {
        setB((prev) => ({ ...prev, coverImage: j.urls[0] }))
        toast.success('Cover image uploaded successfully')
      } else {
        toast.error(j.error || 'Upload failed')
      }
    } catch (e) {
      toast.error('Upload error: ' + e.message)
    }
    setUploadingCover(false)
  }

  // Author avatar upload
  async function handleAvatarUpload(files) {
    if (!files || !files.length) return
    setUploadingAvatar(true)
    try {
      const form = new FormData()
      for (const f of files) form.append('files', f)
      const r = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: form
      })
      const j = await r.json()
      if (j.success && j.urls?.length) {
        setB((prev) => ({
          ...prev,
          author: { ...prev.author, avatar: j.urls[0] }
        }))
        toast.success('Author photo uploaded successfully')
      } else {
        toast.error(j.error || 'Upload failed')
      }
    } catch (e) {
      toast.error('Upload error: ' + e.message)
    }
    setUploadingAvatar(false)
  }

  // Visual Editor Toolbar Action Inserts
  function insertFormat(snippet, defaultText = '') {
    const textarea = document.getElementById('blog-markdown-textarea')
    if (!textarea) return
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selected = textarea.value.substring(start, end) || defaultText

    let replacement = ''
    if (snippet === 'bold') replacement = `**${selected || 'bold text'}**`
    else if (snippet === 'italic') replacement = `*${selected || 'italic text'}*`
    else if (snippet === 'h2') replacement = `\n\n## ${selected || 'Section Heading'}\n\n`
    else if (snippet === 'h3') replacement = `\n\n### ${selected || 'Subheading'}\n\n`
    else if (snippet === 'bullet') replacement = `\n- ${selected || 'Key point 1'}\n- Key point 2\n- Key point 3\n`
    else if (snippet === 'number') replacement = `\n1. ${selected || 'Step 1'}\n2. Step 2\n3. Step 3\n`
    else if (snippet === 'quote') replacement = `\n> **Key Engineering Note:** ${selected || 'Important technical insight or guideline.'}\n\n`
    else if (snippet === 'table') {
      replacement = `\n\n| Specification | Details | Estimated Impact |\n| --- | --- | --- |\n| Module Type | Tier-1 N-Type TOPCon | 22.8% Efficiency |\n| Inverter | Grid-Tied Three Phase | 98.6% Conversion |\n| Net Metering | TANGEDCO Bi-Directional | Zero Bill Offset |\n\n`
    } else if (snippet === 'link') {
      replacement = `[${selected || 'Link title'}](https://ivrenergy.com)`
    }

    const newContent =
      markdownContent.substring(0, start) + replacement + markdownContent.substring(end)
    setMarkdownContent(newContent)

    // Re-estimate reading time
    const wordCount = (b.title + ' ' + newContent).split(/\s+/).filter(Boolean).length
    const minutes = Math.max(3, Math.ceil(wordCount / 180))
    setB((prev) => ({ ...prev, readTime: `${minutes} min read` }))
  }

  function handleSave(statusOverride) {
    if (!b.title || !b.title.trim()) {
      toast.error('Article title is required')
      return
    }
    const finalSlug = (b.slug || b.title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    if (!finalSlug) {
      toast.error('Valid URL slug is required')
      return
    }

    const tagsArr = rawTags.split(',').map((t) => t.trim()).filter(Boolean)
    const takeawaysArr = rawTakeaways.split('\n').map((t) => t.trim()).filter(Boolean)
    const cleanFaqs = faqs
      .map((f) => ({ q: (f.q || '').trim(), a: (f.a || '').trim() }))
      .filter((f) => f.q && f.a)

    const payload = {
      ...b,
      slug: finalSlug,
      content: markdownContent,
      sections: [],
      tags: tagsArr,
      keyTakeaways: takeawaysArr,
      faqs: cleanFaqs,
      status: statusOverride || b.status || 'published',
      publishedAt: b.publishedAt || new Date().toISOString().split('T')[0],
      formattedDate: b.formattedDate || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }

    onSave(payload)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-neutral-200"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/80">
          <div>
            <div className="text-xs uppercase tracking-wider font-bold text-neutral-500">
              {isNew ? 'New Blog Publication' : 'Edit Article'}
            </div>
            <h2 className="text-lg font-bold text-neutral-900 mt-0.5 truncate max-w-lg">
              {b.title || 'Untitled Article'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="h-9 w-9 rounded-full hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation in Editor */}
        <div className="px-6 border-b border-neutral-200 bg-white flex items-center justify-between overflow-x-auto">
          <div className="flex gap-2">
            {[
              { id: 'editor', label: 'Article & Content', icon: FileText },
              { id: 'seo', label: 'SEO & Metadata', icon: Globe },
              { id: 'takeaways', label: 'Key Highlights', icon: CheckSquare },
              { id: 'faqs', label: `Article FAQs (${faqs.length})`, icon: HelpCircle },
              { id: 'preview', label: 'Live Preview', icon: Eye }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`py-3 px-3.5 text-xs font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                  tab === t.id
                    ? 'border-[#D71920] text-[#D71920]'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <t.icon className="h-3.5 w-3.5" />
                {t.label}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-400">
            <span>Read Time: <strong className="text-neutral-700">{b.readTime || '5 min read'}</strong></span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {tab === 'editor' && (
            <div className="space-y-4">
              {/* Title & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-8">
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                    Article Title *
                  </label>
                  <Input
                    value={b.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. PM Surya Ghar Muft Bijli Yojana: Subsidy Guide 2026"
                    className="mt-1.5 h-11 rounded-xl font-bold text-sm"
                  />
                </div>

                <div className="md:col-span-4">
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                    Category *
                  </label>
                  <select
                    value={b.category}
                    onChange={(e) => setB({ ...b, category: e.target.value })}
                    className="mt-1.5 w-full h-11 px-3 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-semibold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#D71920]/20"
                  >
                    {BLOG_CATEGORIES.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Slug & Read Time */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-6">
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                    URL Slug (Canonical Path) *
                  </label>
                  <div className="mt-1.5 flex items-center rounded-xl border border-neutral-200 bg-neutral-50 px-3 h-11">
                    <span className="text-xs text-neutral-400 mr-1 select-none">/blog/</span>
                    <input
                      value={b.slug}
                      onChange={(e) =>
                        setB({
                          ...b,
                          slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '-')
                        })
                      }
                      placeholder="pm-surya-ghar-subsidy-guide"
                      className="w-full bg-transparent text-xs text-neutral-800 font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div className="md:col-span-3">
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                    Publish Date
                  </label>
                  <Input
                    type="date"
                    value={b.publishedAt}
                    onChange={(e) => setB({ ...b, publishedAt: e.target.value })}
                    className="mt-1.5 h-11 rounded-xl text-xs font-medium"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                    Reading Time
                  </label>
                  <Input
                    value={b.readTime}
                    onChange={(e) => setB({ ...b, readTime: e.target.value })}
                    placeholder="6 min read"
                    className="mt-1.5 h-11 rounded-xl text-xs font-medium"
                  />
                </div>
              </div>

              {/* Excerpt / Summary */}
              <div>
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                  Summary Excerpt (Meta Description & Card Teaser) *
                </label>
                <Textarea
                  value={b.excerpt}
                  onChange={(e) => setB({ ...b, excerpt: e.target.value })}
                  placeholder="A clear 2-3 line overview of this guide for search engines and social cards..."
                  rows={2}
                  className="mt-1.5 rounded-xl text-xs leading-relaxed"
                />
              </div>

              {/* Cover Image Upload Area & Drag-and-Drop */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                    Cover Photograph / Featured Graphic *
                  </label>
                  <label className="cursor-pointer text-xs font-bold text-[#D71920] hover:underline flex items-center gap-1">
                    <Upload className="h-3.5 w-3.5" />
                    {uploadingCover ? 'Uploading...' : 'Browse Computer'}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploadingCover}
                      onChange={(e) => {
                        handleCoverUpload(e.target.files)
                        e.target.value = ''
                      }}
                    />
                  </label>
                </div>

                <div
                  onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setCoverDragOver(true) }}
                  onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setCoverDragOver(false) }}
                  onDrop={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setCoverDragOver(false)
                    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                      handleCoverUpload(e.dataTransfer.files)
                    }
                  }}
                  className={`border-2 border-dashed rounded-2xl p-4 transition-all flex flex-col sm:flex-row items-center gap-4 ${
                    coverDragOver
                      ? 'border-[#D71920] bg-red-50/60 ring-2 ring-[#D71920]/20'
                      : 'border-neutral-200 bg-neutral-50/70 hover:bg-neutral-50'
                  }`}
                >
                  <div className="h-20 w-32 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-200 shrink-0 relative">
                    <img src={b.coverImage || '/projects/svs-1mw/1.jpg'} alt="Cover Preview" className="w-full h-full object-cover" />
                    {uploadingCover && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <Loader2 className="h-6 w-6 text-white animate-spin" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 text-center sm:text-left space-y-1 w-full">
                    <div className="text-xs font-semibold text-neutral-800">
                      {coverDragOver ? (
                        <span className="text-[#D71920] font-bold">Drop your image file here!</span>
                      ) : (
                        <span>Drag & drop cover graphic here, or click <strong>Browse Computer</strong></span>
                      )}
                    </div>
                    <p className="text-[11px] text-neutral-400">Supports PNG, JPG, WEBP (Recommended 16:9 banner)</p>
                    <div className="pt-1">
                      <Input
                        value={b.coverImage}
                        onChange={(e) => setB({ ...b, coverImage: e.target.value })}
                        placeholder="Or enter image URL: /projects/svs-1mw/1.jpg"
                        className="h-8 rounded-lg text-xs bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Formatting Toolbar */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-t-xl bg-neutral-100 border border-neutral-200 border-b-0">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 px-1">
                    Formatting Tools:
                  </span>
                  <div className="flex flex-wrap items-center gap-1">
                    <button
                      type="button"
                      onClick={() => insertFormat('h2')}
                      className="px-2 py-1 rounded bg-white hover:bg-neutral-200 text-xs font-bold text-neutral-800 shadow-sm transition-colors"
                      title="Insert H2 Heading"
                    >
                      H2
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormat('h3')}
                      className="px-2 py-1 rounded bg-white hover:bg-neutral-200 text-xs font-bold text-neutral-800 shadow-sm transition-colors"
                      title="Insert H3 Subheading"
                    >
                      H3
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormat('bold')}
                      className="px-2 py-1 rounded bg-white hover:bg-neutral-200 text-xs font-bold text-neutral-800 shadow-sm transition-colors"
                      title="Bold Text"
                    >
                      <b>B</b>
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormat('italic')}
                      className="px-2 py-1 rounded bg-white hover:bg-neutral-200 text-xs font-bold text-neutral-800 shadow-sm transition-colors"
                      title="Italic Text"
                    >
                      <i>I</i>
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormat('bullet')}
                      className="px-2 py-1 rounded bg-white hover:bg-neutral-200 text-xs font-bold text-neutral-800 shadow-sm transition-colors flex items-center gap-1"
                      title="Bullet List"
                    >
                      <List className="h-3.5 w-3.5" /> Bullet
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormat('number')}
                      className="px-2 py-1 rounded bg-white hover:bg-neutral-200 text-xs font-bold text-neutral-800 shadow-sm transition-colors flex items-center gap-1"
                      title="Numbered Steps"
                    >
                      <ListOrdered className="h-3.5 w-3.5" /> 1. 2. 3.
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormat('quote')}
                      className="px-2 py-1 rounded bg-white hover:bg-neutral-200 text-xs font-bold text-neutral-800 shadow-sm transition-colors flex items-center gap-1"
                      title="Callout Box"
                    >
                      <Quote className="h-3.5 w-3.5" /> Callout
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormat('table')}
                      className="px-2 py-1 rounded bg-white hover:bg-neutral-200 text-xs font-bold text-neutral-800 shadow-sm transition-colors flex items-center gap-1"
                      title="Data Table Template"
                    >
                      <Table className="h-3.5 w-3.5" /> Table
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormat('link')}
                      className="px-2 py-1 rounded bg-white hover:bg-neutral-200 text-xs font-bold text-neutral-800 shadow-sm transition-colors"
                      title="Insert Link"
                    >
                      Link
                    </button>
                  </div>
                </div>

                <Textarea
                  id="blog-markdown-textarea"
                  value={markdownContent}
                  onChange={(e) => setMarkdownContent(e.target.value)}
                  placeholder="Write your article in formatted Markdown here... Use ## for section headings, bullet points (-), bold (**text**), and tables."
                  rows={14}
                  className="rounded-t-none rounded-b-xl font-mono text-xs leading-relaxed border-t-0"
                />
              </div>
            </div>
          )}

          {tab === 'seo' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-red-50/50 border border-red-100 flex items-start gap-3">
                <Globe className="h-5 w-5 text-[#D71920] shrink-0 mt-0.5" />
                <div className="text-xs text-neutral-700 leading-relaxed">
                  <strong>Search Engine Optimization (SEO):</strong> Custom slugs and keywords allow your articles to rank on Google for terms like <em>"PM Surya Ghar subsidy Tamil Nadu"</em> and <em>"TANGEDCO solar net-metering"</em>.
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                  Target Search Keywords / Tags (Comma-Separated)
                </label>
                <Input
                  value={rawTags}
                  onChange={(e) => setRawTags(e.target.value)}
                  placeholder="PM Surya Ghar, TANGEDCO, Rooftop Solar, Solar Subsidy, Tamil Nadu"
                  className="mt-1.5 h-11 rounded-xl text-xs"
                />
              </div>

              {/* Author Attribution */}
              <div className="pt-4 border-t border-neutral-100 space-y-4">
                <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                  Author & Engineering Attribution
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-neutral-600 font-semibold">Author Name</label>
                    <Input
                      value={b.author?.name || ''}
                      onChange={(e) =>
                        setB({ ...b, author: { ...b.author, name: e.target.value } })
                      }
                      placeholder="Er. K. Manoj Kumar"
                      className="mt-1 h-10 rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-600 font-semibold">Author Role</label>
                    <Input
                      value={b.author?.role || ''}
                      onChange={(e) =>
                        setB({ ...b, author: { ...b.author, role: e.target.value } })
                      }
                      placeholder="Chief Solar EPC Engineer"
                      className="mt-1 h-10 rounded-xl text-xs"
                    />
                  </div>
                </div>

                {/* Author Photo Upload & Drag-and-Drop */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs text-neutral-700 font-bold uppercase tracking-wider">
                      Author Photo / Avatar
                    </label>
                    <label className="cursor-pointer text-xs font-bold text-[#D71920] hover:underline flex items-center gap-1">
                      <Upload className="h-3.5 w-3.5" />
                      {uploadingAvatar ? 'Uploading...' : 'Browse Photo'}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={uploadingAvatar}
                        onChange={(e) => {
                          handleAvatarUpload(e.target.files)
                          e.target.value = ''
                        }}
                      />
                    </label>
                  </div>

                  <div
                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setAvatarDragOver(true) }}
                    onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setAvatarDragOver(false) }}
                    onDrop={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setAvatarDragOver(false)
                      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                        handleAvatarUpload(e.dataTransfer.files)
                      }
                    }}
                    className={`border-2 border-dashed rounded-2xl p-4 transition-all flex flex-col sm:flex-row items-center gap-4 ${
                      avatarDragOver
                        ? 'border-[#D71920] bg-red-50/60 ring-2 ring-[#D71920]/20'
                        : 'border-neutral-200 bg-neutral-50/70 hover:bg-neutral-50'
                    }`}
                  >
                    <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-white shadow-md bg-neutral-900 shrink-0 relative">
                      <img
                        src={b.author?.avatar || '/projects/svs-1mw/1.jpg'}
                        alt="Author Preview"
                        className="w-full h-full object-cover"
                      />
                      {uploadingAvatar && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <Loader2 className="h-5 w-5 text-white animate-spin" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 text-center sm:text-left space-y-1 w-full">
                      <div className="text-xs font-semibold text-neutral-800">
                        {avatarDragOver ? (
                          <span className="text-[#D71920] font-bold">Drop photo file here!</span>
                        ) : (
                          <span>Drag & drop author photo here, or click <strong>Browse Photo</strong></span>
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-400">Supports PNG, JPG, or WEBP (Max 5MB)</p>
                      <div className="pt-1">
                        <Input
                          value={b.author?.avatar || ''}
                          onChange={(e) =>
                            setB({ ...b, author: { ...b.author, avatar: e.target.value } })
                          }
                          placeholder="Or enter image URL: /projects/svs-1mw/1.jpg"
                          className="h-8 rounded-lg text-xs bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status and Featured Toggle */}
              <div className="pt-3 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1">
                    Publication Status
                  </label>
                  <select
                    value={b.status || 'published'}
                    onChange={(e) => setB({ ...b, status: e.target.value })}
                    className="h-10 px-3 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-semibold text-neutral-800"
                  >
                    <option value="published">Published (Live on Website)</option>
                    <option value="draft">Draft (Private in Admin)</option>
                  </select>
                </div>

                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={Boolean(b.featured)}
                    onChange={(e) => setB({ ...b, featured: e.target.checked })}
                    className="h-4 w-4 rounded text-[#D71920] focus:ring-[#D71920]"
                  />
                  <span className="text-xs font-bold text-neutral-800">
                    ★ Feature this article at top of Blog Hub
                  </span>
                </label>
              </div>
            </div>
          )}

          {tab === 'takeaways' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60 flex items-start gap-3">
                <CheckSquare className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-neutral-700 leading-relaxed">
                  <strong>Key Takeaways Callout Box:</strong> Highlight the 3–5 most critical engineering and policy points. These appear in an amber highlight box right above the main article body.
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                  Bullet Points (One Point Per Line)
                </label>
                <Textarea
                  value={rawTakeaways}
                  onChange={(e) => setRawTakeaways(e.target.value)}
                  placeholder={`Central government subsidy covers up to ₹78,000.\nApplications must be processed through PM Surya Ghar portal.\nNet-metering integration with TANGEDCO is required.`}
                  rows={8}
                  className="mt-1.5 rounded-xl text-xs leading-relaxed font-mono"
                />
              </div>
            </div>
          )}

          {/* TAB 4: ARTICLE FAQS */}
          {tab === 'faqs' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-red-50/60 border border-red-100">
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-[#D71920] shrink-0 mt-0.5" />
                  <div className="text-xs text-neutral-700 leading-relaxed">
                    <strong>Article Frequently Asked Questions:</strong> Add targeted Q&As for this article. These appear in an accordion/card section below your article body, boosting on-page SEO and reader trust.
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={addFaq}
                  className="rounded-xl h-9 px-4 text-xs font-bold bg-[#D71920] hover:bg-[#b5141a] text-white shrink-0"
                >
                  <Plus className="h-3.5 w-3.5 mr-1" /> Add FAQ Item
                </Button>
              </div>

              {faqs.length === 0 ? (
                <div className="p-12 text-center bg-neutral-50 rounded-2xl border border-neutral-200">
                  <HelpCircle className="h-10 w-10 text-neutral-300 mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-neutral-800">No FAQs added to this article yet</h4>
                  <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                    Click the button below to add common questions, eligibility queries, and technical answers.
                  </p>
                  <Button
                    type="button"
                    onClick={addFaq}
                    className="mt-4 rounded-xl h-9 text-xs font-bold bg-[#D71920] hover:bg-[#b5141a] text-white"
                  >
                    <Plus className="h-3.5 w-3.5 mr-1.5" /> Add First Question
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {faqs.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-neutral-50 p-4 sm:p-5 rounded-2xl border border-neutral-200/90 space-y-3 relative group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#D71920] flex items-center gap-1.5">
                          <span className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center text-[11px] font-extrabold text-[#D71920]">
                            {idx + 1}
                          </span>
                          Question #{idx + 1}
                        </span>

                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFaq(idx)}
                          className="h-8 px-2.5 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="h-3.5 w-3.5 mr-1" /> Remove
                        </Button>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1">
                          Question *
                        </label>
                        <Input
                          value={item.q}
                          onChange={(e) => updateFaq(idx, 'q', e.target.value)}
                          placeholder="e.g. Can I apply for PM Surya Ghar if I live in an apartment?"
                          className="h-10 rounded-xl bg-white text-xs font-semibold"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1">
                          Answer * (Markdown bold & links supported)
                        </label>
                        <Textarea
                          value={item.a}
                          onChange={(e) => updateFaq(idx, 'a', e.target.value)}
                          placeholder="e.g. Yes, Group Housing Societies (GHS) and Resident Welfare Associations (RWAs) can install rooftop solar..."
                          rows={3}
                          className="rounded-xl bg-white text-xs leading-relaxed"
                        />
                      </div>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addFaq}
                    className="w-full rounded-2xl h-11 text-xs font-bold border-dashed border-2 border-neutral-300 hover:border-[#D71920] text-neutral-600 hover:text-[#D71920]"
                  >
                    <Plus className="h-4 w-4 mr-1.5" /> Add Another Question
                  </Button>
                </div>
              )}
            </div>
          )}

          {tab === 'preview' && (
            <div className="space-y-6 bg-neutral-50 p-6 rounded-2xl border border-neutral-200">
              {/* Preview Hero */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
                  <span className="px-3 py-1 rounded-full bg-[#D71920] text-white text-xs font-bold uppercase">
                    {b.category}
                  </span>
                  <span>•</span>
                  <span>{b.readTime || '5 min read'}</span>
                  <span>•</span>
                  <span>{b.publishedAt || 'Today'}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 leading-tight">
                  {b.title || 'Untitled Article Preview'}
                </h1>

                <p className="text-sm text-neutral-600 leading-relaxed">
                  {b.excerpt}
                </p>
              </div>

              {/* Preview Takeaways */}
              {rawTakeaways.trim() && (
                <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
                  <div className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckSquare className="h-4 w-4 text-amber-600" /> Key Engineering Takeaways
                  </div>
                  <ul className="space-y-1.5 text-xs text-neutral-700">
                    {rawTakeaways.split('\n').filter(Boolean).map((t, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#D71920] font-bold">•</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Preview Content */}
              <div className="prose prose-neutral max-w-none text-xs sm:text-sm leading-relaxed space-y-4 pt-4 border-t border-neutral-200">
                <div className="whitespace-pre-wrap font-sans text-neutral-800">
                  {markdownContent || 'No article content written yet.'}
                </div>
              </div>

              {/* Preview FAQs */}
              {faqs.filter(f => f.q && f.a).length > 0 && (
                <div className="space-y-4 pt-4 border-t border-neutral-200">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-[#D71920]" />
                    <h3 className="text-sm font-bold text-neutral-900">Frequently Asked Questions Preview</h3>
                  </div>
                  <div className="space-y-3">
                    {faqs.filter(f => f.q && f.a).map((faq, fIdx) => (
                      <div key={fIdx} className="p-4 rounded-xl bg-white border border-neutral-200 shadow-sm space-y-1.5">
                        <h4 className="font-bold text-neutral-900 text-xs sm:text-sm">{faq.q}</h4>
                        <p className="text-neutral-600 text-xs leading-relaxed whitespace-pre-line">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-neutral-50 rounded-b-3xl">
          <div className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${b.status === 'draft' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
            <span className="text-xs font-semibold text-neutral-600">
              Status: <strong className="text-neutral-900 capitalize">{b.status || 'published'}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-xl text-xs h-10 px-4"
            >
              Cancel
            </Button>

            <Button
              type="button"
              onClick={() => handleSave('draft')}
              variant="secondary"
              className="rounded-xl text-xs h-10 px-4 font-semibold"
            >
              Save as Draft
            </Button>

            <Button
              type="button"
              onClick={() => handleSave('published')}
              className="bg-[#D71920] hover:bg-[#a5121a] text-white rounded-xl text-xs h-10 px-5 font-bold shadow-md"
            >
              <Save className="h-4 w-4 mr-1.5" />
              {isNew ? 'Publish Now' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// -------- Website FAQs Manager --------
function WebsiteFaqsManager({ token }) {
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState(null) // { index, q, a }

  async function load() {
    setLoading(true)
    try {
      const r = await fetch('/api/content')
      const j = await r.json()
      if (j.content?.faqsList && Array.isArray(j.content.faqsList) && j.content.faqsList.length > 0) {
        setFaqs(j.content.faqsList)
      } else {
        setFaqs(DEFAULT_FAQS)
      }
    } catch (e) {
      setFaqs(DEFAULT_FAQS)
    }
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  async function saveFaqsList(updatedList) {
    setSaving(true)
    try {
      const r = await fetch('/api/admin/content', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ faqsList: updatedList })
      })
      const j = await r.json()
      if (j.success) {
        setFaqs(updatedList)
        toast.success('FAQs updated successfully & synced to live website')
        setEditing(null)
      } else {
        toast.error(j.error || 'Failed to save FAQs')
      }
    } catch (e) {
      toast.error('Save failed: ' + e.message)
    }
    setSaving(false)
  }

  function handleSaveModal(item) {
    if (!item.q.trim() || !item.a.trim()) {
      toast.error('Both question and answer are required')
      return
    }
    let updated = [...faqs]
    if (item.index !== undefined && item.index >= 0) {
      updated[item.index] = { q: item.q.trim(), a: item.a.trim() }
    } else {
      updated.unshift({ q: item.q.trim(), a: item.a.trim() })
    }
    saveFaqsList(updated)
  }

  function deleteFaq(idx) {
    if (!confirm('Are you sure you want to delete this FAQ item?')) return
    const updated = faqs.filter((_, i) => i !== idx)
    saveFaqsList(updated)
  }

  function resetToDefaults() {
    if (!confirm('Reset all website FAQs back to the 30+ default questions? Any custom changes will be overwritten.')) return
    saveFaqsList(DEFAULT_FAQS)
  }

  const filtered = faqs.filter(f => {
    if (!search) return true
    const s = search.toLowerCase()
    return (f.q || '').toLowerCase().includes(s) || (f.a || '').toLowerCase().includes(s)
  })

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-neutral-200 shadow-soft">
        <div>
          <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-[#D71920]" />
            Website Frequently Asked Questions (FAQs)
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            Manage the FAQ accordion items displayed publicly on <a href="/faqs" target="_blank" className="text-[#D71920] underline font-medium">/faqs</a>. Edits sync instantly.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={resetToDefaults}
            disabled={saving}
            className="rounded-xl text-xs text-neutral-600 hover:text-neutral-900"
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1" /> Reset Defaults
          </Button>

          <Button
            onClick={() => setEditing({ index: -1, q: '', a: '' })}
            className="bg-[#D71920] hover:bg-[#a5121a] text-white rounded-xl text-xs font-bold"
          >
            <Plus className="h-4 w-4 mr-1.5" /> Add New FAQ
          </Button>
        </div>
      </div>

      {/* Search & Stats Filter */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[260px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input
            placeholder="Search questions or answers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-11 rounded-xl bg-white text-xs"
          />
        </div>

        <div className="px-3.5 py-2.5 rounded-xl bg-neutral-100 text-xs font-bold text-neutral-600">
          Showing {filtered.length} of {faqs.length} FAQs
        </div>
      </div>

      {/* Content List */}
      {loading ? (
        <div className="p-16 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#D71920]" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl bg-white p-12 text-center border border-neutral-200">
          <HelpCircle className="h-10 w-10 text-neutral-300 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-neutral-800">No FAQs match your search</h3>
          <p className="text-xs text-neutral-500 mt-1">Try searching with a different keyword or add a new question.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3.5">
          {filtered.map((faq, idx) => {
            const originalIndex = faqs.findIndex(f => f.q === faq.q && f.a === faq.a)
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white p-5 border border-neutral-200/90 shadow-soft hover:shadow-md transition-all flex flex-col sm:flex-row items-start justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="h-6 w-6 rounded-full bg-red-50 text-[#D71920] border border-red-100 text-xs font-extrabold flex items-center justify-center shrink-0">
                      {originalIndex >= 0 ? originalIndex + 1 : idx + 1}
                    </span>
                    <h3 className="font-bold text-neutral-900 text-sm leading-snug">
                      {faq.q}
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed pl-8 whitespace-pre-line">
                    {faq.a}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => setEditing({ index: originalIndex >= 0 ? originalIndex : idx, q: faq.q, a: faq.a })}
                    className="h-8 px-3 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Edit3 className="h-3.5 w-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => deleteFaq(originalIndex >= 0 ? originalIndex : idx)}
                    className="h-8 w-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white flex items-center justify-center transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Edit/Create FAQ Modal */}
      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setEditing(null)}
          >
            <motion.form
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={(e) => {
                e.preventDefault()
                handleSaveModal(editing)
              }}
              className="bg-white rounded-3xl w-full max-w-xl shadow-2xl border border-neutral-200 overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-[#D71920]" />
                  <h3 className="font-bold text-neutral-900 text-sm sm:text-base">
                    {editing.index >= 0 ? 'Edit FAQ Item' : 'Add New FAQ Item'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="h-8 w-8 rounded-full hover:bg-neutral-200 text-neutral-500 flex items-center justify-center"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1.5">
                    Question *
                  </label>
                  <Input
                    value={editing.q}
                    onChange={(e) => setEditing({ ...editing, q: e.target.value })}
                    placeholder="e.g. How much space is required for a rooftop solar system?"
                    className="h-11 rounded-xl text-xs font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-1.5">
                    Answer * (Line breaks & detailed paragraphs supported)
                  </label>
                  <Textarea
                    value={editing.a}
                    onChange={(e) => setEditing({ ...editing, a: e.target.value })}
                    placeholder="Enter comprehensive answer explaining the system capacity, requirements, or government guidelines..."
                    rows={6}
                    className="rounded-xl text-xs leading-relaxed"
                    required
                  />
                </div>
              </div>

              <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditing(null)}
                  className="rounded-xl text-xs h-10 px-4"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-[#D71920] hover:bg-[#a5121a] text-white rounded-xl text-xs h-10 px-5 font-bold"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin mr-1.5" /> : <Save className="h-4 w-4 mr-1.5" />}
                  Save FAQ
                </Button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// -------- Shell --------
function AdminShell({ user, token, onLogout }) {
  const [tab, setTab] = useState('dashboard')
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'leads', label: 'Leads', icon: Users },
    { id: 'capacities', label: 'Solar kW Packages', icon: Zap },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'blogs', label: 'Blog Posts', icon: BookOpen },
    { id: 'faqs', label: 'Frequently Asked Questions', icon: HelpCircle },
    { id: 'content', label: 'Site Content', icon: ImageIcon },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare },
  ]
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top nav */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-3">
            <img src="/ivr-logo.webp" alt="IVR Energy" className="h-12 md:h-14 w-auto object-contain" />
            <div className="text-[10px] uppercase tracking-widest text-neutral-500 border-l border-neutral-200 pl-3">Admin</div>
          </a>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-sm text-neutral-600 px-3 py-1.5 rounded-full bg-neutral-100">
              <Sparkles className="h-3.5 w-3.5 text-[#D71920]" /> {user.username}
            </div>
            <Button onClick={onLogout} variant="outline" size="sm" className="rounded-full">
              <LogOut className="h-4 w-4 mr-1.5" /> Logout
            </Button>
          </div>
        </div>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex gap-1 -mb-px overflow-x-auto">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-4 py-3 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
                  tab === t.id ? 'border-[#D71920] text-[#D71920]' : 'border-transparent text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <t.icon className="h-4 w-4" /> {t.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-8">
        {tab === 'dashboard' && <Dashboard token={token} />}
        {tab === 'leads' && <Leads token={token} />}
        {tab === 'capacities' && <CapacitiesManager token={token} />}
        {tab === 'projects' && <Projects token={token} />}
        {tab === 'blogs' && <BlogsManager token={token} />}
        {tab === 'faqs' && <WebsiteFaqsManager token={token} />}
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
