import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginHomeComponent } from './home/login-home.component';
import { LoginResetPasswordComponent } from './reset-password/login-reset-password.component';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  declarations: [LoginHomeComponent, LoginResetPasswordComponent],
  imports: [CommonModule, LoginRoutingModule],
})
export class LoginModule {}
