import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth/auth.service';
@Component({
  selector: 'lm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean;
  constructor(public authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }

  ngOnInit() {
    const isAuthRef = this.authService.isAuthenticated$;
    isAuthRef.subscribe(authState => {
      this.isAuthenticated = authState;
    });
    return isAuthRef;
  }
}
