import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AuthLayoutComponent } from './Layouts/auth-layout/auth-layout.component';
import { NavAuthComponent } from './components/nav-auth/nav-auth.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { User } from './interfaces/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    AuthLayoutComponent,
    NavAuthComponent,
    FooterComponent,
    HomeComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], // تصحيح هنا
})
export class AppComponent {
  title = 'Bake House';
  users: User[] = [
    {
      name: 'Basmala Ayman',
      email: 'basmala.ayman@gmail.com',
      password: 'basmala123',
      phone: '01007521470',
    },
    {
      name: 'Aya Shams',
      email: 'aya.shams@gmail.com',
      password: 'aya123',
      phone: '01149593077',
    },
    {
      name: 'Farida Mahmoud',
      email: 'farida.mahmoud@gmail.com',
      password: 'farida123',
      phone: '010044995999',
    },
  ];

  getUsers(): User[]{
    return this.users;
  }
}
