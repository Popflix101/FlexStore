// =====================================
// FLEXSTORE APP
// =====================================

// Load cart from Local Storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// =====================================
// Update Cart Counter
// =====================================

function updateCartCount() {

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

    const normalizedId = Number(productId);

    const product = products.find(product => Number(product.id) === normalizedId);

    if (!product) {

        alert("Product not found.");

        return;

    }

    const existing = cart.find(item => item.id === productId);

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

        cart = [];

        localStorage.removeItem("cart");

        updateCartCount();

        location.reload();

    }

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

    localStorage.setItem("cart", JSON.stringify(cart));

}

// =====================================
// Run on Page Load
// =====================================

updateCartCount();