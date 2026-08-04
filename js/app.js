// =====================================
// FLEXSTORE APP
// =====================================

// Load cart from browser storage
let cart = [];

function getStoredCartValue() {
    try {
        const localValue = localStorage.getItem("cart");
        if (localValue !== null) {
            return localValue;
        }
    } catch (error) {}

    try {
        return sessionStorage.getItem("cart");
    } catch (error) {
        return null;
    }
}

function writeStoredCartValue(value) {
    try {
        localStorage.setItem("cart", value);
    } catch (error) {}

    try {
        sessionStorage.setItem("cart", value);
    } catch (error) {}
}

function loadCart() {
    try {
        const savedCart = getStoredCartValue();
        cart = savedCart ? JSON.parse(savedCart) : [];
        if (!Array.isArray(cart)) cart = [];
    } catch (error) {
        cart = [];
    }
    return cart;
}

loadCart();

// =====================================
// Update Cart Counter
// =====================================

function updateCartCount() {

    loadCart();

    const cartCount = document.getElementById("cart-count");

    if (!cartCount) return;

    let totalItems = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
    });

    cartCount.textContent = totalItems;
}

// =====================================
// Add Product to Cart
// =====================================

// =====================================
// Add Product to Cart
// =====================================

function addToCart(productId, quantity = 1) {

    quantity = Number(quantity);

    if (quantity < 1) quantity = 1;

    loadCart();

    const normalizedId = Number(productId);

    const product = products.find(product => Number(product.id) === normalizedId);

    if (!product) {

        alert("Product not found.");

        return;

    }

    const existing = cart.find(item => Number(item.id) === normalizedId);

    if (existing) {

        existing.quantity += quantity;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,

            quantity: quantity

        });

    }

    saveCart();

    updateCartCount();

}

// =====================================
// Buy Now
// =====================================

function buyNow(productId) {

    addToCart(productId);

    window.location.href = "cart.html";

}

// =====================================
// Empty Cart
// =====================================

function clearCart() {

    if(confirm("Are you sure you want to clear your cart?")){

        resetCart();

        updateCartCount();

        location.reload();

    }

}

function resetCart() {
    cart = [];

    try {
        localStorage.removeItem("cart");
    } catch (error) {}

    try {
        sessionStorage.removeItem("cart");
    } catch (error) {}
}

// =====================================
// Calculate Total
// =====================================

function getCartTotal(){

    let total = 0;

    cart.forEach(item=>{

        total += item.price * item.quantity;

    });

    return total;

}

// =====================================
// Save Cart
// =====================================

function saveCart(){

    writeStoredCartValue(JSON.stringify(cart));
    loadCart();

}

// =====================================
// Run on Page Load
// =====================================

updateCartCount();