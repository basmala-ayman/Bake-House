import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Service/cart.service';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.currentCart.subscribe((items: Product[]) => {
      this.cartItems = items;
    });
  }

  calcDiscount(price: number, discount: number): number {
    return price - price * (discount / 100);
  }

  calcTotalPerItem(quantity: number, price: number): number {
    return price * quantity;
  }

  removeOne(product: Product): void {
    this.cartService.removeOne(product);
  }

  removeProduct(product: Product): void{
    this.cartService.removeProduct(product);
  }

  addOne(product: Product): void {
    this.cartService.addToCart(product);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  getTotalPrice(): number {
    let total = 0;
    for (const item of this.cartItems) {
      total += this.calcTotalPerItem(item.quantity ?? 0, item.discount > 0 ? this.calcDiscount(item.price, item.discount) : item.price);
    }
    return total;
  }
} 