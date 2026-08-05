import { motion } from 'motion/react';

export function About() {
  return (
    <section id="o-nama" className="py-24 sm:py-32 bg-brand-light text-brand-dark relative overflow-hidden">
      {/* Decorative organic background elements */}
      <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-brand-pink/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-80 h-80 rounded-full bg-brand-teal/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1"
          >
            <span className="uppercase tracking-[0.2em] text-xs font-bold mb-2 block text-brand-teal/80">
              Upoznajte nas
            </span>
            <span className="cursive text-4xl text-brand-pink block mb-3 font-normal tracking-wide">
              Sa puno pažnje i ljubavi...
            </span>
            <h2 className="serif text-4xl sm:text-5xl lg:text-6xl mb-6 font-medium leading-tight">
              Strast prema <span className="italic font-serif text-brand-pink">cvijeću</span>
            </h2>
            <div className="space-y-6 text-brand-dark/80 text-lg leading-relaxed font-serif font-light">
              <p>
                Cvjećara Šćekić je mjesto gdje se ljubav prema prirodi i kreativnost spajaju u jedno. Već dugi niz godina posvećeni smo stvaranju cvjetnih aranžmana koji unose radost i eleganciju u vaše posebne trenutke.
              </p>
              <p>
                Svaki cvijet za nas ima priču, a naš zadatak je da tu priču ispričamo na najlepši mogući način. Bilo da se radi o vjenčanjima, rođendanima, ili jednostavnom znaku pažnje - naš tim sa puno ljubavi bira svaki pupoljak.
              </p>
              <p>
                Pronaći ćete nas u srcu Bijelog Polja, gdje svaki dan započinjemo sa ciljem da nekom uljepšamo dan.
              </p>
            </div>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-8 sm:gap-12 border-t border-brand-beige/50 pt-8 items-center sm:items-start text-center sm:text-left">
              <div>
                <span className="block serif text-5xl text-brand-pink mb-1 font-bold">10+</span>
                <span className="uppercase tracking-[0.15em] text-[10px] font-bold text-brand-dark/60">Godina iskustva</span>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <span className="cursive text-3xl sm:text-4xl text-brand-teal block leading-tight mb-2">
                  Vaša omiljena destinacija
                </span>
                <span className="serif text-xl sm:text-2xl font-bold tracking-widest text-brand-dark">
                  CVJEĆARA ŠĆEKIĆ
                </span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="order-1 md:order-2 relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-brand-beige/80 shadow-[0_15px_30px_-15px_rgba(140,109,88,0.15)] bg-brand-beige"
          >
            <img 
              src="https://res.cloudinary.com/de7gefkxl/image/upload/v1783361980/IMG_8192.JPG_gmr2zc.jpg" 
              alt="O nama - Cvjećara Šćekić"
              className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-brand-dark/5" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
