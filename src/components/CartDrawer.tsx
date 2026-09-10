import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, totalPrice, isCartOpen, setIsCartOpen, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'pouzecem' | 'karticom'>('karticom');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: 'Podgorica',
    phone: '',
    email: '',
    postalCode: '',
    deliveryDate: ''
  });

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
              name: formData.name,
              address: formData.address,
              city: formData.city,
              phone: formData.phone,
              email: formData.email,
              postalCode: formData.postalCode || '81000'
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
    message += `*Podaci za dostavu:*\n`;
    message += `Ime i prezime: ${formData.name}\n`;
    message += `Adresa: ${formData.address}\n`;
    message += `Grad: ${formData.city}\n`;
    message += `Telefon: +382 ${formData.phone}\n`;
    if (formData.deliveryDate) {
      message += `Datum isporuke: ${formData.deliveryDate}\n`;
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

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={() => setIsCartOpen(false)} />
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white p-6 shadow-xl flex flex-col">
          <div className="flex items-center justify-between pb-4 border-b">
            <h2 className="text-lg font-bold">Tvoja Korpa</h2>
            <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-black">Zatvori</button>
          </div>
          
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {cart.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Korpa je prazna</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.price} € x {item.quantity}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-sm">Ukloni</button>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <form id="checkout-form" onSubmit={handleSubmit} className="border-t pt-4 space-y-3">
              <input
                type="text"
                placeholder="Ime i prezime"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-2 border rounded text-sm"
              />
              <input
                type="text"
                placeholder="Adresa"
                required
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full p-2 border rounded text-sm"
              />
              <input
                type="text"
                placeholder="Grad"
                required
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                className="w-full p-2 border rounded text-sm"
              />
              <input
                type="text"
                placeholder="Telefon"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full p-2 border rounded text-sm"
              />

              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'karticom'}
                    onChange={() => setPaymentMethod('karticom')}
                  />
                  Karticom
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'pouzecem'}
                    onChange={() => setPaymentMethod('pouzecem')}
                  />
                  Pouzećem
                </label>
              </div>

              <div className="flex justify-between font-bold pt-2">
                <span>Ukupno:</span>
                <span>{totalPrice.toFixed(2)} €</span>
              </div>

              <button
                type="submit"
                form="checkout-form"
                className="w-full bg-black text-white py-3 rounded font-bold hover:bg-gray-800 transition"
              >
                Potvrdi narudžbu
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
