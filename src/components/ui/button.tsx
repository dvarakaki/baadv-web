import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full border border-transparent font-semibold whitespace-nowrap transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-(--ease-out-expo) outline-none focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-caramel-500 select-none touch-manipulation active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[1.1em] [&_svg[data-icon=arrow]]:transition-transform [&_svg[data-icon=arrow]]:duration-300 hover:[&_svg[data-icon=arrow]]:translate-x-0.5",
  {
    variants: {
      variant: {
        accent:
          "bg-caramel-500 text-brand-950 hover:bg-caramel-400 hover:shadow-[0_12px_28px_-12px_rgba(177,151,129,0.8)]",
        primary:
          "bg-brand-700 text-white hover:bg-brand-800 hover:shadow-[0_12px_28px_-14px_rgba(28,49,51,0.7)]",
        "ghost-light":
          "border-sand-100/35 text-sand-100 hover:border-sand-100 hover:bg-sand-100/5",
        outline:
          "border-line-strong bg-transparent text-brand-800 hover:border-brand-700 hover:bg-brand-700 hover:text-white",
      },
      size: {
        default: "min-h-[52px] px-7 py-3.5 text-[0.95rem]",
        sm: "min-h-11 px-5 py-2.5 text-sm",
        icon: "size-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

/** Ondulação a partir do ponto do clique (reinicia a cada toque). */
function ripple(e: React.PointerEvent<HTMLElement>) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty("--rx", `${e.clientX - r.left}px`)
  el.style.setProperty("--ry", `${e.clientY - r.top}px`)
  el.removeAttribute("data-ripple")
  void el.offsetWidth
  el.setAttribute("data-ripple", "")
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  onPointerDown,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      onPointerDown={(e: React.PointerEvent<HTMLButtonElement>) => {
        ripple(e)
        onPointerDown?.(e)
      }}
      onAnimationEnd={(e: React.AnimationEvent<HTMLElement>) => e.currentTarget.removeAttribute("data-ripple")}
      {...props}
    />
  )
}

export { Button, buttonVariants }
