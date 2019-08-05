import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { ObjectUtils } from '@sda/shared/utility';

export enum AppConfigValues {
  APP_CONFIG_LANGUAGES_KEY = 'languages',
  PROVIDERS = 'providers',
  OAUTHCONFIG = 'oauth2',
  MILLENICOMHOST = 'millenicomHost',
  BASESHAREURL = 'baseShareUrl',
  APIBASEURL = 'apiBaseUrl',
  TURKTELEKOMHOST = 'turkTelekomHost',
  IDENTITY_HOST = 'identityHost',
  AUTHTYPE = 'authType',
  CONTEXTROOTMILLENICOM = 'contextRootMillenicom',
  CONTEXTROOTTURKTELEKOM = 'contextRootTurkTelekom',
  SERDOO_REPOSITORY_NAME = 'serdooRepositoryName',
  LOG_LEVEL = 'logLevel',
  LOGIN_ROUTE = 'loginRoute',
  DISABLECSRF = 'disableCSRF',
  AUTH_WITH_CREDENTIALS = 'auth.withCredentials'
}

export enum Status {
  INIT = 'init',
  LOADING = 'loading',
  LOADED = 'loaded'
}

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  public config: any = {
    application: {
      name: 'Serdoo Dashboard App'
    },
    millenicomHost: 'http://{hostname}{:port}/millenicom',
    turkTelekomHost: 'http://{hostname}{:port}/turktelekom',
    logLevel: 'silent',
    serdooRepositoryName: 'serdoo-dashboard-app'
  };

  public status: Status = Status.INIT;
  public onLoad: Observable<any>;
  protected onLoadSubject: Subject<any>;

  public constructor(private http: HttpClient) {
    this.onLoadSubject = new Subject();
    this.onLoad = this.onLoadSubject.asObservable();
  }

  /**
   * Requests notification of a property value when it is loaded.
   * @param property The desired property value
   * @returns Property value, when loaded
   */
  public select(property: string): Observable<any> {
    return this.onLoadSubject.pipe(
      map(config => config[property]),
      distinctUntilChanged()
    );
  }

  /**
   * Gets the value of a named property.
   * @param key Name of the property
   * @param defaultValue Value to return if the key is not found
   * @returns Value of the property
   */
  public get<T>(key: string, defaultValue?: T): T {
    let result: any = ObjectUtils.getValue(this.config, key);
    if (typeof result === 'string') {
      const keywords = new Map<string, string>();
      keywords.set('hostname', this.getLocationHostname());
      keywords.set(':port', this.getLocationPort(':'));
      keywords.set('port', this.getLocationPort());
      keywords.set('protocol', this.getLocationProtocol());
      result = this.formatString(result, keywords);
    }
    if (result === undefined) {
      return defaultValue;
    }
    return <T>result;
  }

  /**
   * Loads the config file.
   * @returns Notification when loading is complete
   */
  public load(): Promise<any> {
    return new Promise(async resolve => {
      const configUrl = `app.config.json?v=${Date.now()}`;

      if (this.status === Status.INIT) {
        this.status = Status.LOADING;
        await this.http.get(configUrl).subscribe(
          (data: any) => {
            this.status = Status.LOADED;
            this.config = { ...this.config, ...(data || {}) };
            this.onLoadSubject.next(this.config);
            resolve(this.config);
          },
          () => {
            resolve(this.config);
          }
        );
      } else if (this.status === Status.LOADED) {
        resolve(this.config);
      } else if (this.status === Status.LOADING) {
        this.onLoad.subscribe(() => {
          resolve(this.config);
        });
      }
    });
  }

  /**
   * Gets the location.protocol value.
   * @returns The location.protocol string
   */
  public getLocationProtocol(): string {
    return location.protocol;
  }

  /**
   * Gets the location.hostname property.
   * @returns Value of the property
   */
  public getLocationHostname(): string {
    return location.hostname;
  }

  /**
   * Gets the location.port property.
   * @param prefix Text added before port value
   * @returns Port with prefix
   */
  public getLocationPort(prefix: string = ''): string {
    return location.port ? prefix + location.port : '';
  }

  private formatString(str: string, keywords: Map<string, string>): string {
    let result = str;

    keywords.forEach((value, key) => {
      const expr = new RegExp('{' + key + '}', 'gm');
      result = result.replace(expr, value);
    });

    return result;
  }
}
