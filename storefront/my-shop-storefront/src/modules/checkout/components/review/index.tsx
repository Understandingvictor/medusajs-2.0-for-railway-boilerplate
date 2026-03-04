"use client"

import { Heading, Text, clx } from "@medusajs/ui"
import PaymentButton from "../payment-button"
import { useSearchParams } from "next/navigation"

const Review = ({ cart }: { cart: any }) => {
  const searchParams = useSearchParams()

  const isOpen = searchParams.get("step") === "review"

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const previousStepsCompleted =
    cart.shipping_address &&
    cart.shipping_methods.length > 0 &&
    (cart.payment_collection || paidByGiftcard)

  return (
    <div className="bg-white">
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row text-2xl small:text-4xl font-black italic uppercase tracking-tighter gap-x-2 items-baseline text-[#800020]",
            {
              "opacity-50 pointer-events-none select-none": !isOpen,
            }
          )}
        >
          Review
        </Heading>
      </div>
      {isOpen && previousStepsCompleted && (
        <>
          <div className="flex items-start gap-x-1 w-full mb-6">
            <div className="w-full">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                By clicking the{" "}
                <span className="text-[#800020] font-bold italic uppercase">
                  Place Order
                </span>{" "}
                button, you confirm that you have read, understand and accept
                our Terms of Use, Terms of Sale and Returns Policy and
                acknowledge that you have read{" "}
                <span className="font-bold">Keddy Collections&apos;</span>{" "}
                Privacy Policy.
              </Text>
            </div>
          </div>
          {/* We wrap the button to inject our Keddy Wine Red styles */}
          <div className="w-full sm:w-80">
            <PaymentButton
              cart={cart}
              data-testid="submit-order-button"
              className="bg-[#800020] hover:bg-[#5a0016] text-white border-none uppercase font-black italic tracking-widest shadow-md transition-all active:scale-95 h-12 w-full flex items-center justify-center rounded-none"
            />
          </div>
        </>
      )}
    </div>
  )
}

export default Review
