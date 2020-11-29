import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppUiModule } from '../app-ui.module';
import { SharedModule } from '../modules/shared/shared.module';
import { LayoutRoutingModule } from './layout-routing.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [CommonModule, RouterModule, LayoutRoutingModule, SharedModule],
})
export class LayoutModule {}
