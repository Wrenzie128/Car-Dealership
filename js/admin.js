// Check if the user has a role saved in localStorage
const userRole = localStorage.getItem('userRole');
if (!userRole) {
  // If no role is selected, redirect to the role selection page
  window.location.href = 'roleSelection.html';
}
