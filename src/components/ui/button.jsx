import * from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled)]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible,
  {
    variants,
        destructive,
        outline,
        secondary,
        ghost,
        link,
      },
      size,
        sm,
        lg,
        icon,
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants,
      size,
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

