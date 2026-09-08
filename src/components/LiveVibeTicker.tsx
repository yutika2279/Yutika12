import React, { useState, useEffect } from 'react';
import { Sparkles, Clock, MapPin, Coffee, Users, Wifi } from 'lucide-react';

export const LiveVibeTicker: React.FC = () => {
  const [timeString, setTimeString] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Mumbai time formatter
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      };
      setTimeString(new Intl.DateTimeFormat('en-IN', options).format(now));

      // Calculate if open (7:30 AM to 11:00 PM IST)
      const istHours = parseInt(
        new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: 'numeric',
          hour12: false,
        }).format(now),
        10
      );
      setIsOpen(istHours >= 7 && istHours < 23);
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="live-vibe-ticker"
      className="bg-[#2C1810] text-[#FAF7F2] py-2.5 px-4 text-xs overflow-hidden border-b border-[#3D2314]"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Live Status Pill */}
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOpen ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isOpen ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
          </span>
          <span className="font-semibold tracking-wider uppercase text-[11px] text-[#E8D8C8]">
            {isOpen ? 'Open Now in Bandra' : 'Opens at 7:30 AM'}
          </span>
          <span className="text-[#8C6D58] hidden sm:inline">•</span>
          <span className="text-[#D4C3B3] hidden sm:inline flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#C68B59]" /> {timeString || '8:30 PM'} IST
          </span>
        </div>

        {/* Center: Live Vibe / Roast details */}
        <div className="hidden lg:flex items-center gap-5 text-[#E8D8C8]/90">
          <div className="flex items-center gap-1.5">
            <Coffee className="w-3 h-3 text-[#C68B59]" />
            <span>Today’s Roast: <strong>Chikmagalur Anaerobic Honey</strong></span>
          </div>
          <span className="text-[#5C3D2E]">•</span>
          <div className="flex items-center gap-1.5">
            <Users className="w-3 h-3 text-[#C68B59]" />
            <span>Vibe: <strong className="text-emerald-300">Cozy & Calm</strong> (Seats Available)</span>
          </div>
        </div>

        {/* Right: Quick amenity callout */}
        <div className="flex items-center gap-3 text-[11px] text-[#D4C3B3]">
          <span className="flex items-center gap-1 text-[#E8D8C8]">
            <Wifi className="w-3 h-3 text-[#C68B59]" /> 500 Mbps High-Speed Wi-Fi
          </span>
          <span className="text-[#5C3D2E]">•</span>
          <span className="text-[#E8D8C8]">⚡ Plugs at every table</span>
        </div>
      </div>
    </div>
  );
};
