//creates multiple carts
function Cart(localStorageKey){
  const cart={
    cartItems:undefined,
  
    loadFromStorage(){            //function inside an object= method
      this.cartItems=JSON.parse(localStorage.getItem(localStorageKey));            //this= outer object
    
      if(!this.cartItems){
        this.cartItems=[{
          productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity:2,
          deliveryOptionId:'1'
        },{
          productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity:1,
          deliveryOptionId:'2'
        }];
      }
    },
  
    saveToStorage(){
      localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems));      //local storage only saves as strings
    },
  
    addToCart(productId){      
      let matchingItem;
      
      this.cartItems.forEach((cartItem)=>{
        if(productId===cartItem.productId){
          matchingItem=cartItem;
        }
      });
    
      if(matchingItem){
        matchingItem.quantity++;
      }
      else{
        this.cartItems.push({
          productId: productId,
          quantity:1,
          deliveryOptionId: '1',
        });
      }
    
      this.saveToStorage();
    },
  
    removeFromCart(productId){
      //we create a new array w all the items from the cart. then we loop through this array and add each product to this new array except for this product.
      const newCart=[];
    
      this.cartItems.forEach((cartItem)=>{
        if(cartItem.productId != productId){
          newCart.push(cartItem);
        }
      });
      this.cartItems=newCart;
      this.saveToStorage();
    },
    updateDeliveryOption(productId, deliveryOptionId){
      let matchingItem;
      
      this.cartItems.forEach((cartItem)=>{
        if(productId===cartItem.productId){
          matchingItem=cartItem;
        }
      });
    
      matchingItem.deliveryOptionId=deliveryOptionId;
      this.saveToStorage();
    },
  };

  return cart;
}

const cart= Cart('cart-oop');
const businessCart= Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);
