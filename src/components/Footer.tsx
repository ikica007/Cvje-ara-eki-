import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer id="kontakt" className="bg-[#1C1618] text-brand-light pt-20 pb-12 border-t border-brand-light/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <span className="text-2xl font-serif font-bold tracking-wider text-brand-light block mb-4">
              Cvjećara <span className="italic font-serif text-brand-pink">Šćekić</span>
            </span>
            <p className="text-brand-light/80 font-serif font-light max-w-sm mb-6 leading-relaxed">
              Unosimo ljepotu, mirise i emocije u svaki vaš poseban trenutak. Vaša omiljena cvjećara u Bijelom Polju sa tradicijom i ljubavlju prema detaljima.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://www.instagram.com/scekic_cvjecara/"
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
                  <p><strong className="text-brand-pink font-semibold">BP Cvjećara 1:</strong><br />ul. Petra Cetinjskog 52</p>
                  <p><strong className="text-brand-pink font-semibold">BP Cvjećara 2:</strong><br />ulica Tršova, Centar grada, Bijelo Polje</p>
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
            
            <h4 className="uppercase tracking-[0.15em] text-[11px] font-bold text-brand-pink mb-6 mt-8">Pravne informacije</h4>
            <ul className="space-y-3 font-serif font-light text-brand-light/90">
              <li><span className="text-sm">Scekic D&V group doo</span></li>
              <li><span className="text-sm">PIB: 03087131</span></li>
              <li><a href="/uslovi-koriscenja.html" className="hover:text-brand-pink transition-all text-sm">Uslovi korišćenja</a></li>
              <li><a href="/politika-privatnosti.html" className="hover:text-brand-pink transition-all text-sm">Politika privatnosti</a></li>
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
            <a
              href="https://www.google.com/maps?q=43.03417165736971,19.749099243858147"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center font-serif text-brand-pink hover:text-brand-light transition-colors mb-3 text-sm tracking-wide"
            >
              Cvjećara 2 - ulica Tršova, Centar grada ↗
            </a>
            <div className="w-full h-64 rounded-2xl overflow-hidden relative">
              <iframe
                src="https://maps.google.com/maps?q=43.03417165736971,19.749099243858147&t=&z=16&ie=UTF8&iwloc=&output=embed"
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
