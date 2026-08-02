import { cn } from "@/lib/utils"
import { TestimonialCard, TestimonialAuthor } from "@/components/ui/testimonial-card"

interface TestimonialsSectionProps {
  title: string
  description: string
  testimonials: Array<{
    author: TestimonialAuthor
    text: string
    href?: string
  }>
  className?: string
}

export function TestimonialsSection({ 
  title,
  description,
  testimonials,
  className 
}: TestimonialsSectionProps) {
  return (
    <section className={cn(
      "bg-gradient-to-b from-[#ffffff] via-red-50/20 to-[#ffffff] text-neutral-900",
      "py-16 sm:py-24 md:py-28 px-0 border-t border-b border-neutral-200/60 relative overflow-hidden",
      className
    )}>
      <div className="mx-auto flex max-w-container flex-col items-center gap-6 text-center sm:gap-12 relative z-10">
        <div className="flex flex-col items-center gap-3 px-4 sm:gap-4">
          <h2 className="max-w-[760px] text-3xl font-extrabold leading-tight text-neutral-900 sm:text-5xl sm:leading-tight tracking-tight">
            {title}
          </h2>
          <p className="text-base max-w-[640px] font-medium text-neutral-600 sm:text-lg leading-relaxed">
            {description}
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-4">
          <div className="group flex overflow-hidden p-2 [--gap:1.5rem] [gap:var(--gap)] flex-row [--duration:75s]">
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
              {[...Array(2)].map((_, setIndex) => (
                testimonials.map((testimonial, i) => (
                  <TestimonialCard 
                    key={`track1-${setIndex}-${i}`}
                    {...testimonial}
                  />
                ))
              ))}
            </div>
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]" aria-hidden="true">
              {[...Array(2)].map((_, setIndex) => (
                testimonials.map((testimonial, i) => (
                  <TestimonialCard 
                    key={`track2-${setIndex}-${i}`}
                    {...testimonial}
                  />
                ))
              ))}
            </div>
          </div>

          {/* Side gradient overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/4 bg-gradient-to-r from-white via-white/80 to-transparent sm:block z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/4 bg-gradient-to-l from-white via-white/80 to-transparent sm:block z-10" />
        </div>
      </div>
    </section>
  )
}
