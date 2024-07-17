import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getProduct, loadProductsFetch } from './products.js';
import { addToCart } from './cart.js';

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.unshift(order); // Add the order at the front of the array
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

export async function displayOrders() {
  await loadProductsFetch(); // Ensure products are loaded before displaying orders

  const orderContainer = document.querySelector('.js-order-container');
  orderContainer.innerHTML = '';

  orders.forEach(async (order) => {
    const orderHTML = `
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${dayjs(order.orderTime).format('MMMM D')}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${order.totalCostCents / 100}</div>
          </div>
        </div>
        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.id}</div>
        </div>
      </div>
      <div class="order-details-grid">
        ${await Promise.all(order.products.map(async (product) => {
          const productId = product.productId;
          const matchingProduct = getProduct(productId);

          if (matchingProduct) {
            return `
              <div class="product-image-container">
                <img src="${matchingProduct.image}" alt="${matchingProduct.name}">
              </div>
              <div class="product-details">
                <div class="product-name">${matchingProduct.name}</div>
                <div class="product-delivery-date">Arriving on: ${dayjs(product.estimatedDeliveryTime).format('MMMM D')}</div>
                <div class="product-quantity">Quantity: ${product.quantity}</div>
                <button class="buy-again-button js-buy-again-button button-primary" data-product-id="${product.productId}">
                  <img class="buy-again-icon" src="images/icons/buy-again.png">
                  <span class="buy-again-message">Buy it again</span>
                </button>
              </div>
              <div class="product-actions">
                <a class="js-tracking-page" href="tracking.html?orderId=${order.id}&productId=${product.productId}">
                  <button class="track-package-button button-secondary">Track package</button>
                </a>
              </div>
            `;
          } else {
            console.log('Product not found:', productId);
            return ''; // or some fallback HTML
          }
        })).then((results) => results.join(''))}
      </div>
    `;
    orderContainer.innerHTML += orderHTML;
    attachBuyAgainListeners(); // Attach event listeners after rendering orders
  });

  
}

function attachBuyAgainListeners() {
  const buttons = document.querySelectorAll('.js-buy-again-button');

  buttons.forEach(button => {
    button.addEventListener('click', async () => {
      const productId = button.dataset.productId;
      console.log('Adding product to cart:', productId);
      await addToCart(productId,1);
      console.log('Product added to cart:', productId);
      window.location.href = 'checkout.html'; // Redirect to checkout page
    });
  });
}

displayOrders();
