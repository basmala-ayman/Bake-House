import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // BehaviorSubject to store the cart items, so any changes will notify all subscribers.
  private cartItems = new BehaviorSubject<Product[]>([]);
  currentCart = this.cartItems.asObservable();
  // private static totalQuantity = new BehaviorSubject<number>(0); // BehaviorSubject to track total quantity

  constructor() {
    // Load cart from localStorage if available
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartItems.next(storedCart);
  }

  // Method to add items to the cart
  addToCart(product: Product) {
    const currentCart = this.cartItems.value;
    const existingProduct = currentCart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity ?? 0) + 1;
      existingProduct.amount--;
      // console.log(existingProduct);
      // console.log(product);
    } else {
      // increase quantity of its product
      product.quantity = (product.quantity ?? 0) + 1;
      product.amount--;
      currentCart.push(product);
    }

    // Update cart items and localStorage
    this.cartItems.next(currentCart);
    localStorage.setItem('cart', JSON.stringify(currentCart));

    // Update the total quantity after adding to the cart
    // this.updateTotalQuantity();
  }

  removeOne(product: Product) {
    const currentCart = this.cartItems.value;
    const existingProduct = currentCart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.amount++;
      existingProduct.quantity = (existingProduct.quantity ?? 0) - 1;
    }

    // Update cart items and localStorage
    this.cartItems.next(currentCart);
    localStorage.setItem('cart', JSON.stringify(currentCart));
  }

  getCartItems(): Product[] {
    return this.cartItems.value;
  }

  clearCart() {
    this.cartItems.next([]);
    localStorage.removeItem('cart');
  }
}
