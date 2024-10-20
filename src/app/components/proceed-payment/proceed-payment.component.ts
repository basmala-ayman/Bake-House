import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [ /* your components */ ],
  imports: [CommonModule, FormsModule], 
  bootstrap: [ /* your bootstrap component */ ]
})

export class AppModule {}

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
  payment: { cvv: string } = { cvv: '' };

  constructor(private router: Router) {
    const cartItems = localStorage.getItem('cart');
    this.cartItems = cartItems ? JSON.parse(cartItems) : [];
  }

  formatCvv(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove non-digit characters
    if (value.length > 3) {
      value = value.slice(0, 3); // Limit to 3 digits
    }
    input.value = value; // Set the formatted value back to the input
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
    console.log('Payment confirmed!'); // Log to check if the method is triggered
    alert('Payment confirmed! Thank you for your order.');
    
    // Clear the cart from localStorage
    localStorage.removeItem('cart');
    
    // Clear the cart array
    this.cartItems = [];

    // Navigate to the home page
    this.router.navigate(['/home']); 
  }

  formatExpiryDate(event: Event) {
    const input = event.target as HTMLInputElement; // Cast the event target to HTMLInputElement
    let value = input.value.replace(/\D/g, ''); // Remove any non-digit characters

    if (value.length > 2) {
        // Format as MM/YY
        const month = value.slice(0, 2);
        const year = value.slice(2, 4);

        // Limit month to 12
        const validMonth = Math.min(parseInt(month), 12).toString().padStart(2, '0');

        value = `${validMonth}/${year}`; // Insert '/' after the first two digits
    }

    input.value = value; // Set the formatted value back to the input
  }
}
