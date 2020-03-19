import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'lm-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;
  formErrorMessage: any;
  submitting = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', Validators.required);
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  onSignin(): void | boolean {
    if (this.loginForm.invalid) {
      return false;
    }
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.submitting = true;
    this.authService.signinUser(email, password).then(
      () => {
        this.submitting = false;
        this.router.navigate(['/']);
      },
      error => {
        // Handle Errors here.
        // const errorCode = error.code;
        const errorMessage = error.message;
        this.formErrorMessage = errorMessage;
      }
    );
  }
}
