import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent implements OnInit {
  constructor(public authService: AuthService, public fb: FormBuilder) {}

  formEmailAndPassword = {
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  };

  loginForm: FormGroup = this.fb.group({
    ...this.formEmailAndPassword,
  });

  registerForm: FormGroup = this.fb.group({
    ...this.formEmailAndPassword,
    displayName: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: this.fb.group({
      streetName: ['', Validators.required],
      streetNumber: ['', Validators.required],
      country: ['', Validators.required],
      ort: ['', Validators.required],
      plz: ['', Validators.required],
    }),
  });

  LoginWithEmail() {
    this.authService.SignIn(
      this.loginForm.get('email')?.value,
      this.loginForm.get('password')?.value
    );
  }

  SignUp() {
    this.authService.SignUp(this.registerForm.value);
  }
  ngOnInit(): void {}
}
