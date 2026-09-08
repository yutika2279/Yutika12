import React, { useState, useEffect } from 'react';
import { Coffee, Compass, Sparkles, MapPin, Menu, X, Calendar, Music } from 'lucide-react';

interface NavbarProps {
  onOpenReservation: () => void;
  onToggleAmbient: () => void;
  isAmbientPlaying: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenReservation,
  onToggleAmbient,
  isAmbientPlaying,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'The Menu', href: '#menu' },
    { name: 'The Space', href: '#space' },
    { name: 'Our Story', href: '#story' },
    { name: 'Visit Us', href: '#visit' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF7F2]/90 backdrop-blur-md shadow-xs py-3 border-b border-[#E8D8C8]/60'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          id="nav-brand-logo"
          href="#home"
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-full bg-[#3D2314] text-[#FAF7F2] flex items-center justify-center transition-transform group-hover:scale-105 shadow-xs">
            <Coffee className="w-5 h-5 text-[#E8D8C8]" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#2C1810]">
              Brew & Beyond
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#8C6D58] font-medium -mt-1">
              Bandra • Mumbai
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav-links" className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-[#5C3D2E] hover:text-[#2C1810] tracking-wide transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#8C6D58] hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-3">
          {/* Ambient Sound Button */}
          <button
            id="nav-ambient-toggle-btn"
            onClick={onToggleAmbient}
            title={isAmbientPlaying ? 'Pause Café Ambience' : 'Play Café Ambience'}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              isAmbientPlaying
                ? 'bg-[#3D2314] text-[#FAF7F2] border-[#3D2314] shadow-xs'
                : 'bg-[#F5EBE0]/80 text-[#5C3D2E] border-[#E8D8C8] hover:bg-[#E8D8C8]'
            }`}
          >
            <Music className={`w-3.5 h-3.5 ${isAmbientPlaying ? 'animate-pulse text-[#D97706]' : ''}`} />
            <span>{isAmbientPlaying ? 'Soundscape On' : 'Lo-Fi Vibe'}</span>
          </button>

          {/* Table / Corner Booking CTA */}
          <button
            id="nav-reservation-btn"
            onClick={onOpenReservation}
            className="flex items-center gap-2 bg-[#3D2314] hover:bg-[#2C1810] text-[#FAF7F2] px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all shadow-xs hover:shadow-md active:scale-98"
          >
            <Calendar className="w-3.5 h-3.5 text-[#E8D8C8]" />
            <span>Book a Corner</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            id="mobile-ambient-btn"
            onClick={onToggleAmbient}
            className={`p-2 rounded-full border text-xs ${
              isAmbientPlaying ? 'bg-[#3D2314] text-[#FAF7F2]' : 'bg-[#F5EBE0] text-[#5C3D2E]'
            }`}
          >
            <Music className="w-4 h-4" />
          </button>
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#2C1810] hover:bg-[#E8D8C8]/50"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-[#FAF7F2] border-b border-[#E8D8C8] px-6 py-5 shadow-lg animate-in slide-in-from-top-2 duration-200"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#2C1810] py-2 border-b border-[#E8D8C8]/40 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-xs text-[#8C6D58]">→</span>
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2.5">
              <button
                id="mobile-book-corner-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full bg-[#3D2314] text-[#FAF7F2] py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#E8D8C8]" />
                <span>Book a Table / Study Corner</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
