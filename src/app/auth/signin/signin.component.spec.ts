import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';
import { SigninComponent } from './signin.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
describe('SigninComponent', () => {
  let componentUnderTest: SigninComponent;
  let authService: Spy<AuthService>;
  let router: Router;
  const routerSpy = {
    navigate: jasmine.createSpy('navigate')
  };

  Given(() => {
    TestBed.configureTestingModule({
      providers: [
        SigninComponent,
        {
          provide: AuthService,
          useValue: createSpyFromClass(AuthService)
        },
        {
          provide: Router,
          useValue: routerSpy
        }
      ]
    });
    componentUnderTest = TestBed.get(SigninComponent);
    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
  });
  describe('METHOD: onSignin', () => {
    let fakeCredentials = {
      email: 'fakeEmail@fake.com',
      password: 'fakePassword'
    };
    When(
      fakeAsync(() => {
        componentUnderTest.onSignin();
        tick();
      })
    );
    describe('GIVEN user provided correct email and password THEN navigate to home', () => {
      Given(() => {
        // user provided correct email and password
        componentUnderTest.ngOnInit(); // init formGoup instance
        componentUnderTest.loginForm.setValue(fakeCredentials);
        authService.signinUser.and.resolveWith(true);
      });
      Then(() => {
        expect(authService.signinUser).toHaveBeenCalledWith(
          fakeCredentials.email,
          fakeCredentials.password
        );
        // navigate to home
        expect(router.navigate).toHaveBeenCalledWith(['/']);
      });
    });
  });
});
