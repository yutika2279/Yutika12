import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Coffee,
  Sparkles,
  CupSoda,
  UtensilsCrossed,
  Cake,
  Search,
  SlidersHorizontal,
  Flame,
  Check,
  Plus,
  Info,
  ChevronRight,
} from 'lucide-react';
import { MENU_ITEMS } from '../data/cafeData';
import { MenuItem, MenuCategory } from '../types';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectItem }) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [selectedDietary, setSelectedDietary] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: { id: MenuCategory; name: string; icon: React.ReactNode }[] = [
    { id: 'all', name: 'Full Menu', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'coffee', name: 'Specialty Coffee', icon: <Coffee className="w-4 h-4" /> },
    { id: 'non-coffee', name: 'Non-Coffee & Teas', icon: <CupSoda className="w-4 h-4" /> },
    { id: 'bites', name: 'Artisanal Bites', icon: <UtensilsCrossed className="w-4 h-4" /> },
    { id: 'desserts', name: 'Pastries & Bakes', icon: <Cake className="w-4 h-4" /> },
  ];

  const dietaryOptions = [
    { id: 'all', label: 'All Items' },
    { id: 'bestseller', label: '★ Bestsellers' },
    { id: 'vegan', label: 'Vegan / Plant-Based' },
    { id: 'gf', label: 'Gluten-Free' },
    { id: 'staff-pick', label: 'Staff Picks' },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Dietary filter
      if (selectedDietary === 'bestseller' && !item.isBestseller) {
        return false;
      }
      if (selectedDietary === 'staff-pick' && !item.isStaffPick) {
        return false;
      }
      if (selectedDietary === 'vegan' && !item.dietary?.includes('Vegan')) {
        return false;
      }
      if (selectedDietary === 'gf' && !item.dietary?.includes('GF')) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchNotes = item.tastingNotes?.some((n) => n.toLowerCase().includes(q));
        const matchTags = item.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchNotes && !matchTags) {
          return false;
        }
      }
      return true;
    });
  }, [activeCategory, selectedDietary, searchQuery]);

  return (
    <section id="menu" className="py-20 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8D8C8] text-[#5C3D2E] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Freshly Brewed & Baked</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#2C1810] tracking-tight mb-4">
            Curated Café Menu
          </h2>
          <p className="text-sm sm:text-base text-[#5C3D2E] font-light leading-relaxed">
            From direct-trade Chikmagalur manual pour-overs to creamy cloud cold brews, warm sourdough melts, and twice-baked French pastries.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex justify-center mb-6 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#F5EBE0] border border-[#E8D8C8] gap-1 max-w-full">
            {categories.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`menu-cat-${cat.id}`}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-[#3D2314] text-[#FAF7F2] shadow-sm'
                      : 'text-[#5C3D2E] hover:text-[#2C1810] hover:bg-[#E8D8C8]/60'
                  }`}
                >
                  {cat.icon}
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Dietary Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-[#FFFDF9] p-3.5 rounded-2xl border border-[#E8D8C8] shadow-xs">
          
          {/* Dietary filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {dietaryOptions.map((opt) => (
              <button
                key={opt.id}
                id={`dietary-filter-${opt.id}`}
                onClick={() => setSelectedDietary(opt.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedDietary === opt.id
                    ? 'bg-[#E8D8C8] text-[#2C1810] font-semibold'
                    : 'text-[#6F4E37] hover:bg-[#F5EBE0]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#8C6D58] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="menu-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search drinks, notes, bakes..."
              className="w-full bg-[#FAF7F2] border border-[#E8D8C8] rounded-xl pl-9 pr-4 py-1.5 text-xs text-[#2C1810] placeholder:text-[#8C6D58] focus:outline-hidden focus:border-[#3D2314] focus:ring-1 focus:ring-[#3D2314] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C6D58] hover:text-[#2C1810]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#FFFDF9] rounded-3xl border border-[#E8D8C8] max-w-lg mx-auto p-6">
            <Coffee className="w-10 h-10 text-[#C68B59] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-lg font-bold text-[#2C1810] mb-1">No items found</h3>
            <p className="text-xs text-[#8C6D58] mb-4">Try clearing your search query or dietary filters.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedDietary('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#3D2314] text-[#FAF7F2] rounded-full text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="group bg-[#FFFDF9] rounded-2xl border border-[#E8D8C8] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
                onClick={() => onSelectItem(item)}
              >
                {/* Image Header with Price & Badges */}
                <div className="relative h-48 overflow-hidden bg-[#E8D8C8]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {item.isBestseller && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D97706] text-white tracking-wide shadow-xs">
                        Bestseller
                      </span>
                    )}
                    {item.isStaffPick && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#3D2314] text-[#FAF7F2] tracking-wide shadow-xs">
                        Staff Pick
                      </span>
                    )}
                    {item.temperature && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/90 text-[#3D2314] backdrop-blur-xs">
                        {item.temperature}
                      </span>
                    )}
                  </div>

                  {/* Price Tag */}
                  <div className="absolute bottom-3 right-3 bg-[#FAF7F2] text-[#2C1810] px-3 py-1 rounded-full font-serif font-bold text-sm shadow-md border border-[#E8D8C8]">
                    ₹{item.price}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#2C1810] group-hover:text-[#6F4E37] transition-colors mb-1.5 leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#6F4E37] line-clamp-2 leading-relaxed mb-3">
                      {item.description}
                    </p>

                    {/* Tasting Notes Chips */}
                    {item.tastingNotes && item.tastingNotes.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 mb-3">
                        {item.tastingNotes.map((note, nIdx) => (
                          <span
                            key={nIdx}
                            className="text-[10px] font-medium bg-[#F5EBE0] text-[#5C3D2E] px-2 py-0.5 rounded-md"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer with Dietary and Customize prompt */}
                  <div className="pt-3 border-t border-[#E8D8C8]/60 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {item.dietary?.map((d, dIdx) => (
                        <span key={dIdx} className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                          {d}
                        </span>
                      ))}
                      {!item.dietary?.length && (
                        <span className="text-[10px] text-[#8C6D58]">Artisan Handcrafted</span>
                      )}
                    </div>

                    <span className="text-xs font-bold text-[#3D2314] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      Details / Customize <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Coffee Bean Sourcing Info Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#3D2314] text-[#FAF7F2] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#5C3D2E] flex items-center justify-center shrink-0 text-[#E8D8C8]">
              <Coffee className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-[#FAF7F2] mb-1">
                Direct-Trade Specialty Indian Beans
              </h4>
              <p className="text-xs sm:text-sm text-[#D4C3B3] max-w-xl leading-relaxed">
                We roast small 5kg batches weekly. Milk options include organic whole milk, house-pressed oat milk, and California almond milk at no extra charge.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-[#E8D8C8] font-medium hidden sm:inline">Whole beans available to take home</span>
            <div className="px-4 py-2 rounded-full bg-[#5C3D2E] text-xs font-semibold text-[#FAF7F2] border border-[#6F4E37]">
              250g Retail Bag • ₹550
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
