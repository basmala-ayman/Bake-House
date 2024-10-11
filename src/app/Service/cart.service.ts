import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from './product.service';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<Product[]>([]);
  currentCart = this.cartItems.asObservable();

  constructor() {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartItems.next(storedCart);
  }

  addToCart(product: Product) {
    const currentCart = this.cartItems.value;
    const existingProduct = currentCart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity ?? 0) + 1;
      existingProduct.amount--;
      product.quantity = existingProduct.quantity ?? 0;
      product.amount = existingProduct.amount;
    } else {
      product.quantity = (product.quantity ?? 0) + 1;
      product.amount--;
      currentCart.push(product);
    }
    this.cartItems.next(currentCart);
    localStorage.setItem('cart', JSON.stringify(currentCart));
  }

  removeOne(product: Product): void {
    const currentCart = this.cartItems.value;
    const existingProduct = currentCart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity ?? 0) - 1;
      existingProduct.amount++;
      // Remove the product from the cart if quantity reaches zero
      if (existingProduct.quantity <= 0) {
        const index = currentCart.indexOf(existingProduct);
        if (index > -1) {
          currentCart.splice(index, 1);
        }
      }
      this.cartItems.next(currentCart);
      localStorage.setItem('cart', JSON.stringify(currentCart));
    }
  }

  removeProduct(product: Product): void {
    const currentCart = this.cartItems.value;
    const existingProduct = currentCart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.amount = existingProduct.quantity || 0;
      existingProduct.quantity = 0;
      product.quantity = existingProduct.quantity;
      product.amount = existingProduct.amount;
    }
    const index = currentCart.indexOf(product);
    if (index > -1) {
      currentCart.splice(index, 1);
    }
    this.cartItems.next(currentCart);
    localStorage.setItem('cart', JSON.stringify(currentCart));
  }

  clearCart() {
    const currentCart = this.cartItems.value;
    currentCart.forEach((item) => {
      item.amount = item.quantity ?? 0;
      item.quantity = 0;
    })
    this.cartItems.next([]);
    localStorage.removeItem('cart');
  }
}
