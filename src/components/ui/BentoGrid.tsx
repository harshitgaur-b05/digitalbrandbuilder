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
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-2xl",
      "bg-white border border-brand-text/5",
      "[box-shadow:0_0_0_1px_rgba(32,33,29,.03),0_2px_4px_rgba(32,33,29,.04),0_12px_24px_rgba(32,33,29,.05)]",
      "transition-all duration-500 hover:-translate-y-1 hover:shadow-md hover:border-sage-soft",
      className
    )}
    {...props}
  >
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
      {background}
    </div>

    <div className="relative z-10 p-6 md:p-8 mt-auto">
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-2 transition-all duration-300 lg:group-hover:-translate-y-10">
        <div className="w-12 h-12 rounded-xl bg-sage-soft/10 flex items-center justify-center mb-1">
          <Icon className="h-6 w-6 text-sage-deep transition-all duration-300 ease-in-out group-hover:scale-90 origin-left" />
        </div>
        <h3 className="text-xl font-bold text-brand-text tracking-tight">
          {name}
        </h3>
        <p className="max-w-lg text-sm text-brand-muted leading-relaxed">{description}</p>
      </div>

      {/* Mobile: always visible CTA */}
      <div className="pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:hidden mt-3">
        <Button variant="link" asChild size="sm" className="pointer-events-auto p-0">
          <a href={href}>
            {cta}
            <ArrowRightIcon className="ms-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>

    {/* Desktop: slide-up CTA on hover */}
    <div className="pointer-events-none absolute bottom-0 hidden w-full translate-y-10 transform-gpu flex-row items-center p-6 md:p-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex z-20">
      <Button variant="link" asChild size="sm" className="pointer-events-auto p-0">
        <a href={href}>
          {cta}
          <ArrowRightIcon className="ms-2 h-4 w-4" />
        </a>
      </Button>
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[0.02] rounded-2xl" />
  </div>
)

export { BentoCard, BentoGrid }
