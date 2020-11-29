import { Location } from '@angular/common';
import { Component, Injector, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationExtras, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  template: '',
})
export class CommonComponent implements OnDestroy {
  subscriptions = new Subscription();
  router: Router;
  title: Title;
  locationRouter: Location;

  constructor(injector: Injector) {
    this.router = injector.get(Router);
    this.title = injector.get(Title);
    this.locationRouter = injector.get(Location);
  }
  /**
   * Helpers functions
   */

  navigateTo = (
    url: string,
    p1?: string,
    p2?: string,
    p3?: string,
    p4?: string
  ): void => {
    const routerLink = this.format(url, p1, p2, p3, p4);
    this.navigateByUrl(encodeURI(routerLink));
  };

  navigateToReplace = (
    url: string,
    p1?: string,
    p2?: string,
    p3?: string,
    p4?: string
  ): void => {
    const routerLink = this.format(url, p1, p2, p3, p4);
    this.navigateByUrl(encodeURI(routerLink), { replaceUrl: true });
  };

  navigateByUrl = (page: string, extras?: NavigationExtras): void => {
    this.router.navigateByUrl(page, extras);
  };

  navigateToWithParams = (
    url: string,
    params: Params,
    replaceUrl?: boolean
  ): void => {
    this.router.navigate([url], { replaceUrl, queryParams: params });
  };

  getUrl = (
    url: string,
    p1?: string,
    p2?: string,
    p3?: string,
    p4?: string
  ): string => this.format(url, p1, p2, p3, p4);

  navigateBack = (): void => {
    this.locationRouter.back();
  };

  format(input: string, ...args: any[]): string {
    return input.replace(/{(\d+)}/g, (match, num) =>
      typeof args[num] !== 'undefined' ? args[num] : match
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
