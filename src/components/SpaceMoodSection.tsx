import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Laptop,
  Sun,
  Users,
  Zap,
  Wifi,
  VolumeX,
  Coffee,
  Disc,
  Sparkles,
  BookOpen,
  Trees,
  HeartHandshake,
  Smile,
  Music,
  ArrowRight,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { SPACE_MOODS } from '../data/cafeData';
import { SpaceMoodId } from '../types';

interface SpaceMoodSectionProps {
  onOpenReservationWithMood?: (moodId: SpaceMoodId) => void;
  onPlayAmbientForMood?: (audioType: 'lofi' | 'rain' | 'chatter') => void;
  currentAmbientType?: 'lofi' | 'rain' | 'chatter';
  isAmbientPlaying?: boolean;
}

export const SpaceMoodSection: React.FC<SpaceMoodSectionProps> = ({
  onOpenReservationWithMood,
  onPlayAmbientForMood,
  currentAmbientType,
  isAmbientPlaying,
}) => {
  const [selectedMoodId, setSelectedMoodId] = useState<SpaceMoodId>('study');
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const currentMood = SPACE_MOODS.find((m) => m.id === selectedMoodId) || SPACE_MOODS[0];

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-4 h-4 text-[#C68B59]" />;
      case 'Wifi': return <Wifi className="w-4 h-4 text-[#C68B59]" />;
      case 'VolumeX': return <VolumeX className="w-4 h-4 text-[#C68B59]" />;
      case 'Coffee': return <Coffee className="w-4 h-4 text-[#C68B59]" />;
      case 'Sun': return <Sun className="w-4 h-4 text-[#C68B59]" />;
      case 'Disc': return <Disc className="w-4 h-4 text-[#C68B59]" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-[#C68B59]" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4 text-[#C68B59]" />;
      case 'Trees': return <Trees className="w-4 h-4 text-[#C68B59]" />;
      case 'HeartHandshake': return <HeartHandshake className="w-4 h-4 text-[#C68B59]" />;
      case 'Smile': return <Smile className="w-4 h-4 text-[#C68B59]" />;
      default: return <Users className="w-4 h-4 text-[#C68B59]" />;
    }
  };

  const getMoodTabIcon = (id: SpaceMoodId) => {
    switch (id) {
      case 'study': return <Laptop className="w-4 h-4" />;
      case 'main-character': return <Sun className="w-4 h-4" />;
      case 'catch-up': return <Users className="w-4 h-4" />;
    }
  };

  return (
    <section id="space" className="py-20 bg-[#F5EBE0]/50 border-y border-[#E8D8C8]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8D8C8] text-[#5C3D2E] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Find Your Vibe</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#2C1810] tracking-tight mb-4">
            The Space & Three Distinct Moods
          </h2>
          <p className="text-sm sm:text-base text-[#5C3D2E] font-light leading-relaxed">
            Whether you need laser-focused productivity, an aesthetic solo afternoon, or a lively brunch with friends, our café is intentionally zoned for you.
          </p>
        </div>

        {/* Mood Mode Selector Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#FAF7F2] border border-[#E8D8C8] shadow-xs gap-1.5 max-w-full overflow-x-auto">
            {SPACE_MOODS.map((mood) => {
              const isSelected = mood.id === selectedMoodId;
              return (
                <button
                  key={mood.id}
                  id={`mood-tab-${mood.id}`}
                  onClick={() => {
                    setSelectedMoodId(mood.id);
                    setActivePhotoIdx(0);
                  }}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-[#3D2314] text-[#FAF7F2] shadow-sm'
                      : 'text-[#5C3D2E] hover:text-[#2C1810] hover:bg-[#E8D8C8]/50'
                  }`}
                >
                  {getMoodTabIcon(mood.id)}
                  <span>{mood.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Mood Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMood.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="bg-[#FAF7F2] rounded-3xl border border-[#E8D8C8] shadow-sm overflow-hidden p-6 sm:p-8 lg:p-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Mood Info, Features & Pairings */}
              <div className="lg:col-span-6 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#E8D8C8] text-[#5C3D2E]">
                    {currentMood.badge}
                  </span>
                  <span className="text-xs text-[#8C6D58] font-medium">Bandra Sanctuary</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C1810] mb-3">
                  {currentMood.name}
                </h3>

                <p className="text-sm sm:text-base text-[#5C3D2E] font-medium leading-snug mb-4">
                  {currentMood.tagline}
                </p>

                <p className="text-sm text-[#6F4E37]/90 leading-relaxed mb-6">
                  {currentMood.vibeDescription}
                </p>

                {/* Quote Box */}
                <div className="p-4 rounded-2xl bg-[#F5EBE0] border border-[#E8D8C8]/80 mb-6 font-editorial italic text-sm text-[#3D2314] leading-relaxed">
                  {currentMood.quote}
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
                  {currentMood.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#FFFDF9] border border-[#E8D8C8] flex flex-col"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {getFeatureIcon(feat.iconName)}
                        <h4 className="text-xs font-bold text-[#2C1810]">{feat.title}</h4>
                      </div>
                      <p className="text-[11px] text-[#8C6D58] leading-tight">{feat.description}</p>
                    </div>
                  ))}
                </div>

                {/* Recommended Pairings & Sound Control */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#E8D8C8]/40 border border-[#E8D8C8] mt-auto">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-bold text-[#8C6D58] block mb-1">
                      Recommended Pairing
                    </span>
                    <div className="text-xs font-semibold text-[#2C1810]">
                      ☕ {currentMood.recommendedPairing.drink} + 🥐 {currentMood.recommendedPairing.food}
                    </div>
                  </div>

                  {/* Play Mood Ambience */}
                  {onPlayAmbientForMood && (
                    <button
                      id={`play-sound-${currentMood.id}`}
                      onClick={() => onPlayAmbientForMood(currentMood.ambientAudioType)}
                      className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 ${
                        isAmbientPlaying && currentAmbientType === currentMood.ambientAudioType
                          ? 'bg-[#3D2314] text-[#FAF7F2]'
                          : 'bg-[#FAF7F2] text-[#3D2314] hover:bg-[#3D2314] hover:text-[#FAF7F2] border border-[#D4C3B3]'
                      }`}
                    >
                      <Music className="w-3.5 h-3.5 text-[#C68B59]" />
                      <span>
                        {isAmbientPlaying && currentAmbientType === currentMood.ambientAudioType
                          ? 'Playing Ambience'
                          : `Play ${currentMood.ambientAudioName}`}
                      </span>
                    </button>
                  )}
                </div>

                {/* Direct Mood Booking CTA */}
                {onOpenReservationWithMood && (
                  <div className="mt-4">
                    <button
                      id={`book-corner-${currentMood.id}`}
                      onClick={() => onOpenReservationWithMood(currentMood.id)}
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#3D2314] hover:bg-[#2C1810] text-[#FAF7F2] py-3 rounded-xl text-xs font-semibold tracking-wide transition-all shadow-xs"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#E8D8C8]" />
                      <span>Reserve for {currentMood.name}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Right Column: Dynamic Photos with Thumbnails */}
              <div className="lg:col-span-6 flex flex-col gap-3">
                {/* Main Large Photo */}
                <div className="relative h-[320px] sm:h-[380px] rounded-2xl overflow-hidden shadow-md border border-[#E8D8C8] bg-[#E8D8C8]">
                  <img
                    src={currentMood.photos[activePhotoIdx].url}
                    alt={currentMood.photos[activePhotoIdx].caption}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#2C1810]/80 text-[#FAF7F2] backdrop-blur-xs">
                      {currentMood.photos[activePhotoIdx].tag}
                    </span>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#2C1810]/90 via-[#2C1810]/40 to-transparent p-4 text-[#FAF7F2]">
                    <p className="text-xs font-medium text-[#FAF7F2]/90">
                      {currentMood.photos[activePhotoIdx].caption}
                    </p>
                  </div>
                </div>

                {/* Thumbnails Row */}
                <div className="grid grid-cols-3 gap-3">
                  {currentMood.photos.map((photo, pIdx) => (
                    <button
                      key={pIdx}
                      id={`thumb-${currentMood.id}-${pIdx}`}
                      onClick={() => setActivePhotoIdx(pIdx)}
                      className={`relative h-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activePhotoIdx === pIdx
                          ? 'border-[#3D2314] ring-2 ring-[#C68B59]/40 scale-102'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={photo.url}
                        alt={photo.tag}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/15"></div>
                      <span className="absolute bottom-1 left-1 text-[9px] font-bold text-white bg-black/60 px-1.5 py-0.5 rounded-md">
                        {photo.tag}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Best For Tags */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-xs font-bold text-[#5C3D2E]">Best for:</span>
                  {currentMood.bestFor.map((item, bIdx) => (
                    <span
                      key={bIdx}
                      className="text-xs bg-[#E8D8C8]/60 text-[#3D2314] px-2.5 py-1 rounded-full font-medium"
                    >
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
