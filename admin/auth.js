(function () {
    const ADMIN_EMAIL = "admin@flexstore.com";
    const ADMIN_PASSWORD = "admin123";
    const ADMIN_ROLE = "admin";
    const CUSTOMER_ROLE = "customer";

    function normalizeUser(user) {
        if (!user || typeof user !== "object") {
            return null;
        }

        const normalizedUser = { ...user };

        if (!normalizedUser.role) {
            normalizedUser.role = normalizedUser.email === ADMIN_EMAIL ? ADMIN_ROLE : CUSTOMER_ROLE;
        }

        return normalizedUser;
    }

    function getStoredUsers() {
        try {
            const users = JSON.parse(localStorage.getItem("users")) || [];
            return (Array.isArray(users) ? users : []).map(normalizeUser).filter(Boolean);
        } catch (error) {
            return [];
        }
    }

    function saveUsers(users) {
        const safeUsers = (Array.isArray(users) ? users : []).map(normalizeUser).filter(Boolean);
        localStorage.setItem("users", JSON.stringify(safeUsers));
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
        const normalizedUser = normalizeUser(user);
        return Boolean(normalizedUser) && (normalizedUser.role === ADMIN_ROLE || normalizedUser.email === ADMIN_EMAIL);
    }

    function getLoggedInUser() {
        try {
            return normalizeUser(JSON.parse(localStorage.getItem("loggedInUser")));
        } catch (error) {
            return null;
        }
    }

    function setLoggedInUser(user) {
        const normalizedUser = normalizeUser(user);
        localStorage.setItem("loggedInUser", JSON.stringify(normalizedUser));
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
        CUSTOMER_ROLE,
        ensureAdminAccount,
        ensureAdminAccess,
        getLoggedInUser,
        getStoredUsers,
        isAdminUser,
        loginUser,
        normalizeUser,
        saveUsers,
        setLoggedInUser
    };

    ensureAdminAccount();
})();
