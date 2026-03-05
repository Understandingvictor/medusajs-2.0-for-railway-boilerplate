// src/modules/home/components/hero/index.tsx
import { Button, Heading, Text } from "@medusajs/ui"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const Hero = () => {
  return (
    <section className="relative min-h-[95vh] w-full flex items-center bg-brand-cream overflow-hidden">
      {/* Decorative Brand Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-wine/5 skew-x-12 transform origin-top translate-x-20 hidden lg:block" />

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
        <div className="flex flex-col gap-10 animate-fade-in">
          <div className="space-y-6">
            <Text className="text-brand-wine font-bold tracking-[0.4em] uppercase text-xs">
              Luxury Reimagined
            </Text>
            <Heading
              level="h1"
              className="text-7xl md:text-9xl font-black leading-[0.85] text-brand-slate tracking-tighter"
            >
              KEDDY <br />
              <span className="font-serif italic text-brand-wine font-light">
                Collections
              </span>
            </Heading>
            <Text className="text-lg md:text-xl text-brand-slate/70 max-w-md font-light leading-relaxed">
              Where bold wine-red elegance meets timeless craftsmanship. Curated
              for the modern vanguard.
            </Text>
          </div>

          <div className="flex items-center gap-8">
            <Link href="/store">
              <Button className="h-16 px-12 bg-brand-wine hover:bg-brand-dark text-white rounded-none tracking-widest transition-all duration-300 transform hover:scale-105 shadow-xl">
                SHOP THE DROP
              </Button>
            </Link>
            <Link
              href="/about"
              className="group flex items-center gap-2 border-b border-brand-slate pb-1 hover:border-brand-wine transition-all"
            >
              <Text className="text-xs font-bold tracking-widest uppercase group-hover:text-brand-wine">
                Our Story
              </Text>
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform group-hover:text-brand-wine"
              />
            </Link>
          </div>
        </div>

        {/* High-Resolution Editorial Image */}
        <div className="relative h-[500px] md:h-[750px] w-full group overflow-hidden rounded-2xl shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1539109132314-3477524c859c?q=80&w=2000')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" />
          <div className="absolute inset-0 bg-brand-wine/10 mix-blend-multiply" />
          <div className="absolute bottom-10 left-10 p-8 backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl">
            <Text className="text-white text-2xl font-serif italic">
              The Silk Series
            </Text>
            <Text className="text-white/60 text-xs tracking-widest uppercase mt-2">
              Limited Edition • 2026
            </Text>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
