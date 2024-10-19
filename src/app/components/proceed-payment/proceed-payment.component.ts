import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface CartItem {
  name: string;
  quantity: number;
  price: number;
  discount?: number; 
}

@Component({
  selector: 'app-proceed-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proceed-payment.component.html',
  styleUrls: ['./proceed-payment.component.scss']
})
export class ProceedPaymentComponent {
  cartItems: CartItem[] = [];

  constructor(private router: Router) {
    const cartItems = localStorage.getItem('cart');
    this.cartItems = cartItems ? JSON.parse(cartItems) : [];
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => {
      const quantity = item.quantity ?? 0; 
      const price = item.discount && item.discount > 0
        ? this.calcDiscount(item.price, item.discount) 
        : item.price; 
      return total + this.calcTotalPerItem(quantity, price); 
    }, 0);
  }

  calcTotalPerItem(quantity: number, price: number): number {
    return quantity * price; 
  }

  calcDiscount(price: number, discount: number): number {
    return price - price * (discount / 100);
  }

  confirmPayment() {
    alert('Payment confirmed! Thank you for your order.');
    this.router.navigate(['user/home']);
  }
}
