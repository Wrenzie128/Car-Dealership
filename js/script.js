// Fetch products from db.json
async function fetchProducts() {
  const response = await fetch('data/db.json'); // Adjusted path
  const data = await response.json();
  return data.Products;
}

// Render products on the homepage or product list page
async function displayProducts() {
  const products = await fetchProducts();
  const productContainer = document.getElementById('product-list');
  if (!productContainer) return;

  productContainer.innerHTML = ''; // Clear any previous content
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card', 'col-md-4', 'mb-4');
    productCard.innerHTML = `
      <div class="card h-100">
        <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 200px;">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text text-muted">${product.description}</p>
          <p class="text-primary mb-4"><strong>$${product.price}</strong></p>
          <div class="mt-auto">
            <a href="product.html?id=${product.id}" class="btn btn-info mb-2">View Details</a>
            <button class="btn btn-success add-to-cart" data-id="${product.id}">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
    productContainer.appendChild(productCard);
  });
}

// Add product to the cart
function addToCart(productId) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Check if the product is already in the cart
  const existingProduct = cart.find(item => item.product_id === productId);
  if (existingProduct) {
      existingProduct.quantity += 1;  // Increase quantity
  } else {
      cart.push({ product_id: productId, quantity: 1 });  // Add new product
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();  // Update cart count in the UI
  alert('Product added to the cart!');
}

// Update the cart item count in the header
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = document.getElementById('cart-count');
  if (cartCount) cartCount.textContent = cart.length;
}

// Initialize the script
document.addEventListener('DOMContentLoaded', () => {
  displayProducts();  // Populate product list
  updateCartCount();  // Update cart counter

  // Handle Add to Cart clicks
  document.body.addEventListener('click', event => {
      if (event.target.classList.contains('add-to-cart')) {
          const productId = parseInt(event.target.dataset.id);
          addToCart(productId);
      }
  });
});
