//integration test
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import {loadFromStorage,cart } from "../../data/cart.js";
import { loadProducts, loadProductsFetch } from "../../data/products.js";
//two things to test:   how the page looks
//                      how the page behaves    

describe('test suite: renderOrderSummary',()=>{
  
  const productId1='e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2='15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeAll((done)=>{
    loadProductsFetch().then(()=>{
      done();
    });
  });

  beforeEach(()=>{              //beforeEach hook (hooks lets us run some code for each test)
    spyOn(localStorage,'setItem');

    document.querySelector('.js-test-container').innerHTML=`
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
    `;

    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:2,
        deliveryOptionId:'1'
      },{
        productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity:1,
        deliveryOptionId:'2'
      }]);
    });
    loadFromStorage();   

    renderOrderSummary();
  });

  //how the page looks
  it('displays the cart',()=>{
      expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);

    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2');
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');

    document.querySelector('.js-test-container').innerHTML=``;
  });

  //how the page behaves
  it('removes a product',()=>{
    document.querySelector(`.js-delete-link-${productId1}`).click();
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);

    document.querySelector('.js-test-container').innerHTML=``;
  });
});
