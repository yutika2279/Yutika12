import React from 'react';
import { motion } from 'motion/react';
import { Coffee, Heart, Sparkles, MapPin, Award, Star, Quote } from 'lucide-react';
import { REVIEWS } from '../data/cafeData';

export const AboutSection: React.FC = () => {
  return (
    <section id="story" className="py-20 bg-[#F5EBE0]/40 relative border-t border-[#E8D8C8]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Story Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Column: Image Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative">
              {/* Primary Image */}
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-[#FFFDF9] bg-[#E8D8C8] h-[400px] sm:h-[460px]">
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop"
                  alt="Barista brewing specialty coffee at Brew & Beyond"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Offset Secondary Image */}
              <div className="hidden sm:block absolute -bottom-8 -right-6 w-52 h-52 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#FFFDF9] bg-[#E8D8C8]">
                <img
                  src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=600&auto=format&fit=crop"
                  alt="Pouring latte art into ceramic mug"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating Origin Tag */}
              <div className="absolute top-6 left-6 bg-[#3D2314]/90 backdrop-blur-md text-[#FAF7F2] py-2 px-3.5 rounded-full text-xs font-semibold flex items-center gap-2 border border-[#6F4E37] shadow-md">
                <Coffee className="w-3.5 h-3.5 text-[#E8D8C8]" />
                <span>Est. 2024 • Bandra West, Mumbai</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8D8C8] text-[#5C3D2E] text-xs font-semibold uppercase tracking-wider mb-4">
              <span>Our Philosophy</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#2C1810] tracking-tight mb-6">
              Born from a love for slow coffee & Mumbai’s creative pulse.
            </h2>

            <p className="text-base sm:text-lg text-[#5C3D2E] font-editorial italic leading-relaxed mb-4">
              “We built Brew & Beyond because Mumbai needed a true third space — somewhere between the chaos of college dorms, tiny rental apartments, and noisy corporate offices.”
            </p>

            <p className="text-sm sm:text-base text-[#6F4E37] leading-relaxed mb-4">
              A place where you don’t have to apologize for staying four hours with your laptop, where every power socket works, where the coffee is roasted to highlight delicate citrus and floral terroir, and where lo-fi vinyl warmth replaces sterile hustle culture.
            </p>

            <p className="text-sm sm:text-base text-[#6F4E37] leading-relaxed mb-8">
              Every bean is directly traded from multi-generational family estates in Chikmagalur, Karnataka and Araku Valley, Andhra Pradesh. We roast in micro-batches in-house twice a week to ensure sweet, aromatic extraction in every cup.
            </p>

            {/* Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full pt-6 border-t border-[#E8D8C8]">
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-[#3D2314]">100%</span>
                <span className="text-xs font-bold text-[#2C1810] mt-0.5">Indian Single-Origin</span>
                <span className="text-[11px] text-[#8C6D58]">Direct-trade from estate hills</span>
              </div>

              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-[#3D2314]">52 dB</span>
                <span className="text-xs font-bold text-[#2C1810] mt-0.5">Acoustic Balance</span>
                <span className="text-[11px] text-[#8C6D58]">Quiet study nooks & warm vinyl</span>
              </div>

              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-[#3D2314]">Zero</span>
                <span className="text-xs font-bold text-[#2C1810] mt-0.5">Plant-Milk Surcharge</span>
                <span className="text-[11px] text-[#8C6D58]">Oat & almond milk complimentary</span>
              </div>
            </div>

          </div>

        </div>

        {/* Community Voices / Reviews */}
        <div className="mt-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C1810] mb-2">
              Loved by Mumbai’s Young Creatives
            </h3>
            <p className="text-xs sm:text-sm text-[#8C6D58]">
              Real stories from our community of writers, designers, developers & slow morning lovers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#FFFDF9] p-6 rounded-2xl border border-[#E8D8C8] shadow-xs flex flex-col justify-between"
              >
                <div>
                  {/* Stars */}
                  <div className="flex items-center gap-1 text-[#D97706] mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#D97706]" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-[#5C3D2E] leading-relaxed mb-4 font-normal">
                    “{rev.comment}”
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8D8C8]/60 flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-10 h-10 rounded-full object-cover border border-[#D4C3B3]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#2C1810]">{rev.author}</h4>
                    <p className="text-[10px] text-[#8C6D58]">{rev.role}</p>
                    <span className="text-[10px] text-[#C68B59] font-medium block mt-0.5">
                      Fav: {rev.favoriteOrder}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
