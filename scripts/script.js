// Script.js

window.addEventListener('DOMContentLoaded', () => {
  const url = "https://fakestoreapi.com/products";
  fetch(url).then(response => response.json())
  .then(data => {
    let dataString = JSON.stringify(data);
    localStorage.setItem('items', dataString);
  })
});