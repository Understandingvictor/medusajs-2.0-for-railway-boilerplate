"use client"

import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import Item from "@modules/cart/components/item"

type ItemsTemplateProps = {
  cart: HttpTypes.StoreCart
}

const ItemsPreviewTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart.items
  const hasOverflow = items && items.length > 4

  return (
    <div className="relative">
      <div
        className={clx(
          "overflow-y-auto no-scrollbar transition-all duration-500",
          {
            "max-h-[420px]": hasOverflow,
            "max-h-none": !hasOverflow,
          }
        )}
      >
        {/* Simple vertical list for clean responsiveness */}
        <div className="flex flex-col w-full px-1">
          {items
            ?.sort((a, b) => (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1)
            .map((item) => (
              <Item
                key={item.id}
                item={item}
                currencyCode={cart.currency_code}
                type="preview" 
              />
            ))}
        </div>
      </div>
      
      {hasOverflow && (
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      )}
    </div>
  )
}

export default ItemsPreviewTemplate