"use client"

import { HttpTypes } from "@medusajs/types"
import { Heading, Table } from "@medusajs/ui"
import Item from "@modules/cart/components/item"

const ItemsTemplate = ({ cart }: { cart?: HttpTypes.StoreCart }) => {
  const items = cart?.items
  return (
    <div className="flex flex-col gap-y-6">
      <div className="pb-4 relative">
        <Heading className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-gray-900">
          Cart
        </Heading>
        <div className="h-1.5 w-20 bg-[#800020] mt-2"></div>
      </div>

      <Table className="border-none w-full">
        {/* HIDE HEADERS ON MOBILE - SHOW ON TABLET/DESKTOP */}
      <Table.Header className="hidden sm:table-header-group border-b border-gray-200">
    <Table.Row className="text-gray-400 uppercase text-[10px] tracking-[0.2em] font-bold">
      <Table.HeaderCell className="!pl-0 w-2/5">Product</Table.HeaderCell>
      <Table.HeaderCell className="w-1/5 text-center">Quantity</Table.HeaderCell>
      <Table.HeaderCell className="w-1/5 text-right">Price</Table.HeaderCell>
      <Table.HeaderCell className="!pr-0 text-right w-1/5">Total</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
        
        <Table.Body className="border-none">
          {items?.sort((a, b) => ((a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1))
            .map((item) => (
              <Item key={item.id} item={item} currencyCode={cart?.currency_code || "USD"} />
            ))}
        </Table.Body>
      </Table>
    </div>
  )
}

export default ItemsTemplate