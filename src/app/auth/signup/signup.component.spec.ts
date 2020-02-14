import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';
import { SignupComponent } from './signup.component';
import { NgForm, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

describe('SignupComponent', () => {
  let signupComponent: SignupComponent;
  let authService: Spy<AuthService>;
  let router: Router;
  const validEmail = 'valid@email.com';
  const validPassword = '12345678';
  Given(() => {
    TestBed.configureTestingModule({
      providers: [
        SignupComponent,
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
    signupComponent = TestBed.get(SignupComponent);
    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
  });
  describe('INIT: At component init', () => {
    When(() => {
      signupComponent.ngOnInit();
    });
    describe('should init signupForm reactively', () => {
      Then(() => {
        // init signupForm reactively
        expect(signupComponent.email).toBeDefined();
        expect(signupComponent.password).toBeDefined();
        expect(signupComponent.signupForm).toBeDefined();
      });
    });
  });
  describe('METHOD: onSignup', () => {
    const messageError = 'Cannot create User';
    // Isolating reactive FORM from component
    // create new Instance of Login Form for test isolation purpose
    Given(() => {
      signupComponent.email = new FormControl('');
      signupComponent.password = new FormControl('');
      signupComponent.signupForm = new FormGroup({
        email: signupComponent.email,
        password: signupComponent.password
      });
    });

    When(
      fakeAsync(() => {
        signupComponent.onSignup();
        tick();
      })
    );
    // Happy path
    describe('GIVEN user enter valid credentials THEN create user and redirect to home page', () => {
      Given(() => {
        // user enter valid credentials
        signupComponent.email.setValue(validEmail);
        signupComponent.password.setValue(validPassword);
        authService.signupUser
          .mustBeCalledWith(validEmail, validPassword)
          .resolveWith({} as firebase.auth.UserCredential);
      });
      Then(() => {
        // create user and redirect to home page
        // According to this issue: https://github.com/hirezio/jasmine-auto-spies/issues/18
        // `mustBeCalledWith` should take care of handling "method was not called" Error,
        // But while waiting for a fix we'r gone make sure the method 'authService.signinUser' was called
        //  AND add .toHaveBeenCalled here manualy:
        expect(authService.signupUser).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['/']);
      });
    });

    // Unhappy path
    describe('GIVEN One error occured during user creation THEN should display it', () => {
      Given(() => {
        // One error occured during user creation
        authService.signupUser.and.rejectWith({
          message: messageError
        });
      });
      Then(() => {
        // should display it
        expect(signupComponent.signupError).toBe(messageError);
      });
    });
  });
});
