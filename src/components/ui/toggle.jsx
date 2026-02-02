import * from "react"
import * from "@radix-ui/react-toggle"
import { cva, VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover)]:size-4 [&_svg]:shrink-0 focus-visible,box-shadow] aria-invalid,
  {
    variants,
        outline,
      },
      size,
        sm,
        lg,
      },
    },
    defaultVariants,
      size,
    },
  }
)

function Toggle({
  className,
  variant,
  size,
  ...props
}) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }

