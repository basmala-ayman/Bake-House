import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ForgetPasswordComponent {
  forgetPasswordForm: FormGroup;
  submitted = false;
  message: string | null = null;

  constructor(private formBuilder: FormBuilder) {
    this.forgetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // Getter for easy access to form fields
  get f() {
    return this.forgetPasswordForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // Stop here if the form is invalid
    if (this.forgetPasswordForm.invalid) {
      return;
    }

    // Simulate sending the email
    this.message = `Reset code sent to  ${this.forgetPasswordForm.value.email} .`;
    this.forgetPasswordForm.reset();
    this.submitted = false;
  }
}
