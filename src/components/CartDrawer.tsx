import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Minus, Plus, Trash2, Truck, CreditCard } from 'lucide-react';

export function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, totalPrice, isCartOpen, setIsCartOpen, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'pouzecem' | 'karticom'>('karticom');
  const [orderSuccess, setOrderSuccess] = useState(false);
  
  // Sva podijeljena polja (Naručilac i Primalac)
  const [formData, setFormData] = useState({
    ordererName: '',
    ordererPhone: '',
    ordererEmail: '',
    recipientName: '',
    address: '',
    city: 'Podgorica',
    message: '',
    deliveryDate: ''
  });

  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Izračunavanje sutrašnjeg datuma (za blokiranje istog dana)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateString = tomorrow.toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === 'karticom') {
      try {
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
        }
      } catch (error: any) {
        console.error("Payment error:", error);
        alert(`Greška: ${error.message}`);
      }
      return;
    }

    // --- LOGIKA ZA PLAĆANJE POUZEĆEM (WhatsApp) ---
    let message = `Nova narudžba!\n\n`;
    message += `*Podaci naručioca:*\n`;
    message += `Ime i prezime: ${formData.ordererName}\n`;
    message += `Telefon: +382 ${formData.ordererPhone}\n`;
    message += `Email: ${formData.ordererEmail}\n\n`;
    
    message += `*Podaci za dostavu:*\n`;
    message += `Primalac: ${formData.recipientName}\n`;
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
    setOrderSuccess(true);
    clearCart();
  };

  const handleClose = () => {
    setIsCartOpen(false);
    setTimeout(() => {
      setStep('cart');
      setOrderSuccess(false);
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
                          <span className="font-bold text-brand-pink">{item.price.toFixed(2)} €</span>
                          <div className="flex items-center gap-3 bg-gray-50 rounded-full px-2 py-1 border border-gray-100">
                            <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-brand-dark transition-colors">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-brand-dark transition-colors">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <form id="checkout-form" onSubmit={handleSubmit} className="p-6 space-y-6">
                  
                  {/* PODACI NARUČIOCA */}
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Podaci naručioca</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2 space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Ime i prezime</label>
                        <input type="text" required value={formData.ordererName} onChange={(e) => setFormData({...formData, ordererName: e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-pink/20 focus:border-brand-pink outline-none transition-all" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Telefon</label>
                        <div className="relative flex items-center">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 font-semibold text-sm">+382</span>
                          </div>
                          <input type="tel" required placeholder="6X XXX XXX" value={formData.ordererPhone} onChange={(e) => setFormData({...formData, ordererPhone: e.target.value.replace(/\D/g, '')})} className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-pink/20 focus:border-brand-pink outline-none transition-all" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Email</label>
                        <input type="email" required value={formData.ordererEmail} onChange={(e) => setFormData({...formData, ordererEmail: e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-pink/20 focus:border-brand-pink outline-none transition-all" />
                      </div>
                    </div>
                  </div>

                  {/* PODACI ISPORUKE */}
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2 pt-2">Podaci isporuke</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2 space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Ime i prezime primaoca</label>
                        <input type="text" required value={formData.recipientName} onChange={(e) => setFormData({...formData, recipientName: e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-pink/20 focus:border-brand-pink outline-none transition-all" />
                      </div>
                      <div className="col-span-2 space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Adresa isporuke</label>
                        <input type="text" required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-pink/20 focus:border-brand-pink outline-none transition-all" />
                      </div>
                      
                      {/* Flex grid za savršeno poravnanje (Grad i Datum) */}
                      <div className="flex flex-col justify-end h-full space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Grad</label>
                        <select required value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-pink/20 focus:border-brand-pink outline-none transition-all appearance-none cursor-pointer mt-auto">
                          <option value="Podgorica">Podgorica</option>
                          <option value="Bijelo Polje">Bijelo Polje</option>
                          <option value="Bar">Bar</option>
                          <option value="Budva">Budva</option>
                          <option value="Tivat">Tivat</option>
                          <option value="Kotor">Kotor</option>
                          <option value="Nikšić">Nikšić</option>
                          <option value="Berane">Berane</option>
                        </select>
                      </div>
                      <div className="flex flex-col justify-end h-full space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block leading-tight">Datum isporuke (Opciono)</label>
                        <input type="date" min={minDateString} value={formData.deliveryDate} onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-pink/20 focus:border-brand-pink outline-none transition-all text-gray-600 mt-auto" />
                      </div>
                      
                      {/* Napomena za datum */}
                      <div className="col-span-2">
                         <p className="text-[10px] text-brand-pink font-semibold italic text-right">* Isporuka nije moguća za isti dan (min. 24h)</p>
                      </div>

                      <div className="col-span-2 space-y-1.5 pt-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Poruka uz buket (Opciono)</label>
                        <textarea rows={2} placeholder="Npr. Srećan rođendan!" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-pink/20 focus:border-brand-pink outline-none transition-all resize-none" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-gray-100">
                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Način plaćanja</h3>
                    
                    <label className={`relative flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'pouzecem' ? 'border-brand-pink bg-brand-pink/5' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
                      <input type="radio" name="payment" value="pouzecem" checked={paymentMethod === 'pouzecem'} onChange={() => setPaymentMethod('pouzecem')} className="sr-only" />
                      <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${paymentMethod === 'pouzecem' ? 'border-brand-pink' : 'border-gray-300'}`}>
                        {paymentMethod === 'pouzecem' && <div className="w-2.5 h-2.5 bg-brand-pink rounded-full" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Truck className={`w-4 h-4 ${paymentMethod === 'pouzecem' ? 'text-brand-pink' : 'text-gray-400'}`} />
                          <span className="font-bold text-sm text-brand-dark">PLAĆANJE POUZEĆEM</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          Iznos od {totalPrice.toFixed(2)} € plaćate gotovinom kuriru prilikom preuzimanja pošiljke. <strong className="font-medium text-gray-700">Cijena dostave je uračunata.</strong>
                        </p>
                      </div>
                    </label>

                    <label className={`relative flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'karticom' ? 'border-brand-pink bg-brand-pink/5' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
                      <input type="radio" name="payment" value="karticom" checked={paymentMethod === 'karticom'} onChange={() => setPaymentMethod('karticom')} className="sr-only" />
                      <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${paymentMethod === 'karticom' ? 'border-brand-pink' : 'border-gray-300'}`}>
                        {paymentMethod === 'karticom' && <div className="w-2.5 h-2.5 bg-brand-pink rounded-full" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <CreditCard className={`w-4 h-4 ${paymentMethod === 'karticom' ? 'text-brand-pink' : 'text-gray-400'}`} />
                          <span className="font-bold text-sm text-brand-dark">PLAĆANJE KARTICOM</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          Plaćanje platnom karticom na sajtu. (Nakon potvrde bićete preusmjereni na sigurno plaćanje)
                        </p>
                      </div>
                    </label>
                  </div>

                  <label className="flex items-start gap-3 mt-6 cursor-pointer group">
                    <div className="relative flex items-center justify-center mt-0.5">
                      <input type="checkbox" required checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="peer sr-only" />
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
            <div className="flex justify-between items-end mb-6">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Ukupno</span>
              <span className="text-2xl font-serif font-bold text-brand-dark">{totalPrice.toFixed(2)} €</span>
            </div>
            
            {step === 'cart' ? (
              <button onClick={() => setStep('checkout')} className="w-full bg-brand-dark text-white py-4 rounded-full font-bold tracking-wide hover:bg-brand-pink transition-all shadow-lg shadow-brand-dark/20 flex justify-center items-center gap-2">
                NASTAVI NA PLAĆANJE
              </button>
            ) : (
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep('cart')} className="px-6 py-4 rounded-full border border-gray-200 text-gray-600 font-bold text-sm tracking-wide hover:bg-gray-50 transition-colors">
                  NAZAD
                </button>
                <button type="submit" form="checkout-form" className="flex-1 bg-brand-dark text-white py-4 rounded-full font-bold text-sm tracking-wide hover:bg-brand-pink transition-all shadow-lg shadow-brand-dark/20 text-center">
                  POTVRDI NARUDŽBU
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
