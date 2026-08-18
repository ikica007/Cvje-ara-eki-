import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, X, Filter } from 'lucide-react';
import { optimizeCloudinaryUrl } from '../utils/imageOptimization';
import { CATEGORY_PRICES } from '../data/prices';
import { IMAGE_COLORS } from '../data/imageColors';

interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  color?: string;
  suffix?: string;
}

interface Props {
  title: string;
  description: string;
  images: string[];
  onBack: () => void;
}

const AVAILABLE_COLORS = [
  { id: 'all', label: 'Sve boje' },
  { id: 'crvena', label: 'Crvena' },
  { id: 'bijela', label: 'Bijela' },
  { id: 'roze', label: 'Roze' },
  { id: 'zuta', label: 'Žuta' },
  { id: 'mix', label: 'Mix boja' }
] as const;

export function CategoryTemplate({ title, description, images, onBack }: Props) {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [activeColor, setActiveColor] = useState<string>('all');
  
  const categoryPrices = CATEGORY_PRICES[title] || [];
  
  const allProducts: Product[] = images.map((img, i) => {
    const priceData = categoryPrices[i] || { price: 0 };
    return {
      id: i + 1,
      image: img,
      name: `${title} ${i + 1}`,
      price: priceData.price,
      suffix: priceData.suffix,
      color: IMAGE_COLORS[img] || 'mix'
    };
  });

  const filteredProducts = activeColor === 'all' 
    ? allProducts 
    : allProducts.filter(p => p.color === activeColor);

  return (
    <div className="min-h-screen bg-brand-light pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-brand-dark/60 hover:text-brand-pink transition-colors mb-12 group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="uppercase tracking-widest text-xs font-semibold">Nazad na kategorije</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <h1 className="serif text-5xl sm:text-6xl text-brand-dark mb-6">{title}</h1>
          <p className="text-brand-dark/70 font-light text-lg leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* Color Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-2 text-brand-teal text-sm uppercase tracking-widest font-semibold mb-2">
            <Filter className="w-4 h-4" />
            <span>Filtriraj po boji</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {AVAILABLE_COLORS.map((color) => (
              <button
                key={color.id}
                onClick={() => setActiveColor(color.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeColor === color.id
                    ? 'bg-brand-pink text-white shadow-md scale-105'
                    : 'bg-white text-brand-dark/60 hover:bg-brand-beige/30 hover:text-brand-dark'
                }`}
              >
                {color.label}
              </button>
            ))}
          </div>
        </motion.div>

        {filteredProducts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-brand-dark/50 text-lg font-light">
              Trenutno nema aranžmana u izabranoj boji.
            </p>
            <button 
              onClick={() => setActiveColor('all')}
              className="mt-4 text-brand-pink hover:text-brand-teal transition-colors underline underline-offset-4"
            >
              Prikaži sve boje
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  key={product.image}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group cursor-pointer"
                  onClick={() => setZoomedImage(product.image)}
                >
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-brand-beige shadow-sm">
                    <img 
                      src={optimizeCloudinaryUrl(product.image, 600)} 
                      referrerPolicy="no-referrer"
                      alt={product.name} 
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/10 transition-colors duration-300" />
                  </div>
                  <div className="text-center">
                    <h3 className="serif text-xl text-brand-dark mb-1">{product.name}</h3>
                    <div className="flex items-center justify-center gap-1.5">
                      <p className="text-brand-pink font-semibold">
                        {product.price > 0 ? `${product.price} €` : 'Na upit'}
                      </p>
                      {product.suffix && (
                        <span className="text-brand-dark/50 text-sm">{product.suffix}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-brand-dark/95 p-4 sm:p-8 backdrop-blur-sm"
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              onClick={() => setZoomedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={optimizeCloudinaryUrl(zoomedImage, 1200)} 
                alt="Zoomed" 
                className="w-auto h-auto max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
