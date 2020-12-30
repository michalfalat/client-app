import { Component, OnInit } from '@angular/core';
import { CoreTranslateService } from '@client-platform/core-translate';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  languages: string[];
  constructor(private translateService: CoreTranslateService) {}

  ngOnInit(): void {
    this.languages = this.translateService.getLanguages();
  }

  setLanguage(lang: string): void {
    this.translateService.changeLanguage(lang);
  }
}
