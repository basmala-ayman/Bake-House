import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  cartItems = []; // Make sure to receive this data, possibly through a service

  constructor(private router: Router) {
    // Ideally, you would fetch the cart items from a service
    this.cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Example of fetching cart items
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + this.calcTotalPerItem(item.quantity, item.price), 0);
  }

  calcTotalPerItem(quantity: number, price: number) {
    return quantity * price;
  }

  confirmPayment() {
    // Payment logic goes here
    alert('Payment confirmed! Thank you for your order.');
    this.router.navigate(['/']); // Redirect to home or confirmation page
  }
}
