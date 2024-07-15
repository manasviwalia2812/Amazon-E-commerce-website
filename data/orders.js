import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { getProduct} from '../data/products.js'

export const orders=JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
  orders.unshift(order);            //this will add the order at the fron of the array as we want the recent orders first
  saveToStorage();
}

function saveToStorage(){
  localStorage.setItem('orders',JSON.stringify(orders));
}
console.log(orders);

export function displayOrders() {
  const orderContainer = document.querySelector('.js-order-container');
  orderContainer.innerHTML = ''; 

  orders.forEach((order) => {
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
        ${order.products.map((product) => {
          const productId = product.productId;
          const matchingOrder= getProduct(productId);
          console.log(matchingOrder);
          return `
            <div class="product-image-container">
              product image
              <!-- todo: add product image -->
            </div>

            <div class="product-details">
              <div class="product-name">
                <!-- todo: add product name -->
                Product name ${product.productId}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${dayjs(product.estimatedDeliveryTime).format('MMMM D')}
              </div>
              <div class="product-quantity">
                Quantity: ${product.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a class="js-tracking-page" href="tracking.html?orderId=${order.id}&productId=${product.productId}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          `;
        }).join('')}
      </div>
    `;
    orderContainer.innerHTML += orderHTML;
  });
}


//displayOrders();

