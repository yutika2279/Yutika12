import React, { useState } from 'react';
import { X, Sparkles, Check, Heart, Share2, Coffee, Flame } from 'lucide-react';
import { MenuItem } from '../types';

interface DrinkCustomizerModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onSelectPairing?: (pairingName: string) => void;
}

export const DrinkCustomizerModal: React.FC<DrinkCustomizerModalProps> = ({
  item,
  onClose,
  onSelectPairing,
}) => {
  if (!item) return null;

  const [temperature, setTemperature] = useState<'Hot' | 'Iced'>(
    item.temperature === 'Iced' ? 'Iced' : 'Hot'
  );
  const [milkChoice, setMilkChoice] = useState<'Oat Milk' | 'Almond Milk' | 'Whole Milk' | 'None'>(
    'Oat Milk'
  );
  const [sweetness, setSweetness] = useState<string>('Standard');
  const [copiedNote, setCopiedNote] = useState(false);
  const [savedToFavorites, setSavedToFavorites] = useState(false);

  const milkOptions = [
    { label: 'Oat Milk', note: 'House creamy oat (Recommended)', extra: '₹0' },
    { label: 'Whole Milk', note: 'Organic dairy whole milk', extra: '₹0' },
    { label: 'Almond Milk', note: 'Nutty & light', extra: '₹0' },
    { label: 'None', note: 'Black / Clean extraction', extra: '₹0' },
  ];

  const sweetnessOptions = ['Zero Sugar', 'Subtle (25%)', 'Standard (50%)', 'Extra Sweet'];

  const getCustomizedSummary = () => {
    let parts = [item.name];
    if (item.category === 'coffee' || item.category === 'non-coffee') {
      if (item.temperature === 'Both') parts.push(temperature);
      parts.push(milkChoice);
      parts.push(`Sweetness: ${sweetness}`);
    }
    return parts.join(' • ');
  };

  const handleCopyOrder = () => {
    navigator.clipboard.writeText(`My Brew & Beyond Order: ${getCustomizedSummary()}`);
    setCopiedNote(true);
    setTimeout(() => setCopiedNote(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative bg-[#FAF7F2] rounded-3xl border border-[#E8D8C8] shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#FAF7F2]/80 backdrop-blur-md text-[#2C1810] flex items-center justify-center border border-[#E8D8C8] hover:bg-[#E8D8C8] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Photo Banner */}
        <div className="relative h-60 overflow-hidden rounded-t-3xl bg-[#E8D8C8]">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-transparent to-black/20"></div>

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#3D2314] text-[#FAF7F2]">
                {item.category.toUpperCase()}
              </span>
            </div>
            <div className="bg-[#3D2314] text-[#FAF7F2] px-4 py-1.5 rounded-full font-serif font-bold text-base shadow-md">
              ₹{item.price}
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-6">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#2C1810] mb-2">
              {item.name}
            </h3>
            <p className="text-xs sm:text-sm text-[#5C3D2E] leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Tasting Notes */}
          {item.tastingNotes && item.tastingNotes.length > 0 && (
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#8C6D58] block mb-2">
                Terroir & Flavor Profile
              </span>
              <div className="flex flex-wrap gap-2">
                {item.tastingNotes.map((note, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#E8D8C8]/60 text-[#3D2314]"
                  >
                    ✨ {note}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Drink Customization Options (Only for beverages) */}
          {(item.category === 'coffee' || item.category === 'non-coffee') && (
            <div className="space-y-4 pt-2 border-t border-[#E8D8C8]">
              
              {/* Temperature Selector */}
              {item.temperature === 'Both' && (
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#8C6D58] block mb-2">
                    Temperature
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {(['Hot', 'Iced'] as const).map((temp) => (
                      <button
                        key={temp}
                        onClick={() => setTemperature(temp)}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                          temperature === temp
                            ? 'bg-[#3D2314] text-white border-[#3D2314] shadow-xs'
                            : 'bg-[#FFFDF9] text-[#5C3D2E] border-[#E8D8C8] hover:bg-[#E8D8C8]/40'
                        }`}
                      >
                        {temp === 'Hot' ? '☕ Steamed Hot' : '🧊 Over Clear Ice'}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Milk Choice */}
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#8C6D58] block mb-2">
                  Choice of Milk (Complimentary)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {milkOptions.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => setMilkChoice(opt.label as any)}
                      className={`p-2.5 rounded-xl text-left border transition-all ${
                        milkChoice === opt.label
                          ? 'bg-[#3D2314] text-white border-[#3D2314] shadow-xs'
                          : 'bg-[#FFFDF9] text-[#5C3D2E] border-[#E8D8C8] hover:bg-[#E8D8C8]/40'
                      }`}
                    >
                      <div className="text-xs font-bold">{opt.label}</div>
                      <div className={`text-[10px] ${milkChoice === opt.label ? 'text-[#D4C3B3]' : 'text-[#8C6D58]'}`}>
                        {opt.note}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sweetness */}
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#8C6D58] block mb-2">
                  Sweetness Level
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {sweetnessOptions.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSweetness(s)}
                      className={`py-2 px-2 rounded-xl text-[11px] font-medium border text-center transition-all ${
                        sweetness === s
                          ? 'bg-[#E8D8C8] text-[#2C1810] font-bold border-[#C68B59]'
                          : 'bg-[#FFFDF9] text-[#5C3D2E] border-[#E8D8C8] hover:bg-[#F5EBE0]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Recommended Pairing Callout */}
          {item.pairingRecommendation && (
            <div className="p-3.5 rounded-2xl bg-[#F5EBE0] border border-[#E8D8C8] flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#8C6D58] block">
                  Chef's Pairing Suggestion
                </span>
                <span className="text-xs font-semibold text-[#2C1810]">
                  🍽️ {item.pairingRecommendation}
                </span>
              </div>
              {onSelectPairing && (
                <button
                  onClick={() => onSelectPairing(item.pairingRecommendation!)}
                  className="px-3 py-1 rounded-lg bg-[#3D2314] text-[#FAF7F2] text-[11px] font-semibold hover:bg-[#2C1810]"
                >
                  View Item
                </button>
              )}
            </div>
          )}

          {/* Order Summary & Barista Note Action */}
          <div className="pt-3 border-t border-[#E8D8C8] space-y-3">
            <div className="p-3 rounded-xl bg-[#FFFDF9] border border-[#E8D8C8] text-xs">
              <span className="text-[#8C6D58] text-[10px] block uppercase font-bold">Your Custom Preparation:</span>
              <span className="font-semibold text-[#2C1810]">{getCustomizedSummary()}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyOrder}
                className="flex-1 bg-[#3D2314] hover:bg-[#2C1810] text-[#FAF7F2] py-3 rounded-xl text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                {copiedNote ? <Check className="w-4 h-4 text-emerald-400" /> : <Coffee className="w-4 h-4 text-[#E8D8C8]" />}
                <span>{copiedNote ? 'Order Note Copied for Barista!' : 'Save & Copy Order Note'}</span>
              </button>

              <button
                onClick={() => setSavedToFavorites(!savedToFavorites)}
                className={`p-3 rounded-xl border transition-all ${
                  savedToFavorites
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'bg-[#FFFDF9] border-[#E8D8C8] text-[#8C6D58] hover:text-[#2C1810]'
                }`}
                title="Save to Favorites"
              >
                <Heart className={`w-4 h-4 ${savedToFavorites ? 'fill-rose-500' : ''}`} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
