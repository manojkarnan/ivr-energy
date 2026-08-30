import { cn } from "@/lib/utils"
import { TestimonialCard, TestimonialAuthor } from "@/components/ui/testimonial-card"

interface TestimonialItem {
  id?: string
  author: TestimonialAuthor
  text: string
  href?: string
  rating?: number
}

interface TestimonialsSectionProps {
  title: string
  description: string
  testimonials: Array<TestimonialItem>
  className?: string
}

export function TestimonialsSection({ 
  title,
  description,
  testimonials,
  className 
}: TestimonialsSectionProps) {
  // Structured Data (JSON-LD) for genuine client reviews — only genuine reviews, exactly once
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'IVR Energy',
    review: testimonials.map((t) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: t.author.name,
      },
      reviewBody: t.text,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: t.rating || 5,
        bestRating: 5,
      },
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: testimonials.length,
      bestRating: '5',
      worstRating: '1',
    },
  }

  return (
    <section 
      aria-label={title || "Customer Testimonials"}
      role="region"
      className={cn(
        "bg-white text-neutral-900",
        "py-16 sm:py-24 md:py-28 px-0 border-t border-neutral-100 relative overflow-hidden",
        className
      )}
    >
      {/* Schema.org Review structured data for genuine reviews only */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      <div className="mx-auto flex max-w-container flex-col items-center gap-6 text-center sm:gap-12 relative z-10">
        <div className="flex flex-col items-center gap-3 px-4 sm:gap-4">
          <h2 className="max-w-[760px] text-3xl font-light leading-tight text-neutral-900 sm:text-5xl sm:leading-tight tracking-tight">
            {title}
          </h2>
          <p className="text-base max-w-[640px] font-medium text-neutral-600 sm:text-lg leading-relaxed">
            {description}
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-4">
          <div className="group flex overflow-hidden p-2 [--gap:1.5rem] [gap:var(--gap)] flex-row [--duration:75s]">
            {/* Primary Track: Contains the single canonical/crawlable set at setIndex 0, and purely visual clones for loop at setIndex > 0 */}
            <div 
              className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]"
              role="list"
              aria-label="Client reviews list"
            >
              {[0, 1].map((setIndex) => {
                const isClone = setIndex > 0
                return testimonials.map((testimonial, i) => (
                  <div
                    key={`track1-set${setIndex}-${testimonial.id || i}`}
                    role={isClone ? "presentation" : "listitem"}
                    aria-hidden={isClone ? "true" : undefined}
                    data-cloned={isClone ? "true" : undefined}
                  >
                    <TestimonialCard 
                      id={isClone ? undefined : `testimonial-${testimonial.id || i}`}
                      isClone={isClone}
                      {...testimonial}
                    />
                  </div>
                ))
              })}
            </div>

            {/* Trailing Track 2: Purely visual loop helper with aria-hidden="true" so screen readers and crawlers never see duplicate text */}
            <div 
              className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]" 
              aria-hidden="true"
              role="presentation"
              data-cloned="true"
            >
              {[0, 1].map((setIndex) => (
                testimonials.map((testimonial, i) => (
                  <div
                    key={`track2-set${setIndex}-${testimonial.id || i}`}
                    role="presentation"
                    aria-hidden="true"
                    data-cloned="true"
                  >
                    <TestimonialCard 
                      isClone={true}
                      {...testimonial}
                    />
                  </div>
                ))
              ))}
            </div>
          </div>

          {/* Side gradient overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/4 bg-gradient-to-r from-white via-white/80 to-transparent sm:block z-10" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/4 bg-gradient-to-l from-white via-white/80 to-transparent sm:block z-10" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
