import React, { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle2, Sparkles, MapPin, Laptop, Sun } from 'lucide-react';
import { SpaceMoodId } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  initialMood?: SpaceMoodId;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  initialMood = 'study',
  onClose,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('16:00');
  const [guests, setGuests] = useState('1');
  const [selectedMood, setSelectedMood] = useState<SpaceMoodId>(initialMood);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = 'BB-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(ref);
    setSubmitted(true);
  };

  const getMoodLabel = (m: SpaceMoodId) => {
    switch (m) {
      case 'study': return 'Study & Deep Work Alcove (Power + Quiet)';
      case 'main-character': return 'Main Character Bay Window (Sunlit)';
      case 'catch-up': return 'Botanical Courtyard (Plush Banquette)';
    }
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

        {submitted ? (
          /* Confirmation View */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8C6D58]">
                Table Reserved
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#2C1810] mt-1">
                We'll Have Your Corner Ready!
              </h3>
              <p className="text-xs text-[#5C3D2E] mt-2">
                Booking Reference: <strong className="text-[#3D2314] font-mono">{bookingRef}</strong>
              </p>
            </div>

            <div className="bg-[#FFFDF9] p-5 rounded-2xl border border-[#E8D8C8] text-left space-y-2.5 text-xs text-[#5C3D2E]">
              <div className="flex justify-between">
                <span className="text-[#8C6D58]">Reserved for:</span>
                <span className="font-bold text-[#2C1810]">{name} ({guests} {parseInt(guests, 10) === 1 ? 'Guest' : 'Guests'})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C6D58]">Date & Time:</span>
                <span className="font-bold text-[#2C1810]">{date} at {time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C6D58]">Space Zone:</span>
                <span className="font-bold text-[#2C1810]">{getMoodLabel(selectedMood)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C6D58]">Location:</span>
                <span className="font-bold text-[#2C1810]">14/B Perry Cross, Bandra (W)</span>
              </div>
            </div>

            <p className="text-[11px] text-[#8C6D58] leading-tight">
              We hold reserved spots for up to 15 minutes past your time. Free Wi-Fi 6 passcode will be ready on your desk coaster.
            </p>

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="w-full bg-[#3D2314] hover:bg-[#2C1810] text-[#FAF7F2] py-3 rounded-full text-xs font-semibold"
            >
              Done & Return to Website
            </button>
          </div>
        ) : (
          /* Booking Form */
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#8C6D58] block">
                Complimentary Table / Corner Request
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#2C1810] mt-0.5">
                Reserve Your Third Space
              </h3>
              <p className="text-xs text-[#5C3D2E] mt-1">
                Guarantee your favorite spot for study sprints, creative coffee dates, or catch-ups.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Preferred Space Zone */}
              <div>
                <label className="block text-xs font-bold text-[#2C1810] mb-1.5">
                  Select Seating Vibe / Mood
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'study', label: 'Study Alcove', desc: 'Power + Quiet' },
                    { id: 'main-character', label: 'Bay Window', desc: 'Aesthetic Light' },
                    { id: 'catch-up', label: 'Courtyard', desc: 'Lounge Banquette' },
                  ].map((m) => (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => setSelectedMood(m.id as SpaceMoodId)}
                      className={`p-2.5 rounded-xl text-left border transition-all ${
                        selectedMood === m.id
                          ? 'bg-[#3D2314] text-white border-[#3D2314] shadow-xs'
                          : 'bg-[#FFFDF9] text-[#5C3D2E] border-[#E8D8C8] hover:bg-[#F5EBE0]'
                      }`}
                    >
                      <div className="text-xs font-bold">{m.label}</div>
                      <div className={`text-[10px] ${selectedMood === m.id ? 'text-[#D4C3B3]' : 'text-[#8C6D58]'}`}>
                        {m.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2C1810] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tara Sen"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#FFFDF9] border border-[#E8D8C8] rounded-xl px-3.5 py-2 text-xs text-[#2C1810] focus:outline-hidden focus:border-[#3D2314]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2C1810] mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98200 XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#FFFDF9] border border-[#E8D8C8] rounded-xl px-3.5 py-2 text-xs text-[#2C1810] focus:outline-hidden focus:border-[#3D2314]"
                  />
                </div>
              </div>

              {/* Date, Time, Guests */}
              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-[#2C1810] mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#FFFDF9] border border-[#E8D8C8] rounded-xl px-2.5 py-2 text-xs text-[#2C1810] focus:outline-hidden focus:border-[#3D2314]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2C1810] mb-1">
                    Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#FFFDF9] border border-[#E8D8C8] rounded-xl px-2.5 py-2 text-xs text-[#2C1810] focus:outline-hidden focus:border-[#3D2314]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2C1810] mb-1">
                    Guests *
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-[#FFFDF9] border border-[#E8D8C8] rounded-xl px-2.5 py-2 text-xs text-[#2C1810] focus:outline-hidden focus:border-[#3D2314]"
                  >
                    <option value="1">1 Person (Solo)</option>
                    <option value="2">2 People</option>
                    <option value="3">3 People</option>
                    <option value="4">4 People</option>
                    <option value="5">5+ Team/Group</option>
                  </select>
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-xs font-bold text-[#2C1810] mb-1">
                  Special Preferences (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Near plug point, bringing my golden retriever, silent zone"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#FFFDF9] border border-[#E8D8C8] rounded-xl px-3.5 py-2 text-xs text-[#2C1810] focus:outline-hidden focus:border-[#3D2314]"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#3D2314] hover:bg-[#2C1810] text-[#FAF7F2] py-3.5 rounded-full text-xs font-semibold tracking-wide transition-all shadow-md active:scale-98"
                >
                  Confirm Table Reservation
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
    </div>
  );
};
