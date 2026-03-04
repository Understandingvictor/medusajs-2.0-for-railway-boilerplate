"use client"

import { Table, Text, clx } from "@medusajs/ui"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import Thumbnail from "@modules/products/components/thumbnail"
import { updateLineItem, deleteLineItem } from "@lib/data/cart"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Trash from "@modules/common/icons/trash"
import { useState } from "react"

type ItemProps = {
  item: any
  currencyCode: string
  type?: "full" | "preview"
}

const Item = ({ item, currencyCode, type = "full" }: ItemProps) => {
  const [updating, setUpdating] = useState(false)

  const changeQuantity = async (quantity: number) => {
    if (quantity < 1) return
    setUpdating(true)
    await updateLineItem({ lineId: item.id, quantity }).finally(() =>
      setUpdating(false)
    )
  }

  const removeItem = async () => {
    setUpdating(true)
    await deleteLineItem(item.id).finally(() => setUpdating(false))
  }

  // --- CHECKOUT PREVIEW VIEW ---
  if (type === "preview") {
    return (
      <div className="flex items-center gap-x-4 py-3 border-b border-gray-100 last:border-none">
        <div className="w-14 h-14 shrink-0 bg-gray-50">
          <Thumbnail thumbnail={item.thumbnail} size="square" />
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <Text className="font-bold text-sm text-gray-900 truncate">
            {item.product_title}
          </Text>
          <div className="text-gray-400 text-[10px] uppercase tracking-widest">
            <LineItemOptions variant={item.variant} />
          </div>
          <Text className="text-[10px] mt-1 text-gray-500">
            QTY: {item.quantity}
          </Text>
        </div>
        {/* Fixed: Added as="span" to prevent hydration error */}
        <Text as="span" className="font-bold text-[#800020] text-sm shrink-0">
          <LineItemPrice
            item={item}
            currencyCode={currencyCode}
            style="tight"
          />
        </Text>
      </div>
    )
  }

  return (
    <>
      {/* --- MOBILE VIEW: Same design, just wrapped to fix the tbody error --- */}
      <Table.Row className="md:hidden">
        <Table.Cell className="p-0 border-none">
          <div className="group relative flex flex-col gap-y-4 py-6 border-b border-gray-200">
            <div className="flex items-start gap-x-4 flex-1 px-4">
              <div className="w-24 h-24 shrink-0">
                <Thumbnail
                  thumbnail={item.thumbnail}
                  size="square"
                  className="rounded-sm"
                />
              </div>
              <div className="flex flex-col justify-between self-stretch py-1">
                <div>
                  <Text className="font-black italic uppercase text-lg leading-tight tracking-tighter text-gray-900 group-hover:text-[#800020] transition-colors">
                    {item.product_title}
                  </Text>
                  <div className="text-gray-400 text-[10px] uppercase tracking-widest mt-1">
                    <LineItemOptions variant={item.variant} />
                  </div>
                </div>
                <button
                  onClick={removeItem}
                  className="flex items-center gap-x-1 text-gray-400 hover:text-[#800020] text-[10px] uppercase font-bold"
                >
                  <Trash size={14} /> Remove
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-x-8 px-4">
              <div className="flex items-center border border-gray-200 bg-white">
                <button
                  onClick={() => changeQuantity(item.quantity - 1)}
                  disabled={updating}
                  className="w-10 h-10 flex items-center justify-center text-gray-500"
                >
                  —
                </button>
                <div className="w-8 flex items-center justify-center text-sm font-bold tabular-nums">
                  {updating ? (
                    <Spinner className="animate-spin w-3 h-3 text-[#800020]" />
                  ) : (
                    item.quantity
                  )}
                </div>
                <button
                  onClick={() => changeQuantity(item.quantity + 1)}
                  disabled={updating}
                  className="w-10 h-10 flex items-center justify-center text-gray-500"
                >
                  +
                </button>
              </div>
              <div className="text-right min-w-[100px]">
                {/* Fixed: Added as="span" to prevent hydration error */}
                <Text
                  as="span"
                  className="font-black italic text-[#800020] text-xl tracking-tighter"
                >
                  <LineItemPrice
                    item={item}
                    currencyCode={currencyCode}
                    style="tight"
                  />
                </Text>
              </div>
            </div>
          </div>
        </Table.Cell>
      </Table.Row>

      {/* --- DESKTOP VIEW: Your Strict Vertical Alignment (Untouched design) --- */}
      <Table.Row className="hidden md:table-row border-b border-gray-100">
        <Table.Cell className="!pl-0 p-4 w-[40%]">
          <div className="flex items-center gap-x-4">
            <div className="w-16 h-16 shrink-0">
              <Thumbnail
                thumbnail={item.thumbnail}
                size="square"
                className="rounded-sm"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <Text className="font-black italic uppercase text-base leading-tight tracking-tighter truncate">
                {item.product_title}
              </Text>
              <div className="text-gray-400 text-[10px] uppercase tracking-widest truncate">
                <LineItemOptions variant={item.variant} />
              </div>
              <button
                onClick={removeItem}
                className="flex items-center gap-x-1 text-gray-400 mt-1 hover:text-[#800020] text-[10px] uppercase font-bold w-fit"
              >
                <Trash size={12} /> Remove
              </button>
            </div>
          </div>
        </Table.Cell>

        <Table.Cell className="text-center p-4 w-[20%]">
          <div className="flex items-center justify-center border border-gray-200 w-[100px] mx-auto bg-white">
            <button
              onClick={() => changeQuantity(item.quantity - 1)}
              disabled={updating}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-50"
            >
              −
            </button>
            <span className="w-8 text-center text-xs font-bold tabular-nums">
              {updating ? (
                <Spinner className="animate-spin w-3 h-3" />
              ) : (
                item.quantity
              )}
            </span>
            <button
              onClick={() => changeQuantity(item.quantity + 1)}
              disabled={updating}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-50"
            >
              +
            </button>
          </div>
        </Table.Cell>

        <Table.Cell className="text-center p-4 w-[20%]">
          <Text as="span" className="text-xs font-bold text-gray-400">
            <LineItemUnitPrice
              item={item}
              currencyCode={currencyCode}
              style="tight"
            />
          </Text>
        </Table.Cell>

        <Table.Cell className="text-right !pr-0 p-4 w-[20%]">
          <Text
            as="span"
            className="font-black italic text-[#800020] text-lg tracking-tighter"
          >
            <LineItemPrice
              item={item}
              currencyCode={currencyCode}
              style="tight"
            />
          </Text>
        </Table.Cell>
      </Table.Row>
    </>
  )
}

export default Item
