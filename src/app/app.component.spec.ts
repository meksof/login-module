import { fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { of } from 'rxjs';
describe('AppComponent', () => {
  let appComponent: AppComponent;
  let authService: AuthService;
  let AuthServiceSpy;
  let fakeAuthState: boolean;

  Given(() => {
    fakeAuthState = undefined;

    AuthServiceSpy = {
      get authState$() {
        // Note: weird behavior when using TestBed
        return of(false);
      },
      signinUser: jasmine.createSpy('signinUser'),
      signupUser: jasmine.createSpy('signupUser'),
      logout: jasmine.createSpy('logout').and.callFake(() => {
        return Promise.resolve();
      }),
      getToken: jasmine.createSpy('getToken')
    };

    // Note: For some reason, When i use TestBed,
    // I can't get the spyOnProperty to work
    // on the AuthServiceSpy getter property

    // TestBed.configureTestingModule({
    //   providers: [
    //     AppComponent,
    //     {
    //       provide: AuthService,
    //       useValue: AuthServiceSpy
    //     }
    //   ]
    // });
    appComponent = new AppComponent(AuthServiceSpy);

    authService = AuthServiceSpy;
  });

  describe('INIT: check user auth state at component init', () => {
    Given(() => {
      fakeAuthState = true;
      spyOnProperty(authService, 'authState$', 'get').and.returnValue(
        of(fakeAuthState)
      );
    });

    When(
      fakeAsync(() => {
        appComponent.ngOnInit();
        tick();
      })
    );

    Then(done => {
      // Since isAuthenticated$ is used inside the template with async pipe "|"
      // we check it here
      // Otherwise, we need to do a "DOM" test
      const subsc = appComponent.isAuthenticated$.subscribe(authRef => {
        expect(authRef).toBe(fakeAuthState);
        done();
      });
      subsc.unsubscribe();
    });
  });

  describe('METHOD: onLogout', () => {
    Given(() => {
      authService.logout();
    });
    When(
      fakeAsync(() => {
        appComponent.onLogout();
      })
    );
    Then(() => {
      expect(authService.logout).toHaveBeenCalled();
    });
  });
});
