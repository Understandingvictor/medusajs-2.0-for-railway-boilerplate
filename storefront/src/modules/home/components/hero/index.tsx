import Link from "next/link"
import { ShoppingCart, User, Search } from "lucide-react"

const Nav = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/70 backdrop-blur-md transition-all duration-300">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left: Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/store" className="text-xs uppercase tracking-[0.2em] font-medium hover:text-brand-wine transition-colors">Shop</Link>
          <Link href="/collections" className="text-xs uppercase tracking-[0.2em] font-medium hover:text-brand-wine transition-colors">Collections</Link>
        </div>

        {/* Center: Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="text-2xl font-bold tracking-[0.3em] uppercase text-brand-wine">
            KEDDY
          </Link>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-6">
          <Search size={20} className="cursor-pointer hover:text-brand-wine transition-colors" />
          <Link href="/account"><User size={20} className="hover:text-brand-wine transition-colors" /></Link>
          <Link href="/cart" className="relative">
            <ShoppingCart size={20} className="hover:text-brand-wine transition-colors" />
          </Link>
        </div>
      </div>
    </nav>
  )
}