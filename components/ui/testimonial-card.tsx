import { cn } from "@/lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export interface TestimonialAuthor {
  name: string
  handle: string
  avatar?: string
}

export interface TestimonialCardProps {
  id?: string
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
  isClone?: boolean
}

export function TestimonialCard({ 
  id,
  author,
  text,
  href,
  className,
  isClone = false,
}: TestimonialCardProps) {
  const Card = href ? 'a' : 'div'
  const initials = author.name ? author.name.split(' ').map(n => n[0]).join('').slice(0, 2) : '?'
  
  return (
    <Card
      {...(href ? { href, tabIndex: isClone ? -1 : 0 } : {})}
      id={isClone ? undefined : id}
      aria-hidden={isClone ? "true" : undefined}
      data-cloned={isClone ? "true" : undefined}
      className={cn(
        "flex flex-col rounded-2xl border border-neutral-200/80 shadow-soft",
        "bg-white p-5 text-start sm:p-6",
        "hover:border-red-300 hover:shadow-lg hover:-translate-y-1",
        "max-w-[320px] sm:max-w-[340px] shrink-0",
        "transition-all duration-300 group",
        href ? "cursor-pointer" : "cursor-default",
        className
      )}
    >
      <figure className="m-0 p-0 flex flex-col justify-between h-full">
        <figcaption className="flex items-center gap-3 mb-4">
          <Avatar className="h-11 w-11 border border-neutral-100 shadow-sm flex-shrink-0">
            <AvatarImage 
              src={author.avatar} 
              alt={isClone ? "" : author.name}
              aria-hidden={isClone ? "true" : undefined}
            />
            <AvatarFallback 
              className="bg-gradient-to-br from-[#D71920] to-[#b3141a] text-white font-bold text-xs"
              aria-hidden="true"
            >
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start min-w-0">
            <span className="text-sm font-bold text-neutral-900 leading-tight group-hover:text-[#D71920] transition-colors truncate max-w-full">
              {author.name}
            </span>
            <span className="text-xs font-medium text-neutral-500 mt-0.5 truncate max-w-full">
              {author.handle}
            </span>
          </div>
        </figcaption>
        <blockquote className="m-0 p-0 text-sm text-neutral-700 leading-relaxed font-normal">
          &ldquo;{text}&rdquo;
        </blockquote>
      </figure>
    </Card>
  )
}
