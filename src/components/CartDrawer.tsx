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
              phone: formData.phone
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
        
        // Claude-ov kod izbacuje 'redirectUrl' kao tačnu varijablu
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
