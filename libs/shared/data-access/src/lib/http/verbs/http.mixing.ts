import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  inject,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  InjectFlags,
  INJECTOR,
  Optional,
  Self,
  SkipSelf,
  Type,
  ɵReflectionCapabilities
} from '@angular/core';
import { AppConfigService, AppConfigValues } from '@sda/shared/core';
import { Observable } from 'rxjs';

import {
  HttpMethod,
  HttpObserve,
  HttpResponseType,
  HttpRestOptions,
  HttpRestOptionsWithBody
} from '../http';
import { HttpService } from '../interceptors/http.service';

export interface HttpRestConfig {
  baseHeaders?: HttpHeaders;
  baseUrl?: string;
  defaultObserve?: HttpObserve;
  defaultResponseType?: HttpResponseType;
}

type Constructor<T> = new (...args: any[]) => T;

@Injectable({ providedIn: 'root' })
export class InternalHttpService {
  public static _injector: Injector = undefined;
  public constructor(_injector: Injector) {
    InternalHttpService._injector = _injector;
  }
}

function injectArgs(
  types: (Type<any> | InjectionToken<any> | any[])[],
  injector: Injector
): any[] {
  const args: any[] = [];
  for (let i: number = 0; i < types.length; i++) {
    const arg: any = types[i];
    if (arg) {
      if (Array.isArray(arg)) {
        if (arg.length === 0) {
          throw new Error('Arguments array must have arguments.');
        }
        // tslint:disable-next-line: no-unnecessary-initializer
        let type: Type<any> | undefined = undefined;
        let flags: InjectFlags = InjectFlags.Default;

        for (let j: number = 0; j < arg.length; j++) {
          const meta: any = arg[j];
          if (meta instanceof Optional || meta.ngMetadataName === 'Optional') {
            // tslint:disable-next-line: no-bitwise
            flags |= InjectFlags.Optional;
          } else if (
            meta instanceof SkipSelf ||
            meta.ngMetadataName === 'SkipSelf'
          ) {
            // tslint:disable-next-line: no-bitwise
            flags |= InjectFlags.SkipSelf;
          } else if (meta instanceof Self || meta.ngMetadataName === 'Self') {
            // tslint:disable-next-line: no-bitwise
            flags |= InjectFlags.Self;
          } else if (meta instanceof Inject) {
            type = meta.token;
          } else {
            type = meta;
          }
        }
        // tslint:disable-next-line: no-non-null-assertion
        args.push(injector.get(type!, flags));
      } else {
        // tslint:disable-next-line: deprecation
        args.push(injector.get(arg));
      }
    }
  }
  return args;
}

export function getInjector(): Injector {
  try {
    return inject(INJECTOR);
  } catch (err) {
    if (!InternalHttpService._injector) {
      throw new Error('Please add HttpModule into your imports.');
    }
    return InternalHttpService._injector;
  }
}

export function mixinHttp(
  base: any,
  config: HttpRestConfig,
  httpInject: Type<HttpClient | HttpService> = HttpService
): Constructor<any> {
  /**
   * Internal class used to get an instance of Injector for internal usage plus also
   * a way to inject services from the constructor of the underlying service
   * @internal
   */
  abstract class HttpInternalClass extends base {
    public constructor(...args: any[]) {
      super(
        ...(args && args.length
          ? args
          : injectArgs(
              new ɵReflectionCapabilities().parameters(base),
              getInjector()
            ))
      );
      this._injector = getInjector();
      this.buildConfig();
    }
    public abstract buildConfig(): void;
  }
  /**
   * Actuall class being returned with all the hooks for http usage
   * @internal
   */
  return class extends HttpInternalClass {
    private _baseUrl: string;
    public get baseUrl(): string {
      return (
        (typeof this.basePath === 'string'
          ? this.basePath.replace(/\/$/, '')
          : '') + this._baseUrl
      );
    }
    private _baseHeaders: HttpHeaders;
    private _defaultObserve?: HttpObserve;
    private _defaultResponseType?: HttpResponseType;

    public http: HttpClient | HttpService;

    /**
     * Method used to setup the configuration parameters and get an instance of the http service
     */
    public buildConfig(): void {
      this.http = this._injector.get(httpInject);
      const appConfig = new AppConfigService(this.http);
      appConfig.load().then(() => {
        if (config && config.baseUrl) {
          this._baseUrl = config.baseUrl.replace(/\/$/, '');
        } else {
          this._baseUrl = appConfig
            .get<string>(AppConfigValues.APIBASEURL)
            .replace(/\/$/, '');
        }
      });
      this._baseHeaders =
        config && config.baseHeaders ? config.baseHeaders : new HttpHeaders();
      this._defaultObserve =
        config && config.defaultObserve ? config.defaultObserve : 'body';
      this._defaultResponseType =
        config && config.defaultResponseType
          ? config.defaultResponseType
          : 'json';
    }

    /**
     * Method used to build the default headers using the base headers
     */
    public buildHeaders(): HttpHeaders {
      const headersObj: { [key: string]: any } = {};
      this._baseHeaders.keys().forEach((key: any) => {
        headersObj[key] = this._baseHeaders.get(key);
      });
      return new HttpHeaders(headersObj);
    }
    /* tslint:disable-next-line */
    buildRequest<HttpResponse>(
      method: 'POST' | 'PUT' | 'PATCH',
      url: string,
      options?: HttpRestOptionsWithBody
    ): Observable<HttpResponse>;
    /* tslint:disable-next-line */
    buildRequest<HttpResponse>(
      method: 'GET' | 'DELETE',
      url: string,
      options?: HttpRestOptions
    ): Observable<HttpResponse>;
    /* tslint:disable-next-line */
    buildRequest<HttpResponse>(
      method: HttpMethod,
      url: string,
      options?: HttpRestOptionsWithBody
    ): Observable<HttpResponse> {
      return this._buildRequest(method, url, options);
    }

    /**
     * Method used to build the request depending on the `http` service and HttpMethod
     */
    private _buildRequest(
      method: HttpMethod,
      url: string,
      options: HttpRestOptionsWithBody = {}
    ): Observable<any> {
      if (!options.responseType) {
        options.responseType = this._defaultResponseType;
      }
      if (!options.observe) {
        options.observe = this._defaultObserve;
      }
      if (!options.headers) {
        options.headers = this.buildHeaders();
      } else {
        let headers: HttpHeaders = this.buildHeaders();
        if (options.headers instanceof HttpHeaders) {
          (<HttpHeaders>options.headers).keys().forEach((key: any) => {
            headers = headers.set(key, (<HttpHeaders>options.headers).get(key));
          });
        } else {
          // tslint:disable-next-line: forin
          for (const key in options.headers) {
            headers = headers.set(key, <any>options.headers[key]);
          }
        }
        options.headers = headers;
      }
      return (<HttpService>this.http).request(method, url, options);
    }
  };
}
