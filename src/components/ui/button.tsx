import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "link" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  asChild?: boolean
}

const variantClasses = {
  default: "bg-[#20211D] text-[#F3F1EB] hover:bg-[#7E8E71] rounded-full",
  link: "text-[#7E8E71] underline-offset-4 hover:underline hover:text-[#20211D] p-0 h-auto",
  outline: "border border-[#A0AD91] text-[#20211D] bg-transparent hover:bg-[#E8E5DD] rounded-full",
  ghost: "text-[#20211D] hover:bg-[#E8E5DD] rounded-lg",
}

const sizeClasses = {
  default: "px-6 py-3 text-sm",
  sm: "px-3 py-1.5 text-xs",
  lg: "px-8 py-4 text-base",
}

const base =
  "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7E8E71] disabled:pointer-events-none disabled:opacity-50"

// When asChild=true, wrap children in a styled span that visually behaves as the button
// This avoids the cloneElement type complexity entirely
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    const classes = cn(base, variantClasses[variant], sizeClasses[size], className)

    if (asChild && React.isValidElement(children)) {
      // Cast the child element and merge classes properly
      const child = children as React.ReactElement<{ className?: string; children?: React.ReactNode }>
      return React.cloneElement(child, {
        className: cn(classes, child.props.className),
      })
    }

    return (
      <button className={classes} ref={ref} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button }
