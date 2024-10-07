import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './Guard/auth.guard';
import { AuthLayoutComponent } from './Layouts/auth-layout/auth-layout.component'; // استيراد المكون
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { MainLayoutComponent } from './Layouts/main-layout/main-layout.component';
import { CakeComponent } from './components/cake/cake.component';
import { BakeryComponent } from './components/bakery/bakery.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'register', component: RegisterComponent, title: 'Register' },
    ],
  },
  {
    path: 'home',
    component: MainLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, title: 'Home'},
      { path: 'cake', component: CakeComponent, title: 'Cake'},
      { path: 'bakery', component: BakeryComponent, title: 'Bakery'}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutes {}
