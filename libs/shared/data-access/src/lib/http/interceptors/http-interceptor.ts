import { Observable } from 'rxjs';
import { HttpRestOptionsWithBody } from '../http';

/**
 * Interface for http interceptors.
 * Implement the methods you want to be executed in the request pipeline on interception.
 *
 * @author <https://github.com/offwork>
 * @export
 * @interface HttpInterceptor
 */
export interface HttpInterceptor {
  handleOptions?: (options: HttpRestOptionsWithBody) => HttpRestOptionsWithBody;
  handleResponse?: (observe: Observable<any>) => Observable<any>;
}
