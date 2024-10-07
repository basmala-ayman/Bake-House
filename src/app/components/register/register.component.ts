import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormsModule,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../Service/user.service';
import { User } from '../../interfaces/user';

// interface User {
//   name: string;
//   email: string;
//   password: string;
//   phone: string;
// }

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  users: User[] = [];

  ngOnInit() {
    // Access the users array from the service
    if (localStorage.getItem('allUsers')) {
      this.users = JSON.parse(localStorage.getItem('allUsers') || '[]');      
    }
  }
  constructor(private router: Router) {}

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      rePassword: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    { validators: this.confirmPassword }
  );

  confirmPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword')?.value;
    return password === rePassword ? null : { mismatch: true };
  }

  hide = signal(true);
  clickEvent() {
    this.hide.set(!this.hide());
  }

  toLogIn(): void {
    this.router.navigate(['/login']);
  }

  handleForm(): void {
    const newUser: User = this.registerForm.value;

    // if the email is already exist
    const isExistingUser = this.users.some(
      (user: User) => user.email === newUser.email
    );

    if (isExistingUser) {
      const modalElement = document.getElementById('staticBackdrop');
      if (modalElement) {
        const modal = new (window as any).bootstrap.Modal(modalElement); // Access the modal via window.bootstrap
        modal.show(); // This will show the modal
      }
      // this.isLoading = false;
      return;
    }

    // add new user to our all users
    UserService.pushUser(newUser);
    localStorage.setItem('allUsers', JSON.stringify(UserService.getUsers()));
    this.router.navigate(['/login']);
  }
}
