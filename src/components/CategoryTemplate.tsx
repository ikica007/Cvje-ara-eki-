import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ShoppingBag, Phone, Search, SlidersHorizontal, Star, RotateCcw, Sparkles, Filter, ZoomIn, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CATEGORY_PRICES } from '../data/prices';
import { IMAGE_COLORS } from '../data/imageColors';
import { optimizeCloudinaryUrl } from '../utils/imageOptimization';

interface CategoryTemplateProps {
  title: string;
  description: string;
  images: string[];
  onBack: () => void;
  hidePrices?: boolean;
}

export interface ProductItem {
  id: string;
  index: number;
  code: string;
  name: string;
  image: string;
  price: number;
  colorKey: 'roze' | 'crvena' | 'bijela' | 'mix' | 'zuta';
  colorName: string;
  colorBg: string;
  isBestseller: boolean;
  isSpecial?: boolean;
  popularityScore: number;
}

const ALPHABET_LETTERS = [
  'A', 'B', 'C', 'Č', 'Ć', 'D', 'DŽ', 'Đ', 'E', 'F', 
  'G', 'H', 'I', 'J', 'K', 'L', 'LJ', 'M', 'N', 'NJ', 
  'O', 'P', 'R', 'S', 'Š', 'T', 'U', 'V', 'Z', 'Ž'
];

const COLOR_OPTIONS: Array<{ key: 'roze' | 'crvena' | 'bijela' | 'mix' | 'zuta'; name: string; bg: string }> = [
  { key: 'roze', name: 'Roze & Pastel', bg: 'bg-[#E8A2A8]' },
  { key: 'crvena', name: 'Crvene nijanse', bg: 'bg-[#C84B41]' },
  { key: 'bijela', name: 'Bijela & Krem', bg: 'bg-white border border-brand-dark/20' },
  { key: 'mix', name: 'Šareno / Mix', bg: 'bg-gradient-to-r from-pink-400 via-amber-300 to-teal-400' },
  { key: 'zuta', name: 'Žuto & Narandžasto', bg: 'bg-[#E8B84B]' },
];

function generateProducts(images: string[], title: string): ProductItem[] {
  const lowerTitle = title.toLowerCase();

  return images.map((img, idx) => {
    const formattedNum = String(idx + 1).padStart(2, '0');
    
    // Uzimamo cenu, ako nema cene stavljamo 0
    const priceData = CATEGORY_PRICES[title]?.[idx];
    const price = priceData !== undefined ? priceData.price : 0;
    const priceSuffix = priceData?.suffix ? ` ${priceData.suffix}` : '';

    const imageColorKey = IMAGE_COLORS[img] || 'mix';
    const colorObj = COLOR_OPTIONS.find(c => c.key === imageColorKey) || COLOR_OPTIONS[3];
    const isBestseller = idx === 0 || idx === 1 || idx % 7 === 0;
    const isSpecial = lowerTitle.includes('101') && (idx === 0 || idx === 1);
    const popularityScore = 100 - idx + (isBestseller ? 50 : 0) + (isSpecial ? 100 : 0);

    return {
      id: `${lowerTitle}-${idx}`,
      index: idx,
      code: `Primjer br. ${formattedNum}`,
      name: isSpecial ? `${title} Specijal (Sa slovom) br. ${formattedNum}${priceSuffix}` : `${title} Aranžman br. ${formattedNum}${priceSuffix}`,
      image: img,
      price,
      colorKey: colorObj.key,
      colorName: colorObj.name,
      colorBg: colorObj.bg,
      isBestseller,
      isSpecial,
      popularityScore,
    };
  });
}

export function CategoryTemplate({ title, description, images, onBack, hidePrices = false }: CategoryTemplateProps) {
  const { addToCart } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [maxPriceLimit, setMaxPriceLimit] = useState<number>(450);
  const [sortBy, setSortBy] = useState<'default' | 'popular' | 'priceAsc' | 'priceDesc'>('default');
  const [bestsellerOnly, setBestsellerOnly] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [selectedLetters, setSelectedLetters] = useState<Record<string, string>>({});

  const getSelectedLetter = (productId: string) => selectedLetters[productId] || 'A';
  const handleLetterChange = (productId: string, letter: string) => {
    setSelectedLetters((prev) => ({ ...prev, [productId]: letter }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [title]);

  const products = useMemo(() => {
    return generateProducts(images, title);
  }, [images, title]);

  const filteredProducts = useMemo(() => {
    if (hidePrices) return products;

    return products
      .filter((p) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchesCode = p.code.toLowerCase().includes(q) || String(p.index + 1).includes(q);
          const matchesName = p.name.toLowerCase().includes(q) || p.colorName.toLowerCase().includes(q);
          if (!matchesCode && !matchesName) return false;
        }
        if (selectedColor !== 'all' && p.colorKey !== selectedColor) return false;
        if (bestsellerOnly && !p.isBestseller) return false;
        if (p.price > 0 && p.price > maxPriceLimit) return false;
        if (selectedPriceRange === '15to35' && (p.price < 15 || p.price > 35)) return false;
        if (selectedPriceRange === '35to75' && (p.price < 35 || p.price > 75)) return false;
        if (selectedPriceRange === '75to150' && (p.price < 75 || p.price > 150)) return false;
        if (selectedPriceRange === '150to300' && (p.price < 150 || p.price > 300)) return false;
        if (selectedPriceRange === '300to450' && (p.price < 300 || p.price > 450)) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'priceAsc') return a.price - b.price;
        if (sortBy === 'priceDesc') return b.price - a.price;
        if (sortBy === 'popular') return b.popularityScore - a.popularityScore;
        return a.index - b.index;
      });
  }, [products, searchQuery, selectedColor, selectedPriceRange, maxPriceLimit, sortBy, bestsellerOnly, hidePrices]);

  const hasActiveFilters = searchQuery !== '' || selectedColor !== 'all' || selectedPriceRange !== 'all' || maxPriceLimit < 450 || bestsellerOnly || sortBy !== 'default';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedColor('all');
    setSelectedPriceRange('all');
    setMaxPriceLimit(450);
    setSortBy('default');
    setBestsellerOnly(false);
  };

  const handleAddToCart = (product: ProductItem) => {
    const chosenLetter = product.isSpecial ? getSelectedLetter(product.id) : undefined;
    const customName = chosenLetter 
      ? `${product.name} (Slovo: ${chosenLetter})`
      : product.name;

    addToCart({
      id: chosenLetter ? `${product.id}-${chosenLetter}` : product.id,
      name: customName,
      price: product.price,
      image: product.image,
      category: title,
    });
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-brand-light text-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-brand-dark/70 hover:text-brand-pink transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="uppercase tracking-[0.2em] text-xs font-bold">Nazad</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="cursive text-4xl text-brand-clay block mb-3 font-normal tracking-wide">
            Kolekcija i inspiracija
          </span>
          <h1 className="serif text-4xl md:text-5xl lg:text-6xl text-brand-dark mb-6 font-semibold leading-tight">
            {title}
          </h1>
          <p className="text-brand-dark/75 font-serif max-w-2xl mx-auto text-lg leading-relaxed font-light">
            {description}
          </p>
          {hidePrices && (
            <div className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-pink/10 border border-brand-pink/30 text-brand-pink text-xs font-semibold uppercase tracking-widest shadow-sm">
              <Phone className="w-4 h-4 shrink-0" />
              <span>Ponude i cijene dekoracija se formiraju po vašem upitu • Pozovite 069 108 055</span>
            </div>
          )}
          <div className="w-16 h-[1px] bg-brand-pink/30 mx-auto mt-6" />
        </motion.div>

        {!hidePrices && products.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12 bg-[#F4EFE6]/90 border border-brand-beige p-5 rounded-[2.2rem] shadow-[0_4px_20px_-10px_rgba(140,109,88,0.08)] space-y-5"
          >
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Pretraži po broju npr. 05..."
                  className="w-full bg-white border border-brand-beige/80 rounded-full pl-11 pr-4 py-2.5 text-xs text-brand-dark placeholder-brand-dark/40 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink/30 transition-all font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-brand-dark/40 hover:text-brand-dark"
                  >
                    ×
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-brand-beige/80">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-brand-pink" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-dark/50 hidden sm:inline">Sortiranje:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-transparent text-xs text-brand-dark font-medium focus:outline-none cursor-pointer pr-1"
                  >
                    <option value="default">Redoslijed (01, 02, 03...)</option>
                    <option value="popular">Najpopularniji</option>
                    <option value="priceAsc">Cijena: Niža ka višoj</option>
                    <option value="priceDesc">Cijena: Viša ka nižoj</option>
                  </select>
                </div>

                <button
                  onClick={() => setBestsellerOnly(!bestsellerOnly)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border ${
                    bestsellerOnly
                      ? 'bg-brand-pink text-white border-brand-pink shadow-sm'
                      : 'bg-white text-brand-dark/70 border-brand-beige/80 hover:border-brand-pink/40'
                  }`}
                >
                  <Star className={`w-3.5 h-3.5 ${bestsellerOnly ? 'fill-white text-white' : 'text-amber-500 fill-amber-500'}`} />
                  <span>Bestseller</span>
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-brand-beige/60 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-brand-dark/50 block font-bold">
                  Filter po boji cvijeća:
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    onClick={() => setSelectedColor('all')}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedColor === 'all'
                        ? 'bg-brand-dark text-white font-semibold shadow-sm'
                        : 'bg-white text-brand-dark/70 hover:bg-white/80 border border-brand-beige/60'
                    }`}
                  >
                    Sve boje
                  </button>
                  {COLOR_OPTIONS.map((c) => (
                    <button
                      key={c.key}
                      onClick={() => setSelectedColor(selectedColor === c.key ? 'all' : c.key)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                        selectedColor === c.key
                          ? 'bg-brand-dark text-white border-brand-dark font-semibold shadow-sm'
                          : 'bg-white text-brand-dark/75 hover:border-brand-pink/40 border-brand-beige/60'
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${c.bg} shrink-0`} />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-brand-dark/50 block font-bold">
                    Budžet / Raspon cijena (15 € - 450 €):
                  </span>
                  <span className="text-xs font-semibold text-brand-teal bg-brand-teal/10 px-2.5 py-0.5 rounded-full border border-brand-teal/20">
                    Maks: do {maxPriceLimit} €
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { id: 'all', label: 'Sve cijene' },
                    { id: '15to35', label: '15 € - 35 €' },
                    { id: '35to75', label: '35 € - 75 €' },
                    { id: '75to150', label: '75 € - 150 €' },
                    { id: '150to300', label: '150 € - 300 €' },
                    { id: '300to450', label: '300 € - 450 €' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPriceRange(selectedPriceRange === p.id ? 'all' : p.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                        selectedPriceRange === p.id
                          ? 'bg-brand-teal text-white border-brand-teal font-semibold shadow-sm'
                          : 'bg-white text-brand-dark/75 hover:border-brand-teal/40 border-brand-beige/60'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <span className="text-[10px] font-mono text-brand-dark/50">15 €</span>
                  <input
                    type="range"
                    min="15"
                    max="450"
                    step="5"
                    value={maxPriceLimit}
                    onChange={(e) => setMaxPriceLimit(Number(e.target.value))}
                    className="w-full accent-brand-teal cursor-pointer h-1.5 bg-brand-beige/80 rounded-lg appearance-none"
                  />
                  <span className="text-[10px] font-mono text-brand-dark/50">450 €</span>
                </div>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="pt-3 border-t border-brand-beige/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-brand-dark/70 font-medium">
                  <Filter className="w-3.5 h-3.5 text-brand-pink" />
                  <span>
                    Prikazano <strong className="text-brand-dark font-bold">{filteredProducts.length}</strong> od {products.length} aranžmana
                  </span>
                </div>
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-brand-pink hover:text-brand-dark font-semibold uppercase tracking-wider text-[11px] transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Poništi filtere</span>
                </button>
              </div>
            )}
          </motion.div>
        )}

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (idx % 3) * 0.08 }}
                className="group relative overflow-hidden rounded-[2.5rem] bg-[#F4EFE6]/50 border border-brand-beige/60 p-2.5 shadow-[0_4px_25px_-10px_rgba(140,109,88,0.06)] hover:bg-[#F4EFE6]/80 hover:border-brand-pink/25 hover:shadow-[0_15px_30px_-10px_rgba(140,109,88,0.12)] transition-all duration-500 flex flex-col justify-between h-full"
              >
                {product.image ? (
                  <div className="overflow-hidden rounded-[1.8rem] w-full relative aspect-[4/5] bg-brand-beige/20">
                    <img 
                      src={optimizeCloudinaryUrl(product.image, 600)} 
                      referrerPolicy="no-referrer"
                      alt={product.name} 
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-brand-dark/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    
                    <button 
                      onClick={() => setZoomedImage(product.image)}
                      className="absolute inset-0 m-auto w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/50 hover:scale-110 z-20 border border-white/40 shadow-xl"
                      title="Uveličaj sliku"
                    >
                      <ZoomIn className="w-5 h-5 drop-shadow-md" />
                    </button>

                    {product.isBestseller && !hidePrices && (
                      <div className="absolute top-4 left-4 bg-brand-dark/85 backdrop-blur-md text-white text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1 border border-white/20 shadow-sm z-10">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span>Bestseller</span>
                      </div>
                    )}

                    {product.isSpecial && !hidePrices && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1 border border-white/30 z-10">
                        <Sparkles className="w-3.5 h-3.5 text-amber-200 fill-amber-200" />
                        <span>SPECIJAL • SA SLOVOM</span>
                      </div>
                    )}

                    {!hidePrices && (
                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md text-brand-dark text-[10px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm border border-brand-beige/50">
                        <span className={`w-2 h-2 rounded-full ${product.colorBg}`} />
                        <span>{product.colorName}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full aspect-[4/5] flex items-center justify-center text-brand-dark/20 uppercase tracking-widest text-xs font-bold bg-[#F4EFE6]/80 rounded-[1.8rem]">
                    Slika uskoro
                  </div>
                )}
                
                {product.isSpecial && !hidePrices && (
                  <div className="mt-3 bg-white/90 border border-brand-pink/30 rounded-2xl p-3 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-dark flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-brand-pink" />
                        Slovo na buketu:
                      </span>
                      <span className="text-xs font-extrabold text-brand-pink bg-brand-pink/10 px-2.5 py-0.5 rounded-full border border-brand-pink/20">
                        Slovo: [{getSelectedLetter(product.id)}]
                      </span>
                    </div>

                    <div className="space-y-2">
                      <select
                        value={getSelectedLetter(product.id)}
                        onChange={(e) => handleLetterChange(product.id, e.target.value)}
                        className="w-full bg-[#F4EFE6] text-brand-dark font-bold text-xs px-3 py-2 rounded-xl border border-brand-pink/40 focus:outline-none focus:ring-2 focus:ring-brand-pink cursor-pointer"
                      >
                        {ALPHABET_LETTERS.map((char) => (
                          <option key={char} value={char}>
                            Izaberi slovo: {char}
                          </option>
                        ))}
                      </select>

                      <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
                        {['A', 'M', 'E', 'S', 'N', 'K', 'I', 'J', 'D', 'L', 'R'].map((char) => (
                          <button
                            key={char}
                            type="button"
                            onClick={() => handleLetterChange(product.id, char)}
                            className={`w-7 h-7 rounded-lg text-xs font-bold shrink-0 transition-all border ${
                              getSelectedLetter(product.id) === char
                                ? 'bg-brand-pink text-white border-brand-pink shadow-sm scale-105'
                                : 'bg-white text-brand-dark/80 hover:bg-brand-pink/10 border-brand-beige'
                            }`}
                          >
                            {char}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="pt-4 pb-2 px-2 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif font-medium text-brand-dark leading-tight">
                      {title} <span className="text-brand-dark/60 text-sm block mt-1">{product.code}</span>
                    </h3>
                    {!hidePrices && (
                      <p className="text-brand-pink font-semibold mt-1 text-base">
                        {product.price > 0 ? `${product.price.toFixed(2)} €` : 'Na upit'}
                      </p>
                    )}
                  </div>
                  {!hidePrices ? (
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="bg-brand-dark hover:bg-brand-pink text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors flex-shrink-0 shadow-sm"
                      title="Dodaj u korpu"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  ) : (
                    <a 
                      href="tel:+38269108055"
                      className="bg-brand-pink/10 hover:bg-brand-pink text-brand-pink hover:text-white px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 shrink-0 border border-brand-pink/30"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Upit</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-brand-clay/30 rounded-[2.5rem] bg-[#F4EFE6]/40 p-8 max-w-lg mx-auto">
            <Filter className="w-10 h-10 text-brand-pink/40 mx-auto mb-3" />
            <h3 className="serif text-xl font-medium text-brand-dark mb-2">Nema pronađenih aranžmana</h3>
            <p className="text-brand-dark/60 text-sm font-serif mb-6 font-light">
              Nijedan proizvod ne odgovara trenutno izabranim kriterijumima pretrage ili filterima.
            </p>
            <button
              onClick={resetFilters}
              className="bg-brand-dark text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-pink transition-colors"
            >
              Poništi filtere
            </button>
          </div>
        )}
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 md:p-10 backdrop-blur-sm"
            onClick={() => setZoomedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white hover:text-brand-pink transition-colors bg-white/10 p-2 rounded-full backdrop-blur-md"
              onClick={() => setZoomedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl max-h-[90vh] w-auto h-auto rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={optimizeCloudinaryUrl(zoomedImage, 1200)} 
                alt="Zoomed" 
                className="w-auto h-auto max-w-full max-h-[90vh] object-contain rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
