import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Features } from './components/Features';
import { Gallery } from './components/Gallery';
import { Reviews } from './components/Reviews';
import { Footer } from './components/Footer';

import { SvadbeneDekoracije } from './components/categories/SvadbeneDekoracije';
import { XlXxxlBuketi } from './components/categories/XlXxxlBuketi';
import { Buketi } from './components/categories/Buketi';
import { AranzmaniUKorpama } from './components/categories/AranzmaniUKorpama';
import { Box } from './components/categories/Box';
import { Aranzmani101Ruza } from './components/categories/Aranzmani101Ruza';
import { RodjendanskeDekoracije } from './components/categories/RodjendanskeDekoracije';
import { Events } from './components/categories/Events';
import { SlatkiAranzmani } from './components/categories/SlatkiAranzmani';
import { KinderAranzmani } from './components/categories/KinderAranzmani';
import { FullGallery } from './components/FullGallery';

import { CartProvider } from './context/CartContext';
import { CartDrawer } from './components/CartDrawer';

type Category = 'home' | 'gallery' | 'svadbene' | 'xl-buketi' | 'buketi' | 'korpe' | 'box' | '101-ruza' | 'rodjendani' | 'events' | 'slatki' | 'kinder';

function PaymentNotification({ status, onClose }: { status: string; onClose: () => void }) {
  const uspjesno = status === 'success';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center space-y-4">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto text-2xl font-bold ${uspjesno ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
          {uspjesno ? '✓' : '✕'}
        </div>
        <h2 className="text-xl font-serif text-stone-800">
          {uspjesno ? 'Plaćanje uspješno!' : 'Plaćanje nije uspjelo'}
        </h2>
        <p className="text-stone-500 text-sm">
          {uspjesno
            ? 'Hvala na narudžbi! Uskoro ćemo vas kontaktirati radi potvrde i dostave.'
            : 'Nešto je pošlo po krivu. Molimo pokušajte ponovo ili nas kontaktirajte.'}
        </p>
        <button
          onClick={onClose}
          className={`w-full py-3 rounded-full text-white text-sm font-medium transition-colors ${uspjesno ? 'bg-emerald-700 hover:bg-emerald-800' : 'bg-red-500 hover:bg-red-600'}`}
        >
          {uspjesno ? 'Odlično!' : 'Zatvori'}
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('home');
  const [paymentStatus, setPaymentStatus] = useState<string>('');
  const [showPaymentNotif, setShowPaymentNotif] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeCategory]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get('payment');
    if (payment === 'success' || payment === 'error' || payment === 'cancel') {
      setPaymentStatus(payment);
      setShowPaymentNotif(true);
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const renderContent = () => {
    switch (activeCategory) {
      case 'gallery': return <FullGallery onBack={() => setActiveCategory('home')} />;
      case 'svadbene': return <SvadbeneDekoracije onBack={() => setActiveCategory('home')} />;
      case 'xl-buketi': return <XlXxxlBuketi onBack={() => setActiveCategory('home')} />;
      case 'buketi': return <Buketi onBack={() => setActiveCategory('home')} />;
      case 'korpe': return <AranzmaniUKorpama onBack={() => setActiveCategory('home')} />;
      case 'box': return <Box onBack={() => setActiveCategory('home')} />;
      case '101-ruza': return <Aranzmani101Ruza onBack={() => setActiveCategory('home')} />;
      case 'rodjendani': return <RodjendanskeDekoracije onBack={() => setActiveCategory('home')} />;
      case 'events': return <Events onBack={() => setActiveCategory('home')} />;
      case 'slatki': return <SlatkiAranzmani onBack={() => setActiveCategory('home')} />;
      case 'kinder': return <KinderAranzmani onBack={() => setActiveCategory('home')} />;
      default:
        return (
          <>
            <Hero />
            <About />
            <Features onSelectCategory={(cat) => setActiveCategory(cat as Category)} />
            <Gallery onViewAll={() => setActiveCategory('gallery')} />
            <Reviews />
          </>
        );
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-brand-light text-brand-dark selection:bg-brand-pink selection:text-white">
        <Header onSelectCategory={(cat) => setActiveCategory(cat as Category)} />
        <main>
          {renderContent()}
        </main>
        <Footer />
        <CartDrawer />
        {showPaymentNotif && (
          <PaymentNotification
            status={paymentStatus}
            onClose={() => setShowPaymentNotif(false)}
          />
        )}
      </div>
    </CartProvider>
  );
}
