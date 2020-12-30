import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '@client-platform/core';
import { CoreTranslateModule } from '@client-platform/core-translate';
import { APP_CONFIG } from '@client-platform/app-config';
import { LayoutModule } from './layouts/layout.module';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, RouterModule.forRoot([], { initialNavigation: 'enabled' }), HttpClientModule, CoreModule, CoreTranslateModule, LayoutModule],
  providers: [{ provide: APP_CONFIG, useValue: environment }],
  bootstrap: [AppComponent],
})
export class AppModule {}
