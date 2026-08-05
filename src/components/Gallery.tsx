import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { galleryImages } from '../data/galleryImages';

interface Props {
  onViewAll?: () => void;
}

export function Gallery({ onViewAll }: Props) {
  // Show only 9 images on the home page, or all if onViewAll is not provided (which means we are in FullGallery view? No, we will make a separate FullGallery component).
  const imagesToShow = galleryImages.slice(0, 9);

  return (
    <section id="galerija" className="py-24 sm:py-32 bg-brand-light text-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="uppercase tracking-[0.2em] text-xs font-bold mb-2 block text-brand-pink">
            Naš Rad
          </span>
          <span className="cursive text-4xl text-brand-clay block mb-3 font-normal tracking-wide">
            Kroz naš objektiv
          </span>
          <h2 className="serif text-4xl sm:text-5xl lg:text-6xl text-brand-dark font-medium">
            Galerija <span className="italic font-serif text-brand-teal">stvaralaštva</span>
          </h2>
          <div className="w-16 h-[1px] bg-brand-pink/30 mx-auto mt-6" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {imagesToShow.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative overflow-hidden rounded-[2rem] group border border-brand-beige/50 shadow-[0_4px_20px_-10px_rgba(140,109,88,0.08)] bg-brand-beige/20 p-2 hover:bg-brand-light hover:border-brand-pink/25 transition-all duration-500`}
            >
              <div className="aspect-[4/5] overflow-hidden rounded-[1.7rem] w-full">
                <div className="absolute inset-0 bg-brand-dark/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src={src} 
                  referrerPolicy="no-referrer"
                  alt={`Galerija slika ${idx + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </motion.div>
          ))}
        </div>
        
        {onViewAll && (
          <div className="mt-16 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onViewAll}
              className="flex items-center gap-3 bg-brand-dark text-brand-light rounded-full px-8 py-4 hover:bg-brand-pink transition-colors font-bold tracking-widest text-xs uppercase shadow-xl"
            >
              Pogledaj kompletnu galeriju
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}
