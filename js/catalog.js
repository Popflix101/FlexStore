const defaultProducts = [
  {
    id: 1,
    name: "Nike Hoodie",
    category: "Clothing",
    brand: "Nike",
    price: 899.99,
    oldPrice: 1099.99,
    stock: 25,
    featured: true,
    rating: 4.8,
    reviews: 125,
    image: "images/products/nike-hoodie.jpg",
    description: "Premium Nike Hoodie."
  },
  {
    id: 2,
    name: "Black T-Shirt",
    category: "Clothing",
    brand: "Nike",
    price: 299.99,
    oldPrice: 399.99,
    stock: 40,
    featured: true,
    rating: 4.6,
    reviews: 74,
    image: "images/products/black-tshirt.jpg",
    description: "100% Cotton T-Shirt."
  },
  {
    id: 3,
    name: "Blue Denim Jacket",
    category: "Clothing",
    brand: "Levi's",
    price: 1199.99,
    oldPrice: 1499.99,
    stock: 18,
    featured: true,
    rating: 4.9,
    reviews: 96,
    image: "images/products/denim-jacket.jpg",
    description: "Classic Denim Jacket."
  },
  {
    id: 4,
    name: "Samsung Galaxy S25",
    category: "Smartphone",
    brand: "Samsung",
    price: 17999.99,
    oldPrice: 19999.99,
    stock: 12,
    featured: true,
    rating: 4.9,
    reviews: 210,
    image: "images/products/s25.jpg",
    description: "Latest Samsung flagship."
  },
  {
    id: 5,
    name: "iPhone 15",
    category: "Smartphone",
    brand: "Apple",
    price: 18999.99,
    oldPrice: 20999.99,
    stock: 9,
    featured: true,
    rating: 4.8,
    reviews: 183,
    image: "images/products/iphone15.jpg",
    description: "Apple iPhone 15."
  },
  {
    id: 6,
    name: "Xiaomi 15",
    category: "Smartphone",
    brand: "Xiaomi",
    price: 12999.99,
    oldPrice: 14999.99,
    stock: 15,
    featured: true,
    rating: 4.7,
    reviews: 102,
    image: "images/products/xiaomi15.jpg",
    description: "Flagship Xiaomi."
  },
  {
    id:7,
    name: "Flex16 Black Outfit",
    category: "Clothing",
    brand: "Flex16",
    price: 1599.99,
    oldPrice: 1899.99,
    stock: 5,
    featured: true,
    rating: 4.7,
    reviews: 102,
    image: "images/products/Flex Black outfit.jpg",
    description: "Flagship Xiaomi."
  }
];

function initializeProducts() {
  const storedValue = localStorage.getItem("products");

  if (storedValue === null || storedValue === "") {
    localStorage.setItem("products", JSON.stringify(defaultProducts));
    return [...defaultProducts];
  }

  try {
    const parsed = JSON.parse(storedValue);

    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (error) {
    console.warn("Invalid products data in localStorage. Resetting.", error);
  }

  localStorage.setItem("products", JSON.stringify(defaultProducts));
  return [...defaultProducts];
}

function saveProducts(products) {
  const normalized = Array.isArray(products) ? products : [];
  localStorage.setItem("products", JSON.stringify(normalized));
  return normalized;
}

function getProducts() {
  return initializeProducts();
}

window.defaultProducts = defaultProducts;
window.getProducts = getProducts;
window.saveProducts = saveProducts;
