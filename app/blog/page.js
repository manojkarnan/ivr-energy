'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Calendar, Clock, ArrowRight, Sparkles,
  Tag, BookOpen, ChevronRight, ChevronLeft, X, Layers,
  Lightbulb, ShieldCheck, Zap
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { BLOG_CATEGORIES, BLOG_POSTS } from '@/data/blogs'

const POSTS_PER_PAGE = 4

export default function BlogIndexPage() {
  const [posts, setPosts] = useState(BLOG_POSTS)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [content, setContent] = useState(null)

  useEffect(() => {
    fetch('/api/blogs')
      .then((r) => r.json())
      .then((data) => {
        if (data.blogs && Array.isArray(data.blogs) && data.blogs.length > 0) {
          setPosts(data.blogs)
        }
      })
      .catch(() => {})

    fetch('/api/content')
      .then((r) => r.json())
      .then((data) => setContent(data.content))
      .catch(() => {})
  }, [])

  const filteredPosts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim()
    if (!query) return posts
    return posts.filter((post) => {
      const titleMatch = (post.title || '').toLowerCase().includes(query)
      const excerptMatch = (post.excerpt || '').toLowerCase().includes(query)
      const tagsMatch = Array.isArray(post.tags) && post.tags.some((t) => (t || '').toLowerCase().includes(query))
      const catMatch = (post.category || '').toLowerCase().includes(query)
      return titleMatch || excerptMatch || tagsMatch || catMatch
    })
  }, [searchQuery, posts])

  const featuredPost = useMemo(() => {
    return posts.find((p) => p.featured) || posts[0]
  }, [posts])

  // Reset to first slide when user searches
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  const postsList = useMemo(() => {
    return searchQuery ? filteredPosts : filteredPosts.filter((p) => (p.id || p.slug) !== (featuredPost?.id || featuredPost?.slug))
  }, [searchQuery, filteredPosts, featuredPost])

  const totalPages = Math.ceil(postsList.length / POSTS_PER_PAGE) || 1

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE
    return postsList.slice(start, start + POSTS_PER_PAGE)
  }, [postsList, currentPage])

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    const element = document.getElementById('articles-hub')
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top: topOffset, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-black font-sans antialiased text-neutral-100 selection:bg-[#D71920] selection:text-white">
      <Navbar />

      {/* JSON-LD Schema for Blog and Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'IVR Energy Solar Blog & Knowledge Hub',
            description:
              'Expert rooftop solar guides, PM Surya Ghar subsidy insights, commercial & industrial solar ROI analysis, and clean energy engineering.',
            url: 'https://ivrenergy.com/blog',
            inLanguage: 'en-IN',
            publisher: {
              '@type': 'Organization',
              name: 'IVR Energy (OPC) Private Limited',
              url: 'https://ivrenergy.com',
              logo: {
                '@type': 'ImageObject',
                url: 'https://ivrenergy.com/icon.png',
              },
            },
            blogPost: posts.slice(0, 10).map((p) => ({
              '@type': 'BlogPosting',
              headline: p.title,
              description: p.excerpt,
              url: `https://ivrenergy.com/blog/${p.slug}`,
              datePublished: p.publishedAt,
              dateModified: p.updatedAt || p.publishedAt,
              image: p.coverImage?.startsWith('http') ? p.coverImage : `https://ivrenergy.com${p.coverImage || '/projects/svs-1mw/1.jpg'}`,
              author: {
                '@type': 'Person',
                name: p.author?.name || 'IVR Energy Editorial Team',
              },
            })),
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
            ],
          }),
        }}
      />

      {/* =========================================================================
          HERO SECTION (Dark Obsidian Canvas with Ambient Glow)
          ========================================================================= */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden bg-black">
        {/* Ambient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] bg-gradient-to-tr from-[#D71920]/20 via-red-600/10 to-orange-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

        {/* Subtle Dot Grid */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none -z-10"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10 text-center max-w-3xl">
          {/* Main Headline */}
          {content?.blogPageTitle ? (
            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.08] text-white"
              dangerouslySetInnerHTML={{ __html: content.blogPageTitle }}
            />
          ) : (
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.08] text-white">
              Solar Energy Guides, Subsidies &{' '}
              <span className="font-normal bg-gradient-to-r from-[#ff4b55] via-[#D71920] to-orange-500 bg-clip-text text-transparent">
                Industry Innovations
              </span>
            </h1>
          )}

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-lg text-neutral-400 leading-relaxed max-w-2xl mx-auto font-normal">
            {content?.blogPageSubtitle || 'Actionable technical breakdowns, TANGEDCO policy updates, commercial ROI modeling, and PM Surya Ghar step-by-step guides authored by IVR Energy engineers.'}
          </p>

          {/* Live Search Bar */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-4 w-4 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search articles by keyword, policy, or solar technology..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-11 pr-10 rounded-full bg-white/[0.07] border border-white/15 focus:border-[#D71920] text-sm text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D71920]/40 backdrop-blur-xl transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 p-1 rounded-full text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MAIN CONTENT SECTION
          ========================================================================= */}
      <main className="container mx-auto px-4 sm:px-6 max-w-7xl py-10" id="articles-hub">
        {/* =========================================================================
            FEATURED ARTICLE BENTO HERO (Only shown on Page 1 when no search query is typed)
            ========================================================================= */}
        {!searchQuery && currentPage === 1 && featuredPost && (
          <div className="mb-14">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block relative rounded-3xl bg-white border border-neutral-200 overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_40px_rgba(215,25,32,0.18)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Left: Image Container (Span 7) */}
                <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-neutral-900 min-h-[300px] lg:min-h-[420px]">
                  <img
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.9]"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1.5 rounded-full bg-[#D71920] text-white text-xs font-bold uppercase tracking-wider shadow-md">
                      ★ Featured Guide
                    </span>
                  </div>
                </div>

                {/* Right: Content Details (Span 5) */}
                <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between text-neutral-900 bg-white">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs font-semibold text-neutral-500">
                      <span className="px-2.5 py-0.5 rounded-md bg-neutral-100 text-neutral-700 border border-neutral-200">
                        {featuredPost.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-neutral-400" />
                        {featuredPost.readTime}
                      </span>
                      <span>•</span>
                      <span>{featuredPost.formattedDate}</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 leading-tight">
                      {featuredPost.title}
                    </h2>

                    <p className="text-neutral-600 text-sm sm:text-base leading-relaxed line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-neutral-100 flex items-center justify-between mt-6">
                    {featuredPost.author?.name && featuredPost.author.name.trim() ? (
                      <div className="flex items-center gap-2.5">
                        {featuredPost.author.avatar && (
                          <div className="h-9 w-9 rounded-full bg-neutral-100 border border-neutral-200 overflow-hidden shrink-0">
                            <img
                              src={featuredPost.author.avatar}
                              alt={featuredPost.author.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <div className="text-xs font-bold text-neutral-900">{featuredPost.author.name}</div>
                          {featuredPost.author.role && (
                            <div className="text-[11px] text-neutral-500">{featuredPost.author.role}</div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div />
                    )}

                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-neutral-950 text-white text-xs font-bold group-hover:bg-[#D71920] transition-colors shadow-sm">
                      Read Guide <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* =========================================================================
            ARTICLES LIST (Rectangular Bento Cards - Matching Featured Shape)
            ========================================================================= */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Latest Solar Articles'}
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Showing {paginatedPosts.length} of {postsList.length} articles {totalPages > 1 && `(Slide ${currentPage} of ${totalPages})`}
            </p>
          </div>
        </div>

        {paginatedPosts.length > 0 ? (
          <div className="space-y-8">
            {paginatedPosts.map((post) => {
              return (
                <article
                  key={post.id}
                  className="group block relative rounded-3xl bg-white border border-neutral-200/90 overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_40px_rgba(215,25,32,0.14)] transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    {/* Left: Image Container (Span 5) */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-neutral-900 min-h-[220px] lg:min-h-[280px]"
                    >
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.95]"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3.5 py-1.5 rounded-full bg-[#D71920] text-white text-xs font-bold uppercase tracking-wider shadow-md">
                          {post.category}
                        </span>
                      </div>
                    </Link>

                    {/* Right: Content Details (Span 7) */}
                    <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between text-neutral-900 bg-white">
                      <div className="space-y-3.5">
                        <div className="flex items-center gap-3 text-xs font-semibold text-neutral-500">
                          <span className="px-2.5 py-0.5 rounded-md bg-neutral-100 text-neutral-700 border border-neutral-200">
                            {post.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-neutral-400" />
                            {post.readTime}
                          </span>
                          <span>•</span>
                          <span>{post.formattedDate}</span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 leading-tight">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>

                        <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed line-clamp-3 font-normal">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-5 border-t border-neutral-100 flex items-center justify-between mt-5">
                        {post.author?.name && post.author.name.trim() ? (
                          <div className="flex items-center gap-2.5">
                            {post.author.avatar && (
                              <div className="h-9 w-9 rounded-full bg-neutral-100 border border-neutral-200 overflow-hidden shrink-0">
                                <img
                                  src={post.author.avatar}
                                  alt={post.author.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <div>
                              <div className="text-xs font-bold text-neutral-900">{post.author.name}</div>
                              {post.author.role && (
                                <div className="text-[11px] text-neutral-500">{post.author.role}</div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div />
                        )}

                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-neutral-950 hover:bg-[#D71920] text-white text-xs font-bold transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
                        >
                          Read Guide <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}

            {/* =========================================================================
                SLIDE / PAGINATION CONTROLS (5 Articles Per Slide)
                ========================================================================= */}
            {totalPages > 1 && (
              <div className="pt-6 flex flex-wrap items-center justify-center gap-2.5">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none text-white text-xs font-bold border border-white/10 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" /> Previous
                </button>

                <div className="flex items-center gap-1.5 mx-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`h-9 w-9 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        currentPage === pageNum
                          ? 'bg-[#D71920] text-white shadow-lg scale-105 font-extrabold'
                          : 'bg-white/10 hover:bg-white/20 text-neutral-300 border border-white/10'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none text-white text-xs font-bold border border-white/10 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white/5 rounded-3xl border border-dashed border-white/15 max-w-lg mx-auto">
            <BookOpen className="h-12 w-12 mx-auto text-neutral-500 mb-3" />
            <h3 className="text-lg font-bold text-white">No Articles Found</h3>
            <p className="text-xs text-neutral-400 mt-1 mb-6">
              We couldn't find any articles matching your search query. Try another keyword.
            </p>
            <Button
              onClick={() => setSearchQuery('')}
              className="bg-[#D71920] hover:bg-[#b01319] text-white rounded-full px-6 h-10 text-xs font-bold"
            >
              Clear Search
            </Button>
          </div>
        )}

        {/* =========================================================================
            NEWSLETTER / EXPERT CONSULTATION CTA BOX
            ========================================================================= */}
        <section className="mt-16">
          <div className="relative overflow-hidden rounded-3xl bg-black border border-neutral-800 p-8 sm:p-12 text-white shadow-2xl">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#D71920]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-2xl space-y-3">
                <span className="px-3.5 py-1 rounded-full bg-[#D71920]/20 border border-[#D71920]/40 text-white text-xs font-bold uppercase tracking-wider">
                  Solar Engineering Advisory
                </span>
                <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                  Need Custom Solar Sizing or Subsidy Support?
                </h3>
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                  Speak directly with our senior solar engineers. We assist with 3D rooftop shadow analysis, DISCOM net-metering documentation, and PM Surya Ghar application processing.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3.5 shrink-0">
                <Button
                  asChild
                  className="bg-[#D71920] hover:bg-[#b01319] text-white font-bold rounded-full px-8 h-12 text-sm shadow-[0_4px_25px_rgba(215,25,32,0.6)] transition-all hover:scale-105"
                >
                  <Link href="/contact">
                    Book Free Site Survey <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
