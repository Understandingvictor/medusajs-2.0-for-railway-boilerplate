import React from "react"
import UnderlineLink from "@modules/common/components/interactive-link"
import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <div className="flex-1 bg-[#fcfcfc] min-h-screen" data-testid="account-page">
      <div className="content-container h-full max-w-7xl mx-auto flex flex-col">
        
        {/* MAIN SECTION: Dynamic Grid */}
        <div className={`grid grid-cols-1 ${customer ? "small:grid-cols-[280px_1fr] py-12 gap-x-12" : "py-0"} min-h-[70vh]`}>
          
          {/* SIDEBAR: Only rendered if customer exists */}
          {customer && (
            <div className="border-r border-gray-100 pr-8">
              <AccountNav customer={customer} />
            </div>
          )}

          {/* CONTENT AREA: Centered if no customer, Aligned left if sidebar exists */}
          <div className={`flex flex-col ${!customer ? "items-center justify-center w-full" : "flex-1"}`}>
            {children}
          </div>
        </div>

        {/* FOOTER SECTION: Clean and Spaced */}
        <div className="flex flex-col small:flex-row items-start justify-between border-t border-gray-100 py-16 mt-12 gap-8">
          <div className="max-w-md">
            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-[#800020] mb-4">
              Got questions?
            </h3>
            <p className="text-gray-500 text-sm uppercase tracking-widest leading-relaxed">
              Find frequently asked questions and answers on our 
              dedicated customer service portal.
            </p>
          </div>
          <div className="flex items-center">
            <UnderlineLink href="/customer-service" className="text-[#800020] font-bold uppercase tracking-widest text-xs">
              Customer Service
            </UnderlineLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout