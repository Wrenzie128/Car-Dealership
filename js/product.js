$(document).ready(function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const productId = urlParams.get("id");

  // Fetch products from the db.json file
  fetch("data/db.json")
    .then((response) => response.json())
    .then((data) => {
      const product = data.Products.find((p) => p.id == productId);

      if (product) {
        const productDetailsHtml = `
          <div class="row">
            <div class="col-md-6">
              <img src="${product.image}" class="img-fluid" alt="${product.name}">
            </div>
            <div class="col-md-6">
              <h2>${product.name}</h2>
              <p>${product.description}</p>
              <p><strong>Price: $${product.price}</strong></p>
              <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
              <button class="btn btn-info" id="view-specs-btn">View Specs</button>
              <div id="product-specs" style="display: none;">
                <h3>Specifications</h3>
                <ul>
                  ${Object.entries(product.specs).map(([key, value]) => {
                    return `<li><strong>${key.replace(/_/g, ' ')}:</strong> ${value}</li>`;
                  }).join('')}
                </ul>
              </div>
            </div>
          </div>
        `;
        $("#product-details").html(productDetailsHtml);

        // Toggle visibility of specs when button is clicked
        $("#view-specs-btn").click(function () {
          $("#product-specs").toggle();
        });
      } else {
        $("#product-details").html("<p>Product not found.</p>");
      }
    })
    .catch((error) => {
      console.error("Error fetching product data:", error);
      $("#product-details").html("<p>Failed to load product details.</p>");
    });
});

function addToCart(productId) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const isProductInCart = cart.some((id) => id === productId);

  if (!isProductInCart) {
    cart.push(productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
  } else {
    alert("Product is already in the cart!");
  }
}
