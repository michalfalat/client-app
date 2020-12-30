import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule],
  declarations: [],
  exports: [FormsModule, ReactiveFormsModule, TranslateModule],
  providers: [],
})
export class SharedModule {}
