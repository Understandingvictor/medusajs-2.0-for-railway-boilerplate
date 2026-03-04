"use client"

import { Button, Heading } from "@medusajs/ui"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

const Summary = ({ cart }: { cart: any }) => {
  const step = !cart?.shipping_address?.address_1 || !cart.email ? "address" : cart?.shipping_methods?.length === 0 ? "delivery" : "payment"

  return (
    <div className="flex flex-col gap-y-6">
      <Heading level="h2" className="text-4xl font-black italic uppercase tracking-tighter text-white">
        Summary
      </Heading>
      <DiscountCode cart={cart} />
      <div className="opacity-50">
        <Divider />
      </div>
      <CartTotals totals={cart} />
      <LocalizedClientLink href={"/checkout?step=" + step}>
        <Button 
          className="w-full h-14 uppercase tracking-widest font-bold bg-brand-wine hover:bg-red-900 border-none transition-all duration-300"
        >
          Secure Checkout
        </Button>
      </LocalizedClientLink>
    </div>
  )
}

export default Summary