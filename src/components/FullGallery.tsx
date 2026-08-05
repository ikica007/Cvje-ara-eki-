import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { galleryImages } from '../data/galleryImages';
import { useEffect } from 'react';

interface Props {
  onBack: () => void;
}

export function FullGallery({ onBack }: Props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen"
    >
      <button 
        onClick={onBack}
        className="group flex items-center gap-2 text-brand-dark/60 hover:text-brand-pink transition-colors mb-10 text-sm font-semibold tracking-widest uppercase"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Nazad na početnu
      </button>

      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-brand-dark font-serif font-medium mb-4">
          Naša kompletna <span className="italic text-brand-teal">galerija</span>
        </h1>
        <div className="w-20 h-[1px] bg-brand-pink/30" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {galleryImages.map((src, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: (idx % 12) * 0.05 }}
            className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-brand-beige/20 border border-brand-beige/50 group"
          >
            <div className="absolute inset-0 bg-brand-dark/5 group-hover:bg-transparent transition-colors duration-500 z-10" />
            <img 
              src={src} 
              alt={`Galerija ${idx + 1}`} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
