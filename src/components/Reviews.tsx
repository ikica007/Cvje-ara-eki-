import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const reviews = [
  {
    author: "Gordana Radovic",
    text: "Profesionalnost i ljubav prema poslu, pored kreativnosti su poseban utisak iz ove cvjećare! Preporuka za ovu cvjećaru! Online smo rezervisali, online platili, BRAVO!",
    rating: 5,
    time: "prije godinu dana"
  },
  {
    author: "Nemanja Veskovic - Vele",
    text: "Profesionalni i kreativni. Uvijek kad idem kod djevojke uzmem ovdje neki cvjetic.",
    rating: 5,
    time: "prije 7 mjeseci"
  },
  {
    author: "Bojana Fetic",
    text: "Vrhunska usluga. Profesionalizam pre svega! Cijene jako pristupacne u odnosu na prelijepe aranzmane i bukete.",
    rating: 5,
    time: "prije godinu dana"
  }
];

export function Reviews() {
  return (
    <section id="recenzije" className="py-24 sm:py-32 bg-brand-light text-brand-dark relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-brand-pink/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          
          <div className="md:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="uppercase tracking-[0.2em] text-xs font-bold mb-2 block text-brand-teal/80">
                Utisci Korisnika
              </span>
              <span className="cursive text-4xl text-brand-clay block mb-3 font-normal tracking-wide">
                Riječi naših dragih kupaca
              </span>
              <h2 className="serif text-4xl sm:text-5xl lg:text-6xl text-brand-dark mb-6 font-medium leading-tight">
                Šta <span className="italic font-serif text-brand-pink">kažu</span> o nama
              </h2>
              <p className="text-brand-dark/75 font-serif font-light mb-8 max-w-sm text-lg leading-relaxed">
                Naša najveća nagrada su zadovoljni kupci. Pročitajte njihova iskustva sa našom cvjećarom.
              </p>
              <div className="flex items-center gap-4 border-t border-brand-beige/60 pt-6">
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="h-5 w-5 fill-brand-pink text-brand-pink" />
                  ))}
                </div>
                <span className="font-serif font-bold text-brand-dark text-lg">5.0 Ocjena</span>
              </div>
            </motion.div>
          </div>

          <div className="md:w-2/3 grid sm:grid-cols-2 gap-6 w-full">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`bg-[#F4EFE6]/70 p-8 rounded-[2.5rem] border border-brand-beige/50 hover:bg-[#F4EFE6]/90 hover:border-brand-pink/30 hover:shadow-[0_15px_30px_-10px_rgba(140,109,88,0.06)] transition-all duration-500 flex flex-col justify-between ${index === 2 ? 'sm:col-span-2 sm:w-11/12 sm:mx-auto' : ''}`}
              >
                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-brand-pink text-brand-pink" />
                    ))}
                  </div>
                  <p className="text-brand-dark font-serif font-light italic mb-6 text-lg leading-relaxed text-brand-dark/90">
                    "{review.text}"
                  </p>
                </div>
                <div className="border-t border-brand-beige/50 pt-4 mt-2">
                  <p className="font-bold text-brand-dark font-serif">{review.author}</p>
                  <p className="text-xs uppercase tracking-widest text-brand-dark/50 mt-1">{review.time}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
