import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';
/**
 * Here we don't need to import the AuthModule directly
 * from app.module.ts but rather let the app-routing.module.ts
 * do the job by lazy loading the module
 */
// import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';

import { HomeComponent } from './home/home.component';
import { SharedModule } from './common/shared.module';
import { environment } from './../environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // AuthModule
    SharedModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [AuthService, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule {}
