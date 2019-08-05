import { HttpHeaders, HttpParams } from '@angular/common/http';

export type HttpMethod =
  | 'DELETE'
  | 'HEAD'
  | 'GET'
  | 'PATCH'
  | 'POST'
  | 'PUT'
  | 'OPTIONS';

export type HttpResponseType = 'arraybuffer' | 'blob' | 'json' | 'text';

export type HttpObserve = 'body' | 'events' | 'response';

/**
 *
 *
 * @author <https://github.com/offwork>
 * @export
 * @interface HttpRestOptions
 */
export interface HttpRestOptions {
  headers?: HttpHeaders | { [headers: string]: string | string[] };
  observe?: HttpObserve;
  params?: HttpParams | { [param: string]: string | string[] };
  responseType?: HttpResponseType;
  reportProgress?: boolean;
  withCredentials?: boolean;
}
/**
 *
 *
 * @author <https://github.com/offwork>
 * @export
 * @interface HttpRestOptionsWithBody
 * @extends {HttpRestOptions}
 */
export interface HttpRestOptionsWithBody extends HttpRestOptions {
  body?: any;
}
