import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, ArrowRight, Instagram, MapPin, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import cvjecaraLogo from '../logo-cvjecara.jpg';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, setIsCartOpen } = useCart();
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Kad se otvori meni, sprečavamo scroll pozadine
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const menuVariants = {
    closed: { 
      opacity: 0,
      y: "-100%",
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
    },
    open: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.1 + (i * 0.05),
        duration: 0.4,
        ease: [0.33, 1, 0.68, 1]
      }
    })
  };

  const navLinks = [
    { href: '#shop', label: 'Prodavnica' },
    { href: '#usluge', label: 'Usluge' },
    { href: '#galerija', label: 'Galerija' },
    { href: '#kontakt', label: 'Kontakt' }
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-brand-light/95 backdrop-blur-md shadow-sm py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
          
          {/* Logo (Lijevo) */}
          <a href="#" onClick={scrollToTop} className="flex items-center gap-3 z-50 group">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-brand-pink/30 group-hover:border-brand-pink transition-colors">
              <img src={cvjecaraLogo} alt="Cvjećara Šćekić Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl lg:text-2xl font-serif font-bold tracking-tight transition-colors duration-300 ${
                isMobileMenuOpen ? 'text-brand-dark' : 'text-brand-dark'
              }`}>
                Cvjećara <span className="text-brand-pink italic font-light">Šćekić</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigacija (Sredina) */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href}
                className="text-sm font-medium tracking-widest uppercase text-brand-dark hover:text-brand-pink transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-pink transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Akcije (Desno) */}
          <div className="flex items-center gap-4 z-50">
            
            {/* Korpa Dugme */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-brand-dark hover:text-brand-pink transition-colors"
              aria-label="Otvori korpu"
            >
              <ShoppingBag className="w-6 h-6" strokeWidth={1.5} />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-brand-pink text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Hamburger Meni (Samo Mobilni) */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-brand-dark hover:text-brand-pink transition-colors"
              aria-label={isMobileMenuOpen ? "Zatvori meni" : "Otvori meni"}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" strokeWidth={1.5} />
              ) : (
                <Menu className="w-6 h-6" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Moderni Full-Screen Mobilni Meni */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-30 bg-[#FAF7F2] md:hidden overflow-y-auto"
          >
            <div className="min-h-screen pt-28 pb-12 px-6 flex flex-col">
              
              {/* Brzi linkovi - Grid layout */}
              <div className="mb-10">
                <motion.h4 
                  custom={0} variants={linkVariants} initial="closed" animate="open"
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark/40 mb-6"
                >
                  Glavna navigacija
                </motion.h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { href: '#o-nama', label: 'O Nama' },
                    { href: '#usluge', label: 'Naše Usluge' },
                    { href: '#galerija', label: 'Galerija Slika' },
                    { href: '#recenzije', label: 'Utisci Kupaca' }
                  ].map((link, index) => (
                    <motion.a 
                      key={link.label}
                      custom={index + 1} variants={linkVariants} initial="closed" animate="open"
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="bg-white/50 border border-brand-beige/30 rounded-2xl p-4 text-center hover:bg-white hover:border-brand-pink/30 hover:shadow-sm transition-all active:scale-95 flex flex-col items-center justify-center gap-2"
                    >
                      <span className="text-xs font-bold uppercase tracking-widest text-brand-dark">{link.label}</span>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Prodavnica sekcija (Kategorije) */}
              <div className="flex-1 relative">
                {/* Dekorativni pozadinski tekst */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none w-full">
                  <span className="text-[5rem] font-serif italic text-brand-dark/[0.03] select-none whitespace-nowrap">
                    Cvjećara
                  </span>
                </div>

                <div className="relative z-10">
                  <motion.div 
                    custom={5} variants={linkVariants} initial="closed" animate="open"
                    className="flex items-center justify-between mb-6"
                  >
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark/40">
                      Cvjetni aranžmani
                    </h4>
                    <span className="text-brand-pink italic text-sm font-serif">Kupovina</span>
                  </motion.div>
                  
                  <div className="space-y-3">
                    {[
                      { href: '#shop', label: 'XL-XXXL Buketi', count: '01' },
                      { href: '#shop', label: 'Buketi', count: '02' },
                      { href: '#shop', label: 'Aranžmani u Korpama', count: '03' },
                      { href: '#shop', label: 'Box Aranžmani', count: '04' },
                      { href: '#shop', label: 'Aranžmani 101 Ruža', count: '05' }
                    ].map((link, index) => (
                      <motion.a
                        key={link.label}
                        custom={index + 6} variants={linkVariants} initial="closed" animate="open"
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="group flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm border border-brand-beige/20 hover:border-brand-pink/30 transition-all active:scale-[0.98]"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-bold text-brand-teal bg-brand-teal/10 px-2 py-1 rounded-md">{link.count}</span>
                          <span className="text-base text-brand-dark font-medium">{link.label}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-brand-dark/30 group-hover:text-brand-pink transition-colors" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Kontakt info footer menija */}
              <motion.div 
                custom={12} variants={linkVariants} initial="closed" animate="open"
                className="mt-12 pt-8 border-t border-brand-beige/50"
              >
                <div className="grid grid-cols-1 gap-4">
                  <a href="tel:+38269108055" className="flex items-center gap-3 text-brand-dark/70 hover:text-brand-pink transition-colors p-2">
                    <div className="w-8 h-8 rounded-full bg-brand-beige/30 flex items-center justify-center text-brand-dark">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium tracking-wide">+382 69 108 055</span>
                  </a>
                  <a href="https://www.instagram.com/cvjecara_scekic__/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-brand-dark/70 hover:text-brand-pink transition-colors p-2">
                    <div className="w-8 h-8 rounded-full bg-brand-beige/30 flex items-center justify-center text-brand-dark">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium tracking-wide">@cvjecara_scekic__</span>
                  </a>
                  <div className="flex items-center gap-3 text-brand-dark/70 p-2">
                    <div className="w-8 h-8 rounded-full bg-brand-beige/30 flex items-center justify-center text-brand-dark">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium tracking-wide">Podgorica, Crna Gora</span>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
