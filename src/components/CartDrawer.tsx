import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Minus, Plus, Trash2, Truck, CreditCard, Loader2, ShieldCheck, Globe } from 'lucide-react';

export function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, totalPrice, isCartOpen, setIsCartOpen, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'pouzecem' | 'karticom'>('karticom');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    ordererName: '',
    ordererPhone: '',
    ordererEmail: '',
    recipientName: '',
    recipientPhone: '',
    address: '',
    city: 'Podgorica',
    message: '',
    deliveryDate: ''
  });

  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateString = tomorrow.toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (paymentMethod === 'karticom') {
      try {
        // Šaljemo email sa svim detaljima ODMAH, prije Finrelay redirecta
        const orderRef = `CS-${Date.now()}`;
        try {
          await fetch('/api/send-order-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              reference: orderRef,
              amount: totalPrice,
              customer: {
                name: formData.ordererName,
                email: formData.ordererEmail,
                phone: formData.ordererPhone,
              },
              delivery: {
                recipientName: formData.recipientName,
                recipientPhone: formData.recipientPhone,
                address: formData.address,
                city: formData.city,
                date: formData.deliveryDate,
                message: formData.message,
              },
              items: cart.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
              })),
            }),
          });
        } catch (emailErr) {
          console.error('Email greška:', emailErr);
          // Ne blokiramo plaćanje ako email ne pošalje
        }

        const response = await fetch('/api/create-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: totalPrice,
            customer: {
              name: formData.ordererName,
              email: formData.ordererEmail,
              phone: formData.ordererPhone,
              address: formData.address,
              city: formData.city
            },
            delivery: {
              recipientName: formData.recipientName,
              phone: formData.recipientPhone,
              address: formData.address,
              city: formData.city,
              message: formData.message,
              deliveryDate: formData.deliveryDate
            },
            items: cart.map(item => ({ name: item.name, quantity: item.quantity }))
          }),
        });

        const text = await response.text();
        let data: any = {};
        try {
          if (text) {
            data = JSON.parse(text);
          }
        } catch (parseError) {
          throw new Error("Server je vratio prazan odgovor umjesto linka za plaćanje.");
        }

        if (!response.ok) {
          throw new Error(data.error || data.greska || 'Greška prilikom kreiranja plaćanja.');
        }
        
        if (data.redirectUrl) {
          window.location.href = data.redirectUrl;
        } else {
          alert("Greška: Server nije vratio link za plaćanje od banke.");
          setIsLoading(false);
        }
      } catch (error: any) {
        console.error("Payment error:", error);
        alert(`Greška: ${error.message}`);
        setIsLoading(false);
      }
      return;
    }

    // --- LOGIKA ZA PLAĆANJE POUZEĆEM (WhatsApp) ---
    let message = `Nova narudžba!\n\n`;
    message += `*Podaci naručioca:*\n`;
    message += `Ime i prezime: ${formData.ordererName}\n`;
    message += `Telefon: ${formData.ordererPhone}\n`;
    message += `Email: ${formData.ordererEmail}\n\n`;
    
    message += `*Podaci za dostavu:*\n`;
    message += `Primalac: ${formData.recipientName}\n`;
    message += `Telefon primaoca: ${formData.recipientPhone}\n`;
    message += `Adresa: ${formData.address}\n`;
    message += `Grad: ${formData.city}\n`;
    
    if (formData.deliveryDate) {
      message += `Datum isporuke: ${formData.deliveryDate}\n`;
    }
    if (formData.message) {
      message += `Poruka uz buket: ${formData.message}\n`;
    }
    
    message += `\n*Stavke narudžbe:*\n`;
    cart.forEach(item => {
      message += `${item.quantity}x ${item.name} - ${(item.price * item.quantity).toFixed(2)} €\n`;
    });
    message += `\n*Ukupno za naplatu:* ${totalPrice.toFixed(2)} € (Plaćanje pouzećem)\n`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/38269108055?text=${encodedMessage}`, '_blank');
    setIsLoading(false);
    setOrderSuccess(true);
    clearCart();
  };

  const handleClose = () => {
    setIsCartOpen(false);
    setTimeout(() => {
      setStep('cart');
      setOrderSuccess(false);
      setIsLoading(false);
    }, 300);
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={handleClose} 
      />
      
      <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-xl font-serif font-semibold text-brand-dark flex items-center gap-2">
            <svg className="w-5 h-5 text-brand-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Vaša Korpa
          </h2>
          <button onClick={handleClose} className="p-2 -mr-2 text-gray-400 hover:text-brand-pink hover:bg-brand-pink/5 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-50/50">
          {orderSuccess ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-4">
              <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif text-brand-dark">Hvala na narudžbi!</h3>
              <p className="text-gray-500">Vaša narudžba je uspješno proslijeđena.</p>
              <button onClick={handleClose} className="mt-8 px-8 py-3 bg-brand-dark text-white rounded-full font-semibold hover:bg-brand-pink transition-colors">
                Zatvori
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center text-gray-400 space-y-4">
              <svg className="w-16 h-16 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-lg font-serif">Vaša korpa je prazna</p>
            </div>
          ) : (
            <>
              {step === 'cart' ? (
                <div className="p-6 space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                      <div className="w-20 h-20 bg-brand-light/30 rounded-xl overflow-hidden shrink-0">
                        <img src={(item as any).image || 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&q=80'} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-serif text-brand-dark font-medium leading-tight">{item.name}</h3>
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors p-1 -mt-1 -mr-1">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-gray-200 rounded-full bg-white">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:text-brand-pink text-gray-500 transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-xs font-semibold">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:text-brand-pink text-gray-500 transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="font-serif font-bold text-brand-dark text-sm">
                            {(item.price * item.quantity).toFixed(2)} €
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <form id="checkout-form" onSubmit={handleSubmit} className="p-6 space-y-5">
                  
                  {/* INFORMATIVNI BANER ZA INOSTRANE NARUDŽBINE */}
                  <div className="bg-brand-pink/10 border border-brand-pink/20 rounded-2xl p-4 flex gap-3 items-start">
                    <Globe className="w-5 h-5 text-brand-pink shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider mb-1">
                        Poručujete iz inostranstva?
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Dobrodošli! Možete unijeti bilo koji inostrani broj telefona (sa prefiksom npr. <span className="font-mono font-medium text-brand-dark">+49, +1, +43, +381...</span>) i platiti bilo kojom Visa ili Mastercard karticom.
                      </p>
                    </div>
                  </div>

                  {/* 1. PODACI O NARUČIOCU */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">
                      1. Vaši podaci (Naručilac)
                    </h4>

                    {/* Ime i prezime naručioca */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Vaše Ime i Prezime *
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="npr. Marko Marković"
                        value={formData.ordererName}
                        onChange={(e) => setFormData({...formData, ordererName: e.target.value})}
                        className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-pink bg-white shadow-sm transition-colors"
                      />
                      <span className="text-[10px] text-gray-400 mt-1 block">Unesite Vaše puno ime i prezime</span>
                    </div>

                    {/* Telefon naručioca */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Vaš Broj Telefona (Viber / WhatsApp) *
                      </label>
                      <input 
                        type="tel" 
                        required
                        placeholder="npr. +382 69 123 456 ili +49 170 1234567"
                        value={formData.ordererPhone}
                        onChange={(e) => setFormData({...formData, ordererPhone: e.target.value})}
                        className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-pink bg-white shadow-sm transition-colors"
                      />
                      <span className="text-[10px] text-brand-pink/90 font-medium mt-1 block">
                        ✨ Može bilo koji inostrani ili domaći broj. Obavezno stavite pozivni (npr. +49, +43, +381...)
                      </span>
                    </div>

                    {/* Email naručioca */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Vaša Email Adresa *
                      </label>
                      <input 
                        type="email" 
                        required
                        placeholder="npr. marko@gmail.com"
                        value={formData.ordererEmail}
                        onChange={(e) => setFormData({...formData, ordererEmail: e.target.value})}
                        className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-pink bg-white shadow-sm transition-colors"
                      />
                      <span className="text-[10px] text-gray-400 mt-1 block">Na ovu adresu stiže potvrda i račun</span>
                    </div>
                  </div>

                  {/* 2. PODACI O PRIMAOCU */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">
                      2. Kome se dostavlja? (Primalac)
                    </h4>

                    {/* Ime i prezime primaoca */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Ime i Prezime Primaoca *
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="npr. Jelena Jovanović"
                        value={formData.recipientName}
                        onChange={(e) => setFormData({...formData, recipientName: e.target.value})}
                        className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-pink bg-white shadow-sm transition-colors"
                      />
                      <span className="text-[10px] text-gray-400 mt-1 block">Ime osobe kojoj kurir uručuje cvijeće</span>
                    </div>

                    {/* Telefon primaoca */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Broj Telefona Primaoca *
                      </label>
                      <input 
                        type="tel" 
                        required
                        placeholder="npr. 067 123 456 ili +382 67 123 456"
                        value={formData.recipientPhone}
                        onChange={(e) => setFormData({...formData, recipientPhone: e.target.value})}
                        className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-pink bg-white shadow-sm transition-colors"
                      />
                      <span className="text-[10px] text-gray-400 mt-1 block">Broj koji kurir poziva prije dolaska</span>
                    </div>

                    {/* Adresa dostave */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Ulica i Kućni Broj *
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder="npr. Bulevar Svetog Petra Cetinjskog 12, ulaz 2, stan 5"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-pink bg-white shadow-sm transition-colors"
                      />
                      <span className="text-[10px] text-gray-400 mt-1 block">Tačna adresa, ulaz, sprat ili naziv firme/bolnice</span>
                    </div>

                    {/* Grad */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Grad Isporuke *
                      </label>
                      <select 
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-pink bg-white shadow-sm transition-colors"
                      >
                        <option value="Podgorica">Podgorica</option>
                        <option value="Bijelo Polje">Bijelo Polje</option>
                        <option value="Nikšić">Nikšić</option>
                        <option value="Bar">Bar</option>
                        <option value="Budva">Budva</option>
                        <option value="Kotor">Kotor</option>
                        <option value="Herceg Novi">Herceg Novi</option>
                        <option value="Tivat">Tivat</option>
                        <option value="Cetinje">Cetinje</option>
                        <option value="Ulcinj">Ulcinj</option>
                        <option value="Berane">Berane</option>
                        <option value="Pljevlja">Pljevlja</option>
                        <option value="Rožaje">Rožaje</option>
                        <option value="Danilovgrad">Danilovgrad</option>
                        <option value="Mojkovac">Mojkovac</option>
                        <option value="Kolašin">Kolašin</option>
                        <option value="Plav">Plav</option>
                        <option value="Gusinje">Gusinje</option>
                        <option value="Petnjica">Petnjica</option>
                        <option value="Žabljak">Žabljak</option>
                        <option value="Tuzi">Tuzi</option>
                        <option value="Zeta">Zeta</option>
                      </select>
                      <span className="text-[10px] text-gray-400 mt-1 block">Izaberite grad u Crnoj Gori u koji dostavljamo</span>
                    </div>

                    {/* Datum dostave */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Željeni Datum Dostave
                      </label>
                      <input 
                        type="date" 
                        min={minDateString}
                        value={formData.deliveryDate}
                        onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})}
                        className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-pink bg-white shadow-sm transition-colors"
                      />
                      <span className="text-[10px] text-gray-400 mt-1 block">Opciono: izaberite datum (najranije od sjutra)</span>
                    </div>

                    {/* Posveta / Poruka */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Tekst Posvete uz Buket (Kartica)
                      </label>
                      <textarea 
                        rows={3}
                        placeholder="Napišite posvetu koja će biti ručno ispisana na ukrasnoj kartici..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full text-sm px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-pink bg-white shadow-sm resize-none transition-colors"
                      />
                      <span className="text-[10px] text-gray-400 mt-1 block">Opciono: besplatna čestitka ide uz svaki aranžman</span>
                    </div>
                  </div>

                  {/* 3. NAČIN PLAĆANJA */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">
                      3. Način plaćanja
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {/* Kartica */}
                      <label className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'karticom' ? 'border-brand-pink bg-brand-pink/5 text-brand-dark' : 'border-gray-200 hover:border-gray-300 text-gray-500'}`}>
                        <input 
                          type="radio" 
                          name="paymentMethod" 
                          value="karticom" 
                          checked={paymentMethod === 'karticom'} 
                          onChange={() => setPaymentMethod('karticom')} 
                          className="sr-only" 
                        />
                        <CreditCard className={`w-5 h-5 mb-1.5 ${paymentMethod === 'karticom' ? 'text-brand-pink' : 'text-gray-400'}`} />
                        <span className="text-xs font-bold text-center">Platna kartica</span>
                        <span className="text-[10px] text-gray-400 text-center mt-0.5">Finrelay (Visa / Master)</span>
                      </label>

                      {/* Pouzećem */}
                      <label className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'pouzecem' ? 'border-brand-pink bg-brand-pink/5 text-brand-dark' : 'border-gray-200 hover:border-gray-300 text-gray-500'}`}>
                        <input 
                          type="radio" 
                          name="paymentMethod" 
                          value="pouzecem" 
                          checked={paymentMethod === 'pouzecem'} 
                          onChange={() => setPaymentMethod('pouzecem')} 
                          className="sr-only" 
                        />
                        <Truck className={`w-5 h-5 mb-1.5 ${paymentMethod === 'pouzecem' ? 'text-brand-pink' : 'text-gray-400'}`} />
                        <span className="text-xs font-bold text-center">Gotovina / Pouzećem</span>
                        <span className="text-[10px] text-gray-400 text-center mt-0.5">Plaćanje kuriru</span>
                      </label>
                    </div>
                  </div>

                  {/* USLOVI */}
                  <label className="flex items-start gap-3 cursor-pointer group mt-4">
                    <div className="relative flex items-center justify-center mt-0.5">
                      <input 
                        type="checkbox" 
                        required
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="peer sr-only"
                      />
                      <div className="w-5 h-5 border-2 border-gray-300 rounded transition-all peer-checked:bg-brand-pink peer-checked:border-brand-pink"></div>
                      <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-700 transition-colors">
                      Pročitao/la sam i prihvatam da povraćaj za cvijeće od 14 dana ne važi jer je proizvod koji se lako kvari.
                    </span>
                  </label>

                </form>
              )}
            </>
          )}
        </div>

        {cart.length > 0 && !orderSuccess && (
          <div className="border-t border-gray-100 p-6 bg-white shrink-0">
            <div className="flex justify-between items-end mb-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Ukupno</span>
              <span className="text-2xl font-serif font-bold text-brand-dark">{totalPrice.toFixed(2)} €</span>
            </div>

            {step === 'cart' ? (
              <button 
                onClick={() => setStep('checkout')} 
                className="w-full bg-brand-dark text-white py-4 rounded-full font-bold tracking-wide hover:bg-brand-pink transition-all shadow-lg shadow-brand-dark/20 flex justify-center items-center gap-2"
              >
                NASTAVI NA PLAĆANJE
              </button>
            ) : (
              <div className="space-y-3">
                {/* FINRELAY OBAVJEŠTENJE DA SE SAČEKA UČITAVANJE */}
                {paymentMethod === 'karticom' && (
                  <div className="bg-amber-500/10 border border-amber-500/25 rounded-xl p-3 text-left">
                    <div className="flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-[11px] text-amber-950 leading-relaxed">
                        <strong className="font-semibold text-amber-900">Napomena za Finrelay:</strong> Nakon klika na dugme, <strong>molimo sačekajte par sekundi</strong> dok se sistem poveže sa bankom i otvori formu za plaćanje karticom.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button 
                    type="button" 
                    disabled={isLoading}
                    onClick={() => setStep('cart')} 
                    className="px-6 py-4 rounded-full border border-gray-200 text-gray-600 font-bold text-sm tracking-wide hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    NAZAD
                  </button>
                  <button 
                    type="submit" 
                    form="checkout-form" 
                    disabled={
                      isLoading ||
                      !formData.ordererName ||
                      !formData.ordererPhone ||
                      !formData.ordererEmail ||
                      !formData.recipientName ||
                      !formData.recipientPhone ||
                      !formData.address ||
                      !formData.city ||
                      !termsAccepted
                    }
                    className="flex-1 bg-brand-dark text-white py-4 rounded-full font-bold text-sm tracking-wide hover:bg-brand-pink transition-all shadow-lg shadow-brand-dark/20 text-center flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Učitavanje Finrelay-a...</span>
                      </>
                    ) : (
                      <span>{paymentMethod === 'karticom' ? 'POTVRDI I PLATI (FINRELAY)' : 'POTVRDI NARUDŽBU'}</span>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
