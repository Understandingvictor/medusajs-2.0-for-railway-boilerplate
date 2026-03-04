"use client"

import { Suspense, useState } from "react"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { Heading, Text } from "@medusajs/ui"
import { Menu, X } from "lucide-react" // Ensure lucide-react is installed
import { clsx } from "clsx"

const StoreTemplate = ({
  sortBy,
  children,
}: {
  sortBy?: SortOptions
  children: React.ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const sort = sortBy || "created_at"

  return (
    <div className="flex flex-col w-full min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
      
      {/* --- MOBILE COMPACT HEADER (Visible only on small screens) --- */}
      <div className="md:hidden sticky top-0 z-40 w-full p-4 flex justify-between items-center bg-white/70 dark:bg-black/70 backdrop-blur-lg border-b border-ui-border-base">
        <Heading level="h2" className="text-xl font-black italic tracking-tighter">
          KEDDY <span className="text-brand-wine">ARCHIVE</span>
        </Heading>
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 bg-brand-wine text-white rounded-none"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* --- MOBILE SIDEBAR (Glassmorphism Drawer) --- */}
      <div className={clsx(
        "fixed inset-0 z-[100] transition-visibility duration-300 md:hidden",
        isOpen ? "visible" : "invisible"
      )}>
        {/* Backdrop Tint */}
        <div 
          className={clsx(
            "absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsOpen(false)}
        />
        
        {/* Drawer Content */}
        <aside className={clsx(
          "absolute right-0 top-0 h-full w-[80%] max-w-[320px] bg-white/80 dark:bg-black/80 backdrop-blur-2xl border-l border-white/20 p-8 shadow-2xl transition-transform duration-500 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 text-ui-fg-muted hover:text-brand-wine transition-colors"
          >
            <X size={24} />
          </button>

          <div className="flex flex-col gap-10 mt-12">
            <div className="space-y-2">
               <Text className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-wine">Filter & Sort</Text>
               <Heading level="h1" className="text-3xl font-black italic uppercase">The <span className="text-brand-wine">Archive</span></Heading>
            </div>
            
            {/* The Sorting component moves inside the sidebar on mobile */}
            <div onClick={() => setIsOpen(false)}>
              <RefinementList sortBy={sort} />
            </div>

            <Text className="text-xs text-ui-fg-subtle leading-relaxed border-t border-ui-border-base pt-6">
              Refine your selection of Keddy Kollections luxury essentials.
            </Text>
          </div>
        </aside>
      </div>

      {/* --- DESKTOP HEADER (Unchanged, remains immersive) --- */}
      <header className="hidden md:block w-full border-b border-ui-border-base bg-white/40 dark:bg-black/40 backdrop-blur-md sticky top-0 z-30">
        <div className="content-container py-10 flex flex-row items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-8 h-[2px] bg-brand-wine" />
              <Text className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-wine">Keddy Kollections</Text>
            </div>
            <Heading level="h1" className="text-5xl font-black tracking-tighter uppercase italic text-ui-fg-base">
              The <span className="text-brand-wine">Archive</span>
            </Heading>
                 <Text className="text-ui-fg-subtle max-w-sm text-sm">
              Curated luxury essentials. Filter by your preference to find your next signature piece.
            </Text>
          </div>
          <div className="w-auto">
            <RefinementList sortBy={sort} />
          </div>
        </div>
      </header>

      {/* --- PRODUCT GRID --- */}
      <main className="content-container py-6 md:py-12">
        <div className="relative">
          {/* Background Wine Glow */}
          <div className="absolute -left-20 top-0 w-64 h-64 bg-brand-wine/5 blur-[100px] rounded-full -z-10" />
          
          <Suspense fallback={<SkeletonProductGrid />}>
            <div className="group/grid">
              {children}
            </div>
          </Suspense>
        </div>
      </main>

      {/* Floating Help Button */}
      <div className="fixed bottom-6 right-6 z-40 scale-90 md:scale-100">
        <button className="w-12 h-12 md:w-14 md:h-14 bg-brand-wine text-white rounded-none shadow-2xl flex items-center justify-center hover:bg-brand-dark transition-all duration-300 hover:-translate-y-2">
           <span className="text-[9px] font-bold rotate-90 tracking-widest uppercase">HELP</span>
        </button>
      </div>
    </div>
  )
}

export default StoreTemplate