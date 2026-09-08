import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Instagram,
  Navigation,
  CheckCircle2,
  Copy,
  ExternalLink,
  Calendar,
  Heart,
  MessageCircle,
} from 'lucide-react';
import { CAFE_INFO, INSTAGRAM_POSTS } from '../data/cafeData';

interface VisitUsProps {
  onOpenReservation: () => void;
}

export const VisitUsSection: React.FC<VisitUsProps> = ({ onOpenReservation }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${CAFE_INFO.name}, ${CAFE_INFO.address}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenGoogleMaps = () => {
    const query = encodeURIComponent(`Brew & Beyond, Bandra West, Mumbai`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <section id="visit" className="py-20 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8D8C8] text-[#5C3D2E] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Come Say Hi</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#2C1810] tracking-tight mb-4">
            Visit Us in Bandra
          </h2>
          <p className="text-sm sm:text-base text-[#5C3D2E] font-light leading-relaxed">
            Tucked away on a leafy bylane off Perry Cross Road. Walk-ins are always welcomed, or reserve a dedicated study desk in advance.
          </p>
        </div>

        {/* Location & Hours Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left Card: Address & Operating Hours */}
          <div className="lg:col-span-6 bg-[#FFFDF9] rounded-3xl border border-[#E8D8C8] p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Address Block */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#F5EBE0] text-[#3D2314] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#C68B59]" />
                </div>
                <div className="flex-1">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#8C6D58]">
                    Our Location
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#2C1810] mt-0.5">
                    {CAFE_INFO.address}
                  </h3>
                  <p className="text-xs text-[#8C6D58] mt-1">
                    Landmark: {CAFE_INFO.landmark}
                  </p>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      id="copy-address-btn"
                      onClick={handleCopyAddress}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#E8D8C8] text-xs font-semibold text-[#5C3D2E] hover:text-[#2C1810] hover:bg-[#E8D8C8]/50 transition-colors"
                    >
                      {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Address Copied!' : 'Copy Address'}</span>
                    </button>

                    <button
                      id="get-directions-btn"
                      onClick={handleOpenGoogleMaps}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3D2314] text-white text-xs font-semibold hover:bg-[#2C1810] transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5 text-[#E8D8C8]" />
                      <span>Google Maps</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Hours Block */}
              <div className="flex items-start gap-4 pt-6 border-t border-[#E8D8C8]/60">
                <div className="w-10 h-10 rounded-2xl bg-[#F5EBE0] text-[#3D2314] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#C68B59]" />
                </div>
                <div className="flex-1">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#8C6D58]">
                    Opening Hours
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8D8C8]/60">
                      <span className="text-[11px] font-bold text-[#2C1810] block">Monday – Friday</span>
                      <span className="text-xs text-[#5C3D2E] font-medium">{CAFE_INFO.hours.weekdays}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8D8C8]/60">
                      <span className="text-[11px] font-bold text-[#2C1810] block">Saturday – Sunday</span>
                      <span className="text-xs text-[#5C3D2E] font-medium">{CAFE_INFO.hours.weekends}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#8C6D58] mt-2">
                    * Kitchen closes for warm food at {CAFE_INFO.hours.kitchenCloses}. Fresh brew bar & bakes served until closing.
                  </p>
                </div>
              </div>

              {/* Contact Block */}
              <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-[#E8D8C8]/60 text-xs">
                <a
                  href={`tel:${CAFE_INFO.phone}`}
                  className="flex items-center gap-2 text-[#5C3D2E] hover:text-[#2C1810] font-medium"
                >
                  <Phone className="w-4 h-4 text-[#C68B59]" />
                  <span>{CAFE_INFO.phone}</span>
                </a>
                <a
                  href={`mailto:${CAFE_INFO.email}`}
                  className="flex items-center gap-2 text-[#5C3D2E] hover:text-[#2C1810] font-medium"
                >
                  <Mail className="w-4 h-4 text-[#C68B59]" />
                  <span>{CAFE_INFO.email}</span>
                </a>
              </div>

            </div>

            {/* Reservation CTA within Card */}
            <div className="mt-8 pt-6 border-t border-[#E8D8C8] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#6F4E37]">
                Planning a group catch-up or quiet thesis session?
              </div>
              <button
                id="visit-reserve-table-btn"
                onClick={onOpenReservation}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#3D2314] text-[#FAF7F2] text-xs font-semibold hover:bg-[#2C1810] transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5 text-[#E8D8C8]" />
                <span>Reserve Seating</span>
              </button>
            </div>

          </div>

          {/* Right Card: Interactive Aesthetic Map & Atmosphere Mockup */}
          <div className="lg:col-span-6 bg-[#3D2314] text-[#FAF7F2] rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg flex flex-col justify-between">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E8D8C8]">
                  Neighbourhood Map
                </span>
                <span className="text-xs bg-[#5C3D2E] text-[#FAF7F2] px-3 py-1 rounded-full border border-[#6F4E37]">
                  Pali Hill / Perry Cross
                </span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#FAF7F2] mb-2">
                Your Cosy Corner in Bandra West
              </h3>
              <p className="text-xs text-[#D4C3B3] leading-relaxed mb-6">
                Just 4 minutes walk from Mehboob Studio and Joggers Park. Street parking available for two-wheelers and four-wheelers nearby.
              </p>

              {/* Aesthetic Stylized Map Container */}
              <div className="relative h-60 sm:h-72 rounded-2xl overflow-hidden border border-[#6F4E37] bg-[#2C1810] group">
                <img
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=900&auto=format&fit=crop"
                  alt="Map view area of Bandra Mumbai"
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Stylized Marker Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex flex-col items-center">
                    <div className="p-3 bg-[#FAF7F2] text-[#2C1810] rounded-2xl shadow-2xl border-2 border-[#C68B59] flex items-center gap-2 animate-bounce">
                      <div className="w-6 h-6 rounded-full bg-[#3D2314] text-white flex items-center justify-center text-xs">
                        ☕
                      </div>
                      <div className="text-left">
                        <div className="text-[11px] font-bold text-[#2C1810] leading-none">Brew & Beyond</div>
                        <div className="text-[9px] text-[#8C6D58]">14/B Perry Cross Road</div>
                      </div>
                    </div>
                    <div className="w-3 h-3 bg-[#C68B59] rotate-45 -mt-1.5"></div>
                  </div>
                </div>

                {/* Open in Map button overlay */}
                <button
                  onClick={handleOpenGoogleMaps}
                  className="absolute bottom-3 right-3 bg-[#FAF7F2]/90 backdrop-blur-md text-[#2C1810] px-3.5 py-1.5 rounded-full text-[11px] font-bold shadow-md hover:bg-white transition-colors flex items-center gap-1.5"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3 h-3 text-[#3D2314]" />
                </button>
              </div>
            </div>

            {/* Quick Transport Tips */}
            <div className="grid grid-cols-2 gap-3 pt-6 mt-6 border-t border-[#5C3D2E] text-xs">
              <div>
                <span className="text-[#E8D8C8] font-bold block">🚆 By Train:</span>
                <span className="text-[11px] text-[#D4C3B3]">Bandra Station (W) — 8 min auto</span>
              </div>
              <div>
                <span className="text-[#E8D8C8] font-bold block">🚗 Parking:</span>
                <span className="text-[11px] text-[#D4C3B3]">Valet on weekends, lane parking</span>
              </div>
            </div>

          </div>

        </div>

        {/* Instagram Grid Feed Section (Requested in PRD) */}
        <div className="mt-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8C6D58] mb-1">
                <Instagram className="w-4 h-4 text-[#C68B59]" />
                <span>Follow Our Daily Journal</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C1810]">
                {CAFE_INFO.instagram}
              </h3>
            </div>

            <a
              id="instagram-profile-link"
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#3D2314] hover:text-[#C68B59] transition-colors py-2"
            >
              <span>View Instagram Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 4-Column Aesthetic Feed */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INSTAGRAM_POSTS.map((post) => (
              <div
                key={post.id}
                className="group relative bg-[#FFFDF9] rounded-2xl border border-[#E8D8C8] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col"
              >
                <div className="relative h-64 overflow-hidden bg-[#E8D8C8]">
                  <img
                    src={post.image}
                    alt={post.caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  {/* Hover Overlay with Likes & Comments */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-white text-xs font-bold">
                    <span className="flex items-center gap-1.5">
                      <Heart className="w-4 h-4 fill-white" /> {post.likes.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MessageCircle className="w-4 h-4 fill-white" /> {post.comments}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 flex flex-col justify-between flex-1">
                  <p className="text-xs text-[#5C3D2E] line-clamp-2 leading-relaxed mb-2 font-light">
                    {post.caption}
                  </p>
                  <span className="text-[10px] font-semibold text-[#8C6D58]">
                    {post.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
