document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items");

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  fetch("data/db.json")
    .then(response => response.json())
    .then(data => {
      const cartItems = data.Products.filter(product => cart.includes(product.id));

      cartItems.forEach(car => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td><img src="${car.image}" alt="${car.name}" style="width: 50px;"></td>
          <td>${car.name}</td>
          <td>$${car.price}</td>
          <td><button class="btn btn-danger btn-sm" onclick="removeFromCart(${car.id})">Remove</button></td>
        `;

        container.appendChild(row);
      });

      // Update the total price
      const total = cartItems.reduce((sum, car) => sum + car.price, 0);
      document.getElementById("cart-total").textContent = `$${total}`;
    });
});

function removeFromCart(carId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(id => id !== carId);
  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Item removed from the cart.");
  
  // Reload the page to reflect changes
  window.location.reload();
}
