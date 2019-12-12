import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Subscription } from 'rxjs';

const fakeAuthState = new BehaviorSubject(null); // AngularFireAuth AuthState
let credentialsMock, userMock; // Firebase Auth credentials

const fakeSignInHandler = (email, password): Promise<any> => {
  fakeAuthState.next(userMock);
  return Promise.resolve(userMock);
};

const fakeSignOutHandler = (): Promise<any> => {
  fakeAuthState.next(null);
  return Promise.resolve();
};

const angularFireAuthStub = {
  authState: fakeAuthState,
  auth: {
    createUserWithEmailAndPassword: jasmine
      .createSpy('createUserWithEmailAndPassword')
      .and.callFake(fakeSignInHandler),
    signInWithEmailAndPassword: jasmine
      .createSpy('signInWithEmailAndPassword')
      .and.callFake(fakeSignInHandler),
    signOut: jasmine.createSpy('signOut').and.callFake(fakeSignOutHandler)
  }
};

describe('AuthService', () => {
  let serviceUnderTest: AuthService;
  let afAuth: AngularFireAuth;
  let isAuthRef: boolean;
  let isAuth$: Subscription;

  // component config
  Given(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
          provide: AngularFireAuth,
          useValue: angularFireAuthStub
        }
      ]
    });
    serviceUnderTest = TestBed.get(AuthService);
    afAuth = TestBed.get(AngularFireAuth);
  });

  Given(() => {
    // Get auth subscription
    isAuth$ = serviceUnderTest.isAuthenticated$.subscribe(authResult => {
      isAuthRef = authResult;
    });
    // Set Firebase Auth credentials for all tests
    // Firebase user Auth credentials
    credentialsMock = {
      email: 'abc@123.com',
      password: 'password'
    };
    // Firebase user object
    userMock = {
      uid: 'ABC123',
      email: 'abc@123.com'
    };
  });

  describe('User should not be initially authenticated', () => {
    Then(() => {
      // should return false
      expect(isAuthRef).toBe(false);
    });
  });

  describe('METHOD: signinUser', () => {
    When(() => {
      serviceUnderTest.signinUser(
        credentialsMock.email,
        credentialsMock.password
      );
    });

    Then(() => {
      expect(afAuth.auth.signInWithEmailAndPassword).toHaveBeenCalledWith(
        credentialsMock.email,
        credentialsMock.password
      );
      expect(isAuthRef).toEqual(true);
    });
  });

  describe('METHOD: signupUser', () => {
    When(() => {
      serviceUnderTest.signupUser(
        credentialsMock.email,
        credentialsMock.password
      );
    });

    Then(() => {
      expect(afAuth.auth.createUserWithEmailAndPassword).toHaveBeenCalledWith(
        credentialsMock.email,
        credentialsMock.password
      );
      expect(isAuthRef).toEqual(true);
    });
  });

  describe('METHOD: logout', () => {
    describe('GIVEN when user is already logged in THEN he should be logged out', () => {
      Given(() => {
        fakeAuthState.next(userMock);
        expect(isAuthRef).toBe(true);
      });
      When(() => {
        serviceUnderTest.logout();
      });

      Then(() => {
        expect(isAuthRef).toEqual(false);
      });
    });
  });

  afterEach(() => {
    fakeAuthState.next(null); // logout
    // unsubscribe and release memory
    isAuth$.unsubscribe();
  });
});
