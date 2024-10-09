import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Service/cart.service';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Subscribe to cart changes
    this.cartService.currentCart.subscribe((items: Product[]) => {
      this.cartItems = items;
    });
  }

  calcDiscount(price: number, discount: number): number {
    return price - price * (discount / 100);
  }

  calcTotalPerItem(quantity: number, price: number): number{
    return price * quantity;
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
