import { cn } from "@/lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export interface TestimonialAuthor {
  name: string
  handle: string
  avatar: string
}

export interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

export function TestimonialCard({ 
  author,
  text,
  href,
  className
}: TestimonialCardProps) {
  const Card = href ? 'a' : 'div'
  const initials = author.name ? author.name.split(' ').map(n => n[0]).join('').slice(0, 2) : '?'
  
  return (
    <Card
      {...(href ? { href } : {})}
      className={cn(
        "flex flex-col rounded-2xl border border-neutral-200/80 shadow-soft",
        "bg-white p-5 text-start sm:p-6",
        "hover:border-red-300 hover:shadow-lg hover:-translate-y-1",
        "max-w-[320px] sm:max-w-[340px] shrink-0",
        "transition-all duration-300 group cursor-pointer",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-11 w-11 border border-neutral-100 shadow-sm flex-shrink-0">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback className="bg-gradient-to-br from-[#D71920] to-[#b3141a] text-white font-bold text-xs">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-sm font-bold text-neutral-900 leading-tight group-hover:text-[#D71920] transition-colors">
            {author.name}
          </h3>
          <p className="text-xs font-medium text-neutral-500 mt-0.5">
            {author.handle}
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm text-neutral-700 leading-relaxed font-normal">
        "{text}"
      </p>
    </Card>
  )
}
