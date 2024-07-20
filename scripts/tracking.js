import {orders} from '../data/orders.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getProduct, loadProductsFetch } from '../data/products.js';
const urlParams = new URLSearchParams(window.location.search);

const orderId = urlParams.get('orderId');
const productId = urlParams.get('productId');

async function displayTracking(){
  await loadProductsFetch(); 

  const matchingOrder = orders.find((order) => order.id === orderId);

  const matchingProduct= getProduct(productId);
  const matchingOrderProducts=matchingOrder.products

  let matchingOrderQuantity;
  let estimatedDeliveryTime;
  let percentProgress;
  let orderTime=matchingOrder.orderTime;

  matchingOrderProducts.forEach((product) => {
    if (product.productId===productId){
      matchingOrderQuantity=product.quantity;
      estimatedDeliveryTime=product.estimatedDeliveryTime;
      const today = dayjs();
      orderTime = dayjs(orderTime);
      const deliveryTime = dayjs(estimatedDeliveryTime);
      percentProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;
      console.log(percentProgress);
    }
  });


  let orderTrackingelement=document.querySelector('.js-order-tracking');
  orderTrackingelement.innerHTML=` 
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        Arriving on ${dayjs(estimatedDeliveryTime).format('dddd, MMMM D')}
      </div>

      <div class="product-info">
        ${matchingProduct.name}
      </div>

      <div class="product-info">
        Quantity: ${matchingOrderQuantity}
      </div>

      <img class="product-image" src="${matchingProduct.image}">

      <div class="progress-labels-container">
        <div class="progress-label ${
          percentProgress < 50 ? 'current-status' : ''
        }">
          Preparing
        </div>
        <div class="progress-label ${
          (percentProgress >= 50 && percentProgress < 100) ? 'current-status' : ''
        }">
          Shipped
        </div>
        <div class="progress-label ${
          percentProgress >= 100 ? "current-status" : ''
        }">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar"  
          style="width: ${percentProgress}%;">
        </div>
      </div>`
}
displayTracking();

