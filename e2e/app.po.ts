import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getLoginBtn(): ElementFinder {
    return element(by.id('login-btn'));
  }
}
