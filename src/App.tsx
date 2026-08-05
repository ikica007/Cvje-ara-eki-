import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Features } from './components/Features';
import { Gallery } from './components/Gallery';
import { Reviews } from './components/Reviews';
import { Footer } from './components/Footer';

// Uvozimo kategorije
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

// Cart Context i Drawer
import { CartProvider } from './context/CartContext';
import { CartDrawer } from './components/CartDrawer';

export type Category = 'home' | 'gallery' | 'svadbene' | 'xl-buketi' | 'buketi' | 'korpe' | 'box' | '101-ruza' | 'rodjendani' | 'events' | 'slatki' | 'kinder';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('home');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeCategory]);

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
      </div>
    </CartProvider>
  );
}
