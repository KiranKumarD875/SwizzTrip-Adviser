document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("swizz_token");
    const userStr = localStorage.getItem("swizz_user");
    
    if (token && userStr) {
        const user = JSON.parse(userStr);
        const firstName = user.name ? user.name.split(' ')[0] : 'User';
        
        // Handle navbar login link (e.g., in index.html)
        const navLogin = document.getElementById("nav-login-btn");
        if (navLogin) {
            navLogin.innerHTML = `Logout (${firstName})`;
            navLogin.href = "#";
            navLogin.onclick = (e) => {
                e.preventDefault();
                localStorage.removeItem("swizz_token");
                localStorage.removeItem("swizz_user");
                window.location.reload();
            };
        }

        // Handle hero signin button (e.g., in accomodation.html)
        const heroLogin = document.getElementById("hero-login-btn");
        if (heroLogin) {
            heroLogin.innerHTML = `Welcome, ${firstName}`;
            heroLogin.href = "javascript:void(0)";
            // When clicked while logged in, scroll to the hotels section
            heroLogin.onclick = (e) => {
                e.preventDefault();
                const mainSection = document.getElementById("main-section");
                if (mainSection) {
                    mainSection.scrollIntoView({ behavior: 'smooth' });
                }
            };
        }
    }
});
