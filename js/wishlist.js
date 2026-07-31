// ======================================
// Wishlist
// ======================================

(function(){
  const wishlistKey = "wishlist";
  let wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
  const container = document.getElementById("wishlist-container");

  function saveWishlist(){
    localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
  }

  function addToWishlist(id){
    const exists = wishlist.find(item => item.id === id);
    if (exists){
      return;
    }

    const productList = (typeof window.products !== 'undefined' && Array.isArray(window.products)) ? window.products : (typeof products !== 'undefined' ? products : []);
    const product = productList.find(p => p.id === id);
    if (!product) return;

    wishlist.push(product);
    saveWishlist();
  }

  function removeWishlist(id){
    wishlist = wishlist.filter(item => item.id !== id);
    saveWishlist();
    renderWishlist();
  }

  function toggleWishlist(id, button){
    const index = wishlist.findIndex(item => item.id === id);
    const icon = button ? button.querySelector("i") : null;

    if (index > -1) {
      wishlist.splice(index, 1);
      if (icon){
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
      }
    } else {
      const productList = (typeof window.products !== 'undefined' && Array.isArray(window.products)) ? window.products : (typeof products !== 'undefined' ? products : []);
      const product = productList.find(p => p.id === id);
      if (!product) return;
      wishlist.push(product);
      if (icon){
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
      }
    }

    saveWishlist();

    if (button){
      button.classList.add("heart-pop");
      setTimeout(() => {
        button.classList.remove("heart-pop");
      }, 300);
      createHearts(button);
    }
  }

  function createHearts(button){
    for (let i = 0; i < 6; i++) {
      const heart = document.createElement("span");
      heart.className = "floating-heart";
      heart.innerHTML = "❤";
      heart.style.left = (Math.random() * 20 - 10) + "px";
      heart.style.top = (Math.random() * 20 - 10) + "px";
      button.appendChild(heart);
      setTimeout(() => {
        heart.remove();
      }, 1000);
    }
  }

  function renderWishlist(){
    if (!container) return;
    container.innerHTML = "";
    if (wishlist.length === 0){
      container.innerHTML = `
        <div class="col-12">
          <div class="alert alert-info">Your wishlist is empty.</div>
        </div>
      `;
      return;
    }

    wishlist.forEach(product => {
      container.innerHTML += `
        <div class="col-lg-4 mb-4">
          <div class="product-card">
            <img src="${product.image}" class="img-fluid">
            <div class="product-info">
              <h5>${product.name}</h5>
              <p>${product.category}</p>
              <h4>R${product.price.toFixed(2)}</h4>
              <div class="d-grid gap-2">
                <button class="btn btn-warning" onclick="addToCart(${product.id},1)">Add To Cart</button>
                <button class="wishlist-btn" onclick="toggleWishlist(${product.id}, this)" title="Add to Wishlist">
                  <i class="${wishlist.some(item => item.id === product.id) ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    });
  }

  window.toggleWishlist = toggleWishlist;
  window.addToWishlist = addToWishlist;
  window.removeWishlist = removeWishlist;
  window.renderWishlist = renderWishlist;

  renderWishlist();
})();

// Save

function saveWishlist(){

localStorage.setItem(
"wishlist",
JSON.stringify(wishlist)
);

}

// Add

function addToWishlist(id){

const exists =
wishlist.find(item=>item.id===id);

if(exists){

alert("Already in wishlist.");

return;

}

const product =
products.find(p=>p.id===id);

wishlist.push(product);

saveWishlist();

alert(product.name+" added to wishlist.");

}

// Remove

function removeWishlist(id){

wishlist =
wishlist.filter(item=>item.id!==id);

saveWishlist();

renderWishlist();

}

function toggleWishlist(id, button){
    const index = wishlist.findIndex(item => item.id === id);
    const icon = button ? button.querySelector("i") : null;

    if (index > -1) {
        wishlist.splice(index, 1);
        if (icon) {
            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");
        }
    } else {
        const product = products.find(p => p.id === id);
        if (!product) return;
        wishlist.push(product);
        if (icon) {
            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");
        }
    }

    saveWishlist();

    if (button) {
        button.classList.add("heart-pop");
        setTimeout(()=>{
            button.classList.remove("heart-pop");
        },300);
        createHearts(button);
    }
}

window.toggleWishlist = toggleWishlist;

// Render

function renderWishlist(){

if(!container) return;

container.innerHTML="";

if(wishlist.length==0){

container.innerHTML=`

<div class="col-12">

<div class="alert alert-info">

Your wishlist is empty.

</div>

</div>

`;

return;

}

function createHearts(button){

    for(let i=0;i<6;i++){

        const heart = document.createElement("span");

        heart.className = "floating-heart";

        heart.innerHTML = "❤";

        heart.style.left = (Math.random()*20-10)+"px";

        heart.style.top = (Math.random()*20-10)+"px";

        button.appendChild(heart);

        setTimeout(()=>{

            heart.remove();

        },1000);

    }

}

wishlist.forEach(product=>{

container.innerHTML +=`

<div class="col-lg-4 mb-4">

<div class="product-card">

<img
src="${product.image}"
class="img-fluid">

<div class="product-info">

<h5>

${product.name}

</h5>

<p>

${product.category}

</p>

<h4>

R${product.price.toFixed(2)}

</h4>

<div class="d-grid gap-2">

<button

class="btn btn-warning"

onclick="addToCart(${product.id},1)">

Add To Cart

</button>

<button
class="wishlist-btn"
onclick="toggleWishlist(${product.id})"
title="Add to Wishlist">

<i class="${
wishlist.some(item => item.id === product.id)
? 'fa-solid fa-heart'
: 'fa-regular fa-heart'
}"></i>

</button>

</div>

</div>

</div>

</div>

`;

});

}

renderWishlist();