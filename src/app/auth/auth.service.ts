import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/map';
@Injectable()
export class AuthService {
  public get authState$(): Observable<boolean> {
    return this.afAuth.authState.pipe(map(user => user !== null));
  }
  constructor(private afAuth: AngularFireAuth) {}

  signupUser(email: string, password: string): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  signinUser(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<any> {
    return this.afAuth.auth.signOut().then(response => {
      localStorage.clear();
    });
  }

  getToken(): Promise<string> {
    return this.afAuth.auth.currentUser.getIdToken();
  }
}
