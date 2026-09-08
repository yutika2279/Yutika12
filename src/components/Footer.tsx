import React, { useState } from 'react';
import { Coffee, Instagram, Mail, ArrowRight, Heart, Check } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3500);
    }
  };

  return (
    <footer className="bg-[#2C1810] text-[#FAF7F2] pt-16 pb-12 border-t border-[#3D2314]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#3D2314]">
          
          {/* Col 1: Brand & Philosophy */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#5C3D2E] text-[#E8D8C8] flex items-center justify-center">
                <Coffee className="w-4 h-4" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#FAF7F2]">
                Brew & Beyond
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#D4C3B3] leading-relaxed max-w-sm">
              An aesthetic café and creative third space in Bandra West, Mumbai. Made for slow coffee, deep work, and romanticizing everyday moments.
            </p>
            <div className="pt-2 text-xs text-[#8C6D58]">
              14/B Perry Cross Road, Bandra West, Mumbai 400050
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#8C6D58] block mb-3">
                Experience
              </span>
              <ul className="space-y-2 text-[#D4C3B3]">
                <li><a href="#home" className="hover:text-[#FAF7F2] transition-colors">Home</a></li>
                <li><a href="#menu" className="hover:text-[#FAF7F2] transition-colors">Full Menu</a></li>
                <li><a href="#space" className="hover:text-[#FAF7F2] transition-colors">Study & Moods</a></li>
                <li><a href="#story" className="hover:text-[#FAF7F2] transition-colors">Our Story</a></li>
                <li><a href="#visit" className="hover:text-[#FAF7F2] transition-colors">Visit Bandra</a></li>
              </ul>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#8C6D58] block mb-3">
                Moods
              </span>
              <ul className="space-y-2 text-[#D4C3B3]">
                <li><a href="#space" className="hover:text-[#FAF7F2] transition-colors">Study Mode</a></li>
                <li><a href="#space" className="hover:text-[#FAF7F2] transition-colors">Main Character</a></li>
                <li><a href="#space" className="hover:text-[#FAF7F2] transition-colors">Catch-Up Courtyard</a></li>
                <li><a href="#menu" className="hover:text-[#FAF7F2] transition-colors">Specialty Roasts</a></li>
              </ul>
            </div>
          </div>

          {/* Col 3: Newsletter */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-[11px] uppercase tracking-wider font-bold text-[#8C6D58] block">
              The Sunday Morning Dispatch
            </span>
            <p className="text-xs text-[#D4C3B3] leading-relaxed">
              Curated playlists, secret cupping sessions, and Mumbai creative community updates. No spam, only coffee notes.
            </p>

            <form onSubmit={handleSubscribe} className="flex items-center gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#3D2314] border border-[#5C3D2E] rounded-xl px-3.5 py-2 text-xs text-[#FAF7F2] placeholder:text-[#8C6D58] focus:outline-hidden focus:border-[#E8D8C8] flex-1"
              />
              <button
                type="submit"
                className="bg-[#E8D8C8] text-[#2C1810] px-4 py-2 rounded-xl text-xs font-bold hover:bg-white transition-colors shrink-0 flex items-center gap-1"
              >
                {subscribed ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                <span>{subscribed ? 'Subscribed' : 'Join'}</span>
              </button>
            </form>
            {subscribed && (
              <p className="text-[10px] text-emerald-400">
                ✓ Welcome to the family! Check your inbox for our Sunday playlist.
              </p>
            )}
          </div>

        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C6D58]">
          <div>
            © {new Date().getFullYear()} Brew & Beyond Coffee Co. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FAF7F2] transition-colors flex items-center gap-1"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@brewandbeyond.mumbai</span>
            </a>
            <span>•</span>
            <span>Bandra West, Mumbai</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
