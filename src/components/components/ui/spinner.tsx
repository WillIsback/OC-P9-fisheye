"use client";
import { Loader2Icon } from "lucide-react"
import { useTranslations } from "next-intl"

import { cn } from "@/components/lib/utils"

function Spinner({ className, ...props }: Readonly<React.ComponentProps<"svg">>) {
  const t = useTranslations('Common');

  return (
    <Loader2Icon
      aria-label={t('loading')}
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
