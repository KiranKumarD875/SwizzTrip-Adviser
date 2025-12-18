document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector(".login-box form");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Simulate a successful login (replace with your actual authentication logic)
        const email = loginForm.email.value;
        const password = loginForm.password.value;
 
        if (email && password) {
            // Display notification
            alert("Logged in successfully");

            // Redirect to accommodation page after alert
            window.location.href = "accomodation.html";
        } else {
            // Display error message if needed
            alert("Please enter both email and password.");
        }
    });
});
