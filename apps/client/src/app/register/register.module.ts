import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { RegisterHomeComponent } from './home/register-home.component';
import { RegisterRoutingModule } from './register-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [RegisterHomeComponent],
  imports: [CommonModule, RegisterRoutingModule, SharedModule, MatCardModule, MatInputModule, MatButtonModule],
})
export class RegisterModule {}
