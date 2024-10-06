import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormsModule,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  // errMsg: string = '';
  isLoading: boolean = false;

  // فرضية: بيانات المستخدمين المخزنة هنا في مصفوفة (يمكنك استبدالها بالتحقق من API أو خدمة)
  private storedUsers = [
    { email: 'test@example.com', password: 'password123' },
    { email: 'user1@example.com', password: 'password456' },
  ];

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      // Validators.minLength(6),
    ]),
  });

  constructor(private router: Router) {}

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  handleLogin(): void {
    const userData = this.loginForm.value;
    this.isLoading = true;

    // تحقق من بيانات تسجيل الدخول مقابل البيانات المخزنة
    const user = this.storedUsers.find(
      (u) => u.email === userData.email && u.password === userData.password
    );

    if (user) {
      // تسجيل دخول ناجح
      console.log('Login successful!');
      this.router.navigate(['/home']);
    } else {
      // تسجيل دخول فاشل
      // box say that login failed
    }

    this.isLoading = false;
  }
}
