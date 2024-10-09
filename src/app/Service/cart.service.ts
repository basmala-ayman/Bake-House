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
      existingProduct.quantity =
        (existingProduct.quantity ?? 0) + (product.quantity ?? 0);
    } else {
      currentCart.push(product);
    }

    // Update cart items and localStorage
    this.cartItems.next(currentCart);
    localStorage.setItem('cart', JSON.stringify(currentCart));

    // Update the total quantity after adding to the cart
    // this.updateTotalQuantity();
  }

  // Method to calculate and update total quantity
  // private updateTotalQuantity() {
  //   const total = this.cartItems.value.reduce(
  //     (sum, product) => sum + (product.quantity ?? 0),
  //     0
  //   );
  //   CartService.totalQuantity.next(total); // Update the totalQuantity subject
  // }

  // Expose the total quantity as an observable
  // static getTotalQuantity() {
  //   return CartService.totalQuantity.asObservable(); // Other components can subscribe to this
  // }

  // Add product to the cart
  // addToCart(product: Product) {
  //   const currentCart = this.cartItems.value;
  //   currentCart.push(product);
  //   this.cartItems.next(currentCart); // Notify subscribers

  //   // Save the updated cart to localStorage
  //   localStorage.setItem('cart', JSON.stringify(currentCart));
  // }

  // Get cart items
  
  getCartItems(): Product[] {
    return this.cartItems.value;
  }

  // getTotalQuantity(): void {
  //   const currentCart = this.cartItems.value; // Get the current cart items
  //   // Sum up the total quantity of all products in the cart
  //   this.totalQuantity = currentCart.reduce((total, product) => {
  //     // Make sure to handle the case where product.quantity might be undefined
  //     return total + (product.quantity ?? 0);
  //   }, 0);
  //   // return totalQuantity;
  // }

  // Clear the cart
  
  clearCart() {
    this.cartItems.next([]);
    localStorage.removeItem('cart');
  }
}
