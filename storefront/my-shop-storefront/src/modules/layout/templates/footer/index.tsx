import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"
import { Facebook, MessageCircle, ArrowRight } from "lucide-react" // Ensure lucide-react is installed

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="border-t border-ui-border-base w-full bg-white dark:bg-[#0a0a0a]">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-12 xsmall:flex-row items-start justify-between py-24 md:py-32">
          
          {/* BRAND IDENTITY */}
          <div className="flex flex-col gap-y-4 max-w-[280px]">
            <LocalizedClientLink
              href="/"
              className="text-2xl font-black italic tracking-tighter uppercase group"
            >
              KEDDY <span className="text-brand-wine group-hover:text-ui-fg-base transition-colors">KOLLECTIONS</span>
            </LocalizedClientLink>
            <Text className="text-ui-fg-subtle text-sm leading-relaxed">
              Curating luxury essentials for the modern wardrobe. Defined by quality, driven by heritage.
            </Text>
            
            {/* SOCIALS */}
            <div className="flex gap-x-4 mt-2">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2 bg-ui-bg-subtle hover:bg-brand-wine hover:text-white transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href="https://wa.me/yourphonenumber" target="_blank" rel="noreferrer" className="p-2 bg-ui-bg-subtle hover:bg-[#25D366] hover:text-white transition-all duration-300">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3 w-full xsmall:w-auto">
            
            {/* ESSENTIALS / SPECIAL ORDERS */}
            <div className="flex flex-col gap-y-4">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-wine">
                Services
              </span>
              <ul className="grid grid-cols-1 gap-y-3 text-ui-fg-subtle txt-small">
                <li>
                  <LocalizedClientLink href="/custom-order" className="hover:text-ui-fg-base flex items-center gap-2 group">
                    Custom Order <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/preorder" className="hover:text-ui-fg-base">
                    Preorder Latest
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/shipping" className="hover:text-ui-fg-base">
                    Worldwide Shipping
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>

            {/* COLLECTIONS */}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-4">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-wine">
                  Collections
                </span>
                <ul className="grid grid-cols-1 gap-y-3 text-ui-fg-subtle txt-small">
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-ui-fg-base"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CATEGORIES */}
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-4">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-wine">
                  Categories
                </span>
                <ul className="grid grid-cols-1 gap-y-3 text-ui-fg-subtle txt-small">
                  {productCategories?.slice(0, 4).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-ui-fg-base"
                        href={`/categories/${c.handle}`}
                      >
                        {c.name}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row w-full mb-16 justify-between items-center gap-y-4 pt-8 border-t border-ui-border-base text-ui-fg-muted">
          <Text className="text-[11px] uppercase tracking-widest font-medium">
            © {new Date().getFullYear()} Keddy Kollections. All rights reserved.
          </Text>
          <div className="flex gap-x-8 text-[11px] uppercase tracking-widest font-medium">
             <LocalizedClientLink href="/privacy" className="hover:text-brand-wine">Privacy</LocalizedClientLink>
             <LocalizedClientLink href="/terms" className="hover:text-brand-wine">Terms</LocalizedClientLink>
          </div>
        </div>
      </div>
    </footer>
  )
}