import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../Service/cart.service';
import { JsonPipe } from '@angular/common';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  firstName = this.currentUser.name
    ? this.currentUser.name.split(' ')
    : ['User'];

  ngOnInit() {
    // Subscribe to the totalQuantity observable to get the latest quantity
    // CartService.getTotalQuantity().subscribe((quantity) => {
    //   this.totalQuantity = quantity;
    // });
  }

  getTotal(): number{
    let total: number = 0;
    if (localStorage.getItem('cart')) {
      let currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
      for (const item of currentCart) {
        total += item.quantity;
      }
    }
    return total;
  }

  constructor(private router: Router) {}

  signOut() {
    // let currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    // let allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
    // let currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]');
    // allUsers.forEach((user:User) => {
    //   if (user.email === currentUser.email) {
    //     user.order = currentCart;
    //   }
    // });
    // localStorage.setItem('allUsers', JSON.stringify(allUsers));
    // localStorage.removeItem('cart');
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']); // Change 'login' to your login route
  }
}
