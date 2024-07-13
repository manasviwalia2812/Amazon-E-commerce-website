export const orders=JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
  orders.unshift(order);            //this will add the order at the fron of the array as we want the recent orders first
  saveToStorage();
}

function saveToStorage(){
  localStorage.setItem('orders',JSON.stringify(orders));
}