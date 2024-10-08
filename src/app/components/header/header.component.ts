import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  firstName = this.currentUser.name ? this.currentUser.name.split(' ') : ['User'];

  constructor(private router: Router) {}

  signOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']); // Change 'login' to your login route
  }
}
