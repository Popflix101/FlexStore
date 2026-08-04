(function () {
    function getLoggedInUser() {
        try {
            const user = JSON.parse(localStorage.getItem("loggedInUser"));
            return user && typeof user === "object" ? user : null;
        } catch (error) {
            return null;
        }
    }

    function isAdminUser(user) {
        return Boolean(user) && (user.role === "admin" || user.email === "admin@flexstore.com");
    }

    function logoutUser() {
        localStorage.removeItem("loggedInUser");
        window.location.href = "login.html";
    }

    function updateNav() {
        const user = getLoggedInUser();
        const link = document.getElementById("auth-link");
        const logoutItem = document.getElementById("logout-item");

        if (!link) {
            return;
        }

        if (isAdminUser(user)) {
            link.innerHTML = '<i class="fa-solid fa-shield-halved"></i> Admin';
            link.setAttribute("href", "admin/dashboard.html");
            link.onclick = null;

            if (logoutItem) {
                logoutItem.classList.remove("d-none");
            }
            return;
        }

        if (user) {
            link.innerHTML = '<i class="fa-solid fa-user"></i> Account';
            link.setAttribute("href", "account.html");
            link.onclick = null;

            if (logoutItem) {
                logoutItem.classList.remove("d-none");
            }
            return;
        }

        link.innerHTML = '<i class="fa-solid fa-user"></i> Login';
        link.setAttribute("href", "login.html");
        link.onclick = null;

        if (logoutItem) {
            logoutItem.classList.add("d-none");
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        updateNav();

        const logoutLink = document.getElementById("logout-link");
        if (logoutLink) {
            logoutLink.addEventListener("click", function (event) {
                event.preventDefault();
                logoutUser();
            });
        }
    });

    document.addEventListener("DOMContentLoaded", updateNav);
    window.addEventListener("storage", updateNav);
    window.FlexStoreNav = { updateNav, logoutUser };
})();
