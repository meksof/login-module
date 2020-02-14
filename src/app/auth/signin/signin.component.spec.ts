import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';
import { SigninComponent } from './signin.component';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
describe('SigninComponent', () => {
  let signinComponent: SigninComponent;
  let authService: Spy<AuthService>;
  let router: Router;
  let validEmail: string;
  let validPassword: string;
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

  describe('INIT: ', () => {
    When(() => {
      signinComponent.ngOnInit();
    });
    describe('THEN form fields should be created reactively', () => {
      Then(() => {
        // THEN form fields should be created reactively
        expect(signinComponent.email).toBeDefined();
        expect(signinComponent.password).toBeDefined();
        expect(signinComponent.loginForm).toBeDefined();
        expect(signinComponent.loginForm.valid).toBeFalsy();
      });
    });
  });

  describe('METHOD: onSignin', () => {
    Given(() => {
      // Init Login Form
      signinComponent.ngOnInit();
    });
    // Make sure to Destroy loginForm FormGroup instance
    afterEach(() => {
      signinComponent.loginForm = undefined;
      signinComponent.email = undefined;
      signinComponent.password = undefined;
    });
    When(
      fakeAsync(() => {
        signinComponent.onSignin();
      })
    );

    // Happy path :)
    describe(`GIVEN a valid Form
              THEN should process login (signin User)
                  AND redirect user to home page`, () => {
      Given(() => {
        validEmail = 'valid@email.com';
        validPassword = '12345678';
        // a valid Form
        signinComponent.email.setValue(validEmail);
        signinComponent.password.setValue(validPassword);
        expect(signinComponent.loginForm.valid).toBeTruthy();
        authService.signinUser
          .mustBeCalledWith(validEmail, validPassword)
          .resolveWith({} as firebase.auth.UserCredential);
      });
      Then(() => {
        // According to this issue: https://github.com/hirezio/jasmine-auto-spies/issues/18
        // `mustBeCalledWith` should take care of handling "method was not called" Error,
        // But while waiting for a fix we'r gone make sure the method 'authService.signinUser' was called
        //  AND add .toHaveBeenCalled here manualy:
        expect(authService.signinUser).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['/']);
      });
    });
    // Not valid form
    describe('GIVEN Form is not valid THEN Do nothing', () => {
      Given(() => {
        const notValidEmail = 'blabla';
        const notValidPassword = '';
        // Form is not valid
        signinComponent.email.setValue(notValidEmail);
        signinComponent.password.setValue(notValidPassword);
        expect(signinComponent.loginForm.invalid).toBeTruthy();
      });
      Then(() => {
        // Do nothing
        expect(signinComponent.onSignin()).toBeFalsy();
      });
    });
    // Unhappy path :(
    describe('GIVEN One error occured during user creation THEN should display it', () => {
      const fakeMessageError = 'Fake message';
      Given(() => {
        validEmail = 'valid@email.com';
        validPassword = '12345678';
        signinComponent.email.setValue(validEmail);
        signinComponent.password.setValue(validPassword);
        // One error occured during user creation
        expect(signinComponent.loginForm.valid).toBeTruthy();
        authService.signinUser.and.rejectWith({
          message: fakeMessageError,
          code: 'Fake Code'
        });
      });
      Then(() => {
        // should display it
        expect(signinComponent.formErrorMessage).toBe(fakeMessageError);
      });
    });
  });
});
