const fs = require('fs');

let footer = fs.readFileSync('src/components/Footer.tsx', 'utf8');

const updatedMapsHtml = `</div>
        
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
        
        <div className="pt-8 border-t`;

footer = footer.replace(/<\/div>\s*\{\/\* Google Maps Embeds \*\/\}[\s\S]*?<div className="pt-8 border-t/, updatedMapsHtml);

fs.writeFileSync('src/components/Footer.tsx', footer);
console.log('Footer updated');
