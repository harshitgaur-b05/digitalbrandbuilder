import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "link" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const base = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep disabled:pointer-events-none disabled:opacity-50"

    const variants = {
      default: "bg-brand-text text-brand-bg hover:bg-sage-deep rounded-full",
      link: "text-sage-deep underline-offset-4 hover:underline hover:text-brand-text",
      outline: "border border-sage-soft text-brand-text bg-transparent hover:bg-brand-secondary rounded-full",
      ghost: "text-brand-text hover:bg-brand-secondary rounded-lg",
    }

    const sizes = {
      default: "px-6 py-3 text-sm",
      sm: "px-3 py-1.5 text-xs",
      lg: "px-8 py-4 text-base",
    }

    if (asChild) {
      const child = React.Children.only(props.children as React.ReactElement)
      return React.cloneElement(child, {
        className: cn(base, variants[variant], sizes[size], className, child.props.className),
        ref,
      })
    }

    return (
      <button
        className={cn(base, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button }
