import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginHomeComponent } from './home/login-home.component';
import { LoginResetPasswordComponent } from './reset-password/login-reset-password.component';



@NgModule({
  declarations: [LoginHomeComponent, LoginResetPasswordComponent],
  imports: [
    CommonModule
  ]
})
export class LoginModule { }
