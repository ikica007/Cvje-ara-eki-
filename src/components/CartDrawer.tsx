const [isLoading, setIsLoading] = useState(false);

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

        // Preusmjeravanje kupca na FinRelay HPP stranicu za unos kartice
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
