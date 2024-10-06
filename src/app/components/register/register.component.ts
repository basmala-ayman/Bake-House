import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

interface User {  // إضافة واجهة المستخدم
  name: string;
  email: string;
  password: string;
  phone: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private router: Router) {}

  errMsg: string = "";
  isLoading: boolean = false;

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  }, { validators: this.confirmPassword });

  confirmPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword')?.value;

    return password === rePassword ? null : { mismatch: true };
  }

  handleForm(): void {
    const userData: User = this.registerForm.value;  // استخدام واجهة User
    this.isLoading = true;

    const existingUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    // التحقق إذا كان المستخدم موجوداً بالفعل
    const isExistingUser = existingUsers.some((user: User) => user.email === userData.email); // تحديد نوع user
    if (isExistingUser) {
      this.errMsg = 'This email is already registered.';
      this.isLoading = false;
      return;
    }

    // إضافة المستخدم الجديد
    existingUsers.push(userData);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    console.log('Registration successful!', userData);
    this.router.navigate(['/login']);
    
    this.isLoading = false;
  }
}
