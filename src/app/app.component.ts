import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AuthLayoutComponent } from './Layouts/auth-layout/auth-layout.component';
import { NavAuthComponent } from './components/nav-auth/nav-auth.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, AuthLayoutComponent, NavAuthComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], // تصحيح هنا
})
export class AppComponent {
  title = 'Bake House';
}
