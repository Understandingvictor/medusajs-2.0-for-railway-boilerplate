"use client"

import { setAddresses } from "@lib/data/cart"
import compareAddresses from "@lib/util/compare-addresses"
import { CheckCircleSolid } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text, useToggleState } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import Spinner from "@modules/common/icons/spinner"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useActionState } from "react"
import BillingAddress from "../billing_address"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"
import { SubmitButton } from "../submit-button"

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address"

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  )

  const handleEdit = () => {
    router.push(pathname + "?step=address")
  }

  const [message, formAction] = useActionState(setAddresses, null)

  return (
    <div className="bg-white">
      <div className="flex flex-row items-center justify-between mb-6">
        {/* HEADER: Updated to Signature Wine Red and Keddy Typography */}
        <Heading
          level="h2"
          className="flex flex-row text-xl small:text-3xl font-black italic uppercase tracking-tighter gap-x-2 items-baseline text-[#800020] pr-2"
        >
          Shipping Address
          {!isOpen && <CheckCircleSolid className="text-[#800020]" />}
        </Heading>

        {!isOpen && cart?.shipping_address && (
          <Text>
            <button
              onClick={handleEdit}
              className="text-[#800020] hover:text-[#600018] font-bold uppercase tracking-widest text-xs transition-colors duration-200"
              data-testid="edit-address-button"
            >
              Edit
            </button>
          </Text>
        )}
      </div>

      {isOpen ? (
        <form action={formAction}>
          <div className="pb-8">
            <ShippingAddress
              customer={customer}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />

            {!sameAsBilling && (
              <div>
                <Heading
                  level="h2"
                  className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter gap-x-4 pb-6 pt-8 text-[#800020]"
                >
                  Billing address
                </Heading>

                <BillingAddress cart={cart} />
              </div>
            )}

            {/* Note: Ensure SubmitButton component is also styled with #800020 */}
            <SubmitButton
              className="mt-6 bg-[#800020] hover:bg-[#5a0016] text-white border-none uppercase font-black italic tracking-widest shadow-md transition-all active:scale-95 h-12 w-full sm:w-80 flex items-center justify-center"
              data-testid="submit-address-button"
            >
              Continue to delivery
            </SubmitButton>
            <ErrorMessage error={message} data-testid="address-error-message" />
          </div>
        </form>
      ) : (
        /* SUMMARY VIEW */
        <div>
          <div className="text-small-regular">
            {cart && cart.shipping_address ? (
              <div className="flex items-start gap-x-8">
                <div className="flex flex-col md:flex-row items-start gap-y-6 md:gap-x-1 w-full">
                  <div
                    className="flex flex-col w-full md:w-1/3"
                    data-testid="shipping-address-summary"
                  >
                    <Text className="txt-medium-plus text-gray-900 font-bold uppercase tracking-widest text-[10px] mb-2">
                      Shipping Address
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.shipping_address.first_name}{" "}
                      {cart.shipping_address.last_name}
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.shipping_address.address_1}{" "}
                      {cart.shipping_address.address_2}
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.shipping_address.postal_code},{" "}
                      {cart.shipping_address.city}
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.shipping_address.country_code?.toUpperCase()}
                    </Text>
                  </div>

                  <div
                    className="flex flex-col w-full md:w-1/3"
                    data-testid="shipping-contact-summary"
                  >
                    <Text className="txt-medium-plus text-gray-900 font-bold uppercase tracking-widest text-[10px] mb-2">
                      Contact
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.shipping_address.phone}
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.email}
                    </Text>
                  </div>

                  <div
                    className="flex flex-col w-full md:w-1/3"
                    data-testid="billing-address-summary"
                  >
                    <Text className="txt-medium-plus text-gray-900 font-bold uppercase tracking-widest text-[10px] mb-2">
                      Billing Address
                    </Text>

                    {sameAsBilling ? (
                      <Text className="txt-medium text-ui-fg-subtle italic">
                        Same as delivery address.
                      </Text>
                    ) : (
                      <>
                        <Text className="txt-medium text-ui-fg-subtle">
                          {cart.billing_address?.first_name}{" "}
                          {cart.billing_address?.last_name}
                        </Text>
                        <Text className="txt-medium text-ui-fg-subtle">
                          {cart.billing_address?.address_1}{" "}
                          {cart.billing_address?.address_2}
                        </Text>
                        <Text className="txt-medium text-ui-fg-subtle">
                          {cart.billing_address?.postal_code},{" "}
                          {cart.billing_address?.city}
                        </Text>
                        <Text className="txt-medium text-ui-fg-subtle">
                          {cart.billing_address?.country_code?.toUpperCase()}
                        </Text>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center py-4">
                <Spinner className="text-[#800020]" />
              </div>
            )}
          </div>
        </div>
      )}
      <Divider className="mt-8 border-gray-100" />
    </div>
  )
}

export default Addresses
