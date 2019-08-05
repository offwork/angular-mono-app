import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { TranslateLoaderService } from './translate-loader.service';
import {
  UserPreferencesService,
  UserPreferenceValues
} from './user-preferences.service';

export const TRANSLATION_PROVIDER = new InjectionToken(
  'Injection token for translation providers.'
);

export interface TranslationProvider {
  name: string;
  source: string;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  public defaultLang: string;
  public userLang: string;
  public customLoader: TranslateLoaderService;

  public constructor(
    private translate: TranslateService,
    userPreferencesService: UserPreferencesService,
    @Optional() @Inject(TRANSLATION_PROVIDER) providers: TranslationProvider[]
  ) {
    this.customLoader = <TranslateLoaderService>this.translate.currentLoader;

    this.defaultLang = 'tr';
    translate.setDefaultLang(this.defaultLang);
    this.customLoader.setDefaultLang(this.defaultLang);

    if (providers && providers.length > 0) {
      for (const provider of providers) {
        this.addTranslationFolder(provider.name, provider.source);
      }
    }

    userPreferencesService
      .select(UserPreferenceValues.Locale)
      .subscribe(locale => {
        if (locale) {
          this.userLang = locale;
          this.use(this.userLang);
        }
      });
  }

  /**
   * Adds a new folder of translation source files.
   * @param name Name for the translation provider
   * @param path Path to the folder
   */
  public addTranslationFolder(name: string = '', path: string = '') {
    if (!this.customLoader.providerRegistered(name)) {
      this.customLoader.registerProvider(name, path);

      if (this.userLang) {
        this.loadTranslation(this.userLang, this.defaultLang);
      } else {
        this.loadTranslation(this.defaultLang);
      }
    }
  }

  /**
   * Loads a translation file.
   * @param lang Language code for the language to load
   * @param fallback Language code to fall back to if the first one was unavailable
   */
  public loadTranslation(lang: string, fallback?: string) {
    this.translate.getTranslation(lang).subscribe(
      () => {
        this.translate.use(lang);
        this.onTranslationChanged(lang);
      },
      () => {
        if (fallback && fallback !== lang) {
          this.loadTranslation(fallback);
        }
      }
    );
  }

  /**
   * Triggers a notification callback when the translation language changes.
   * @param lang The new language code
   */
  public onTranslationChanged(lang: string): void {
    this.translate.onTranslationChange.next({
      lang,
      translations: this.customLoader.getFullTranslationJSON(lang)
    });
  }

  /**
   * Sets the target language for translations.
   * @param lang Code name for the language
   * @returns Translations available for the language
   */
  public use(lang: string): Observable<any> {
    this.customLoader.init(lang);
    return this.translate.use(lang);
  }

  /**
   * Gets the translation for the supplied key.
   * @param key Key to translate
   * @param interpolateParams String(s) to be interpolated into the main message
   * @returns Translated text
   */
  public get(
    key: string | Array<string>,
    interpolateParams?: Object
  ): Observable<string | any> {
    return this.translate.get(key, interpolateParams);
  }

  /**
   * Directly returns the translation for the supplied key.
   * @param key Key to translate
   * @param interpolateParams String(s) to be interpolated into the main message
   * @returns Translated text
   */
  public instant(
    key: string | Array<string>,
    interpolateParams?: Object
  ): string | any {
    return key ? this.translate.instant(key, interpolateParams) : '';
  }
}
