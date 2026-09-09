const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === 'karticom') {
      try {
        // Zovemo backend API koristeći POST metodu i šaljemo tačno ono što Claude-ov kod očekuje
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
              phone: formData.phone
            },
            items: cart.map(item => ({ name: item.name, quantity: item.quantity }))
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || data.greska || 'Greška prilikom kreiranja plaćanja');
        }
        
        // Tvoj API vraća 'redirectUrl', pa ga koristimo za preusmjeravanje
        if (data.redirectUrl) {
          window.location.href = data.redirectUrl;
        } else {
          console.error("Odgovor API-ja:", data);
          alert("Greška: Server nije vratio link za plaćanje.");
        }
      } catch (error: any) {
        console.error("Payment error:", error);
        alert(`Došlo je do greške prilikom pokretanja plaćanja: ${error.message}`);
      }
      return;
    }

    // --- LOGIKA ZA PLAĆANJE POUZEĆEM (WhatsApp) ---
    // Format the order message
    let message = `Nova narudžba!\n\n`;
    message += `*Podaci za dostavu:*\n`;
    message += `Ime i prezime: ${formData.name}\n`;
    message += `Adresa: ${formData.address}\n`;
    message += `Grad: ${formData.city}\n`;
    message += `Telefon: +382 ${formData.phone}\n`;
    if (formData.deliveryDate) {
      message += `Datum isporuke: ${formData.deliveryDate}\n`;
    }
    message += `\n`;
    
    message += `*Stavke narudžbe:*\n`;
    cart.forEach(item => {
      message += `${item.quantity}x ${item.name} - ${(item.price * item.quantity).toFixed(2)} €\n`;
    });
    
    message += `\n*Ukupno za naplatu:* ${totalPrice.toFixed(2)} € (Plaćanje pouzećem)\n`;
    
    // Encode the message for the URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with the pre-filled message
    window.open(`https://wa.me/38269108055?text=${encodedMessage}`, '_blank');
    
    // Show success state and clear cart
    setOrderSuccess(true);
    clearCart();
  };
