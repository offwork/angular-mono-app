import {
  HttpClient,
  HttpHandler,
  HttpHeaders,
  HttpParams,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injector, Type } from '@angular/core';
import { throwError, Observable, Subscriber } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { HttpRestOptionsWithBody } from '../http';
import { HttpInterceptor } from './http-interceptor';
import { HttpInterceptorMapping } from './http-interceptor-mapping';
import { HttpInterceptorMatcher } from './http-interceptor-matcher';
import { HttpResponseHandlerService } from './http-response-handler.service';

export interface HttpInterceptorConfig {
  interceptor: Type<any>;
  paths: string[];
}

export class InterceptorBehaviorService {
  private _requestInterceptors: HttpInterceptorMapping[] = [];

  public get requestInterceptors(): HttpInterceptorMapping[] {
    return this._requestInterceptors;
  }

  public get httpInterceptorMatcher(): HttpInterceptorMatcher {
    return this._httpInterceptorMatcher;
  }

  public constructor(
    public requestInterceptorConfigs: HttpInterceptorConfig[],
    private _intecjor: Injector,
    private _httpInterceptorMatcher: HttpInterceptorMatcher
  ) {
    requestInterceptorConfigs.forEach((config: HttpInterceptorConfig) => {
      this._requestInterceptors.push({
        interceptor: <HttpInterceptor>this._intecjor.get(config.interceptor),
        paths: config.paths
      });
    });
  }
}

export class HttpService extends HttpClient {
  public constructor(
    protected httpresponseHandler: HttpResponseHandlerService,
    private _handler: HttpHandler,
    private _interceptorBehaviorService: InterceptorBehaviorService
  ) {
    super(_handler);
  }

  public request(
    req: string | HttpRequest<any>,
    url?: string,
    options: {
      body?: any;
      header?: HttpHeaders | { [header: string]: string | string[] };
      observe?: 'body' | 'events' | 'response';
      params?: HttpParams | { [param: string]: string | string[] };
      reportProgress?: boolean;
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
      withCredentials?: boolean;
    } = {}
  ): Observable<any> {
    const interceptor: HttpInterceptor[] = this._interceptorBehaviorService.requestInterceptors
      .filter((mapping: HttpInterceptorMapping) =>
        this._interceptorBehaviorService.httpInterceptorMatcher.matches(
          { url },
          mapping
        )
      )
      .map((mapping: HttpInterceptorMapping) => mapping.interceptor);

    return this._setupRequest({ req, url, options, interceptors: interceptor });
  }

  private _setupRequest({
    req,
    url,
    options,
    interceptors
  }: {
    req: string | HttpRequest<any>;
    url?: string;
    options: HttpRestOptionsWithBody;
    interceptors: HttpInterceptor[];
  }): Observable<HttpResponse<any>> {
    try {
      options = this._requestResolve(options, interceptors);
    } catch (err) {
      return new Observable<any>((subscriber: Subscriber<any>) =>
        subscriber.error(err)
      );
    }
    return this._handleResponseResolve(
      super.request(<any>req, url, options),
      interceptors
    );
  }

  private _requestResolve(
    options: HttpRestOptionsWithBody,
    interceptors: HttpInterceptor[]
  ): HttpRestOptionsWithBody {
    interceptors.forEach((interceptor: HttpInterceptor) => {
      if (interceptor.handleOptions) {
        options = interceptor.handleOptions(options);
      }
    });
    return options;
  }

  private _handleResponseResolve(
    obs: Observable<any>,
    interceptors: HttpInterceptor[]
  ): Observable<any> {
    interceptors.reverse().forEach((interceptor: HttpInterceptor) => {
      if (interceptor.handleResponse) {
        obs = interceptor.handleResponse(obs);
      }
    });
    // TODO: Must be caught up errors here and handled in the HttpResponseHandlerService.
    return obs.pipe(
      map(res => console.log('res: ', res)),
      catchError((err, caught) => this.httpresponseHandler.onCatch(err, caught))
    );
  }
}
