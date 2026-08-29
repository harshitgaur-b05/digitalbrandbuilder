import { type ComponentPropsWithoutRef, type ReactNode } from "react"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

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
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
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
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col rounded-2xl",
      "bg-card border border-border",
      "shadow-sm dark:shadow-[0_4px_20px_rgba(43,158,220,0.05)]",
      "transition-[transform,box-shadow,border-color] duration-500 motion-safe:hover:-translate-y-1 hover:shadow-md hover:border-primary/50",
      className
    )}
    {...props}
  >
    {/* Decorative background — clipped to card shape, always behind content */}
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-2xl">
      {background}
    </div>

    {/* Card content — icon sits at top, never translates */}
    <div className="relative z-10 flex flex-col h-full p-6 md:p-8">
      {/* Icon — pinned at top, never moves */}
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-auto shrink-0">
        <Icon className="h-6 w-6 text-primary" />
      </div>

      {/* Text block — slides up on hover to reveal CTA */}
      <div className="mt-6 flex flex-col gap-2 transition-transform duration-300 lg:group-hover:-translate-y-8">
        <h3 className="text-xl font-bold text-foreground tracking-tight">
          {name}
        </h3>
        <p className="max-w-lg text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>

      {/* Mobile CTA — always visible */}
      <div className="mt-4 lg:hidden">
        <Button variant="link" size="sm" className="p-0" render={<a href={href} />}>
          {cta}
          <ArrowRightIcon className="ms-2 h-4 w-4" />
        </Button>
      </div>
    </div>

    {/* Desktop CTA — slides up from below on hover */}
    <div className="pointer-events-none absolute bottom-0 hidden w-full translate-y-10 transform-gpu flex-row items-center p-6 md:p-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex z-20">
      <Button variant="link" size="sm" className="pointer-events-auto p-0" render={<a href={href} />}>
        {cta}
        <ArrowRightIcon className="ms-2 h-4 w-4" />
      </Button>
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-foreground/[0.02] rounded-2xl" />
  </div>
)

export { BentoCard, BentoGrid }
