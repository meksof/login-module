import { browser, by, element, ElementFinder } from 'protractor';
export class LoginPage {
  navigateTo() {
    return browser.get(browser.baseUrl + 'auth/login') as Promise<any>;
  }

  getEmailTextbox(): ElementFinder {
    return element(by.id('email'));
  }
  getPasswordTextbox(): ElementFinder {
    return element(by.id('password'));
  }

  getForm(): ElementFinder {
    return element(by.id('signin-form'));
  }
}
