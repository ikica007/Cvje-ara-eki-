import { Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer id="kontakt" className="bg-brand-dark text-brand-light pt-20 pb-10 border-t border-brand-beige/25 relative overflow-hidden">
      {/* Decorative leaf/botanical elements or subtle organic blurs */}
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-brand-teal/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="lg:col-span-2">
            <span className="cursive text-4xl text-brand-pink block mb-2 font-normal tracking-wide">
              Agencija za dekoraciju & event styling
            </span>
            <h3 className="serif text-4xl mb-6 font-semibold">
              Cvjećara <span className="italic font-serif text-brand-pink">Šćekić</span>
            </h3>
            <p className="font-serif font-light text-brand-light/80 max-w-sm mb-6 leading-relaxed text-base">
              Unesite ljepotu u svoje posebne trenutke. Kreativni aranžmani, profesionalna usluga i online rezervacije za sva vaša dešavanja.
            </p>
            <div className="mb-8 p-4 rounded-xl bg-brand-light/5 border border-brand-light/10 inline-block">
              <p className="text-sm font-semibold text-brand-pink mb-2 uppercase tracking-widest">Radno vrijeme</p>
              <p className="text-sm font-light text-brand-light/90">Pon–Sub: 08–19h</p>
              <p className="text-sm font-light text-brand-light/90">Nedelja: 08–12h</p>
            </div>
            <div className="flex flex-wrap gap-4 mt-6">
              <a 
                href="https://www.instagram.com/cvjecarascekic" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 border border-brand-pink/40 text-brand-light rounded-full px-7 py-3 hover:bg-brand-pink hover:text-brand-light transition-all duration-300 font-semibold text-xs uppercase tracking-widest"
              >
                <Instagram className="h-4 w-4 text-brand-pink group-hover:text-brand-light transition-colors" />
                Instagram
              </a>
              <a 
                href="https://www.facebook.com/CvjecaraScekic" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 border border-brand-pink/40 text-brand-light rounded-full px-7 py-3 hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-brand-light transition-all duration-300 font-semibold text-xs uppercase tracking-widest"
              >
                <Facebook className="h-4 w-4 text-brand-pink group-hover:text-brand-light transition-colors" />
                Facebook
              </a>
            </div>
          </div>

          <div>
            <h4 className="uppercase tracking-[0.15em] text-[11px] font-bold text-brand-pink mb-6">Kontakt & Lokacije</h4>
            <ul className="space-y-4 font-serif font-light text-brand-light/90">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-brand-pink shrink-0 mt-0.5" />
                <div className="text-sm space-y-2">
                  <p><strong className="text-brand-pink font-semibold">BP Cvjećara 1:</strong><br/>ul. Petra Cetinjskog 52</p>
                  <p><strong className="text-brand-pink font-semibold">BP Cvjećara 2:</strong><br/>Tržni centar Bravera</p>
                </div>
              </li>
              <li className="flex flex-col gap-3 pt-2">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-brand-pink shrink-0" />
                  <a href="tel:+38269108055" className="hover:text-brand-pink transition-colors text-sm font-semibold text-lg">069 108 055</a>
                </div>
                <div className="pl-8">
                  <p className="text-xs text-brand-light/70 mb-3 font-serif">Kontaktirajte nas za sve dodatne informacije i porudžbine:</p>
                  <div className="flex flex-wrap gap-2">
                    <a href="viber://chat?number=%2B38269108055" className="inline-flex items-center gap-1.5 bg-[#7360F2] text-white text-[10px] uppercase tracking-wider font-semibold px-3 py-2 rounded-full hover:bg-opacity-80 transition-all shadow-sm">
                      Viber
                    </a>
                    <a href="https://wa.me/38269108055" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-[#25D366] text-white text-[10px] uppercase tracking-wider font-semibold px-3 py-2 rounded-full hover:bg-opacity-80 transition-all shadow-sm">
                      WhatsApp
                    </a>
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-brand-pink shrink-0" />
                <a href="mailto:scekiccvjecara@hotmail.com" className="hover:text-brand-pink transition-colors text-sm break-all">scekiccvjecara@hotmail.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase tracking-[0.15em] text-[11px] font-bold text-brand-pink mb-6">Informacije</h4>
            <ul className="space-y-3 font-serif font-light text-brand-light/90">
              <li><a href="#o-nama" className="hover:text-brand-pink transition-all text-sm">O nama</a></li>
              <li><a href="#usluge" className="hover:text-brand-pink transition-all text-sm">Usluge</a></li>
              <li><a href="#galerija" className="hover:text-brand-pink transition-all text-sm">Galerija</a></li>
              <li><a href="#recenzije" className="hover:text-brand-pink transition-all text-sm">Recenzije</a></li>
            </ul>
          </div>

        </div>
        
        {/* Google Maps Embeds */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 mt-8">
          <div className="bg-brand-light/5 p-2 rounded-3xl border border-brand-light/10">
            <a href="https://maps.app.goo.gl/QsX7bvm6Cbtkw1Ce6" target="_blank" rel="noopener noreferrer" className="block text-center font-serif text-brand-pink hover:text-brand-light transition-colors mb-3 text-sm tracking-wide">
              Cvjećara 1 - ul. Petra Cetinjskog 52 ↗
            </a>
            <div className="w-full h-64 rounded-2xl overflow-hidden relative">
              <iframe 
                src="https://maps.google.com/maps?q=43.0559417,19.770745&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                className="absolute top-0 left-0 w-full h-full border-0 grayscale-[20%] contrast-125" 
                allowFullScreen 
                loading="lazy">
              </iframe>
            </div>
          </div>
          <div className="bg-brand-light/5 p-2 rounded-3xl border border-brand-light/10">
            <h4 className="text-center font-serif text-brand-pink mb-3 text-sm tracking-wide">Cvjećara 2 - Tržni centar Bravera</h4>
            <div className="w-full h-64 rounded-2xl overflow-hidden relative">
              <iframe 
                src="https://maps.google.com/maps?q=Trzni%20centar%20Bravera,%20Bijelo%20Polje&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                className="absolute top-0 left-0 w-full h-full border-0 grayscale-[20%] contrast-125" 
                allowFullScreen 
                loading="lazy">
              </iframe>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-brand-light/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-serif font-light text-brand-light/40">
          <p>&copy; {new Date().getFullYear()} Cvjećara Šćekić. Sva prava zadržana.</p>
        </div>
      </div>
    </footer>
  );
}
