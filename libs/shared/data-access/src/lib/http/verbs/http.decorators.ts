import { HttpClient } from '@angular/common/http';

import { HttpService } from '../interceptors/http.service';
import { mixinHttp, HttpRestConfig } from './http.mixing';

export function SdaHttp(config: HttpRestConfig): Function {
  return function<T extends { new (...args: any[]): {} }>(
    constructor: any
  ): any {
    return class extends mixinHttp(constructor, config, HttpService) {};
  };
}

export function SdaHttpClient(config: HttpRestConfig): Function {
  return function<T extends { new (...args: any[]): {} }>(
    constructor: any
  ): any {
    return class extends mixinHttp(constructor, config, HttpClient) {};
  };
}
