import {cart, addToCart} from '../data/cart.js';
import {products, loadProducts} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

loadProducts(renderProductsGrid);

function renderProductsGrid(){

  let productsHTML = '';

  products.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-select">
            <option selected value="1" data-quantity="1">1</option>
            <option value="2" data-quantity="2">2</option>
            <option value="3" data-quantity="3">3</option>
            <option value="4" data-quantity="4">4</option>
            <option value="5" data-quantity="5">5</option>
            <option value="6" data-quantity="6">6</option>
            <option value="7" data-quantity="7">7</option>
            <option value="8" data-quantity="8">8</option>
            <option value="9" data-quantity="9">9</option>
            <option value="10" data-quantity="10">10</option>
          </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
  });

  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  let dataQuantity=1;

  document.querySelectorAll('.js-quantity-select').forEach((select) =>{
    select.addEventListener('change', function() {
      const selectedOption = this.options[this.selectedIndex];
      const selectedQuantity = selectedOption.value;
      dataQuantity = Number(selectedOption.dataset.quantity);      
    });
  })

  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        addToCart(productId,dataQuantity);
        let cartQuantityNumber=updateCartQuantity();
        document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantityNumber;
        dataQuantity=1;
      });
    });
}

document.querySelector('.js-search-bar')
  .addEventListener('input', (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const products = document.querySelectorAll('.product-container');

    products.forEach((product) => {
      const productName = product.querySelector('.product-name').textContent.toLowerCase();
      const productKeywords = product.keywords;

      let matches = false;
      if (productKeywords) {
        for (const keyword of productKeywords) {
          if (keyword.toLowerCase().includes(searchQuery)) {
            matches = true;
            break;
          }
        }
      }

      if (matches || productName.includes(searchQuery)) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    });
  });

export function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}