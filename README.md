[![Build Status](https://travis-ci.com/meksof/login-module.svg?branch=master)](https://travis-ci.com/meksof/login-module)
[![codecov](https://codecov.io/gh/meksof/login-module/branch/master/graph/badge.svg)](https://codecov.io/gh/meksof/login-module)

# LoginModule

Repository for [medium tutorial article](https://medium.com/@meksof/why-using-ngmodule-in-your-angular-2-application-is-always-a-best-practice-5e72d39ead47) on how to make your first NgModule. link to medium article.
The Authentication service was made using [Firebase](https://console.firebase.google.com/), so you need to:

- Create a firebase app first
- Create `.env` file in the root folder
- then put your `apiKey` and `authDomain` respectively for `FIREBASE_APIKEY` and `FIREBASE_AUTHDOMAIN` keys.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Add a real authenticated user into Firebase console,
Add `FIREBASE_USER_EMAIL` `FIREBASE_USER_PASSWORD` keys to your `.env` file.
Then Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
