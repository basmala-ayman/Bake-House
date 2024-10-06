import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router) {}

  errMsg: string = "";
  isLoading: boolean = false;

  // فرضية: بيانات المستخدمين المخزنة هنا في مصفوفة (يمكنك استبدالها بالتحقق من API أو خدمة)
  private storedUsers = [
    { email: 'test@example.com', password: 'password123' },
    { email: 'user1@example.com', password: 'password456' },
  ];

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  handleLogin(): void {
    const userData = this.loginForm.value;
    this.isLoading = true;

    // تحقق من بيانات تسجيل الدخول مقابل البيانات المخزنة
    const user = this.storedUsers.find(u => u.email === userData.email && u.password === userData.password);

    if (user) {
      // تسجيل دخول ناجح
      console.log('Login successful!');
      this.router.navigate(['/home']);
    } else {
      // تسجيل دخول فاشل
      this.errMsg = 'Invalid email or password.';
    }

    this.isLoading = false;
  }
}
