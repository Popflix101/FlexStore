(function () {
    const ADMIN_EMAIL = "admin@flexstore.com";
    const ADMIN_PASSWORD = "admin123";
    const ADMIN_ROLE = "admin";

    function getStoredUsers() {
        try {
            return JSON.parse(localStorage.getItem("users")) || [];
        } catch (error) {
            return [];
        }
    }

    function saveUsers(users) {
        localStorage.setItem("users", JSON.stringify(users));
    }

    function ensureAdminAccount() {
        const users = getStoredUsers();
        let adminUser = users.find(user => user.email === ADMIN_EMAIL);

        if (!adminUser) {
            adminUser = {
                id: 1,
                firstName: "Admin",
                lastName: "User",
                email: ADMIN_EMAIL,
                phone: "0000000000",
                password: ADMIN_PASSWORD,
                role: ADMIN_ROLE
            };
            users.push(adminUser);
            saveUsers(users);
            return adminUser;
        }

        if (adminUser.password !== ADMIN_PASSWORD || adminUser.role !== ADMIN_ROLE) {
            adminUser.password = ADMIN_PASSWORD;
            adminUser.role = ADMIN_ROLE;
            saveUsers(users);
        }

        return adminUser;
    }

    function isAdminUser(user) {
        return Boolean(user) && (user.role === ADMIN_ROLE || user.email === ADMIN_EMAIL);
    }

    function getLoggedInUser() {
        try {
            return JSON.parse(localStorage.getItem("loggedInUser"));
        } catch (error) {
            return null;
        }
    }

    function setLoggedInUser(user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
    }

    function loginUser(user) {
        setLoggedInUser(user);

        if (isAdminUser(user)) {
            window.location.href = "admin/dashboard.html";
            return;
        }

        window.location.href = "index.html";
    }

    function ensureAdminAccess() {
        const user = getLoggedInUser();

        if (!isAdminUser(user)) {
            window.location.href = "../login.html";
            return false;
        }

        return true;
    }

    window.FlexStoreAuth = {
        ADMIN_EMAIL,
        ADMIN_PASSWORD,
        ensureAdminAccount,
        ensureAdminAccess,
        getLoggedInUser,
        getStoredUsers,
        isAdminUser,
        loginUser,
        saveUsers,
        setLoggedInUser
    };

    ensureAdminAccount();
})();
