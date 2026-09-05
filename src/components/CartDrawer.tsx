import React, { useState } from 'react';
import { useCart } from '../CartContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<'pouzecem' | 'karticom'>('pouzecem');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    phone: '',
    deliveryDate: '',
    note: ''
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. AKO JE IZABRANO PLAĆANJE KARTICOM (FINRELAY)
    if (paymentMethod === 'karticom') {
      setIsLoading(true);
      try {
        const response = await fetch('/api/create-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: totalPrice,
            customer: formData,
            items: cart,
          }),
        });

        const data = await response.json();

        if (data.redirectUrl || data.url || data.paymentUrl) {
          window.location.href = data.redirectUrl || data.url || data.paymentUrl;
        } else {
          alert('Greška pri kreiranju sesije za plaćanje: ' + (data.error || 'Pokušajte ponovo.'));
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Greška pri konekciji sa payment serverom:', error);
        alert('Problem sa konekcijom. Pokušajte ponovo.');
        setIsLoading(false);
      }
      return;
    }

    // 2. AKO JE IZABRANO PLAĆANJE POUZEĆEM (WHATSAPP)
    let message = `Nova narudžba!\n\n`;
    message += `*Podaci za dostavu:*\n`;
    message += `Ime i prezime: ${formData.name}\n`;
    message += `Adresa: ${formData.address}\n`;
    message += `Grad: ${formData.city}\n`;
    message += `Telefon: ${formData.phone}\n`;
    if (formData.deliveryDate) {
      message += `Datum isporuke: ${formData.deliveryDate}\n`;
    }
    if (formData.note) {
      message += `Napomena: ${formData.note}\n`;
    }
    message += `\n`;
    
    message += `*Stavke narudžbe:*\n`;
    cart.forEach(item => {
      message += `${item.quantity}x ${item.name} - ${(item.price * item.quantity).toFixed(2)} €\n`;
    });
    
    message += `\n*Ukupno za naplatu:* ${totalPrice.toFixed(2)} € (Plaćanje pouzećem)\n`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/38269108055?text=${encodedMessage}`, '_blank');
    
    setOrderSuccess(true);
    clearCart();
  };

  const handleReset = () => {
    setOrderSuccess(false);
    setStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-stone-50/50">
            <h2 className="text-lg font-serif font-medium text-stone-800">
              {orderSuccess ? 'Uspješno' : step === 'cart' ? 'Vaša korpa' : 'Podaci za dostavu'}
            </h2>
            <button 
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-600 rounded-full hover:bg-stone-100 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6">
            {orderSuccess ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-serif text-stone-800">Hvala na narudžbi!</h3>
                <p className="text-stone-600 text-sm max-w-xs mx-auto">
                  Vaša narudžba je poslata. Uskoro ćemo vas kontaktirati radi potvrde.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-6 px-6 py-2.5 bg-emerald-800 text-white rounded-full text-sm hover:bg-emerald-900 transition-colors"
                >
                  Zatvori
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <p className="text-stone-500 font-serif">Vaša korpa je prazna</p>
              </div>
            ) : step === 'cart' ? (
              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex space-x-4 py-4 border-b border-stone-100 last:border-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-20 h-20 object-cover rounded-lg bg-stone-100"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-serif text-stone-800 text-sm">{item.name}</h4>
                        <p className="text-emerald-800 text-sm font-medium mt-1">{item.price.toFixed(2)} €</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-stone-200 rounded-lg">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2.5 py-1 text-stone-500 hover:text-stone-800 text-xs"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-medium text-stone-700">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2.5 py-1 text-stone-500 hover:text-stone-800 text-xs"
                          >
                            +
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-red-500 transition-colors text-xs p-1"
                        >
                          Ukloni
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Ime i prezime *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-emerald-800"
                    placeholder="Petar Petrović"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Adresa *</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-emerald-800"
                    placeholder="Ulica i broj"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-1">Grad *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-emerald-800"
                      placeholder="Podgorica"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-1">Telefon *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-emerald-800"
                      placeholder="069 000 000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">Željeni datum dostave</label>
                  <input
                    type="date"
                    name="deliveryDate"
                    value={formData.deliveryDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-emerald-800"
                  />
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-medium text-stone-600 mb-2">Način plaćanja</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('pouzecem')}
                      className={`p-3 text-xs border rounded-lg font-medium text-center transition-all ${
                        paymentMethod === 'pouzecem'
                          ? 'border-emerald-800 bg-emerald-50 text-emerald-900'
                          : 'border-stone-200 text-stone-600 hover:border-stone-300'
                      }`}
                    >
                      Plaćanje pouzećem
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('karticom')}
                      className={`p-3 text-xs border rounded-lg font-medium text-center transition-all ${
                        paymentMethod === 'karticom'
                          ? 'border-emerald-800 bg-emerald-50 text-emerald-900'
                          : 'border-stone-200 text-stone-600 hover:border-stone-300'
                      }`}
                    >
                      Plaćanje karticom
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && !orderSuccess && (
            <div className="p-6 border-t border-stone-100 bg-stone-50/50 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-stone-600">Ukupno:</span>
                <span className="text-lg font-serif font-bold text-stone-800">{totalPrice.toFixed(2)} €</span>
              </div>

              {step === 'cart' ? (
                <button
                  onClick={() => setStep('checkout')}
                  className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-full font-medium text-sm flex items-center justify-center space-x-2 transition-colors"
                >
                  <span>Nastavi na kasu →</span>
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setStep('cart')}
                    className="w-1/3 py-3 border border-stone-200 hover:bg-stone-100 text-stone-700 rounded-full font-medium text-xs transition-colors"
                  >
                    Nazad
                  </button>
                  <button
                    type="submit"
                    form="checkout-form"
                    disabled={isLoading}
                    className="w-2/3 py-3 bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white rounded-full font-medium text-xs flex items-center justify-center space-x-1 transition-colors"
                  >
                    <span>{isLoading ? 'Obrada...' : 'Potvrdi narudžbu'}</span>
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
