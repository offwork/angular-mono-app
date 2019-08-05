import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { AppConfigService } from '../config/app-config.service';
import { StorageService } from './storage.service';

export enum UserPreferenceValues {
  PaginationSize = 'paginationSize',
  Locale = 'locale',
  SupportedPageSizes = 'supportedPageSizes',
  ExpandedSideNavStatus = 'expandedSidenav'
}
@Injectable({
  providedIn: 'root'
})
export class UserPreferencesService {
  public defaults = {
    paginationSize: 25,
    supportedPageSizes: [5, 10, 15, 20],
    locale: 'tr',
    expandedSidenav: true
  };

  private userPreferenceStatus: any = this.defaults;
  private onChangeSubject: BehaviorSubject<any>;
  public onChange: Observable<any>;

  public constructor(
    public translate: TranslateService,
    private appConfig: AppConfigService,
    private storage: StorageService
  ) {
    this.appConfig.onLoad.subscribe(this.initUserPreferenceStatus.bind(this));
    this.onChangeSubject = new BehaviorSubject(this.userPreferenceStatus);
    this.onChange = this.onChangeSubject.asObservable();
  }

  private initUserPreferenceStatus() {
    this.initUserLanguage();
    this.set(UserPreferenceValues.PaginationSize, this.paginationSize);
    this.set(
      UserPreferenceValues.SupportedPageSizes,
      JSON.stringify(this.supportedPageSizes)
    );
  }

  private initUserLanguage() {
    if (
      this.locale ||
      this.appConfig.get<string>(UserPreferenceValues.Locale)
    ) {
      this.set(
        UserPreferenceValues.Locale,
        this.locale || this.getDefaultLocale()
      );
    } else {
      this.setWithoutStore(
        UserPreferenceValues.Locale,
        this.locale || this.getDefaultLocale()
      );
    }
  }

  /**
   * Sets up a callback to notify when a property has changed.
   * @param property The property to watch
   * @returns Notification callback
   */
  public select(property: string): Observable<any> {
    return this.onChange.pipe(
      map(userPreferenceStatus => userPreferenceStatus[property]),
      distinctUntilChanged()
    );
  }

  /**
   * Gets a preference property.
   * @param property Name of the property
   * @param defaultValue Default to return if the property is not found
   * @returns Preference property
   */
  public get(property: string, defaultValue?: string): string {
    const key = this.getPropertyKey(property);
    const value = this.storage.getItem(key);
    if (value === undefined || value === null) {
      return defaultValue;
    }
    return value;
  }

  /**
   * Sets a preference property.
   * @param property Name of the property
   * @param value New value for the property
   */
  public set(property: string, value: any) {
    if (!property) {
      return;
    }
    this.storage.setItem(this.getPropertyKey(property), value);
    this.userPreferenceStatus[property] = value;
    this.onChangeSubject.next(this.userPreferenceStatus);
  }

  /**
   * Sets a preference property.
   * @param property Name of the property
   * @param value New value for the property
   */
  public setWithoutStore(property: string, value: any) {
    if (!property) {
      return;
    }
    this.userPreferenceStatus[property] = value;
    this.onChangeSubject.next(this.userPreferenceStatus);
  }

  /**
   * Check if an item is present in the storage
   * @param property Name of the property
   * @returns True if the item is present, false otherwise
   */
  public hasItem(property: string) {
    if (!property) {
      return;
    }
    return this.storage.hasItem(this.getPropertyKey(property));
  }

  /**
   * Gets the active storage prefix for preferences.
   * @returns Storage prefix
   */
  public getStoragePrefix(): string {
    return this.storage.getItem('USER_PROFILE') || 'GUEST';
  }

  /**
   * Sets the active storage prefix for preferences.
   * @param value Name of the prefix
   */
  public setStoragePrefix(value: string) {
    this.storage.setItem('USER_PROFILE', value || 'GUEST');
  }

  /**
   * Gets the full property key with prefix.
   * @param property The property name
   * @returns Property key
   */
  public getPropertyKey(property: string): string {
    return `${this.getStoragePrefix()}__${property}`;
  }

  /**
   * Gets an array containing the available page sizes.
   * @returns Array of page size values
   */
  public get supportedPageSizes(): number[] {
    const supportedPageSizes = this.get(
      UserPreferenceValues.SupportedPageSizes
    );

    if (supportedPageSizes) {
      return JSON.parse(supportedPageSizes);
    } else {
      return this.appConfig.get(
        'pagination.supportedPageSizes',
        this.defaults.supportedPageSizes
      );
    }
  }

  public set supportedPageSizes(value: number[]) {
    this.set(UserPreferenceValues.SupportedPageSizes, JSON.stringify(value));
  }

  /** Pagination size. */
  public set paginationSize(value: number) {
    this.set(UserPreferenceValues.PaginationSize, value);
  }

  public get paginationSize(): number {
    const paginationSize = this.get(UserPreferenceValues.PaginationSize);

    if (paginationSize) {
      return Number(paginationSize);
    } else {
      return Number(
        this.appConfig.get('pagination.size', this.defaults.paginationSize)
      );
    }
  }

  /** Current locale setting. */
  public get locale(): string {
    return this.get(UserPreferenceValues.Locale);
  }

  public set locale(value: string) {
    this.set(UserPreferenceValues.Locale, value);
  }

  /**
   * Gets the default locale.
   * @returns Default locale language code
   */
  public getDefaultLocale(): string {
    return (
      this.appConfig.get<string>(UserPreferenceValues.Locale) ||
      this.translate.getBrowserCultureLang() ||
      'tr'
    );
  }
}
