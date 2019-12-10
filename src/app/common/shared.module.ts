import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCredentialsComponent } from './user-credentials/user-credentials.component';

@NgModule({
  declarations: [UserCredentialsComponent],
  imports: [
    CommonModule
  ],
  exports: [
    UserCredentialsComponent
  ]
})
export class SharedModule { }
