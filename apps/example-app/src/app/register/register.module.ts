import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { RegisterHomeComponent } from './home/register-home.component';
import { RegisterRoutingModule } from './register-routing.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [RegisterHomeComponent],
  imports: [CommonModule, RegisterRoutingModule, SharedModule, MatCardModule],
})
export class RegisterModule {}
