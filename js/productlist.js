// productList.js

// Fetch product list from the db.json
async function fetchProducts() {
    const response = await fetch('data/db.json');
    const data = await response.json();
    return data.Products;
  }
  
  // Display products in grid layout
  async function displayProducts() {
    const products = await fetchProducts();
    const productListContainer = document.getElementById('product-list');
  
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('col-md-4', 'mb-4');
      productCard.innerHTML = `
        <div class="card">
          <img src="${product.image}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <p><strong>$${product.price}</strong></p>
            <a href="product.html?id=${product.id}" class="btn btn-primary">View Details</a>
          </div>
        </div>
      `;
      productListContainer.appendChild(productCard);
    });
  }
  
  // Call the function to display products when the page loads
  document.addEventListener('DOMContentLoaded', displayProducts);
  