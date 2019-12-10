import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onSignup(form: NgForm) {
    this.signupError = undefined;
    const email = form.value.email;
    const password = form.value.password;
    this.submitting = true;
    this.authService.signupUser(email, password).then(
      res => {
        this.router.navigate(['/']);
        this.submitting = false;
      },
      error => {
        this.signupError = error.message;
        this.submitting = false;
      }
    );
  }
}
