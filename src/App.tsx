/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LiveVibeTicker } from './components/LiveVibeTicker';
import { Hero } from './components/Hero';
import { SpaceMoodSection } from './components/SpaceMoodSection';
import { MenuSection } from './components/MenuSection';
import { AboutSection } from './components/AboutSection';
import { VisitUsSection } from './components/VisitUsSection';
import { Footer } from './components/Footer';
import { DrinkCustomizerModal } from './components/DrinkCustomizerModal';
import { ReservationModal } from './components/ReservationModal';
import { AmbientSoundPlayer } from './components/AmbientSoundPlayer';
import { ambientAudio } from './utils/audioEngine';
import { MenuItem, SpaceMoodId } from './types';
import { MENU_ITEMS } from './data/cafeData';

export default function App() {
  // Modal states
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [reservationMood, setReservationMood] = useState<SpaceMoodId>('study');

  // Ambient sound state
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);
  const [ambientType, setAmbientType] = useState<'lofi' | 'rain' | 'chatter'>('lofi');

  const handleToggleAmbient = () => {
    const newState = ambientAudio.toggle(ambientType);
    setIsAmbientPlaying(newState);
  };

  const handleSelectAmbientType = (type: 'lofi' | 'rain' | 'chatter') => {
    setAmbientType(type);
    ambientAudio.play(type);
    setIsAmbientPlaying(true);
  };

  const handlePlayAmbientForMood = (type: 'lofi' | 'rain' | 'chatter') => {
    if (isAmbientPlaying && ambientType === type) {
      ambientAudio.stop();
      setIsAmbientPlaying(false);
    } else {
      setAmbientType(type);
      ambientAudio.play(type);
      setIsAmbientPlaying(true);
    }
  };

  const handleOpenReservation = (mood?: SpaceMoodId) => {
    if (mood) {
      setReservationMood(mood);
    }
    setIsReservationOpen(true);
  };

  const handleSelectPairing = (pairingName: string) => {
    const found = MENU_ITEMS.find(
      (m) => m.name.toLowerCase().includes(pairingName.toLowerCase()) ||
             pairingName.toLowerCase().includes(m.name.toLowerCase())
    );
    if (found) {
      setSelectedMenuItem(found);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C1810] flex flex-col font-sans selection:bg-[#E8D8C8]">
      {/* Live Vibe & Busyness Status Bar */}
      <LiveVibeTicker />

      {/* Sticky Main Navigation */}
      <Navbar
        onOpenReservation={() => handleOpenReservation('study')}
        onToggleAmbient={handleToggleAmbient}
        isAmbientPlaying={isAmbientPlaying}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onExploreMenu={() => scrollToSection('menu')}
          onExploreSpace={() => scrollToSection('space')}
          onOpenReservation={() => handleOpenReservation('study')}
        />

        {/* 2. Menu Section with Categories & Prices */}
        <MenuSection
          onSelectItem={(item) => setSelectedMenuItem(item)}
        />

        {/* 3. The Space & Moods (Study, Main Character, Catch-Up) */}
        <SpaceMoodSection
          onOpenReservationWithMood={(mood) => handleOpenReservation(mood)}
          onPlayAmbientForMood={handlePlayAmbientForMood}
          currentAmbientType={ambientType}
          isAmbientPlaying={isAmbientPlaying}
        />

        {/* 4. About & Our Story Section */}
        <AboutSection />

        {/* 5. Visit Us (Location, Hours, Instagram & Maps CTA) */}
        <VisitUsSection
          onOpenReservation={() => handleOpenReservation('study')}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Ambient Soundscape Widget */}
      <AmbientSoundPlayer
        isPlaying={isAmbientPlaying}
        currentType={ambientType}
        onToggle={handleToggleAmbient}
        onSelectType={handleSelectAmbientType}
      />

      {/* Drink Customizer / Item Detail Modal */}
      <DrinkCustomizerModal
        item={selectedMenuItem}
        onClose={() => setSelectedMenuItem(null)}
        onSelectPairing={handleSelectPairing}
      />

      {/* Reservation / Corner Booking Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        initialMood={reservationMood}
        onClose={() => setIsReservationOpen(false)}
      />
    </div>
  );
}
