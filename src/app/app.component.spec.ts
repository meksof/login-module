import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';
import { of, BehaviorSubject } from 'rxjs';
describe('AppComponent', () => {
  let appComponent: AppComponent;
  let authService: Spy<AuthService>;
  let authFirstState = null;

  let authSrvStub = {
    isAuthenticated$: new BehaviorSubject(authFirstState),
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
    When(
      fakeAsync(() => {
        appComponent.ngOnInit().subscribe(authState => {
          tick();
        });
      })
    );

    Then(() => {
      expect(authService.isAuthenticated$).toBeFalsy();
    });
  });
});
