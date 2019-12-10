import { LoginPage } from './login.po';
import { browser, by, logging } from 'protractor';
require('dotenv').load();
const checkCurrentUrl = url => {
  return browser.getCurrentUrl().then(
    actualUrl => {
      // console.log(`[actual url] => ${actualUrl}`);
      return url === actualUrl;
    },
    error => {
      return error;
    }
  );
};
describe('Login Page:', () => {
  let loginPage: LoginPage;
  beforeEach(() => {
    loginPage = new LoginPage();
  });

  it('Login form should be valid', done => {
    loginPage.navigateTo().then(async () => {
      loginPage.getEmailTextbox().sendKeys('info@test.com');
      loginPage.getPasswordTextbox().sendKeys('1234');
      let form = await loginPage.getForm().getAttribute('class');

      expect(form).toContain('ng-valid');
      done();
    });
  });

  it('Login form should be invalid when email or password are not valid', done => {
    loginPage.navigateTo().then(async () => {
      loginPage.getEmailTextbox().sendKeys('Not-valid-email');
      loginPage.getPasswordTextbox().sendKeys('');
      let form = await loginPage.getForm().getAttribute('class');

      expect(form).toContain('ng-invalid');
      done();
    });
  });

  it('User should be able to login with a correct email and password', async done => {
    // fill form and click login button
    await loginPage.navigateTo();
    // reset inputs

    // send user email and password
    await loginPage
      .getEmailTextbox()
      .clear()
      .then(() => {
        return loginPage
          .getEmailTextbox()
          .sendKeys(process.env.FIREBASE_USER_EMAIL);
      });
    await loginPage
      .getPasswordTextbox()
      .clear()
      .then(() => {
        return loginPage
          .getPasswordTextbox()
          .sendKeys(process.env.FIREBASE_USER_PASSWORD);
      });

    // click on login button
    await browser.driver.findElement(by.id('signin-btn')).click();

    // Login takes some time, so wait until it's done.
    // For the test app's login, we know it's done when it redirects to
    // '/'.

    checkCurrentUrl(browser.baseUrl)
      .then(success => {
        expect(success).toEqual(true);
        done();
      })
      .catch(error => {
        expect(error).toBeNull();
        done();
      });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser
      .manage()
      .logs()
      .get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE
      } as logging.Entry)
    );
  });
});
