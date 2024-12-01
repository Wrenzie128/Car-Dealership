document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("search-form");
  const searchBox = document.getElementById("search-box");

  if (searchForm) {
    searchForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const query = searchBox.value.trim().toLowerCase();

      if (query) {
        try {
          // Fetch products from db.json
          const response = await fetch("data/db.json");
          if (!response.ok) {
            throw new Error("Failed to fetch product data");
          }
          const data = await response.json();
          const products = data.Products;

          // Find the product matching the search query
          const product = products.find((p) =>
            p.name.toLowerCase().includes(query)
          );

          if (product) {
            // Redirect to the product page with the product's ID as a parameter
            window.location.href = `product.html?id=${product.id}`;
          } else {
            alert("No products match your search.");
          }
        } catch (error) {
          console.error("Error fetching product data:", error);
          alert("There was an error processing your search. Please try again.");
        }
      } else {
        alert("Please enter a search query.");
      }
    });
  }
});
