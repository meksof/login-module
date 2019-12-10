import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'lm-user-credentials',
  templateUrl: './user-credentials.component.html',
  styleUrls: ['./user-credentials.component.css']
})
export class UserCredentialsComponent implements OnInit {

  constructor(private authService: AuthService) { }

  token: string;

  ngOnInit() {
    this.getToken();
  }

  getToken() {
    this.authService.getToken().then( token => {
      this.token = token;
    })
  }

}
