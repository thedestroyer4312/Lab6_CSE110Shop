// product-item.js

class ProductItem extends HTMLElement {
  constructor(){
    super();

    // first, attach shadow root to element
    this.attachShadow({mode: "open"});

    // set attributes to some value - didn't work
    /*
    this.setAttribute('src', 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg');
    this.setAttribute('title', 'Fjallraven - Foldstack No. 1 Backpack, Fits 15 Laptops');
    this.setAttribute('price', '$109.95');
    */

    // outer list
    const outerList = document.createElement("li");
    outerList.className = "product";

    // child content of outer list
    const childElements = [];
    const image = document.createElement("img");
    image.width = 200;
    image.id = 'image';
    childElements.push(image);
    const title = document.createElement("p");
    title.className = "title";
    title.id = 'title';
    childElements.push(title);
    const price = document.createElement("p");
    price.className = "price";
    price.id = 'price';

    childElements.push(price);
    const button = document.createElement("button");
    button.onclick = `alert('Added to Cart!')`;
    button.innerHTML = "Add to Cart";
    button.id = "button";
    childElements.push(button);

    //image.src = this.getAttribute('src');
    //image.alt = this.getAttribute('title');
    //price.innerHTML = this.getAttribute('price');
    //title.innerHTML = this.getAttribute('title');

    // append child elements in order - image, title, description, price, button
    for(let elem of childElements){
      outerList.appendChild(elem);
    }

    // create style tag
    const style = document.createElement("style");
    style.textContent = `.price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }`;

    // attach style and outerList elements
    this.shadowRoot.append(style, outerList);


    // event listener for button
    button.addEventListener('click', () => {
      const countElem = document.getElementById('cart-count');
      let countNum = parseInt(countElem.innerHTML);

      // access local storage
      let cart;
      if(!localStorage.getItem('cart')){
        localStorage.setItem('cart', JSON.stringify(new Array()));
      }
      cart = JSON.parse(localStorage.getItem('cart'));

      // item has not been added - add to cart
      if(button.innerHTML === 'Add to Cart'){
        button.innerHTML = "Remove from Cart";
        button.onclick = `alert('Removed from Cart!')`;
        countElem.innerHTML = countNum + 1;
        cart.push(this.getAttribute('title'));
      }else{ // item has been added - remove from cart
        button.innerHTML = "Add to Cart";
        button.onclick = `'alert('Added to Cart!')`;
        countElem.innerHTML = countNum - 1;
        for(let i = 0; i < cart.length; i++){
          if(cart[i] === this.getAttribute('title')){
            cart.splice(i, 1);
            break;
          }
        }
      }
      localStorage.setItem('cart', JSON.stringify(cart));
    });
  }
}

customElements.define('product-item', ProductItem);
