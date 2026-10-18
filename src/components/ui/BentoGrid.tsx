import { type ComponentPropsWithoutRef, type ReactNode } from "react"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode
  className?: string
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string
  className: string
  background: ReactNode
  Icon: React.ElementType
  description: string
  href: string
  cta: string
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-auto md:auto-rows-[22rem] grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => (
  <Link
    href={href}
    className={cn(
      "group relative col-span-3 flex flex-col rounded-[22px]",
      "bg-card/95 backdrop-blur-md border border-border/80",
      "shadow-[0_10px_35px_rgb(0,0,0,0.05)] dark:shadow-[0_10px_35px_rgb(0,0,0,0.35)]",
      "transition-all duration-300 motion-safe:hover:-translate-y-1 hover:shadow-2xl hover:border-[var(--color-ember-orange)]/50",
      "cursor-pointer overflow-hidden",
      className
    )}
  >
    {/* Decorative background — clipped to card shape, always behind content */}
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[22px]">
      {background}
    </div>

    {/* Card content — icon sits at top, never translates */}
    <div className="relative z-10 flex flex-col h-full p-6 md:p-8">
      {/* Icon — pinned at top, never moves */}
      <div className="w-11 h-11 rounded-full bg-muted border border-border flex items-center justify-center text-[var(--color-ember-orange)] mb-auto shrink-0 group-hover:scale-110 group-hover:bg-[var(--color-ember-orange)]/10 transition-all">
        <Icon className="h-5 w-5" />
      </div>

      {/* Text block — slides up on hover to reveal CTA */}
      <div className="mt-8 flex flex-col gap-2.5 transition-transform duration-300 lg:group-hover:-translate-y-6">
        <h3 className="font-[family-name:var(--font-polysans)] text-xl md:text-2xl font-bold text-foreground tracking-wide uppercase group-hover:text-[var(--color-ember-orange)] transition-colors">
          {name}
        </h3>
        <p className="font-[family-name:var(--font-inter)] max-w-lg text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>

      {/* Mobile CTA — always visible */}
      <div className="mt-4 lg:hidden">
        <span className="inline-flex items-center gap-2 font-[family-name:var(--font-polysans)] text-xs font-bold uppercase tracking-wider text-[var(--color-ember-orange)]">
          {cta}
          <ArrowRightIcon className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>

    {/* Desktop CTA — slides up from below on hover */}
    <div className="pointer-events-none absolute bottom-0 hidden w-full translate-y-10 transform-gpu flex-row items-center p-6 md:p-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex z-20">
      <span className="inline-flex items-center gap-2 font-[family-name:var(--font-polysans)] text-xs font-bold uppercase tracking-wider text-[var(--color-ember-orange)]">
        {cta}
        <ArrowRightIcon className="h-3.5 w-3.5" />
      </span>
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-[var(--color-ember-orange)]/[0.02] rounded-[22px]" />
  </Link>
)

export { BentoCard, BentoGrid }
