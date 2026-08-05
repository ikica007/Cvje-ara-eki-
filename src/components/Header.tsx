import { Phone, Menu, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onSelectCategory?: (category: string) => void;
}

export function Header({ onSelectCategory }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  const handleNavClick = (category: string) => {
    if (onSelectCategory) {
      onSelectCategory(category);
    }
    setIsMenuOpen(false);
  };

  const arrangementCategories = [
    { id: 'xl-buketi', num: '01', name: 'XL-XXXL Buketi' },
    { id: 'buketi', num: '02', name: 'Buketi' },
    { id: 'korpe', num: '03', name: 'Aranžmani u Korpama' },
    { id: 'box', num: '04', name: 'Box Aranžmani' },
    { id: '101-ruza', num: '05', name: 'Aranžmani 101 Ruža' },
    { id: 'slatki', num: '06', name: 'Slatki Aranžmani' },
    { id: 'kinder', num: '07', name: 'Kinder Aranžmani' },
  ];

  const decorationCategories = [
    { id: 'svadbene', num: '01', name: 'Svadbene Dekoracije' },
    { id: 'rodjendani', num: '02', name: 'Rođendanske Dekoracije' },
    { id: 'events', num: '03', name: 'Svečani Events' },
  ];

  return (
    <>
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed w-full top-0 z-50 transition-all duration-300 bg-brand-light/95 backdrop-blur-md border-b border-brand-beige/60 shadow-[0_2px_15px_-3px_rgba(140,109,88,0.05)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => onSelectCategory && onSelectCategory('home')}
                className="serif text-2xl tracking-wide font-bold text-brand-dark hover:text-brand-pink transition-colors"
              >
                Cvjećara <span className="italic font-serif text-brand-pink">Šćekić</span>
              </button>
            </div>
            
            <nav className="hidden md:flex gap-8 text-[11px] text-brand-dark/90 uppercase tracking-[0.2em] font-bold">
              <a href="#o-nama" className="hover:text-brand-teal transition-colors" onClick={() => handleNavClick('home')}>O nama</a>
              <a href="#usluge" className="hover:text-brand-teal transition-colors" onClick={() => handleNavClick('home')}>Usluge</a>
              <a href="#galerija" className="hover:text-brand-teal transition-colors" onClick={() => handleNavClick('home')}>Galerija</a>
              <a href="#recenzije" className="hover:text-brand-teal transition-colors" onClick={() => handleNavClick('home')}>Recenzije</a>
            </nav>
            
            <div className="hidden md:flex items-center gap-4 text-xs font-semibold">
              <a href="#kontakt" className="flex items-center gap-2 border border-brand-teal/40 text-brand-teal rounded-full px-5 py-2.5 hover:bg-brand-teal hover:text-brand-light transition-colors tracking-widest uppercase">
                <Phone className="h-3.5 w-3.5" />
                Kontakt
              </a>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2 border border-brand-beige rounded-full px-5 py-2.5 hover:border-brand-pink hover:text-brand-pink transition-colors tracking-widest uppercase relative"
              >
                <ShoppingBag className="h-4 w-4" />
                Korpa
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-pink text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile menu button & cart */}
            <div className="md:hidden flex items-center gap-4">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative text-brand-dark p-2 hover:text-brand-pink transition-colors"
                aria-label="Pregled korpe"
              >
                <ShoppingBag className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-brand-pink text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                    {totalItems}
                  </span>
                )}
              </button>
              <button 
                className="text-brand-dark p-2 focus:outline-none relative w-8 h-8 flex items-center justify-center"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Meni"
              >
                <motion.div
                  animate={isMenuOpen ? "open" : "closed"}
                  className="flex flex-col gap-1.5 justify-center items-center w-6 h-6"
                >
                  <motion.span 
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: 45, y: 6.5 }
                    }}
                    transition={{ duration: 0.2 }}
                    className="w-5 h-0.5 bg-brand-dark block rounded-full"
                  />
                  <motion.span 
                    variants={{
                      closed: { opacity: 1, scale: 1 },
                      open: { opacity: 0, scale: 0 }
                    }}
                    transition={{ duration: 0.15 }}
                    className="w-5 h-0.5 bg-brand-dark block rounded-full"
                  />
                  <motion.span 
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: -45, y: -6.5 }
                    }}
                    transition={{ duration: 0.2 }}
                    className="w-5 h-0.5 bg-brand-dark block rounded-full"
                  />
                </motion.div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu with AnimatePresence */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "calc(100vh - 80px)" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden bg-brand-light/98 backdrop-blur-lg border-t border-brand-beige/80 absolute w-full left-0 overflow-y-auto z-40"
            >
              <div className="flex flex-col py-8 px-6 pb-12 gap-8">
                {/* Primary Nav Section */}
                <div>
                  <p className="text-[10px] font-mono tracking-[0.25em] text-brand-dark/40 uppercase mb-4">Glavna navigacija</p>
                  <nav className="grid grid-cols-2 gap-4">
                    {[
                      { href: '#o-nama', label: 'O Nama' },
                      { href: '#usluge', label: 'Naše Usluge' },
                      { href: '#galerija', label: 'Galerija Sika' },
                      { href: '#recenzije', label: 'Utisci Kupaca' }
                    ].map((link, index) => (
                      <motion.a 
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        href={link.href} 
                        className="bg-brand-beige/30 hover:bg-brand-beige/60 border border-brand-beige/50 rounded-2xl py-3.5 px-4 text-center text-xs font-bold tracking-widest uppercase text-brand-dark transition-all active:scale-95"
                        onClick={() => handleNavClick('home')}
                      >
                        {link.label}
                      </motion.a>
                    ))}
                  </nav>
                </div>

                {/* Categories Grid Section */}
                <div className="border-t border-brand-beige/60 pt-6 space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[10px] font-mono tracking-[0.25em] text-brand-dark/40 uppercase">Cvjetni Aranžmani</p>
                      <span className="text-[10px] font-serif italic text-brand-teal">Kupovina</span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {arrangementCategories.map((cat, index) => (
                        <motion.button
                          key={cat.id}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 + index * 0.02 }}
                          onClick={(e) => { e.preventDefault(); handleNavClick(cat.id); }}
                          className="group flex items-center justify-between bg-white hover:bg-brand-dark/5 border border-brand-beige/50 active:bg-brand-beige/40 rounded-xl p-3 text-left transition-all duration-300"
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs text-brand-teal font-semibold bg-brand-teal/5 group-hover:bg-brand-teal group-hover:text-white transition-colors w-7 h-7 flex items-center justify-center rounded-lg">
                              {cat.num}
                            </span>
                            <span className="font-serif font-medium text-brand-dark text-sm group-hover:translate-x-1 transition-transform duration-300">
                              {cat.name}
                            </span>
                          </div>
                          <ArrowRight className="h-4 w-4 text-brand-teal/40 group-hover:text-brand-teal group-hover:translate-x-0.5 transition-all" />
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[10px] font-mono tracking-[0.25em] text-brand-dark/40 uppercase">Naše Dekoracije</p>
                      <span className="text-[10px] font-serif italic text-brand-pink">Event styling</span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {decorationCategories.map((cat, index) => (
                        <motion.button
                          key={cat.id}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 + index * 0.02 }}
                          onClick={(e) => { e.preventDefault(); handleNavClick(cat.id); }}
                          className="group flex items-center justify-between bg-brand-pink/5 hover:bg-brand-pink/10 border border-brand-pink/20 active:bg-brand-pink/20 rounded-xl p-3 text-left transition-all duration-300"
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs text-brand-pink font-semibold bg-brand-pink/10 group-hover:bg-brand-pink group-hover:text-white transition-colors w-7 h-7 flex items-center justify-center rounded-lg">
                              {cat.num}
                            </span>
                            <span className="font-serif font-medium text-brand-dark text-sm group-hover:translate-x-1 transition-transform duration-300">
                              {cat.name}
                            </span>
                          </div>
                          <ArrowRight className="h-4 w-4 text-brand-pink/60 group-hover:text-brand-pink group-hover:translate-x-0.5 transition-all" />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer section of menu */}
                <div className="border-t border-brand-beige/60 pt-6 mt-2 flex flex-col gap-4 items-center">
                  <div className="text-center">
                    <p className="text-xs text-brand-dark/60 font-serif">Posjetite nas ili naručite dostavu</p>
                    <p className="text-[10px] tracking-wider text-brand-pink font-semibold uppercase mt-0.5">Bijelo Polje, Crna Gora</p>
                  </div>
                  
                  <motion.a 
                    whileTap={{ scale: 0.95 }}
                    href="#kontakt" 
                    className="w-full flex items-center justify-center gap-2 bg-brand-teal text-white rounded-2xl py-4 hover:bg-brand-teal/90 transition-colors font-semibold tracking-widest text-xs uppercase shadow-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Phone className="h-4 w-4" />
                    Kontaktirajte Nas
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

