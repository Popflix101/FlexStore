// =========================================
// FLEXSTORE PRODUCT DATABASE
// =========================================

const productsData = window.defaultProducts || [

{
    id:1,
    name:"Nike Hoodie",
    category:"Clothing",
    brand:"Nike",
    price:899.99,
    oldPrice:1099.99,
    stock:25,
    featured:true,
    rating:4.8,
    reviews:125,
    image:"images/products/nike-hoodie.jpg",
    description:"Premium Nike Hoodie."
},

{
    id:2,
    name:"Black T-Shirt",
    category:"Clothing",
    brand:"Nike",
    price:299.99,
    oldPrice:399.99,
    stock:40,
    featured:true,
    rating:4.6,
    reviews:74,
    image:"images/products/black-tshirt.jpg",
    description:"100% Cotton T-Shirt."
},

{
    id:3,
    name:"Blue Denim Jacket",
    category:"Clothing",
    brand:"Levi's",
    price:1199.99,
    oldPrice:1499.99,
    stock:18,
    featured:true,
    rating:4.9,
    reviews:96,
    image:"images/products/denim-jacket.jpg",
    description:"Classic Denim Jacket."
},

{
    id:4,
    name:"Samsung Galaxy S25",
    category:"Smartphone",
    brand:"Samsung",
    price:17999.99,
    oldPrice:19999.99,
    stock:12,
    featured:true,
    rating:4.9,
    reviews:210,
    image:"images/products/s25.jpg",
    description:"Latest Samsung flagship."
},

{
    id:5,
    name:"iPhone 15",
    category:"Smartphone",
    brand:"Apple",
    price:18999.99,
    oldPrice:20999.99,
    stock:9,
    featured:true,
    rating:4.8,
    reviews:183,
    image:"images/products/iphone15.jpg",
    description:"Apple iPhone 15."
},

{
    id:6,
    name:"Xiaomi 15",
    category:"Smartphone",
    brand:"Xiaomi",
    price:12999.99,
    oldPrice:14999.99,
    stock:15,
    featured:true,
    rating:4.7,
    reviews:102,
    image:"images/products/xiaomi15.jpg",
    description:"Flagship Xiaomi."
}

];

// Load products
var products = [];

if (typeof window.getProducts === "function") {

    products = window.getProducts();

} else {

    try {

        const storedProducts = JSON.parse(localStorage.getItem("products"));

        products = Array.isArray(storedProducts) && storedProducts.length > 0
            ? storedProducts
            : productsData;

    } catch (error) {

        products = productsData;

    }

}

window.products = products;
window.viewProduct = viewProduct;
window.productsExecuted = true;

// Save products
function saveProducts(updatedProducts = products){

    products = Array.isArray(updatedProducts) ? updatedProducts : [];
    window.products = products;

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

}

// Wishlist
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// =========================================
// Homepage Featured Products
// =========================================

const featured = document.getElementById("featured-products");

if (featured) {

    featured.innerHTML = "";

    products.forEach(product => {

        featured.innerHTML += `

        <div class="col-lg-4 col-md-6 mb-4">

            <div class="product-card">

                <div class="product-image">

                    <img src="${product.image}" alt="${product.name}" class="img-fluid">

                    <button
                        class="wishlist-btn"
                        onclick="toggleWishlist(${product.id}, this)"
                        title="Wishlist">

                        <i class="${
                            wishlist.some(item => item.id === product.id)
                            ? "fa-solid fa-heart"
                            : "fa-regular fa-heart"
                        }"></i>

                    </button>

                    ${
                        product.oldPrice > product.price
                        ? `<span class="sale-badge">SALE</span>`
                        : ""
                    }

                </div>

                <div class="product-info p-3">

                    <h5>${product.name}</h5>

                    <p class="text-muted mb-1">

                        ${product.brand}

                    </p>

                    <small>

                        ⭐ ${product.rating} (${product.reviews} Reviews)

                    </small>

                    <div class="price-area mt-2">

                        ${
                            product.oldPrice > product.price
                            ? `<span class="old-price">R${product.oldPrice.toFixed(2)}</span>`
                            : ""
                        }

                        <span class="price">

                            R${product.price.toFixed(2)}

                        </span>

                    </div>

                    <p class="mt-2">

                        <strong>Stock:</strong>

                        ${product.stock}

                    </p>

                    <div class="d-grid gap-2 mt-3">

                        <button
                            class="btn btn-dark"
                            onclick="viewProduct(${product.id})">

                            View Product

                        </button>

                        <button
                            class="btn btn-warning"
                            onclick="addToCart(${product.id},1)">

                            <i class="fa-solid fa-cart-shopping"></i>

                            Add To Cart

                        </button>

                    </div>

                </div>

            </div>

        </div>

        `;

    });

}

function viewProduct(id){

    localStorage.setItem("selectedProduct", id);

    window.location = "product.html";

}