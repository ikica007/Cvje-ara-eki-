import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const COLOR_OPTIONS = [
  { key: 'all', name: 'Sve boje', bg: 'bg-gradient-to-r from-rose-400 via-pink-400 to-red-500' },
  { key: 'roze', name: 'Nježne Roze', bg: 'bg-pink-300' },
  { key: 'crvena', name: 'Klasik Crvene', bg: 'bg-red-500' },
  { key: 'bijela', name: 'Elegantne Bijele', bg: 'bg-white border border-gray-200' },
  { key: 'zuta', name: 'Žute / Sunčane', bg: 'bg-yellow-400' },
  { key: 'mix', name: 'Šareni Mix', bg: 'bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400' },
] as const;

// Create product list based on imported images and defined prices
function createProducts(title: string, images: string[]): ProductItem[] {
  const lowerTitle = title.toLowerCase();
  
  return images.map((img, idx) => {
    // Numeracija u nazivima (01, 02...)
    const num = idx + 1;
    const formattedNum = num.toString().padStart(2, '0');
    
    // Uzimamo cenu, ako nema cene stavljamo 0
    const priceData = CATEGORY_PRICES[title]?.[idx];
    const price = priceData !== undefined ? priceData.price : 0;
    const priceSuffix = priceData?.suffix ? ` ${priceData.suffix}` : '';

    const imageColorKey = IMAGE_COLORS[img] || 'mix';
    const colorObj = COLOR_OPTIONS.find(c => c.key === imageColorKey) || COLOR_OPTIONS[3];
    
    const isBestseller = idx === 0 || idx === 1 || idx % 7 === 0;
    const isSpecial = lowerTitle.includes('101') && (idx === 0 || idx === 1);
    
    // Calculate a deterministic popularity score based on index and features
    const popularityScore = (isBestseller ? 50 : 0) + (isSpecial ? 30 : 0) + (100 - (idx % 10));

    return {
      id: `${title}-${idx}`,
      index: idx,
      code: `Primjer br. ${formattedNum}`,
      name: isSpecial ? `${title} Specijal (Sa slovom) br. ${formattedNum}${priceSuffix}` : `${title} Aranžman br. ${formattedNum}${priceSuffix}`,
      image: img,
      price,
      colorKey: colorObj.key as any,
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

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [maxPriceLimit, setMaxPriceLimit] = useState<number>(450);
  const [sortBy, setSortBy] = useState<'default' | 'popular' | 'priceAsc' | 'priceDesc'>('default');
  const [bestsellerOnly, setBestsellerOnly] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  // Custom letter state for special bouquets
  const [selectedLetters, setSelectedLetters] = useState<Record<string, string>>({});

  // Custom gift state
  const [selectedGifts, setSelectedGifts] = useState<Record<string, string>>({});

  const getSelectedLetter = (productId: string) => {
    return selectedLetters[productId] || 'A';
  };

  const handleLetterChange = (productId: string, letter: string) => {
    setSelectedLetters((prev) => ({ ...prev, [productId]: letter }));
  };

  const handleGiftChange = (productId: string, gift: string) => {
    setSelectedGifts((prev) => ({ ...prev, [productId]: gift }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [title]);

  const allProducts = useMemo(() => createProducts(title, images), [title, images]);

  // Derived state for filtering and sorting
  const products = useMemo(() => {
    return allProducts
      .filter((p) => {
        // Search filter
        if (searchQuery && !p.code.toLowerCase().includes(searchQuery.toLowerCase())) {
          return false;
        }
        // Color filter
        if (selectedColor !== 'all' && p.colorKey !== selectedColor) {
          return false;
        }
        // Bestseller filter
        if (bestsellerOnly && !p.isBestseller) {
          return false;
        }
        
        if (hidePrices) return true;

        // Max price slider limit
        if (p.price > maxPriceLimit) return false;

        // Price range filter pills
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
        return a.index - b.index; // default by original list index
      });
  }, [allProducts, searchQuery, selectedColor, selectedPriceRange, maxPriceLimit, sortBy, bestsellerOnly, hidePrices]);

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
    const hasGiftOption = product.name.toLowerCase().includes('poklon po');
    const customGift = hasGiftOption ? (selectedGifts[product.id] || '') : undefined;

    let customName = product.name;
    if (chosenLetter) {
      customName = `${customName} (Slovo: ${chosenLetter})`;
    }
    if (hasGiftOption) {
      customName = `${customName} ${customGift ? `(Poklon: ${customGift})` : '(Nije upisan poklon)'}`;
    }

    let cartId = product.id;
    if (chosenLetter) cartId += `-${chosenLetter}`;
    if (hasGiftOption && customGift) cartId += `-${customGift.replace(/\s+/g, '-')}`;

    addToCart({
      id: cartId,
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
        </motion.div>

        {/* Filter Toolbar */}
        <div className="mb-10 bg-white/60 backdrop-blur-md rounded-3xl p-5 md:p-6 shadow-sm border border-brand-pink/20">
          <div className="flex flex-col gap-6">
            
            {/* Top row: Search and Sort */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              
              {/* Search */}
              <div className="relative w-full md:w-auto md:min-w-[280px]">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-brand-dark/40" />
                </div>
                <input
                  type="text"
                  placeholder="Pretraži po broju (npr. '05')"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white text-brand-dark text-sm rounded-full pl-10 pr-4 py-3 border border-brand-beige focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-colors"
                />
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-brand-beige w-full md:w-auto">
                  <SlidersHorizontal className="w-4 h-4 text-brand-dark/60" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-transparent text-sm font-medium text-brand-dark focus:outline-none w-full cursor-pointer appearance-none pr-4"
                  >
                    <option value="default">Redoslijed (01, 02, 03...)</option>
                    <option value="popular">Najpopularniji</option>
                    <option value="priceAsc">Cijena: Niža ka višoj</option>
                    <option value="priceDesc">Cijena: Viša ka nižoj</option>
                  </select>
                </div>

                {/* Bestseller toggle */}
                <button
                  onClick={() => setBestsellerOnly(!bestsellerOnly)}
                  className={`flex items-center justify-center w-11 h-11 shrink-0 rounded-full transition-all border ${
                    bestsellerOnly 
                      ? 'bg-amber-100 border-amber-300 text-amber-600 shadow-sm' 
                      : 'bg-white border-brand-beige text-brand-dark/40 hover:bg-gray-50'
                  }`}
                  title="Prikaži samo najpopularnije"
                >
                  <Star className={`w-5 h-5 ${bestsellerOnly ? 'fill-amber-500' : ''}`} />
                </button>
              </div>
            </div>

            {/* Colors Scrollable Row */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-2 px-2 md:mx-0 md:px-0">
              {COLOR_OPTIONS.map((color) => (
                <button
                  key={color.key}
                  onClick={() => setSelectedColor(color.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap shrink-0 border ${
                    selectedColor === color.key
                      ? 'bg-brand-dark text-white border-brand-dark shadow-md'
                      : 'bg-white text-brand-dark/70 border-brand-beige hover:bg-brand-pink/5 hover:border-brand-pink/30'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full shadow-sm ${color.bg}`} />
                  {color.name}
                </button>
              ))}
            </div>

            {/* Prices filtering area */}
            {!hidePrices && (
              <div className="flex flex-col md:flex-row gap-6 pt-4 border-t border-brand-beige/50">
                
                {/* Max price slider */}
                <div className="flex-1 max-w-sm">
                  <div className="flex justify-between items-end mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-brand-dark/70">
                      Cijena do:
                    </label>
                    <span className="text-brand-pink font-semibold text-lg">{maxPriceLimit} €</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="450"
                    step="5"
                    value={maxPriceLimit}
                    onChange={(e) => {
                      setMaxPriceLimit(Number(e.target.value));
                      setSelectedPriceRange('all'); // reset pills if using slider
                    }}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-pink"
                  />
                </div>

                {/* Price range pills */}
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-none flex-1">
                  {[
                    { key: 'all', label: 'Sve cijene' },
                    { key: '15to35', label: '15€ - 35€' },
                    { key: '35to75', label: '35€ - 75€' },
                    { key: '75to150', label: '75€ - 150€' },
                    { key: '150to300', label: '150€ - 300€' },
                  ].map((range) => (
                    <button
                      key={range.key}
                      onClick={() => {
                        setSelectedPriceRange(range.key);
                        setMaxPriceLimit(450); // reset slider if using pills
                      }}
                      className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                        selectedPriceRange === range.key
                          ? 'bg-brand-pink/10 text-brand-pink border-brand-pink shadow-sm'
                          : 'bg-white text-brand-dark/60 border-brand-beige hover:bg-gray-50'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>

                {/* Reset filters button */}
                <button
                  onClick={resetFilters}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-brand-clay hover:text-brand-dark hover:bg-white border border-transparent hover:border-brand-beige transition-all self-start md:self-end mt-2 md:mt-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Poništi sve
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 flex justify-between items-center px-2">
          <p className="text-sm font-medium text-brand-dark/60">
            Prikazano <span className="text-brand-dark font-bold">{products.length}</span> aranžmana
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative"
              >
                {product.image ? (
                  <div 
                    className="relative w-full aspect-[4/5] rounded-[1.8rem] overflow-hidden bg-[#F4EFE6] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                    onClick={() => setZoomedImage(product.image)}
                  >
                    <img
                      src={optimizeCloudinaryUrl(product.image, 600)}
                      alt={product.code}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Dark gradient overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-60 transition-opacity group-hover:opacity-40" />

                    {/* Zoom Icon Hint */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="bg-black/30 backdrop-blur-sm p-4 rounded-full text-white">
                        <ZoomIn className="w-8 h-8" />
                      </div>
                    </div>

                    {/* Bestseller Badge */}
                    {product.isBestseller && (
                      <div className="absolute top-4 left-4 bg-brand-dark/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1 border border-white/20 shadow-sm z-10">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span>Bestseller</span>
                      </div>
                    )}

                    {/* Special Badge */}
                    {product.isSpecial && !hidePrices && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1 border border-white/30 z-10">
                        <Sparkles className="w-3.5 h-3.5 text-amber-200 fill-amber-200" />
                        <span>SPECIJAL • SA SLOVOM</span>
                      </div>
                    )}

                    {/* Color dot badge */}
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
                
                {/* Gift input for specific products */}
                {!hidePrices && product.name.toLowerCase().includes('poklon po') && (
                  <div className="mt-3 bg-white/90 border border-brand-pink/30 rounded-2xl p-3 shadow-sm">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-brand-dark flex items-center gap-1.5 mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-brand-pink" />
                      Napišite poklon po želji:
                    </label>
                    <input
                      type="text"
                      placeholder="Npr. Rafaello, vino..."
                      value={selectedGifts[product.id] || ''}
                      onChange={(e) => handleGiftChange(product.id, e.target.value)}
                      className="w-full bg-[#F4EFE6] text-brand-dark font-medium text-xs px-3 py-2.5 rounded-xl border border-brand-pink/40 focus:outline-none focus:ring-2 focus:ring-brand-pink"
                    />
                  </div>
                )}

                {/* Letter selector for Special bouquets */}
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
                      {/* Full Azbuka Dropdown */}
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

                      {/* Quick letter pills */}
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
                        {product.price.toFixed(2)} €
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

      {/* Floating Back Button */}
      <button 
        onClick={onBack}
        className="fixed bottom-6 left-4 md:left-8 z-40 bg-white/90 backdrop-blur shadow-lg hover:shadow-xl border border-brand-pink/20 hover:border-brand-pink/50 text-brand-dark w-12 h-12 rounded-full flex items-center justify-center transition-all group"
        title="Nazad na kategorije"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform text-brand-pink" />
      </button>

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
