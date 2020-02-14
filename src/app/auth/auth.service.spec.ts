import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, Subscription } from 'rxjs';

const fakeAuthState = new BehaviorSubject(null);
let fakeCredentials;
let fakeUser;

const fakeSignInHandler = (email, password): Promise<any> => {
  fakeAuthState.next(fakeUser);
  return Promise.resolve({});
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
    signOut: jasmine.createSpy('signOut').and.callFake(fakeSignOutHandler),
    currentUser: {
      getIdToken: jasmine.createSpy('getIdToken')
    }
  }
};

describe('AuthService', () => {
  let serviceUnderTest: AuthService;
  let afAuth: AngularFireAuth;
  let isAuthRef = false;
  let isAuth$: Subscription;

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
    // Get auth subscription
    isAuth$ = serviceUnderTest.authState$.subscribe(authResult => {
      isAuthRef = authResult;
    });
  });

  describe('User should not be initially authenticated', () => {
    Then(() => {
      // should return false
      expect(isAuthRef).toBe(false);
    });
  });

  describe('METHOD: signinUser', () => {
    Given(() => {
      fakeCredentials = {
        email: 'abc@123.com',
        password: 'password'
      };
    });
    When(() => {
      serviceUnderTest.signinUser(
        fakeCredentials.email,
        fakeCredentials.password
      );
    });

    Then(() => {
      expect(afAuth.auth.signInWithEmailAndPassword).toHaveBeenCalledWith(
        fakeCredentials.email,
        fakeCredentials.password
      );
      expect(isAuthRef).toEqual(true);
    });
  });

  describe('METHOD: signupUser', () => {
    Given(() => {
      fakeCredentials = {
        email: 'abc@123.com',
        password: 'password'
      };
    });
    When(() => {
      serviceUnderTest.signupUser(
        fakeCredentials.email,
        fakeCredentials.password
      );
    });

    Then(() => {
      expect(afAuth.auth.createUserWithEmailAndPassword).toHaveBeenCalledWith(
        fakeCredentials.email,
        fakeCredentials.password
      );
      expect(isAuthRef).toEqual(true);
    });
  });

  describe('METHOD: logout', () => {
    Given(() => {
      fakeUser = {
        uid: 'ABC123',
        email: 'fakeEmail'
      };
    });
    describe('GIVEN when user is already logged in THEN he should be logged out', () => {
      Given(() => {
        fakeAuthState.next(fakeUser);
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

  describe('METHOD: getToken', () => {
    When(() => {
      serviceUnderTest.getToken();
    });
    describe('THEN should return token from Firebase Auth service', () => {
      Then(() => {
        // should return token from Firebase Auth service
        expect(afAuth.auth.currentUser.getIdToken).toHaveBeenCalled();
      });
    });
  });

  afterEach(() => {
    fakeAuthState.next(null);

    isAuth$.unsubscribe();
  });
});
