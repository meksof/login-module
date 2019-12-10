import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';
import { SignupComponent } from './signup.component';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('SignupComponent', () => {
  let componentUnderTest: SignupComponent;
  let authService: Spy<AuthService>;
  Given(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        SignupComponent,
        {
          provide: AuthService,
          useValue: createSpyFromClass(AuthService)
        }
      ]
    });
    componentUnderTest = TestBed.get(SignupComponent);
    authService = TestBed.get(AuthService);
  });
  describe('METHOD: onSignup', () => {
    const messageError = 'Cannot create User';
    const form: NgForm = jasmine.createSpyObj({
      value: {
        email: '',
        password: ''
      }
    });

    When(
      fakeAsync(() => {
        componentUnderTest.onSignup(form);
        tick();
      })
    );
    describe('GIVEN One error occured during user creation THEN should display it', () => {
      Given(() => {
        // One error occured during user creation
        authService.signupUser.and.rejectWith({
          message: messageError
        });
      });
      Then(() => {
        // should display it
        expect(componentUnderTest.signupError).toBe(messageError);
      });
    });
  });
});
