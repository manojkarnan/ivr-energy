'use client'

import { use, useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Calendar, Clock, Share2, Check,
  ChevronRight, BookOpen, Sparkles, MessageCircle,
  Linkedin, Twitter, Copy, ArrowRight, HelpCircle,
  CheckCircle2, ShieldCheck, Zap
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { getBlogPostBySlug, BLOG_POSTS } from '@/data/blogs'

function renderFormattedText(text) {
  if (!text || typeof text !== 'string') return text

  // Split by markdown bold (**...**), markdown links ([text](url)), italic (*...*), and code (`...`)
  const regex = /(\*\*[\s\S]*?\*\*|\[[\s\S]*?\]\(https?:\/\/[^\s)]+\)|\*[^\s*][\s\S]*?\*|`[\s\S]*?`)/g
  const parts = text.split(regex)

  return parts.map((part, index) => {
    if (!part) return null

    // Bold **text**
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return (
        <strong key={index} className="font-bold text-neutral-900">
          {part.slice(2, -2)}
        </strong>
      )
    }

    // Markdown Link [text](url)
    const linkMatch = part.match(/^\[([\s\S]*?)\]\((https?:\/\/[^\s)]+)\)$/)
    if (linkMatch) {
      return (
        <a
          key={index}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#D71920] font-semibold underline underline-offset-2 hover:text-red-700 transition-colors inline-flex items-center gap-0.5"
        >
          {linkMatch[1]}
        </a>
      )
    }

    // Italic *text*
    if (part.startsWith('*') && part.endsWith('*') && part.length >= 2 && !part.startsWith('**')) {
      return (
        <em key={index} className="italic text-neutral-800">
          {part.slice(1, -1)}
        </em>
      )
    }

    // Inline Code `code`
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return (
        <code key={index} className="px-1.5 py-0.5 rounded bg-neutral-100 font-mono text-xs text-neutral-800 border border-neutral-200">
          {part.slice(1, -1)}
        </code>
      )
    }

    return part
  })
}

export default function BlogPostPage({ params }) {
  const { slug } = use(params)
  const [copied, setCopied] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [post, setPost] = useState(() => getBlogPostBySlug(slug))
  const [allPosts, setAllPosts] = useState(BLOG_POSTS)

  useEffect(() => {
    fetch('/api/blogs')
      .then((r) => r.json())
      .then((data) => {
        if (data.blogs && Array.isArray(data.blogs) && data.blogs.length > 0) {
          setAllPosts(data.blogs)
          const found = data.blogs.find((b) => b.slug === slug || b.id === slug)
          if (found) {
            setPost(found)
          }
        }
      })
      .catch(() => {})
  }, [slug])

  // Track reading progress
  useEffect(() => {
    window.scrollTo(0, 0)
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)))
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [slug])

  const copyUrl = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center text-white">
        <div className="h-16 w-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[#ff4b55] mb-4">
          <BookOpen className="h-8 w-8" />
        </div>
        <h2 className="text-3xl font-extrabold text-white">Article Not Found</h2>
        <p className="mt-3 text-neutral-400 max-w-md text-sm">
          We couldn't locate the specific solar article or guide you requested.
        </p>
        <Button asChild className="mt-8 bg-[#D71920] hover:bg-[#b01319] text-white rounded-full px-8 h-11 text-xs font-bold shadow-md">
          <Link href="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Solar Knowledge Hub</Link>
        </Button>
      </div>
    )
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3)

  const tocItems = useMemo(() => {
    if (post.sections && post.sections.length > 0) {
      return post.sections.map((sec, idx) => ({
        id: `section-${idx}`,
        title: sec.heading
      }))
    }
    if (post.content) {
      const lines = post.content.split('\n')
      const items = []
      lines.forEach((line) => {
        const trimmed = line.trim()
        if (trimmed.startsWith('## ')) {
          const text = trimmed.replace(/^##\s+/, '')
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
          items.push({ id, title: text })
        }
      })
      return items
    }
    return []
  }, [post])

  return (
    <article itemScope itemType="https://schema.org/BlogPosting" className="min-h-screen bg-black font-sans antialiased text-neutral-100 selection:bg-[#D71920] selection:text-white relative">
      {/* Fixed Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-[100]">
        <div
          className="h-full bg-gradient-to-r from-[#D71920] to-orange-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Navbar />

      {/* JSON-LD Schema for BlogPosting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            image: post.coverImage?.startsWith('http') ? post.coverImage : `https://ivrenergy.com${post.coverImage || '/projects/svs-1mw/1.jpg'}`,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt || post.publishedAt,
            inLanguage: 'en-IN',
            keywords: Array.isArray(post.tags) ? post.tags.join(', ') : 'Solar Energy, Rooftop Solar, Tamil Nadu',
            articleSection: post.category || 'Solar Energy',
            author: {
              '@type': 'Person',
              name: post.author?.name || 'IVR Energy Editorial Team',
              jobTitle: post.author?.role || 'Solar Energy Specialist',
            },
            publisher: {
              '@type': 'Organization',
              name: 'IVR Energy',
              logo: {
                '@type': 'ImageObject',
                url: 'https://ivrenergy.com/icon.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://ivrenergy.com/blog/${post.slug}`,
            },
          }),
        }}
      />

      {/* JSON-LD Schema for Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://ivrenergy.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Solar Blog',
                item: 'https://ivrenergy.com/blog',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: post.title,
                item: `https://ivrenergy.com/blog/${post.slug}`,
              },
            ],
          }),
        }}
      />

      {/* JSON-LD Schema for FAQ (if applicable) */}
      {post.faqs && post.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: post.faqs.map((f) => ({
                '@type': 'Question',
                name: f.q || f.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: f.a || f.answer,
                },
              })),
            }),
          }}
        />
      )}

      {/* =========================================================================
          HERO BANNER
          ========================================================================= */}
      <header className="relative pt-28 pb-10 sm:pt-36 sm:pb-14 md:pt-40 md:pb-16 overflow-hidden bg-black text-white">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#D71920]/20 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-neutral-400 mb-5 flex-wrap">
            <Link href="/blog" className="hover:text-white transition-colors">Solar Blog</Link>
            <ChevronRight className="h-3 w-3 text-neutral-600 shrink-0" />
            <span className="text-[#ff4b55] truncate max-w-[150px] sm:max-w-xs">{post.category}</span>
          </nav>

          {/* Category, Meta Pills & Share Details Top Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-neutral-200 text-[11px] sm:text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-[11px] sm:text-xs text-neutral-300 font-medium px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md">
                <Clock className="h-3.5 w-3.5 text-neutral-400" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1.5 text-[11px] sm:text-xs text-neutral-300 font-medium px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md">
                <Calendar className="h-3.5 w-3.5 text-neutral-400" />
                {post.formattedDate}
              </span>
            </div>

            {/* Social Share Buttons in Straight Right Corner */}
            <div className="flex items-center gap-1.5 shrink-0 ml-auto sm:ml-0">
              <span className="text-[11px] font-bold text-neutral-400 mr-1 uppercase tracking-wider">Share:</span>
              <button
                onClick={copyUrl}
                title="Copy Link"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white border border-white/10 transition-colors"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${post.title} - Read more: https://ivrenergy.com/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on WhatsApp"
                className="p-2 rounded-full bg-white/10 hover:bg-[#25D366] text-neutral-300 hover:text-white border border-white/10 transition-colors"
              >
                <MessageCircle className="h-3.5 w-3.5" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=https://ivrenergy.com/blog/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on LinkedIn"
                className="p-2 rounded-full bg-white/10 hover:bg-[#0077b5] text-neutral-300 hover:text-white border border-white/10 transition-colors"
              >
                <Linkedin className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Article Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-white leading-[1.08] break-words mb-4 sm:mb-6">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed font-normal mb-2 break-words">
            {post.excerpt}
          </p>
        </div>
      </header>

      {/* =========================================================================
          MAIN ARTICLE CONTENT LAYOUT
          ========================================================================= */}
      <main className="container mx-auto px-4 sm:px-6 max-w-7xl py-8 sm:py-12">
        {/* Cover Photo */}
        <div className="relative aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden mb-8 sm:mb-12 border border-neutral-800 shadow-2xl bg-neutral-900">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10">
          {/* Main Article Body (Span 8) */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8">
            {/* Key Takeaways Callout Card */}
            {post.keyTakeaways && post.keyTakeaways.length > 0 && (
              <div className="rounded-2xl sm:rounded-3xl bg-neutral-900/90 border border-neutral-800 p-5 sm:p-8 space-y-4 shadow-lg">
                <div className="flex items-center gap-2 text-[#ff4b55] font-bold text-sm uppercase tracking-wider">
                  <Sparkles className="h-4 w-4 shrink-0" />
                  <span>Executive Key Takeaways</span>
                </div>
                <ul className="space-y-3">
                  {post.keyTakeaways.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                      <CheckCircle2 className="h-4 w-4 text-[#D71920] shrink-0 mt-0.5" />
                      <span>{renderFormattedText(item)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Article Sections (Clean White Bento Container) */}
            <div className="rounded-2xl sm:rounded-3xl bg-white text-neutral-900 border border-neutral-200/80 p-5 sm:p-8 md:p-10 shadow-[0_4px_25px_rgba(0,0,0,0.05)] space-y-6 sm:space-y-8 overflow-hidden">
              {post.content ? (
                <div className="space-y-6 text-neutral-700 text-sm sm:text-base leading-relaxed">
                  {post.content.split('\n\n').map((block, bIdx) => {
                    const trimmed = block.trim()
                    if (!trimmed) return null
                    
                    // Headings
                    if (trimmed.startsWith('## ')) {
                      const headingText = trimmed.replace(/^##\s+/, '')
                      const headingId = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                      return (
                        <h2 key={bIdx} id={headingId} className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight leading-snug pt-4 border-t border-neutral-100 first:pt-0 first:border-0 scroll-mt-28">
                          {renderFormattedText(headingText)}
                        </h2>
                      )
                    }
                    if (trimmed.startsWith('### ')) {
                      const headingText = trimmed.replace(/^###\s+/, '')
                      const headingId = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                      return (
                        <h3 key={bIdx} id={headingId} className="text-lg sm:text-xl font-bold text-neutral-900 tracking-tight leading-snug pt-2 scroll-mt-28">
                          {renderFormattedText(headingText)}
                        </h3>
                      )
                    }

                    // Blockquote / Callout
                    if (trimmed.startsWith('> ')) {
                      return (
                        <div key={bIdx} className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-neutral-800 text-sm leading-relaxed">
                          {renderFormattedText(trimmed.replace(/^>\s+/, ''))}
                        </div>
                      )
                    }

                    // Markdown Table
                    if (trimmed.includes('|') && trimmed.split('\n').length >= 2) {
                      const lines = trimmed.split('\n').map(l => l.trim()).filter(Boolean)
                      const headerLine = lines[0]
                      const isTable = lines.some(l => l.includes('---'))
                      if (isTable) {
                        const headers = headerLine.split('|').map(c => c.trim()).filter(Boolean)
                        const rowLines = lines.slice(2)
                        return (
                          <div key={bIdx} className="my-6 overflow-x-auto rounded-2xl border border-neutral-200 shadow-sm bg-neutral-50/50">
                            <table className="w-full text-left text-xs sm:text-sm">
                              <thead className="bg-neutral-900 text-white font-bold">
                                <tr>
                                  {headers.map((h, hIdx) => (
                                    <th key={hIdx} className="p-3.5 border-b border-neutral-800 whitespace-nowrap">
                                      {renderFormattedText(h)}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-neutral-200 font-medium">
                                {rowLines.map((rLine, rIdx) => {
                                  const cells = rLine.split('|').map(c => c.trim()).filter(Boolean)
                                  if (cells.length === 0) return null
                                  return (
                                    <tr key={rIdx} className="hover:bg-neutral-100/80 transition-colors">
                                      {cells.map((cell, cIdx) => (
                                        <td key={cIdx} className={`p-3.5 text-neutral-800 ${cIdx === 0 ? 'font-bold text-neutral-900' : ''}`}>
                                          {renderFormattedText(cell)}
                                        </td>
                                      ))}
                                    </tr>
                                  )
                                })}
                              </tbody>
                            </table>
                          </div>
                        )
                      }
                    }

                    // Bullet List
                    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                      const items = trimmed.split('\n').filter(Boolean)
                      return (
                        <ul key={bIdx} className="space-y-2.5 pl-4">
                          {items.map((it, iIdx) => (
                            <li key={iIdx} className="flex items-start gap-2.5 text-neutral-700 text-sm sm:text-base leading-relaxed">
                              <span className="text-[#D71920] font-bold mt-1">•</span>
                              <span className="flex-1">{renderFormattedText(it.replace(/^[-*]\s+/, ''))}</span>
                            </li>
                          ))}
                        </ul>
                      )
                    }

                    // Numbered List
                    if (/^\d+\.\s+/.test(trimmed)) {
                      const items = trimmed.split('\n').filter(Boolean)
                      return (
                        <ol key={bIdx} className="space-y-3 pl-1">
                          {items.map((it, iIdx) => (
                            <li key={iIdx} className="flex items-start gap-3 text-neutral-700 text-sm sm:text-base leading-relaxed">
                              <span className="h-6 w-6 rounded-full bg-red-100 text-[#D71920] font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                                {iIdx + 1}
                              </span>
                              <span className="flex-1">{renderFormattedText(it.replace(/^\d+\.\s+/, ''))}</span>
                            </li>
                          ))}
                        </ol>
                      )
                    }

                    return (
                      <p key={bIdx} className="text-neutral-700 whitespace-pre-line leading-relaxed">
                        {renderFormattedText(trimmed)}
                      </p>
                    )
                  })}
                </div>
              ) : post.sections && post.sections.length > 0 ? (
                post.sections.map((section, idx) => (
                  <section key={idx} id={`section-${idx}`} className="space-y-4 scroll-mt-28">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight leading-snug">
                      {renderFormattedText(section.heading)}
                    </h2>

                    <div className="text-neutral-700 text-sm sm:text-base leading-relaxed space-y-3 whitespace-pre-line font-normal">
                      {renderFormattedText(section.content)}
                    </div>

                    {section.table && (
                      <div className="mt-6 overflow-x-auto rounded-2xl border border-neutral-200 shadow-sm bg-neutral-50/50">
                        <table className="w-full text-left text-xs sm:text-sm">
                          <thead className="bg-neutral-900 text-white font-bold">
                            <tr>
                              {section.table.headers.map((h, i) => (
                                <th key={i} className="p-3.5 border-b border-neutral-800 whitespace-nowrap">
                                  {renderFormattedText(h)}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-200 font-medium">
                            {section.table.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-neutral-100/80 transition-colors">
                                {row.map((cell, cIdx) => (
                                  <td
                                    key={cIdx}
                                    className={`p-3.5 text-neutral-800 ${
                                      cIdx === 0 ? 'font-bold text-neutral-900' : ''
                                    }`}
                                  >
                                    {renderFormattedText(cell)}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </section>
                ))
              ) : (
                <p className="text-neutral-500 italic">No content available for this post.</p>
              )}
            </div>

            {/* Author Footer Card */}
            {post.author && post.author.name && post.author.name.trim() && (
              <div className="rounded-3xl bg-neutral-900 border border-neutral-800 p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-4">
                <div className="h-14 w-14 rounded-full bg-neutral-800 border border-white/20 overflow-hidden shrink-0 shadow-md">
                  <img
                    src={post.author.avatar || '/ivr-logo.webp'}
                    alt={post.author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Written by {post.author.name}</div>
                  <div className="text-xs text-neutral-400 mt-0.5">
                    {post.author.role ? `${post.author.role} at IVR Energy` : 'IVR Energy Solar Expert'}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Sidebar (Span 4) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Table of Contents Bento Box */}
            <div className="rounded-3xl bg-white text-neutral-900 border border-neutral-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 font-bold text-neutral-900 text-sm">
                <BookOpen className="h-4 w-4 text-[#D71920]" />
                <span>Table of Contents</span>
              </div>
              <nav aria-label="Table of Contents" className="space-y-2 text-xs font-medium">
                {tocItems.length > 0 ? (
                  tocItems.map((item, sIdx) => (
                    <a
                      key={sIdx}
                      href={`#${item.id}`}
                      className="block p-2 rounded-xl text-neutral-600 hover:text-[#D71920] hover:bg-neutral-50 transition-colors line-clamp-1"
                    >
                      {sIdx + 1}. {item.title}
                    </a>
                  ))
                ) : (
                  <p className="text-neutral-400 italic text-[11px]">Key sections outlined in text</p>
                )}
              </nav>

              <div className="pt-4 border-t border-neutral-100">
                <div className="text-[11px] font-semibold text-neutral-400 mb-2 uppercase tracking-wider">
                  Article Tags
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 text-[10px] font-medium border border-neutral-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Consultation Bento Card */}
            <div className="rounded-3xl bg-gradient-to-br from-[#D71920] to-[#b01319] p-6 sm:p-7 text-white shadow-xl space-y-4">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
                Turnkey Solar EPC
              </span>
              <h3 className="text-xl font-bold leading-tight text-white">
                Get a Customized Solar Proposal for Your Rooftop
              </h3>
              <p className="text-xs text-white/90 leading-relaxed">
                Connect with our senior engineers for precise 3D shadow analysis, subsidy guidance, and guaranteed turnkey pricing.
              </p>
              <div className="pt-2">
                <Button asChild className="w-full bg-white hover:bg-neutral-100 text-[#D71920] font-bold rounded-full h-11 text-xs shadow-md">
                  <Link href="/contact">Book Free Site Survey <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Link>
                </Button>
              </div>
            </div>

            {/* Frequently Asked Questions Card (Below Customized Proposal Card) */}
            {post.faqs && post.faqs.length > 0 && (
              <div className="rounded-3xl bg-white text-neutral-900 border border-neutral-200 p-6 shadow-sm space-y-5">
                <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-100">
                  <div className="h-7 w-7 rounded-full bg-red-50 text-[#D71920] border border-red-100 flex items-center justify-center shrink-0">
                    <HelpCircle className="h-3.5 w-3.5" />
                  </div>
                  <h3 className="font-bold text-neutral-900 text-sm">Frequently Asked Questions</h3>
                </div>

                <div className="space-y-3.5">
                  {post.faqs.map((faq, fIdx) => (
                    <div
                      key={fIdx}
                      className="rounded-2xl bg-neutral-50 p-4 border border-neutral-200/70 space-y-1.5 hover:border-neutral-300 transition-colors"
                    >
                      <h4 className="font-bold text-neutral-900 text-xs sm:text-sm">
                        {renderFormattedText(faq.q || faq.question)}
                      </h4>
                      <p className="text-neutral-600 text-xs leading-relaxed whitespace-pre-line">
                        {renderFormattedText(faq.a || faq.answer)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* =========================================================================
            RELATED ARTICLES SECTION
            ========================================================================= */}
        {relatedPosts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-white/10 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-extrabold text-white">Recommended Solar Guides</h3>
                <p className="text-xs text-neutral-400 mt-1">Continue exploring our industry research and installation playbooks.</p>
              </div>
              <Button asChild className="bg-black hover:bg-neutral-900 text-white border border-white/20 hover:border-white/50 rounded-full text-xs font-bold h-10 px-5 transition-all shadow-sm">
                <Link href="/blog">View All Guides <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rPost) => (
                <article
                  key={rPost.id}
                  className="group flex flex-col rounded-3xl bg-white border border-neutral-200/80 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <Link href={`/blog/${rPost.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-neutral-100">
                    <img
                      src={rPost.coverImage}
                      alt={rPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/95 text-[#D71920] text-[10px] font-bold shadow-sm">
                        {rPost.category}
                      </span>
                    </div>
                  </Link>
                  <div className="p-5 flex flex-col justify-between flex-1 space-y-3">
                    <h4 className="font-bold text-neutral-900 text-sm line-clamp-2 leading-snug">
                      <Link href={`/blog/${rPost.slug}`}>{rPost.title}</Link>
                    </h4>
                    <div className="flex items-center justify-between pt-3 border-t border-neutral-100 text-xs">
                      <span className="text-neutral-500 text-[11px]">{rPost.readTime}</span>
                      <Link href={`/blog/${rPost.slug}`} className="font-bold text-[#D71920] flex items-center gap-1">
                        Read <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </article>
  )
}
