const products=[
{name:"Strawberry Cream",img:"assets/strawberry-cream.jpg"},
{name:"Chocolate Cream",img:"assets/chocolate-cream.jpg"},
{name:"Matcha Cream",img:"assets/matcha-cream.jpg"},
{name:"Crème Brûlée",img:"assets/creme-brulee.jpg"},
{name:"Mango Cream",img:"assets/mango-cream.jpg"},
{name:"Yema Cream",img:"assets/yema-cream.jpg"},
{name:"Ube Cream",img:"assets/ube-cream.jpg"}];
const PRICE=99;let cart=[];
const grid=document.getElementById("productGrid");
grid.innerHTML=products.map((p,i)=>`<article class="product"><img src="${p.img}" alt="${p.name}"><div class="product-info"><h3>${p.name}</h3><div class="price">₱99</div><button class="add" onclick="addToCart(${i})">ADD TO CART</button></div></article>`).join("");
function addToCart(i){let x=cart.find(a=>a.i===i);x?x.q++:cart.push({i,q:1});renderCart();openCart()}
function cartTotal(){return cart.reduce((s,x)=>s+x.q*PRICE,0)}
function renderCart(){
document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.q,0);
document.getElementById("cartItems").innerHTML=cart.length?cart.map((x,n)=>`<div class="cart-item"><img src="${products[x.i].img}" alt=""><div><b>${products[x.i].name}</b><div class="price">₱99</div><div class="qty"><button onclick="changeQty(${n},-1)">−</button>${x.q}<button onclick="changeQty(${n},1)">+</button></div></div><button class="remove" onclick="removeItem(${n})">✕</button></div>`).join(""):"<p>Your cart is empty.</p>";
document.getElementById("cartTotal").textContent="₱"+cartTotal()}
function changeQty(n,d){cart[n].q+=d;if(cart[n].q<=0)cart.splice(n,1);renderCart()}
function removeItem(n){cart.splice(n,1);renderCart()}
function openCart(){document.getElementById("cartOverlay").classList.remove("hidden");renderCart()}
function closeCart(){document.getElementById("cartOverlay").classList.add("hidden")}
function goCheckout(){if(!cart.length)return alert("Please add a product first.");closeCart();document.getElementById("checkoutTotal").textContent="₱"+cartTotal();document.getElementById("checkoutOverlay").classList.remove("hidden")}
function closeCheckout(){document.getElementById("checkoutOverlay").classList.add("hidden")}
function placeOrder(){let n=document.getElementById("customerName").value.trim(),p=document.getElementById("customerPhone").value.trim();if(!n||!p)return alert("Please enter your name and phone number.");document.getElementById("successMessage").innerHTML=`Thank you, <b>${n}</b>! Your order has been received.<br><br>Total: <b>₱${cartTotal()}</b>`;document.getElementById("checkoutOverlay").classList.add("hidden");document.getElementById("successOverlay").classList.remove("hidden");cart=[];renderCart()}
function closeSuccess(){document.getElementById("successOverlay").classList.add("hidden");location.hash="home"}
renderCart();
