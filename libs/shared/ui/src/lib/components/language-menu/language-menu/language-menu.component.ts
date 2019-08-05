import { Component, OnInit } from '@angular/core';
import {
  AppConfigService,
  AppConfigValues,
  UserPreferencesService
} from '@sda/shared/core';

@Component({
  selector: 'sda-language-menu',
  templateUrl: './language-menu.component.html',
  styleUrls: ['./language-menu.component.scss']
})
export class LanguageMenuComponent implements OnInit {
  public languages: Array<any> = [
    { key: 'tr', label: 'Turkish' },
    { key: 'en', label: 'English' }
  ];

  public constructor(
    private appConfig: AppConfigService,
    private userPreference: UserPreferencesService
  ) {}

  public ngOnInit() {
    const languagesConfigApp = this.appConfig.get<Array<any>>(
      AppConfigValues.APP_CONFIG_LANGUAGES_KEY
    );
    if (languagesConfigApp) {
      this.languages = languagesConfigApp;
    }
  }

  public changeLanguage(lang: string) {
    this.userPreference.locale = lang;
  }
}
