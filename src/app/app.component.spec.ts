import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { Spy } from 'jasmine-auto-spies';
import { of, BehaviorSubject } from 'rxjs';
describe('AppComponent', () => {
  let appComponent: AppComponent;
  let authService: Spy<AuthService>;
  let authInitialState = false;

  class AuthSrvStub {
    get authState$() {
      return of(authInitialState);
    }
    logout(): Promise<void> {
      return Promise.resolve();
    }
  }

  Given(() => {
    TestBed.configureTestingModule({
      providers: [
        AppComponent,
        {
          provide: AuthService,
          useClass: AuthSrvStub
        }
      ]
    });
    appComponent = TestBed.get(AppComponent);
    authService = TestBed.get(AuthService);
  });

  describe('INIT: check user auth state at component init', () => {
    let fakeAuthState = true;
    Given(() => {
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

    Then(
      fakeAsync(() => {
        // Since isAuthenticated$ is used inside the template
        appComponent.isAuthenticated$.subscribe(authRef => {
          expect(authRef).toBe(fakeAuthState);
          tick();
        });
      })
    );
  });

  describe('METHOD: onLogout', () => {
    When(() => {
      appComponent.onLogout();
    });
    Then(() => {
      expect(authService.logout).toHaveBeenCalled();
    });
  });
});
