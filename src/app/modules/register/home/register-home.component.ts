import { Component, Injector, OnInit } from '@angular/core';
import { CommonComponent } from 'src/app/shared/common.component';

@Component({
  selector: 'app-register-home',
  templateUrl: './register-home.component.html',
  styleUrls: ['./register-home.component.scss'],
})
export class RegisterHomeComponent extends CommonComponent implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {}
}
