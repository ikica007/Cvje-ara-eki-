const fs = require('fs');

let footer = fs.readFileSync('src/components/Footer.tsx', 'utf8');

const contactHtml = `            <h4 className="uppercase tracking-[0.15em] text-[11px] font-bold text-brand-pink mb-6">Kontakt & Lokacije</h4>
            <ul className="space-y-4 font-serif font-light text-brand-light/90">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-brand-pink shrink-0 mt-0.5" />
                <div className="text-sm space-y-2">
                  <p><strong className="text-brand-pink">BP Cvjećara 1:</strong><br/>ul. Petra Cetinjskog 52</p>
                  <p><strong className="text-brand-pink">BP Cvjećara 2:</strong><br/>Tržni centar Bravera</p>
                  <p><strong className="text-brand-pink">PG Cvjećara 3:</strong><br/>Stari Aerodrom (Uskoro)</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-brand-pink shrink-0" />
                <a href="tel:+38269108055" className="hover:text-brand-pink transition-colors text-sm">069 108 055</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-brand-pink shrink-0" />
                <a href="mailto:scekiccvjecara@hotmail.com" className="hover:text-brand-pink transition-colors text-sm">scekiccvjecara@hotmail.com</a>
              </li>
            </ul>`;

footer = footer.replace(/<h4 className="uppercase tracking-\[0\.15em\] text-\[11px\] font-bold text-brand-pink mb-6">Kontakt<\/h4>[\s\S]*?<\/ul>/, contactHtml);

const brandInfoHtml = `<span className="cursive text-4xl text-brand-pink block mb-2 font-normal tracking-wide">
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
            </div>`;

footer = footer.replace(/<span className="cursive text-4xl text-brand-pink block mb-2 font-normal tracking-wide">[\s\S]*?<\/p>/, brandInfoHtml);

const mapsHtml = `        </div>
        
        {/* Google Maps Embeds */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 mt-8">
          <div className="bg-brand-light/5 p-2 rounded-3xl border border-brand-light/10">
            <h4 className="text-center font-serif text-brand-pink mb-2 text-sm">Cvjećara 1 - ul. Petra Cetinjskog 52</h4>
            <div className="w-full h-64 rounded-2xl overflow-hidden relative">
              <iframe 
                src="https://maps.google.com/maps?q=ul.%20Petra%20Cetinjskog%2052,%20Bijelo%20Polje&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                className="absolute top-0 left-0 w-full h-full border-0 grayscale-[20%] contrast-125" 
                allowFullScreen 
                loading="lazy">
              </iframe>
            </div>
          </div>
          <div className="bg-brand-light/5 p-2 rounded-3xl border border-brand-light/10">
            <h4 className="text-center font-serif text-brand-pink mb-2 text-sm">Cvjećara 2 - Tržni centar Bravera</h4>
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
        
        <div className="pt-8 border-t`;

footer = footer.replace(/<\/div>\s*<div className="pt-8 border-t/, mapsHtml);

fs.writeFileSync('src/components/Footer.tsx', footer);
console.log('Footer updated');
