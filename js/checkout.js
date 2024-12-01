document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkoutForm = document.getElementById('checkout-form');
  
    if (cart.length === 0) {
      alert("Your cart is empty. Redirecting to the cart page.");
      window.location.href = 'cart.html';
      return;
    }
  
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const name = document.getElementById('name').value;
      const address = document.getElementById('address').value;
      const payment = document.getElementById('payment').value;
  
      if (name && address && payment) {
        alert(`Thank you, ${name}! Your order has been placed.`);
        
        // Clear cart
        localStorage.removeItem('cart');
        window.location.href = 'orderconfirmation.html'; // Redirect to a confirmation page
      } else {
        alert('Please fill in all the fields.');
      }
    });
  });
  