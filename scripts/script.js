// Script.js

window.addEventListener('DOMContentLoaded', () => {
  const url = "https://fakestoreapi.com/products";
  fetch(url)
  .then(response => response.json())
  .then(data => {
    let dataString = JSON.stringify(data);
    localStorage.setItem('items', dataString);
  })
});

window.onload = () => {
    const objects = JSON.parse(localStorage.getItem('items'));
    const container = document.getElementById('product-list');
    let cart = null;
    if(localStorage.getItem('cart')){
      const cartElem = localStorage.getItem('cart');
      cart = JSON.parse(cartElem);
      document.getElementById('cart-count').innerHTML = cart.length;
    }
    for(let elem of objects){
      const product = document.createElement('product-item');
      
      
      //Accessing shadow root directly because this straight up did not work
      product.setAttribute('img', elem.image);
      product.setAttribute('title', elem.title);
      product.setAttribute('price', elem.price);
      
      
      const image = product.shadowRoot.getElementById('image');
      const price = product.shadowRoot.getElementById('title');
      const title = product.shadowRoot.getElementById('price');
      image.src = elem.image;
      image.alt = elem.title;
      title.innerHTML = elem.title;
      price.innerHTML = elem.price;
      
      container.appendChild(product);

      if(cart){
        for(let i = 0; i < cart.length; i++){
          if(product.getAttribute('title') === cart[i]){
             const button = product.shadowRoot.getElementById('button');
             button.innerHTML = 'Remove from Cart';
             button.onclick = `alert('Removed from Cart!')`;
             break;
          }
        }
      }
    }
};