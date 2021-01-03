import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class CoreTranslateService {
  constructor(private translateService: TranslateService) {
    this.translateService.addLangs(['en', 'sk', 'cs']);
  }

  changeLanguage(lang: string): void {
    this.translateService.use(lang);
  }

  getTranslation(key: string): string {
    return this.translateService.instant(key);
  }

  getLanguages(): string[] {
    return this.translateService.getLangs();
  }
}
