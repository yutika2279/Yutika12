import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Coffee, Sparkles, MapPin, Laptop, Heart, Compass } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';

interface HeroProps {
  onExploreMenu: () => void;
  onExploreSpace: () => void;
  onOpenReservation: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreMenu,
  onExploreSpace,
  onOpenReservation,
}) => {
  return (
    <section id="home" className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Subtle organic gradient glow background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E8D8C8]/40 rounded-full blur-3xl pointer-events-none -mr-40 -mt-20"></div>
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-[#F5EBE0]/60 rounded-full blur-3xl pointer-events-none -ml-32"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Typography & Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Location & Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5EBE0] border border-[#E8D8C8] text-[#5C3D2E] text-xs font-semibold uppercase tracking-wider mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C68B59]"></span>
              <span>Bandra West • Mumbai’s Creative Sanctuary</span>
            </div>

            {/* Main Catchy Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-[1.12] text-[#2C1810] font-normal tracking-tight mb-6">
              Romanticise your daily ritual over <span className="italic font-normal text-[#6F4E37] underline decoration-[#E8D8C8] decoration-wavy decoration-1 underline-offset-8">specialty coffee</span>.
            </h1>

            {/* Mindset Quote & Sub-description */}
            <p className="text-lg sm:text-xl text-[#5C3D2E] font-light leading-relaxed max-w-2xl mb-4 font-editorial italic">
              “I could study or work at home, but I’d rather romanticise my life in a warm, sun-drenched room with an iced sea salt latte.”
            </p>

            <p className="text-sm sm:text-base text-[#6F4E37]/90 leading-relaxed max-w-xl mb-8">
              Brew & Beyond is designed as your comforting third space in Mumbai. Ethically sourced Chikmagalur single-origins, silent study nooks, velvet conversation booths, and artisan bakes.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-10">
              <a
                id="hero-explore-menu-btn"
                href="#menu"
                onClick={(e) => {
                  e.preventDefault();
                  onExploreMenu();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#3D2314] hover:bg-[#2C1810] text-[#FAF7F2] px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all shadow-md hover:shadow-lg active:scale-98 group cursor-pointer"
              >
                <span>Explore the Menu</span>
                <ArrowRight className="w-4 h-4 text-[#E8D8C8] transition-transform group-hover:translate-x-1" />
              </a>

              <a
                id="hero-explore-space-btn"
                href="#space"
                onClick={(e) => {
                  e.preventDefault();
                  onExploreSpace();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FAF7F2] hover:bg-[#F5EBE0] text-[#3D2314] px-6 py-3.5 rounded-full text-sm font-semibold border border-[#D4C3B3] transition-all"
              >
                <Compass className="w-4 h-4 text-[#8C6D58]" />
                <span>Find Your Space Mode</span>
              </a>

              <button
                id="hero-reserve-corner-btn"
                onClick={onOpenReservation}
                className="w-full sm:w-auto text-xs font-medium text-[#5C3D2E] hover:text-[#2C1810] underline underline-offset-4 py-2 px-1 transition-colors"
              >
                Reserve a work desk →
              </button>
            </div>

            {/* Amenity Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#E8D8C8]/70 w-full">
              {CAFE_INFO.highlights.map((item, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-xs font-bold text-[#2C1810] tracking-tight">{item.title}</span>
                  <span className="text-[11px] text-[#8C6D58] leading-tight mt-0.5">{item.desc}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Main Arch Hero Card */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative warm framed border */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FFFDF9] bg-[#E8D8C8]">
                <img
                  src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop"
                  alt="Brew & Beyond Cafe Interior in Bandra Mumbai"
                  className="w-full h-[460px] sm:h-[520px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/80 via-transparent to-black/10"></div>

                {/* Overlaid Floating Tag */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#FAF7F2]/95 backdrop-blur-md border border-white/60 shadow-lg text-[#2C1810]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D58]">
                      Signature Experience
                    </span>
                    <span className="text-xs font-bold text-[#2C1810] bg-[#F5EBE0] px-2.5 py-0.5 rounded-full">
                      ₹310
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif text-base font-bold text-[#2C1810]">Sea Salt Caramel Iced Latte</h4>
                      <p className="text-[11px] text-[#6F4E37]">Chikmagalur espresso • oat froth • smoked sea salt</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#3D2314] flex items-center justify-center text-[#FAF7F2] shrink-0 ml-2">
                      <Sparkles className="w-4 h-4 text-[#E8D8C8]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Aesthetic Polaroid Accent */}
              <motion.div
                initial={{ rotate: -6, y: 10 }}
                animate={{ rotate: -3, y: 0 }}
                transition={{ repeat: Infinity, repeatType: 'reverse', duration: 4 }}
                className="hidden sm:block absolute -top-5 -left-6 p-2.5 bg-[#FFFDF9] rounded-xl shadow-xl border border-[#E8D8C8] w-40 z-20"
              >
                <img
                  src="https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=400&auto=format&fit=crop"
                  alt="Iced specialty latte"
                  className="w-full h-24 object-cover rounded-lg mb-1.5"
                  referrerPolicy="no-referrer"
                />
                <p className="font-serif text-[11px] text-[#3D2314] font-medium text-center italic">
                  “The 4 PM Iced Latte”
                </p>
              </motion.div>

              {/* Secondary Floating Badge */}
              <div className="hidden sm:flex absolute -bottom-4 -right-4 bg-[#3D2314] text-[#FAF7F2] py-2.5 px-4 rounded-2xl shadow-xl items-center gap-2.5 border border-[#6F4E37] z-20">
                <div className="w-7 h-7 rounded-full bg-[#5C3D2E] flex items-center justify-center text-[#E8D8C8]">
                  <Laptop className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold tracking-tight text-[#FAF7F2]">3 Dedicated Moods</div>
                  <div className="text-[9px] text-[#D4C3B3]">Study • Chill • Catch-Up</div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
