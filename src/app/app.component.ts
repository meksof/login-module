import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'lm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;
  constructor(public authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.isAuthenticated$ = this.authService.authState$;
  }
}
