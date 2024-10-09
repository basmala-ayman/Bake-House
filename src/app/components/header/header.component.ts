import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../Service/cart.service';

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

  // totalQuantity: number = 0;

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
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']); // Change 'login' to your login route
  }
}
