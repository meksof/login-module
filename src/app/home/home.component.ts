import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'lm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  token: string;
  isAuthenticated$: Observable<boolean>;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isAuthenticated$ = this.authService.authState$;
  }
}
