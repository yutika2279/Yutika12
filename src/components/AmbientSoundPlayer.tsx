import React, { useState } from 'react';
import { Music, Play, Pause, Volume2, VolumeX, X, Disc, CloudRain, Users, ChevronUp, ChevronDown } from 'lucide-react';
import { ambientAudio } from '../utils/audioEngine';

interface AmbientSoundPlayerProps {
  isPlaying: boolean;
  currentType: 'lofi' | 'rain' | 'chatter';
  onToggle: () => void;
  onSelectType: (type: 'lofi' | 'rain' | 'chatter') => void;
}

export const AmbientSoundPlayer: React.FC<AmbientSoundPlayerProps> = ({
  isPlaying,
  currentType,
  onToggle,
  onSelectType,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [muted, setMuted] = useState(false);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setMuted(val === 0);
    ambientAudio.setVolume(val);
  };

  const handleToggleMute = () => {
    if (muted) {
      setMuted(false);
      ambientAudio.setVolume(volume || 0.5);
    } else {
      setMuted(true);
      ambientAudio.setVolume(0);
    }
  };

  const getTypeName = (t: 'lofi' | 'rain' | 'chatter') => {
    switch (t) {
      case 'lofi': return 'Vinyl Lo-Fi Warmth';
      case 'rain': return 'Rain Against Cafe Glass';
      case 'chatter': return 'Cosy Café Murmurs';
    }
  };

  return (
    <div
      id="floating-ambient-player"
      className="fixed bottom-6 right-6 z-40"
    >
      {/* Expanded Controls Card */}
      {expanded ? (
        <div className="bg-[#FAF7F2]/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-[#E8D8C8] w-72 mb-2 animate-in slide-in-from-bottom-3 duration-200 text-[#2C1810]">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8D8C8]">
            <div className="flex items-center gap-2">
              <Disc className={`w-4 h-4 text-[#C68B59] ${isPlaying ? 'animate-spin' : ''}`} />
              <span className="font-serif font-bold text-xs">Café Ambience Studio</span>
            </div>
            <button
              onClick={() => setExpanded(false)}
              className="text-[#8C6D58] hover:text-[#2C1810] p-1"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Soundscape Selector */}
          <div className="space-y-1.5 my-3">
            {[
              { id: 'lofi', label: 'Vintage Vinyl Lo-Fi', icon: <Disc className="w-3.5 h-3.5 text-[#C68B59]" /> },
              { id: 'rain', label: 'Gentle Mumbai Rain', icon: <CloudRain className="w-3.5 h-3.5 text-[#C68B59]" /> },
              { id: 'chatter', label: 'Warm Café Murmurs', icon: <Users className="w-3.5 h-3.5 text-[#C68B59]" /> },
            ].map((sound) => (
              <button
                key={sound.id}
                onClick={() => onSelectType(sound.id as any)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  currentType === sound.id && isPlaying
                    ? 'bg-[#3D2314] text-[#FAF7F2]'
                    : 'bg-[#FFFDF9] text-[#5C3D2E] border border-[#E8D8C8] hover:bg-[#E8D8C8]/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  {sound.icon}
                  <span>{sound.label}</span>
                </div>
                {currentType === sound.id && isPlaying && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                )}
              </button>
            ))}
          </div>

          {/* Volume Slider */}
          <div className="flex items-center gap-2 pt-2 border-t border-[#E8D8C8]">
            <button
              onClick={handleToggleMute}
              className="text-[#8C6D58] hover:text-[#2C1810]"
            >
              {muted ? <VolumeX className="w-4 h-4 text-rose-600" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={muted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-full accent-[#3D2314] h-1.5 bg-[#E8D8C8] rounded-lg cursor-pointer"
            />
            <span className="text-[10px] text-[#8C6D58] font-mono w-7 text-right">
              {muted ? '0%' : `${Math.round(volume * 100)}%`}
            </span>
          </div>
        </div>
      ) : null}

      {/* Main Mini Floating Pill */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#3D2314] text-[#FAF7F2] shadow-xl border border-[#6F4E37]">
        {/* Play/Pause */}
        <button
          id="mini-ambient-play-toggle"
          onClick={onToggle}
          className="w-8 h-8 rounded-full bg-[#5C3D2E] hover:bg-[#6F4E37] text-[#FAF7F2] flex items-center justify-center transition-colors"
          title={isPlaying ? 'Pause Ambience' : 'Play Ambience'}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
        </button>

        {/* Text & Expand */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 px-2.5 py-1 text-left text-xs"
        >
          <div className="flex flex-col">
            <span className="font-semibold text-[11px] leading-tight text-[#FAF7F2]">
              {isPlaying ? getTypeName(currentType) : 'Lo-Fi Soundscape'}
            </span>
            <span className="text-[9px] text-[#D4C3B3]">
              {isPlaying ? 'Active Synthesizer' : 'Tap to relax'}
            </span>
          </div>
          {expanded ? (
            <ChevronDown className="w-3.5 h-3.5 text-[#E8D8C8]" />
          ) : (
            <ChevronUp className="w-3.5 h-3.5 text-[#E8D8C8]" />
          )}
        </button>
      </div>
    </div>
  );
};
