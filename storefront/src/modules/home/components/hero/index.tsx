import { Button, Heading, Text } from "@medusajs/ui"
import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] w-full flex items-center bg-white dark:bg-[#0a0a0a] overflow-hidden transition-colors duration-500">
      {/* Background Decorative Element - Soft Wine Red Glow */}
      <div className="absolute top-[-10%] right-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-brand-wine/10 blur-[80px] md:blur-[120px] rounded-full z-0" />

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10 py-12 md:py-0">
        {/* Left Side: Text Content */}
        <div className="flex flex-col gap-6 md:gap-8 items-start text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-wine/30 bg-brand-wine/5 text-brand-wine">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-wine opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-wine"></span>
            </span>
            <Text className="text-[10px] uppercase tracking-[0.2em] font-bold">
              New Season Drop
            </Text>
          </div>

          <div className="space-y-4 w-full">
            <Heading
              level="h1"
              className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-black tracking-tight leading-[0.95] text-ui-fg-base"
            >
              KEDDY <br />
              <span className="text-[#800020] italic serif">KOLLECTIONS</span>
            </Heading>
            <Text className="text-base md:text-xl text-ui-fg-subtle max-w-md leading-relaxed">
              Experience the intersection of bold luxury and timeless elegance.
              Curated for those who lead, not follow.
            </Text>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 w-full">
            <Link href="/store" className="group w-full sm:w-auto">
              <Button className="h-16 w-full sm:px-10 bg-[#800020] hover:bg-brand-dark text-white border-none rounded-none flex items-center justify-center gap-3 transition-all duration-300">
                EXPLORE COLLECTION
                <ArrowRight
                  className="group-hover:translate-x-2 transition-transform"
                  size={18}
                />
              </Button>
            </Link>

            <button className="flex items-center justify-center sm:justify-start gap-3 group px-4 py-2">
              <div className="w-12 h-12 rounded-full border border-ui-border-base flex items-center justify-center group-hover:bg-[#800020] group-hover:border-[#800020] transition-all">
                <Play
                  size={16}
                  className="group-hover:fill-white group-hover:text-white"
                />
              </div>
              <Text className="font-bold text-sm tracking-widest uppercase">
                Watch Film
              </Text>
            </button>
          </div>
        </div>

        {/* Right Side: Visual Bento Box - Adjusted for overflow */}
        <div className="relative h-[400px] md:h-[650px] w-full hidden md:block">
          {/* Main Image Frame - Removed rotation on super small if it ever shows */}
          <div className="absolute inset-0 bg-ui-bg-subtle overflow-hidden rounded-2xl md:rotate-2 group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1539109132314-3477524c859c?q=80&w=2000')] bg-cover bg-center grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Floating Glass Card - Adjusted position to prevent clipping */}
          <div className="absolute bottom-10 left-0 md:-left-10 p-6 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl shadow-2xl animate-bounce-slow">
            <Text className="text-white font-medium text-sm">Est. 2026</Text>
            <Text className="text-white/70 text-xs">
              Premium Quality Guaranteed
            </Text>
          </div>
        </div>
      </div>

      {/* Social Bar - Hidden on mobile/tablet */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-12 items-center">
        <div className="h-20 w-[1px] bg-ui-border-base" />
        <p className="rotate-90 text-[10px] tracking-[0.5em] uppercase text-ui-fg-muted font-bold">
          Instagram
        </p>
        <p className="rotate-90 text-[10px] tracking-[0.5em] uppercase text-ui-fg-muted font-bold">
          Twitter
        </p>
        <div className="h-20 w-[1px] bg-ui-border-base" />
      </div>
    </section>
  )
}

export default Hero
