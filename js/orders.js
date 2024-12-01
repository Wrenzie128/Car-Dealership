 // Mock data for orders
 const orders = [
    { id: 1, customerName: 'John Doe', productName: 'Tesla Model S', totalPrice: 79999, status: 'Pending' },
    { id: 2, customerName: 'Jane Smith', productName: 'Ford Mustang', totalPrice: 55999, status: 'Shipped' }
];

// Load orders into the table
function loadOrders() {
    const tableBody = document.querySelector('#ordersTable tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.customerName}</td>
            <td>${order.productName}</td>
            <td>$${order.totalPrice}</td>
            <td>${order.status}</td>
            <td>
                <button class="btn btn-info" onclick="viewOrder(${order.id})">View</button>
                <button class="btn btn-warning" onclick="updateOrder(${order.id})">Update Status</button>
                <button class="btn btn-danger" onclick="deleteOrder(${order.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Call the function to load orders when the page loads
loadOrders();

// View Order Details (just a demo)
function viewOrder(orderId) {
    const order = orders.find(o => o.id === orderId);
    alert(`Viewing details for Order ID: ${order.id}`);
}

// Update Order Status
function updateOrder(orderId) {
    const order = orders.find(o => o.id === orderId);
    const newStatus = prompt('Enter new status for the order:', order.status);
    if (newStatus) {
        order.status = newStatus; // Update the status
        loadOrders(); // Reload the orders table
    }
}

// Delete Order with confirmation
function deleteOrder(orderId) {
    const confirmed = confirm('Are you sure you want to delete this order?');
    if (confirmed) {
        const orderIndex = orders.findIndex(o => o.id === orderId);
        orders.splice(orderIndex, 1); // Remove the order from the list
        loadOrders(); // Reload the orders table
    }
}