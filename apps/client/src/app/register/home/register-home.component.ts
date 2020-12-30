import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthFacade, CommonComponent } from '@client-platform/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-register-home',
  templateUrl: './register-home.component.html',
  styleUrls: ['./register-home.component.scss'],
})
export class RegisterHomeComponent extends CommonComponent implements OnInit {
  authFacade: AuthFacade;
  constructor(injector: Injector) {
    super(injector);
    this.authFacade = injector.get(AuthFacade);
    this.createForm({
      firstName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  onRegister(): void {
    this.authFacade.register({
      name: this.form?.value.firstName,
      password: this.form?.value.password,
      email: this.form?.value.email,
    });
  }
}
