"use client"

import { Radio, RadioGroup } from "@headlessui/react"
import { setShippingMethod } from "@lib/data/cart"
import { calculatePriceForShippingOption } from "@lib/data/fulfillment"
import { convertToLocale } from "@lib/util/money"
import { CheckCircleSolid, Loader } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { Button, clx, Heading, Text } from "@medusajs/ui"
import ErrorMessage from "@modules/checkout/components/error-message"
import Divider from "@modules/common/components/divider"
import MedusaRadio from "@modules/common/components/radio"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const PICKUP_OPTION_ON = "__PICKUP_ON"
const PICKUP_OPTION_OFF = "__PICKUP_OFF"

type ShippingProps = {
  cart: HttpTypes.StoreCart
  availableShippingMethods: HttpTypes.StoreCartShippingOption[] | null
}

function formatAddress(address: HttpTypes.StoreCartAddress) {
  if (!address) return ""
  let ret = ""
  if (address.address_1) ret += ` ${address.address_1}`
  if (address.address_2) ret += `, ${address.address_2}`
  if (address.postal_code) ret += `, ${address.postal_code} ${address.city}`
  if (address.country_code) ret += `, ${address.country_code.toUpperCase()}`
  return ret
}

const Shipping: React.FC<ShippingProps> = ({
  cart,
  availableShippingMethods,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingPrices, setIsLoadingPrices] = useState(true)
  const [showPickupOptions, setShowPickupOptions] =
    useState<string>(PICKUP_OPTION_OFF)
  const [calculatedPricesMap, setCalculatedPricesMap] = useState<
    Record<string, number>
  >({})
  const [error, setError] = useState<string | null>(null)
  const [shippingMethodId, setShippingMethodId] = useState<string | null>(
    cart.shipping_methods?.at(-1)?.shipping_option_id || null
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const isOpen = searchParams.get("step") === "delivery"

  const _shippingMethods = availableShippingMethods?.filter(
    (sm) => sm.service_zone?.fulfillment_set?.type !== "pickup"
  )
  const _pickupMethods = availableShippingMethods?.filter(
    (sm) => sm.service_zone?.fulfillment_set?.type === "pickup"
  )
  const hasPickupOptions = !!_pickupMethods?.length

  useEffect(() => {
    setIsLoadingPrices(true)
    if (_shippingMethods?.length) {
      const promises = _shippingMethods
        .filter((sm) => sm.price_type === "calculated")
        .map((sm) => calculatePriceForShippingOption(sm.id, cart.id))

      if (promises.length) {
        Promise.allSettled(promises).then((res) => {
          const pricesMap: Record<string, number> = {}
          res
            .filter((r) => r.status === "fulfilled")
            .forEach(
              (p) =>
                (pricesMap[(p as PromiseFulfilledResult<any>).value?.id || ""] =
                  (p as PromiseFulfilledResult<any>).value?.amount!)
            )
          setCalculatedPricesMap(pricesMap)
          setIsLoadingPrices(false)
        })
      }
    }
    if (_pickupMethods?.find((m) => m.id === shippingMethodId)) {
      setShowPickupOptions(PICKUP_OPTION_ON)
    }
  }, [availableShippingMethods])

  const handleEdit = () =>
    router.push(pathname + "?step=delivery", { scroll: false })
  const handleSubmit = () =>
    router.push(pathname + "?step=payment", { scroll: false })

  const handleSetShippingMethod = async (
    id: string,
    variant: "shipping" | "pickup"
  ) => {
    setError(null)
    setShowPickupOptions(
      variant === "pickup" ? PICKUP_OPTION_ON : PICKUP_OPTION_OFF
    )
    let currentId: string | null = null
    setIsLoading(true)
    setShippingMethodId((prev) => {
      currentId = prev
      return id
    })
    await setShippingMethod({ cartId: cart.id, shippingMethodId: id })
      .catch((err) => {
        setShippingMethodId(currentId)
        setError(err.message)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <div className="bg-white">
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className={clx(
            // Reduced base text size (text-2xl) for mobile, scaling up (small:text-4xl)
            // Added pr-4 to prevent the italic "y" from being cut off
            "flex flex-row text-2xl small:text-4xl font-black italic uppercase tracking-tighter gap-x-2 items-baseline text-[#800020] pr-4",
            {
              "opacity-50 pointer-events-none select-none":
                !isOpen && cart.shipping_methods?.length === 0,
            }
          )}
        >
          Delivery
          {!isOpen && (cart.shipping_methods?.length ?? 0) > 0 && (
            <CheckCircleSolid className="text-[#800020]" />
          )}
        </Heading>
        {!isOpen && cart?.shipping_address && (
          <button
            onClick={handleEdit}
            className="text-[#800020] hover:text-[#600018] font-bold uppercase tracking-widest text-xs transition-colors duration-200"
          >
            Edit
          </button>
        )}
      </div>

      {isOpen ? (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex flex-col mb-6">
            <span className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-400">
              Shipping Method
            </span>
            <span className="text-sm text-gray-500 italic">
              Select your preferred transit option
            </span>
          </div>

          <div data-testid="delivery-options-container" className="space-y-3">
            <RadioGroup
              value={shippingMethodId}
              onChange={(v) => v && handleSetShippingMethod(v, "shipping")}
            >
              {_shippingMethods?.map((option) => (
                <Radio
                  key={option.id}
                  value={option.id}
                  className={clx(
                    "flex items-center justify-between cursor-pointer py-5 border px-8 transition-all duration-200",
                    {
                      "border-[#800020] bg-[#fffafb] shadow-sm":
                        option.id === shippingMethodId,
                      "border-gray-200 hover:border-gray-300":
                        option.id !== shippingMethodId,
                    }
                  )}
                >
                  <div className="flex items-center gap-x-4">
                    <MedusaRadio checked={option.id === shippingMethodId} />
                    <span className="text-sm font-bold uppercase tracking-tight text-gray-900">
                      {option.name}
                    </span>
                  </div>
                  <span className="font-black italic text-[#800020]">
                    {option.price_type === "flat" ? (
                      convertToLocale({
                        amount: option.amount!,
                        currency_code: cart?.currency_code,
                      })
                    ) : calculatedPricesMap[option.id] ? (
                      convertToLocale({
                        amount: calculatedPricesMap[option.id],
                        currency_code: cart?.currency_code,
                      })
                    ) : (
                      <Loader className="animate-spin" />
                    )}
                  </span>
                </Radio>
              ))}
            </RadioGroup>
          </div>

          <div className="mt-8">
            <ErrorMessage error={error} />
            <Button
              size="large"
              className="w-full bg-[#800020] hover:bg-[#600018] text-white border-none rounded-none font-bold uppercase tracking-widest h-14 transition-all duration-300"
              onClick={handleSubmit}
              isLoading={isLoading}
              disabled={!cart.shipping_methods?.[0]}
            >
              Continue to payment
            </Button>
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in duration-500">
          {cart && (cart.shipping_methods?.length ?? 0) > 0 && (
            <div className="flex flex-col">
              <Text className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400 mb-1">
                Selected Method
              </Text>
              <div className="flex items-center gap-x-2">
                <Text className="text-sm font-bold text-gray-900 uppercase">
                  {cart.shipping_methods!.at(-1)!.name}
                </Text>
                <span className="text-[#800020] font-black italic">
                  (
                  {convertToLocale({
                    amount: cart.shipping_methods!.at(-1)!.amount!,
                    currency_code: cart?.currency_code,
                  })}
                  )
                </span>
              </div>
            </div>
          )}
        </div>
      )}
      <Divider className="mt-8 border-gray-100" />
    </div>
  )
}

export default Shipping
