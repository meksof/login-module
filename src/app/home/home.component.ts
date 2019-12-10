import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'lm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  token: string;
  isAuthenticated = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe(authState => {
      this.isAuthenticated = authState;
    });
  }
}
