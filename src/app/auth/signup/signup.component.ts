import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'lm-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupError: string;
  submitting = false;
  email: FormControl;
  password: FormControl;
  signupForm: FormGroup;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', Validators.required);
    this.signupForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  onSignup(): void {
    this.signupError = undefined;
    this.submitting = true;
    this.authService
      .signupUser(this.email.value, this.password.value)
      .then(userCred => {
        this.router.navigate(['/']);
        this.submitting = false;
      })
      .catch(error => {
        this.signupError = error.message;
        this.submitting = false;
      });
  }
}
