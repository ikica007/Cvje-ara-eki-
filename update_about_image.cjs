const fs = require('fs');
let about = fs.readFileSync('src/components/About.tsx', 'utf8');

const updatedContent = `          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1"
          >
            <div className="mb-8 rounded-3xl overflow-hidden shadow-lg border border-brand-beige/50">
              <img 
                src="https://res.cloudinary.com/de7gefkxl/image/upload/v1783361980/IMG_8192.JPG_gmr2zc.jpg" 
                alt="Detalj - Cvjećara Šćekić"
                className="w-full h-48 sm:h-64 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="uppercase tracking-[0.2em] text-xs font-bold mb-2 block text-brand-teal/80">
              Upoznajte nas
            </span>
            <span className="cursive text-4xl text-brand-pink block mb-3 font-normal tracking-wide">
              Sa puno pažnje i ljubavi...
            </span>`;

about = about.replace(/<motion\.div\s+initial=\{\{ opacity: 0, x: -40 \}\}[\s\S]*?<span className="cursive text-4xl text-brand-pink block mb-3 font-normal tracking-wide">\s*Sa puno pažnje i ljubavi\.\.\.\s*<\/span>/, updatedContent);

fs.writeFileSync('src/components/About.tsx', about);
console.log('About updated');
