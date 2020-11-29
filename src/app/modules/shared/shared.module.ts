import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AppUiModule } from 'src/app/app-ui.module';
import { ContainerComponent } from './container/container.component';

@NgModule({
  declarations: [HeaderComponent, ContainerComponent],
  imports: [CommonModule, AppUiModule],
  exports: [HeaderComponent, ContainerComponent],
})
export class SharedModule {}
