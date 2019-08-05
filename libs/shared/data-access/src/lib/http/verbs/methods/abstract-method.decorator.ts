import { HttpParams } from '@angular/common/http';
import { of, Observable } from 'rxjs';

import {
  HttpMethod,
  HttpRestOptions,
  HttpRestOptionsWithBody
} from '../../http';
import { sdaHttpParam, sdaParamType } from '../params/abstract-param.decorator';

declare const Reflect: any;

export const NOOP_HTTP: Observable<any> = of(undefined);

function parseParams(
  target: HttpParams,
  source: HttpParams | { [key: string]: string | string[] }
): HttpParams {
  let queryParams: HttpParams = target;
  if (source instanceof HttpParams) {
    source.keys().forEach((key: string) => {
      if ((<HttpParams>source).get(key) !== undefined) {
        queryParams = queryParams.set(key, (<HttpParams>source).get(key));
      }
    });
  } else {
    for (const key in source) {
      if (<any>source[key] !== undefined) {
        queryParams = queryParams.set(key, <any>source[key]);
      }
    }
  }
  return queryParams;
}

export function sdaAbstractMethod(config: {
  method: HttpMethod;
  path: string;
  options?: HttpRestOptions;
}): Function {
  return function(
    target: any,
    propertyName: string,
    descriptor: TypedPropertyDescriptor<Function>
  ): any {
    const wrappedFunction: Function = descriptor.value;
    // replace method call with our own and proxy it
    descriptor.value = function(): any {
      try {
        let replacedPath: string = config.path;
        const parameters: {
          index: number;
          param: string;
          type: sdaParamType;
        }[] = Reflect.getOwnMetadata(sdaHttpParam, target, propertyName);
        const newArgs: any[] = [];
        let body: any;
        let queryParams: HttpParams = new HttpParams();
        if (parameters) {
          // map parameters and see which type they are to act on them
          for (const parameter of parameters) {
            if (parameter.type === 'param') {
              newArgs[parameter.index] = arguments[parameter.index];
              replacedPath = replacedPath.replace(
                ':' + parameter.param,
                arguments[parameter.index]
              );
            } else if (parameter.type === 'body') {
              newArgs[parameter.index] = arguments[parameter.index];
              body = arguments[parameter.index];
            } else if (parameter.type === 'queryParams') {
              newArgs[parameter.index] = arguments[parameter.index];
              const qParams: HttpParams | { [key: string]: string | string[] } =
                arguments[parameter.index];
              if (config.options && config.options.params) {
                queryParams = parseParams(queryParams, config.options.params);
              }
              if (qParams) {
                queryParams = parseParams(queryParams, qParams);
              }
            }
          }
        }
        const url: string = this.baseUrl + replacedPath;
        const options: HttpRestOptionsWithBody = {
          ...config.options,
          body,
          params: queryParams
        };
        const request: any = this.buildRequest(config.method, url, options);
        if (parameters) {
          // see which one was the response parameter so we can set the request observable
          for (const parameter of parameters) {
            if (parameter.type === 'response') {
              newArgs[parameter.index] = request;
            }
          }
        }
        const response: any = wrappedFunction.apply(this, newArgs);
        // if the response is NOOP_HTTP or undefined, then we return the request as it is
        // else we return the response from the inner function
        if (response === NOOP_HTTP || response === undefined) {
          return request;
        } else {
          return response;
        }
      } catch (error) {
        console.error(error);
      }
    };
  };
}
