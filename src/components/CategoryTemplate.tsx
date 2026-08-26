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

  const getSelectedLetter = (productId: string) => {
    return selectedLetters[productId] || 'A';
  };

  const handleLetterSelect = (productId: string, letter: string) => {
    setSelectedLetters(prev => ({ ...prev, [productId]: letter }));
  };

  const handleAddToCart = (product: ProductItem) => {
    let finalName = product.name;
    if (product.isSpecial) {
      finalName = `${product.name} - Slovo ${getSelectedLetter(product.id)}`;
    }
    
    addToCart({
      id: product.id + (product.isSpecial ? `-${getSelectedLetter(product.id)}` : ''),
      name: finalName,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-brand-light pb-24"
    >
      {/* Zoom Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8"
          >
            <button 
              onClick={(e) => { e.stopPropagation(); setZoomedImage(null); }}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={optimizeCloudinaryUrl(zoomedImage)}
              alt="Zoomed product"
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-brand-dark/5 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 rounded-full hover:bg-brand-dark/5 transition-colors flex items-center gap-2 group"
          >
            <ArrowLeft className="w-5 h-5 text-brand-dark group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium text-brand-dark/80 hidden sm:block">Nazad na kategorije</span>
          </button>
          <div className="flex items-center gap-4">
            <a href="viber://chat?number=%2B38269786632" className="p-2 hover:bg-brand-dark/5 rounded-full transition-colors hidden sm:block text-[#7360F2]">
              <Phone className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h1 className="font-playfair text-4xl md:text-5xl text-brand-dark mb-4 tracking-tight">{title}</h1>
          <p className="text-brand-dark/70 text-lg leading-relaxed">{description}</p>
        </div>

        {/* ... (Search and Filters rest is identical) ... */}
        {!hidePrices && (
          <div className="mb-10 space-y-6">
            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-brand-dark/40" />
              </div>
              <input
                type="text"
                placeholder="Pretraži po šifri ili boji (npr. 'Primjer br. 05' ili 'roze')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-11 pr-4 py-3.5 bg-white border-2 border-brand-dark/10 rounded-2xl text-brand-dark placeholder:text-brand-dark/40 focus:border-brand-primary focus:ring-0 transition-colors shadow-sm"
              />
            </div>
            {/* Filter tags (Boje) */}
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
              <button
                onClick={() => setSelectedColor('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedColor === 'all' 
                    ? 'bg-brand-dark text-white shadow-md' 
                    : 'bg-white text-brand-dark/70 border border-brand-dark/10 hover:border-brand-dark/30'
                }`}
              >
                Sve boje
              </button>
              {COLOR_OPTIONS.map((color) => (
                <button
                  key={color.key}
                  onClick={() => setSelectedColor(color.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedColor === color.key
                      ? 'bg-brand-dark text-white shadow-md'
                      : 'bg-white text-brand-dark/70 border border-brand-dark/10 hover:border-brand-dark/30'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full ${color.bg} shadow-sm border border-black/5`}></span>
                  {color.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={product.id}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-brand-dark/5"
              >
                <div 
                  className="relative aspect-[4/5] overflow-hidden bg-brand-light/50 cursor-zoom-in"
                  onClick={() => setZoomedImage(product.image)}
                >
                  <img
                    src={optimizeCloudinaryUrl(product.image)}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.isBestseller && (
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm border border-brand-dark/5">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-[10px] sm:text-xs font-bold text-brand-dark uppercase tracking-wider">Top izbor</span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-sm text-brand-dark/70">
                    <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>

                <div className="p-3 sm:p-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-1.5 mb-2 sm:mb-3">
                    <span className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${product.colorBg} shadow-sm border border-black/5`}></span>
                    <span className="text-[10px] sm:text-xs font-medium text-brand-dark/50 uppercase tracking-wider">{product.colorName}</span>
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-[10px] sm:text-xs font-bold text-brand-primary/80 uppercase tracking-wider">{product.code}</span>
                    <h3 className="font-playfair text-sm sm:text-base md:text-lg text-brand-dark leading-tight mt-1">{product.name}</h3>
                  </div>

                  {/* Letter Selection for Special Bouquets */}
                  {product.isSpecial && (
                    <div className="mt-3 mb-4 p-3 bg-brand-light/50 rounded-xl border border-brand-dark/5">
                      <label className="block text-[11px] sm:text-xs font-bold text-brand-dark/70 uppercase tracking-wider mb-2">
                        Izaberite slovo:
                      </label>
                      <select 
                        value={getSelectedLetter(product.id)}
                        onChange={(e) => handleLetterSelect(product.id, e.target.value)}
                        className="w-full bg-white border border-brand-dark/10 rounded-lg px-3 py-2 text-sm text-brand-dark focus:ring-1 focus:ring-brand-primary focus:border-brand-primary transition-colors cursor-pointer"
                      >
                        {ALPHABET_LETTERS.map(letter => (
                          <option key={letter} value={letter}>Slovo {letter}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="mt-auto pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-brand-dark/5">
                    {!hidePrices && (
                      <div className="text-center sm:text-left">
                        <span className="text-sm sm:text-xs text-brand-dark/50 block sm:inline">Cijena:</span>
                        <span className="font-playfair font-bold text-lg sm:text-xl text-brand-dark ml-0 sm:ml-1">
                          {product.price > 0 ? `${product.price}€` : 'Na upit'}
                        </span>
                      </div>
                    )}
                    
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95 ${hidePrices ? 'w-full' : 'w-full sm:w-auto'}`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Dodaj
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center max-w-md mx-auto"
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-brand-dark/5">
              <Search className="w-8 h-8 text-brand-dark/20" />
            </div>
            <h3 className="text-xl font-playfair text-brand-dark mb-2">Nema rezultata</h3>
            <p className="text-brand-dark/60 mb-6">Nismo pronašli aranžmane koji odgovaraju vašim kriterijumima pretrage.</p>
            <button 
              onClick={resetFilters}
              className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-primary/80 font-medium px-4 py-2 bg-white rounded-xl shadow-sm border border-brand-primary/20 transition-all hover:shadow"
            >
              <RotateCcw className="w-4 h-4" />
              Poništi filtere
            </button>
          </motion.div>
        )}
      </main>
    </motion.div>
  );
}
