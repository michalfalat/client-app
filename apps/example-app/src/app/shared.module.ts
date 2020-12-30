import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, MatToolbarModule, MatMenuModule, MatInputModule, MatButtonModule],
  declarations: [],
  exports: [FormsModule, ReactiveFormsModule, TranslateModule, MatToolbarModule, MatMenuModule, MatInputModule, MatButtonModule],
  providers: [],
})
export class SharedModule {}
