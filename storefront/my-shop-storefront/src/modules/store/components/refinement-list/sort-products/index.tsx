"use client"

import { Text } from "@medusajs/ui"
import { clsx } from "clsx"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: SortOptions) => void
  "data-testid"?: string
}

const sortOptions = [
  { value: "created_at", label: "Latest Arrivals" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
]

const SortProducts = ({
  "data-testid": dataTestId,
  sortBy,
  setQueryParams,
}: SortProductsProps) => {
  const handleChange = (value: SortOptions) => {
    setQueryParams("sortBy", value)
  }

  return (
    <div className="flex flex-col gap-4 w-full" data-testid={dataTestId}>
      {/* Label with 2026 Minimalist Aesthetic */}
      <div className="flex items-center gap-2">
        <div className="w-1 h-4 bg-brand-wine rounded-full" />
        <Text className="text-[11px] uppercase tracking-[0.2em] font-bold text-ui-fg-muted">
          Sort Collection
        </Text>
      </div>

      {/* Segmented Control Container */}
      <div className="flex flex-wrap gap-2 md:gap-3">
        {sortOptions.map((option) => {
          const isSelected = sortBy === option.value

          return (
            <button
              key={option.value}
              onClick={() => handleChange(option.value as SortOptions)}
              className={clsx(
                "relative px-5 py-2.5 text-xs font-medium transition-all duration-300 rounded-none border outline-none",
                "flex items-center justify-center min-w-[120px]",
                isSelected
                  ? "bg-brand-wine border-brand-wine text-white shadow-lg shadow-brand-wine/20 scale-[1.02]"
                  : "bg-transparent border-ui-border-base text-ui-fg-subtle hover:border-brand-wine/50 hover:text-brand-wine dark:border-white/10"
              )}
            >
              {option.label}

              {/* Subtle visual indicator for active state */}
              {isSelected && (
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default SortProducts
