import { TestBed, fakeAsync } from '@angular/core/testing';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';
import { SigninComponent } from './signin.component';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
describe('SigninComponent', () => {
  let signinComponent: SigninComponent;
  let authService: Spy<AuthService>;
  let router: Spy<Router>;
  const validEmail = 'valid@email.com';
  const validPassword = '12345678';
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
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    });
    signinComponent = TestBed.get(SigninComponent);
    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
  });

  Given(() => {
    // Isolating reactive FORM from component
    // create new Instance of Login Form for test isolation purpose
    signinComponent.email = new FormControl('');
    signinComponent.password = new FormControl('');
    signinComponent.loginForm = new FormGroup({
      email: signinComponent.email,
      password: signinComponent.password
    });
  });
  describe('METHOD: onSignin', () => {
    When(
      fakeAsync(() => {
        signinComponent.onSignin();
      })
    );
    describe(`GIVEN a valid Form
              THEN should process login (signin User)
                  AND redirect user to home page`, () => {
      Given(() => {
        // a valid Form
        signinComponent.email.setValue(validEmail);
        signinComponent.password.setValue(validPassword);
        authService.signinUser
          .mustBeCalledWith(validEmail, validPassword)
          .resolveWith({} as firebase.auth.UserCredential);
      });
      Then(() => {
        // According to this issue: https://github.com/hirezio/jasmine-auto-spies/issues/18
        // `mustBeCalledWith` should take care of handling method was not called Error,
        // But while waiting for a fix we'r gone make sure the method 'authService.signinUser' was called
        //  AND add .toHaveBeenCalled here manualy:
        expect(authService.signinUser).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['/']);
      });
    });
  });
});
