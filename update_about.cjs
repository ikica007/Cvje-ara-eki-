const fs = require('fs');
let about = fs.readFileSync('src/components/About.tsx', 'utf8');

const newStats = `<div className="mt-10 flex flex-col sm:flex-row gap-8 sm:gap-12 border-t border-brand-beige/50 pt-8 items-center sm:items-start text-center sm:text-left">
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
            </div>`;

about = about.replace(/<div className="mt-10 flex gap-12 border-t border-brand-beige\/50 pt-8">[\s\S]*?<\/div>\s*<\/div>/, newStats);

fs.writeFileSync('src/components/About.tsx', about);
console.log('About updated');
