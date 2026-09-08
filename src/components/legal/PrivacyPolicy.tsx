import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export function PrivacyPolicy({ onBack }: Props) {
  return (
    <div className="bg-[#F4EFE6] min-h-screen pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-brand-dark/70 hover:text-brand-pink transition-colors mb-12 uppercase tracking-widest text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Nazad na početnu
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-brand-dark/5"
        >
          <h1 className="serif text-4xl text-brand-dark mb-8">Politika privatnosti</h1>
          
          <div className="space-y-8 font-serif font-light text-brand-dark/80 leading-relaxed text-lg">
            <section>
              <h2 className="text-xl font-medium text-brand-dark mb-4">1. Uvod</h2>
              <p>
                Scekic D&V group doo (u daljem tekstu "mi" ili "prodavac") visoko cijeni vašu privatnost i obavezuje se na zaštitu ličnih podataka koje nam ustupate prilikom korišćenja ovog sajta i obavljanja narudžbi.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-brand-dark mb-4">2. Podaci koje prikupljamo</h2>
              <p>
                Kako bismo uspješno procesirali vašu narudžbu i isporučili proizvode na željenu adresu, potrebni su nam sljedeći osnovni podaci:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Ime i prezime (kako bismo znali kome dostavljamo narudžbu)</li>
                <li>Adresa za dostavu (kako bismo znali gdje da dostavimo)</li>
                <li>Grad u Crnoj Gori</li>
                <li>Broj telefona (kako bi vas kurir mogao kontaktirati u trenutku dostave)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-brand-dark mb-4">3. Svrha prikupljanja podataka</h2>
              <p>
                Vaše podatke koristimo strogo i isključivo u svrhe:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Obrade vaše narudžbe.</li>
                <li>Pružanja usluge dostave na vašu adresu.</li>
                <li>Korisničke podrške i kontaktiranja u vezi sa trenutnom narudžbom (putem telefona ili WhatsApp/Viber poruka).</li>
              </ul>
              <p className="mt-3">
                Vaši podaci se NE prodaju, NE iznajmljuju trećim licima i NE koriste se za slanje neželjene pošte (spam).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-brand-dark mb-4">4. Zaštita podataka</h2>
              <p>
                U skladu sa Zakonom o zaštiti podataka o ličnosti Crne Gore, primjenjujemo razumne bezbjednosne mjere kako bismo zaštitili vaše podatke od neovlašćenog pristupa, izmjene ili uništavanja. Samo ovlašćeno osoblje i kurirske službe sa kojima sarađujemo (a kojima je podatak nužan za isporuku) imaju pristup vašim podacima.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-brand-dark mb-4">5. Vaša prava</h2>
              <p>
                Kao korisnik, u svakom trenutku imate pravo da zatražite informaciju o tome koje vaše podatke čuvamo, kao i da zatražite njihovu izmjenu ili brisanje iz naše baze, upućivanjem zahtjeva na naš zvanični e-mail.
              </p>
            </section>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
