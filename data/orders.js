<<<<<<< HEAD
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

const today=dayjs()
console.log(today.format('YYYY-MM-DD'));
export const orders=JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
  orders.unshift(order);            //this will add the order at the fron of the array as we want the recent orders first
  saveToStorage();
}

function saveToStorage(){
  localStorage.setItem('orders',JSON.stringify(orders));
=======
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

const today=dayjs()
console.log(today.format('YYYY-MM-DD'));
export const orders=JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
  orders.unshift(order);            //this will add the order at the fron of the array as we want the recent orders first
  saveToStorage();
}

function saveToStorage(){
  localStorage.setItem('orders',JSON.stringify(orders));
>>>>>>> origin/master
}