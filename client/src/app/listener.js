import store from './store';
import { config } from '../config';
import { saveCart } from '../api/cart';

let currentAuth;
let currentCart;

function listener(){
    let previousAuth = currentAuth;
    let previousCart = currentCart;

    currentAuth = store.getState().auth;
    currentCart = store.getState().cart;

    let { token } = store.getState().auth;

    if(currentAuth !== previousAuth){
        localStorage.setItem('auth', JSON.stringify(currentAuth));
        saveCart(token, currentCart);
    }

    if(currentCart !== previousCart){
        localStorage.setItem('cart', JSON.stringify(currentCart));
        saveCart(token, currentCart);
     }
}

function listen(){
    store.subscribe(listener);
}

export { listen };