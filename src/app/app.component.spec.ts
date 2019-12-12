import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { Spy } from 'jasmine-auto-spies';
import { BehaviorSubject } from 'rxjs';
describe('AppComponent', () => {
  let appComponent: AppComponent;
  let authService: Spy<AuthService>;
  const authInitialState = null;

  const authSrvStub = {
    isAuthenticated$: new BehaviorSubject(authInitialState),
    // BehaviorSubject Here   -----^   reflects a synchronous test
    signupUser: jasmine.createSpy('signupUser'),
    signinUser: jasmine.createSpy('signinUser'),
    logout: jasmine.createSpy('logout'),
    getToken: jasmine.createSpy('getToken')
  };

  Given(() => {
    TestBed.configureTestingModule({
      providers: [
        AppComponent,
        {
          provide: AuthService,
          useValue: authSrvStub
        }
      ]
    });
    appComponent = TestBed.get(AppComponent);
    authService = TestBed.get(AuthService);
  });

  describe('INIT: check user auth state at component init', () => {
    When(() => {
      appComponent.ngOnInit(); // <===== no need to fakeSync it,
      // since BehaviorSubject (unlike promise) is synchronous for the first run
    });

    Then(done => {
      authService.isAuthenticated$.subscribe(() => {
        expect(appComponent.isAuthenticated).toEqual(authInitialState);
        done();
      });
    });
  });
});
