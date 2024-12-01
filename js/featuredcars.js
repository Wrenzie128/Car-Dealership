document.addEventListener("DOMContentLoaded", () => {
  fetch("data/db.json")
    .then(response => response.json())
    .then(data => {
      const featuredCars = data.Products.filter(car => car.availability === "In Stock");
      const container = document.getElementById("featured-cars");
      
      featuredCars.forEach(car => {
        const card = document.createElement("div");
        card.classList.add("col-md-4", "mb-4");

        card.innerHTML = `
          <div class="card">
            <img src="${car.images}" class="card-img-top" alt="${car.name}">
            <div class="card-body">
              <h5 class="card-title">${car.name}</h5>
              <p class="card-text">${car.description}</p>
              <a href="product.html?id=${car.id}" class="btn btn-primary">View Details</a>
            </div>
          </div>
        `;
        
        container.appendChild(card);
      });
    });
});
