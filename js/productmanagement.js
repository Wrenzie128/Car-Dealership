 // Mock data for product list
 const products = [
    { id: 1, name: 'Tesla Model S', price: 79999, category: 'Electric', description: 'A luxury electric sedan.' },
    { id: 2, name: 'Ford Mustang', price: 55999, category: 'Sports', description: 'Classic American muscle car.' }
];

// Load products into the table
function loadProducts() {
    const tableBody = document.querySelector('#productTable tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td>${product.category}</td>
            <td>
                <button class="btn btn-warning" onclick="editProduct(${product.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Call the function to load products when the page loads
loadProducts();

// Add New Product
document.getElementById('saveProduct').addEventListener('click', () => {
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productCategory = document.getElementById('productCategory').value;
    const productDescription = document.getElementById('productDescription').value;

    const newProduct = {
        id: products.length + 1, // Generate a new id (just for demo purposes)
        name: productName,
        price: parseFloat(productPrice),
        category: productCategory,
        description: productDescription
    };

    products.push(newProduct); // Add new product to the list
    loadProducts(); // Reload the product table
    $('#addProductModal').modal('hide'); // Close the modal
});

// Edit Product (just a demo)
function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    alert(`Editing product: ${product.name}`);
}

// Delete Product with confirmation
function deleteProduct(productId) {
    const confirmed = confirm('Are you sure you want to delete this product?');
    if (confirmed) {
        const productIndex = products.findIndex(p => p.id === productId);
        products.splice(productIndex, 1); // Remove product from the list
        loadProducts(); // Reload the product table
    }
}