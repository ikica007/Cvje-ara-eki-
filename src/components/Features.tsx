import { motion } from 'motion/react';
import { Sparkles, Phone } from 'lucide-react';

interface FeaturesProps {
  onSelectCategory?: (category: string) => void;
}

const arrangementCategories = [
  {
    id: 'xl-buketi',
    title: "XL-XXXL Buketi",
    description: "Grandiozni buketi koji ostavljaju bez daha i govore više od hiljadu riječi.",
    image: "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353828/buketi_XL-XXXL14_hqlgxx.jpg",
    num: "01"
  },
  {
    id: 'buketi',
    title: "Buketi",
    description: "Unikatni ručno rađeni buketi od najsvježijeg cvijeća za svaku priliku.",
    image: "https://res.cloudinary.com/de7gefkxl/image/upload/v1783354823/buketi1_qr1ta5.jpg",
    num: "02"
  },
  {
    id: 'korpe',
    title: "Aranžmani u korpama",
    description: "Bogati i raskošni cvjetni dizajni smješteni u pažljivo pletene ukrasne korpe.",
    image: "https://res.cloudinary.com/de7gefkxl/image/upload/v1782991008/aranzmaniukorpama39_w6gz0c.jpg",
    num: "03"
  },
  {
    id: 'box',
    title: "Box Aranžmani",
    description: "Moderne cvjetne kutije koje odišu luksuzom i elegancijom u svakoj prilici.",
    image: "https://res.cloudinary.com/de7gefkxl/image/upload/v1783353162/BOX35_cpa4bf.jpg",
    num: "04"
  },
  {
    id: '101-ruza',
    title: "Aranžmani 101 ruža",
    description: "Klasičan simbol vječne ljubavi i romantike, pažljivo stilizovan do savršenstva.",
    image: "https://res.cloudinary.com/de7gefkxl/image/upload/v1783358052/Screenshot_20250403_145830_Instagram_ilnikx.jpg",
    num: "05"
  },
  {
    id: 'slatki',
    title: "Slatki Aranžmani",
    description: "Savršen spoj predivnog cvijeća i omiljenih slatkiša za najslađa iznenađenja.",
    image: "https://res.cloudinary.com/de7gefkxl/image/upload/v1783358430/514517944_4070395216610883_7679488160219081152_n_pmwqzl.jpg",
    num: "06"
  },
  {
    id: 'kinder',
    title: "Kinder Aranžmani",
    description: "Specijalno osmišljeni buketi prepuni čokoladica koji donose osmijeh na lice najmlađima.",
    image: "https://res.cloudinary.com/de7gefkxl/image/upload/v1783356566/506000555_4050938558556549_3101156041541127873_n_femeuv.jpg",
    num: "07"
  }
];

const decorationCategories = [
  {
    id: 'svadbene',
    title: "Svadbene Dekoracije",
    description: "Transformišemo vaš poseban dan u bajku sa elegantnim cvjetnim aranžmanima, stolovima i detaljima.",
    image: "https://res.cloudinary.com/de7gefkxl/image/upload/v1782905369/svadbene_dekoracije57_hswtwh.jpg",
    num: "01"
  },
  {
    id: 'rodjendani',
    title: "Rođendanske Dekoracije",
    description: "Kreativne tematske postavke, stolići i baloni koji svaku proslavu čine nezaboravnom i čarobnom.",
    image: "https://res.cloudinary.com/de7gefkxl/image/upload/v1783356900/665717241_4346460259004376_954715056274989287_n_eop9bm.jpg",
    num: "02"
  },
  {
    id: 'events',
    title: "Events & Svečanosti",
    description: "Kompletna cvjetna dekoracija i event styling za korporativne događaje, proslave i ekskluzivne zabave.",
    image: "https://res.cloudinary.com/de7gefkxl/image/upload/v1783359885/519628175_4089733331343738_5280612529917967343_n_wgksyg.jpg",
    num: "03"
  }
];

export function Features({ onSelectCategory }: FeaturesProps) {
  return (
    <section id="usluge" className="py-20 sm:py-32 bg-[#F4EFE6] relative overflow-hidden text-brand-dark border-t border-b border-brand-beige/50">
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-brand-teal/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">
        
        {/* SECTION 1: Cvetni Aranžmani */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="uppercase tracking-[0.2em] text-xs font-bold mb-2 block text-brand-pink">
              Naša Ponuda
            </span>
            <span className="cursive text-4xl text-brand-clay block mb-3 font-normal tracking-wide">
              Ručno rađeni cvjetni dizajni
            </span>
            <h2 className="serif text-4xl sm:text-5xl lg:text-6xl text-brand-dark font-medium">
              Cvjetni <span className="italic font-serif text-brand-teal">Aranžmani</span>
            </h2>
            <div className="w-16 h-[1px] bg-brand-pink/30 mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {arrangementCategories.map((category, index) => (
              <motion.div 
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                className="group cursor-pointer bg-brand-light/40 p-4 rounded-[2.5rem] border border-brand-beige/30 hover:border-brand-pink/30 hover:bg-brand-light/80 transition-all duration-500 shadow-[0_4px_20px_-10px_rgba(140,109,88,0.05)] hover:shadow-[0_15px_30px_-10px_rgba(140,109,88,0.12)]"
                onClick={() => onSelectCategory && onSelectCategory(category.id)}
              >
                <div className="relative mb-6 overflow-hidden rounded-[2rem] aspect-[3/4] border border-brand-beige/60">
                  <div className="absolute inset-0 bg-brand-dark/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  {category.image ? (
                    <img 
                      src={category.image} 
                      alt={category.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-brand-beige/40 group-hover:bg-brand-beige/60 transition-colors">
                       <span className="text-brand-dark/30 uppercase tracking-widest text-xs font-semibold">Slika uskoro</span>
                    </div>
                  )}
                  <div className="flex absolute top-6 left-6 z-20 bg-brand-light/85 backdrop-blur-sm w-12 h-12 rounded-full items-center justify-center border border-brand-beige/60 shadow-sm">
                    <span className="serif text-lg text-brand-dark font-bold">
                      {category.num}
                    </span>
                  </div>
                </div>
                <div className="px-2">
                  <h3 className="serif text-2xl mb-2 text-brand-dark group-hover:text-brand-pink transition-colors font-semibold">{category.title}</h3>
                  <p className="text-brand-dark/70 font-serif font-light text-sm leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SECTION 2: Naše Dekoracije */}
        <div className="pt-12 border-t border-brand-beige/60">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-pink/10 border border-brand-pink/20 text-brand-pink text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Agencija za dekoraciju & event styling</span>
            </div>
            <h2 className="serif text-4xl sm:text-5xl lg:text-6xl text-brand-dark font-semibold leading-tight">
              Naše <span className="italic font-serif text-brand-pink">Dekoracije</span>
            </h2>
            <p className="text-brand-dark/75 font-serif max-w-2xl mx-auto text-base sm:text-lg leading-relaxed mt-4 font-light">
              Specijalizovani smo za kompletan event styling i unikatne dekoracije. Sve ponude i cijene dekoracija se formiraju individualno po vašem upitu i specifičnim željama.
            </p>
            <div className="w-20 h-[1px] bg-brand-pink/40 mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {decorationCategories.map((category, index) => (
              <motion.div 
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer bg-white/70 p-5 rounded-[2.5rem] border border-brand-pink/20 hover:border-brand-pink hover:bg-white transition-all duration-500 shadow-[0_4px_25px_-10px_rgba(140,109,88,0.08)] hover:shadow-[0_20px_40px_-10px_rgba(140,109,88,0.16)] flex flex-col justify-between"
                onClick={() => onSelectCategory && onSelectCategory(category.id)}
              >
                <div>
                  <div className="relative mb-6 overflow-hidden rounded-[2rem] aspect-[4/5] border border-brand-beige/60">
                    <div className="absolute inset-0 bg-brand-dark/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <img 
                      src={category.image} 
                      alt={category.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                    <div className="flex absolute top-6 left-6 z-20 bg-brand-light/90 backdrop-blur-sm w-12 h-12 rounded-full items-center justify-center border border-brand-pink/30 shadow-sm">
                      <span className="serif text-lg text-brand-pink font-bold">
                        {category.num}
                      </span>
                    </div>
                  </div>
                  <div className="px-2">
                    <h3 className="serif text-2xl mb-2 text-brand-dark group-hover:text-brand-pink transition-colors font-semibold">{category.title}</h3>
                    <p className="text-brand-dark/70 font-serif font-light text-sm leading-relaxed mb-6">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="pt-2 px-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-brand-pink uppercase tracking-widest pt-4 border-t border-brand-beige/40">
                    <span>Pogledaj dekoracije</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a 
              href="tel:+38269108055" 
              className="inline-flex items-center gap-3 bg-brand-dark hover:bg-brand-pink text-white rounded-full px-8 py-4 transition-all duration-300 font-bold text-xs uppercase tracking-widest shadow-lg hover:shadow-xl"
            >
              <Phone className="w-4 h-4 text-brand-pink group-hover:text-white" />
              <span>Pozovite za konsultacije i ponudu dekoracija: 069 108 055</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
