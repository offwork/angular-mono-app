import { HttpClientModule, HttpHandler } from '@angular/common/http';
import {
  InjectionToken,
  Injector,
  ModuleWithProviders,
  NgModule,
  Provider
} from '@angular/core';
import { HttpResponseHandlerService } from './interceptors/http-response-handler.service';
import {
  HttpInterceptorConfig,
  HttpService,
  InterceptorBehaviorService
} from './interceptors/http.service';
import { UrlRegexpInterceptorMatcher } from './interceptors/url-regexp-interceptor-matcher';
import { InternalHttpService } from './verbs';

export interface HttpConfig {
  interceptors: HttpInterceptorConfig[];
}
export const HTTP_CONFIG: InjectionToken<HttpConfig> = new InjectionToken<
  HttpConfig
>('HTTP_CONFIG');

export function httpFactory(
  responseHandler: HttpResponseHandlerService,
  handler: HttpHandler,
  injector: Injector,
  config: HttpConfig
): HttpService {
  return new HttpService(
    responseHandler,
    handler,
    new InterceptorBehaviorService(
      config.interceptors,
      injector,
      new UrlRegexpInterceptorMatcher()
    )
  );
}

export const HTTP_INTERCEPTOR_PROVIDER: Provider = {
  provide: HttpService,
  useFactory: httpFactory,
  deps: [HttpResponseHandlerService, HttpHandler, Injector, HTTP_CONFIG]
};

@NgModule({
  imports: [HttpClientModule],
  providers: [InternalHttpService]
})
export class HttpModule {
  public static forRoot(
    config: HttpConfig = { interceptors: [] }
  ): ModuleWithProviders {
    return {
      ngModule: HttpModule,
      providers: [
        {
          provide: HTTP_CONFIG,
          useValue: config
        },
        HTTP_INTERCEPTOR_PROVIDER
      ]
    };
  }

  public constructor() {}
}
