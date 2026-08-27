import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, Truck, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'pouzecem' | 'karticom'>('pouzecem');
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    city: '',
    deliveryDate: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format the order message
    let message = `Nova narudžba!\n\n`;
    message += `*Podaci za dostavu:*\n`;
    message += `Ime i prezime: ${formData.name}\n`;
    message += `Adresa: ${formData.address}\n`;
    message += `Grad: ${formData.city}\n`;
    message += `Telefon: ${formData.phone}\n`;
    if (formData.deliveryDate) {
      message += `Datum isporuke: ${formData.deliveryDate}\n`;
    }
    message += `\n`;
    
    message += `*Stavke narudžbe:*\n`;
    cart.forEach(item => {
      message += `${item.quantity}x ${item.name} - ${(item.price * item.quantity).toFixed(2)} €\n`;
    });
    
    const paymentText = paymentMethod === 'karticom' ? 'Plaćanje karticom' : 'Plaćanje pouzećem';
    message += `\n*Ukupno za naplatu:* ${totalPrice.toFixed(2)} € (${paymentText})\n`;
    
    // Encode the message for the URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with the pre-filled message
    window.open(`https://wa.me/38269108055?text=${encodedMessage}`, '_blank');
    
    // Show success state and clear cart
    setOrderSuccess(true);
    clearCart();
  };

  const closeDrawer = () => {
    setIsCartOpen(false);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderSuccess(false);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#F4EFE6] shadow-2xl z-[70] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-brand-beige/60 bg-white">
              <h2 className="serif text-2xl text-brand-dark font-medium">Tvoja Korpa</h2>
              <button 
                onClick={closeDrawer}
                className="text-brand-dark/50 hover:text-brand-pink transition-colors p-2 hover:bg-brand-pink/10 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 scrollbar-none">
              {orderSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-brand-teal/20 text-brand-teal rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="serif text-2xl text-brand-dark mb-3">Hvala na povjerenju!</h3>
                  <p className="text-brand-dark/70 text-sm max-w-[250px] mb-8 font-serif font-light">
                    Tvoja narudžba je preusmjerena na WhatsApp gdje ćemo dogovoriti sve detalje oko dostave.
                  </p>
                  <button 
                    onClick={closeDrawer}
                    className="mt-8 bg-brand-dark text-white px-8 py-3 rounded-full hover:bg-brand-pink transition-colors uppercase tracking-widest text-xs font-bold"
                  >
                    Zatvori
                  </button>
                </div>
              ) : cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-brand-dark/50">
                  <ShoppingBag className="w-12 h-12 mb-4 opacity-20" />
                  <p className="uppercase tracking-[0.2em] text-sm font-bold">Korpa je prazna</p>
                </div>
              ) : isCheckingOut ? (
                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="uppercase tracking-widest text-xs font-bold text-brand-dark/70 mb-6">Podaci za dostavu</h3>
                  
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-dark mb-1">Ime i prezime</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full border border-brand-beige rounded-lg px-4 py-2.5 focus:outline-none focus:border-brand-pink bg-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-dark mb-1">Adresa isporuke</label>
                    <input 
                      required
                      type="text" 
                      value={formData.address}
                      onChange={e => setFormData({...formData, address: e.target.value})}
                      className="w-full border border-brand-beige rounded-lg px-4 py-2.5 focus:outline-none focus:border-brand-pink bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-brand-dark mb-1">Grad</label>
                      <input 
                        required
                        type="text" 
                        value={formData.city}
                        onChange={e => setFormData({...formData, city: e.target.value})}
                        className="w-full border border-brand-beige rounded-lg px-4 py-2.5 focus:outline-none focus:border-brand-pink bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-brand-dark mb-1">Telefon</label>
                      <input 
                        required
                        type="tel" 
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        className="w-full border border-brand-beige rounded-lg px-4 py-2.5 focus:outline-none focus:border-brand-pink bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-brand-dark mb-1">Datum isporuke (Opciono)</label>
                    <input 
                      type="date" 
                      value={formData.deliveryDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={e => setFormData({...formData, deliveryDate: e.target.value})}
                      className="w-full border border-brand-beige rounded-lg px-4 py-2.5 focus:outline-none focus:border-brand-pink bg-white"
                    />
                  </div>

                  <div className="mt-6 space-y-3">
                    <label className="block text-xs uppercase tracking-widest text-brand-dark mb-2">Način plaćanja</label>
                    
                    {/* Opcija 1: Pouzećem */}
                    <label 
                      className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                        paymentMethod === 'pouzecem' 
                          ? 'border-brand-pink bg-[#F4EFE6]' 
                          : 'border-brand-beige/60 bg-white hover:border-brand-pink/50'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="pouzecem"
                        checked={paymentMethod === 'pouzecem'}
                        onChange={() => setPaymentMethod('pouzecem')}
                        className="mt-0.5 w-4 h-4 text-brand-pink accent-brand-pink"
                      />
                      <div>
                        <div className="flex items-center gap-2 text-brand-dark mb-1">
                          <Truck className="w-4 h-4 text-brand-teal" />
                          <span className="font-semibold text-sm uppercase tracking-widest">Plaćanje pouzećem</span>
                        </div>
                        <p className="text-xs text-brand-dark/70">
                          Iznos od {totalPrice.toFixed(2)} € plaćate gotovinom kuriru prilikom preuzimanja pošiljke. <strong>Cijena dostave je uračunata.</strong>
                        </p>
                      </div>
                    </label>

                    {/* Opcija 2: Karticom */}
                    <label 
                      className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                        paymentMethod === 'karticom' 
                          ? 'border-brand-pink bg-[#F4EFE6]' 
                          : 'border-brand-beige/60 bg-white hover:border-brand-pink/50'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="karticom"
                        checked={paymentMethod === 'karticom'}
                        onChange={() => setPaymentMethod('karticom')}
                        className="mt-0.5 w-4 h-4 text-brand-pink accent-brand-pink"
                      />
                      <div>
                        <div className="flex items-center gap-2 text-brand-dark mb-1">
                          <CreditCard className="w-4 h-4 text-brand-teal" />
                          <span className="font-semibold text-sm uppercase tracking-widest">Plaćanje karticom</span>
                        </div>
                        <p className="text-xs text-brand-dark/70">
                          Plaćanje platnom karticom na sajtu. (Nakon potvrde bićete preusmjereni na sigurno plaćanje)
                        </p>
                      </div>
                    </label>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 bg-white p-3 rounded-2xl border border-brand-beige/40">
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#F4EFE6]">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 py-1">
                        <h4 className="font-serif font-medium text-brand-dark leading-tight">{item.name}</h4>
                        <p className="text-brand-pink font-semibold mt-1">{item.price.toFixed(2)} €</p>
                        
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-3 bg-[#F4EFE6] rounded-full px-2 py-1">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-brand-dark/70 hover:text-brand-dark"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-semibold w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-brand-dark/70 hover:text-brand-dark"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-brand-dark/40 hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {!orderSuccess && cart.length > 0 && (
              <div className="border-t border-brand-beige/60 p-6 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-brand-dark/70 uppercase tracking-widest text-xs font-bold">Ukupno</span>
                  <span className="serif text-2xl font-semibold text-brand-dark">{totalPrice.toFixed(2)} €</span>
                </div>
                
                {isCheckingOut ? (
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setIsCheckingOut(false)}
                      className="px-6 py-3.5 rounded-full border border-brand-beige text-brand-dark hover:bg-brand-beige/30 transition-colors uppercase tracking-widest text-xs font-bold w-1/3"
                    >
                      Nazad
                    </button>
                    <button 
                      type="submit"
                      form="checkout-form"
                      className="flex-1 bg-brand-dark text-white py-3.5 rounded-full hover:bg-brand-pink transition-colors uppercase tracking-widest text-xs font-bold shadow-lg"
                    >
                      Potvrdi narudžbu
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setIsCheckingOut(true)}
                    className="w-full bg-brand-dark text-white py-4 rounded-full hover:bg-brand-pink transition-colors uppercase tracking-widest text-xs font-bold shadow-lg"
                  >
                    Nastavi na plaćanje
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
