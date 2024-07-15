import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary} from "./checkout/paymentSummary.js";
//import '../data/cart-class.js';
//import '../data/backend-practice.js';
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { cart,loadCart } from "../data/cart.js";

async function loadPage(){  
  try{
    //throw 'error1';           //to manually create errors
    await loadProductsFetch()             //await lets us write asyn code like normal code 

    await new Promise((resolve,reject)=>{
      loadCart(()=>{
        //reject('error3')          //manual error in promises
        resolve();
        updateCartQuantity();
      });
    });

  } catch(error){
    console.log('unexpected error. try again later.');
  }                     //error handling in async await         

  renderOrderSummary();
  renderPaymentSummary();
  
}
loadPage();

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  })
]).then((values)=>{
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
new Promise((resolve)=>{                //promises. keep the code flat. only run a function when the first one is finished
  loadProducts(()=>{
    resolve('value1');
  });
}).then((value)=>{
  console.log(value);
  return new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  });
}).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
loadProducts(()=>{                //callbacks. become more and more nested if we have many callbacks
  loadCart(()=>{
    renderOrderSummary();
    renderPaymentSummary();
  })
});
*/
export function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity<2 ? `${cartQuantity} item` : `${cartQuantity} items`;
  return cartQuantity;
}
document.querySelector('.js-order-summary').addEventListener('update', updateCartQuantity);



