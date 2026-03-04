import { Heading } from "@medusajs/ui"

import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  return (
    <div className="sticky top-8 flex flex-col-reverse small:flex-col gap-y-8 py-8 small:py-0">
      {/* Shadow added to single out the summary */}
      <div className="w-full bg-white flex flex-col p-4 small:p-6 shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-gray-50">
        <Divider className="my-6 small:hidden" />
        
        <Heading
          level="h2"
          className="flex flex-row text-2xl small:text-3xl font-black italic uppercase tracking-tighter text-[#800020] pr-4"
        >
          In your Cart
        </Heading>
        
        <Divider className="my-6" />
        
        <CartTotals totals={cart} />

        {/* FIXED SECTION: 
          1. Added 'pr-2' to create a buffer so the price/quantity doesn't hit the edge.
          2. Used 'text-[10px] small:text-xs' to significantly reduce the item detail font size.
          3. 'break-words' ensures long titles don't push the price off-screen.
        */}
        <div className="my-6 text-[10px] small:text-xs leading-tight overflow-hidden pr-2 break-words">
          <ItemsPreviewTemplate cart={cart} />
        </div>

        <div className="my-6">
          <DiscountCode cart={cart} />
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary