import { Component, Injector, OnInit } from '@angular/core';
import { AuthFacade } from 'src/app/core/store/auth/auth.facade';
import { CommonComponent } from 'src/app/shared/common.component';

@Component({
  selector: 'app-register-home',
  templateUrl: './register-home.component.html',
  styleUrls: ['./register-home.component.scss'],
})
export class RegisterHomeComponent extends CommonComponent implements OnInit {
  authFacade: AuthFacade;
  constructor(injector: Injector) {
    super(injector);
    this.authFacade = injector.get(AuthFacade);
  }

  ngOnInit(): void {
    console.log('dispathcing');
    this.authFacade.login({
      email: 'asdasd',
      password: 'asdasd',
      remember: false,
    });
  }

  onRegister(): void {
    this.authFacade.register({});
  }
}
