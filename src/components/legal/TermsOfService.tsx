import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export function TermsOfService({ onBack }: Props) {
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
          <h1 className="serif text-4xl text-brand-dark mb-8">Uslovi korišćenja</h1>
          
          <div className="space-y-8 font-serif font-light text-brand-dark/80 leading-relaxed text-lg">
            <section>
              <h2 className="text-xl font-medium text-brand-dark mb-4">1. Osnovni podaci o trgovcu</h2>
              <p>
                Ovim uslovima korišćenja definišu se pravila i uslovi poslovanja internet prodavnice. Prodavac robe je:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Naziv firme:</strong> Scekic D&V group doo</li>
                <li><strong>PIB / Matični broj:</strong> 03087131</li>
                <li><strong>Adresa sjedišta:</strong> Nedakusi, ul Petra Cetinjskog, Bijelo Polje, Crna Gora</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-brand-dark mb-4">2. Cijene i proizvodi</h2>
              <p>
                Sve cijene navedene na sajtu su izražene u eurima (€) i podložne su promjenama. Trudimo se da sve informacije o proizvodima, uključujući fotografije i opise, budu što preciznije. Međutim, s obzirom na prirodu cvijeća, moguće su manje varijacije u boji ili sastavu buketa zavisno od sezonske dostupnosti, pri čemu uvijek zadržavamo jednaku vrijednost i estetski izgled.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-brand-dark mb-4">3. Načini plaćanja i dostava</h2>
              <p>Plaćanje se vrši na dva načina:</p>
              <ul className="list-disc pl-5 mt-2 mb-4 space-y-1">
                <li><strong>Pouzećem:</strong> Gotovinsko plaćanje kuriru prilikom preuzimanja narudžbe.</li>
                <li><strong>Karticom:</strong> Plaćanje platnom karticom na sajtu (odmah po potvrdi narudžbe).</li>
              </ul>
              <p>
                Dostava se vrši na teritoriji Crne Gore. Rokovi i cijena dostave biće definisani prilikom potvrde same narudžbe. Troškovi dostave padaju na teret kupca osim ukoliko nije drugačije naznačeno (npr. uračunato u cijenu za određene artikle).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-brand-dark mb-4">4. Pravo na reklamaciju i odustanak od ugovora</h2>
              <div className="p-5 bg-brand-pink/10 rounded-2xl border border-brand-pink/20">
                <p className="font-medium text-brand-dark mb-2">VAŽNO OBAVJEŠTENJE – Izuzetak od prava na odustanak u roku od 14 dana</p>
                <p className="text-sm">
                  U skladu sa Zakonom o zaštiti potrošača Crne Gore, kupac inače ima pravo da odustane od ugovora zaključenog na daljinu u roku od 14 dana. <strong>MEĐUTIM, s obzirom na to da je rezano cvijeće, buketi i biljni aranžmani roba koja je podložna brzom propadanju, kupac NEMA zakonsko pravo na jednostrani raskid ugovora i povrat robe u roku od 14 dana.</strong>
                </p>
                <p className="mt-3 text-sm">
                  Reklamacije uvažavamo isključivo u trenutku isporuke (ukoliko je roba vidno oštećena prilikom samog transporta). U tom slučaju, kupac je dužan da na licu mjesta ukaže kuriru na oštećenje i kontaktira nas kako bismo izvršili zamjenu ili povrat novca.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-medium text-brand-dark mb-4">5. Saglasnost i izmjene</h2>
              <p>
                Korišćenjem ovog sajta i obavljanjem kupovine, korisnik u potpunosti prihvata ove Uslove korišćenja. Scekic D&V group doo zadržava pravo da u bilo kom trenutku izmijeni ove uslove, a izmjene stupaju na snagu momentom objavljivanja na sajtu.
              </p>
            </section>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
