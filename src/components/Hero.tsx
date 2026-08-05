import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-light pt-20">
      {/* Background image with high contrast warm rustic overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://res.cloudinary.com/de7gefkxl/image/upload/v1783363776/WhatsApp_Image_2026-07-06_at_20.47.21_lrihsp.jpg" 
          alt="Cvjećara Šćekić Venčanje" 
          className="w-full h-full object-cover scale-105 filter brightness-90 contrast-95"
          referrerPolicy="no-referrer"
        />
        {/* Soft, warm dark blue logo overlay to ensure perfect contrast and sophisticated style */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B192C]/70 via-[#0B192C]/50 to-[#0B192C]/95" />
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-brand-light py-20 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-6"
        >
          {/* Elegant script accent */}
          <span className="cursive text-4xl sm:text-5xl text-brand-pink block tracking-wide">
            Dobrodošli u naš svijet elegancije
          </span>

          <h1 className="serif text-5xl sm:text-7xl lg:text-8xl text-brand-light font-medium tracking-tight leading-none drop-shadow-sm">
            Cvjećara <span className="italic font-serif text-brand-pink">Šćekić</span>
          </h1>

          <div className="w-24 h-[1px] bg-brand-pink/40 mx-auto my-8" />

          <p className="font-serif font-light text-lg sm:text-2xl max-w-2xl mx-auto leading-relaxed text-brand-light/95 italic drop-shadow-sm">
            Tradicija, vrhunska estetika i najfiniji cvjetni aranžmani kreirani sa iskrenom ljubavlju za vaše najdraže trenutke.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <a 
              href="#usluge" 
              className="w-full sm:w-auto bg-brand-pink hover:bg-brand-clay text-brand-light px-8 py-4 rounded-full transition-all duration-300 font-semibold text-xs uppercase tracking-widest shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Istražite Kategorije
            </a>
            <a 
              href="#kontakt" 
              className="w-full sm:w-auto border border-brand-light/30 hover:border-brand-pink text-brand-light hover:bg-brand-light/15 px-8 py-4 rounded-full transition-all duration-300 font-semibold text-xs uppercase tracking-widest backdrop-blur-sm"
            >
              Kontaktirajte Nas
            </a>
          </div>
        </motion.div>
      </div>

      {/* Elegant scroll indicator */}
      <div className="absolute bottom-10 inset-x-0 z-10 flex justify-center">
        <motion.a 
          href="#o-nama"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-brand-light/70 hover:text-brand-pink transition-colors cursor-pointer"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold">Istraži više</span>
          <ChevronDown className="h-4 w-4" />
        </motion.a>
      </div>
    </section>
  );
}

