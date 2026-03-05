import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      {/* 2026 Modern Header: Glassmorphism & Wine Red Border Accent */}
      <header className="relative h-16 mx-auto border-b duration-300 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-ui-border-base group-hover:border-brand-wine/40">
        <nav className="content-container flex items-center justify-between w-full h-full">
          
          {/* Left: Side Menu with custom spacing */}
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
            </div>
          </div>

          {/* Center: Keddy Collections Branding */}
          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="flex flex-col items-center gap-0 group/logo"
              data-testid="nav-store-link"
            >
              <span className="text-lg md:text-xl font-black tracking-[0.2em] uppercase italic leading-none transition-colors duration-300 group-hover/logo:text-brand-wine">
                Keddy
              </span>
              <span className="text-[8px] tracking-[0.5em] uppercase font-bold text-ui-fg-muted -mt-0.5 transition-colors duration-300 group-hover/logo:text-ui-fg-base">
                Kollections
              </span>
            </LocalizedClientLink>
          </div>

          {/* Right: Actions with subtle luxury hover states */}
          <div className="flex items-center gap-x-5 md:gap-x-8 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center h-full">
              <LocalizedClientLink
                className="text-[10px] uppercase tracking-widest font-bold hover:text-brand-wine transition-colors duration-200"
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>
            </div>
            
            <div className="flex items-center h-full">
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="text-[10px] uppercase tracking-widest font-bold hover:text-brand-wine transition-colors duration-200"
                    href="/cart"
                    data-testid="nav-cart-link"
                  >
                    Cart (0)
                  </LocalizedClientLink>
                }
              >
                <div className="hover:scale-105 transition-transform duration-200">
                  <CartButton />
                </div>
              </Suspense>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}