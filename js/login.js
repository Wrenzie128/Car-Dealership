document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const usernameField = document.getElementById("username");
  const passwordField = document.getElementById("password");
  const successMessage = document.getElementById("success-message");
  const errorMessage = document.getElementById("error-message");
  const warningMessage = document.getElementById("warning-message");

  // Handles the form submission
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = usernameField.value.trim();
    const password = passwordField.value.trim();

    // Clear previous messages
    clearMessages();

    // Check if the form fields are empty
    if (!username || !password) {
      showMessage(warningMessage);
    } else {
      validateCredentials(username, password);
    }
  });

  // Clears all the notification messages
  function clearMessages() {
    successMessage.style.display = "none";
    errorMessage.style.display = "none";
    warningMessage.style.display = "none";
  }

  // Displays the appropriate message
  function showMessage(messageElement) {
    messageElement.style.display = "block";
  }

  // Validates the login credentials
  function validateCredentials(username, password) {
    const validUser = username === "admin" && password === "password"; // Replace with actual validation

    if (validUser) {
      handleSuccessfulLogin();
    } else {
      handleFailedLogin();
    }
  }

  // Handles a successful login
  function handleSuccessfulLogin() {
    showMessage(successMessage);
    usernameField.value = "";
    passwordField.value = "";

    setTimeout(() => {
      window.location.href = "admin.html"; // Redirect to admin page after 2 seconds
    }, 2000); // Wait 2 seconds before redirecting
  }

  // Handles a failed login attempt
  function handleFailedLogin() {
    showMessage(errorMessage);
    passwordField.value = ""; // Clear password field after a failed attempt
  }
});
