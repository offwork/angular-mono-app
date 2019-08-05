import { HttpInterceptorMapping } from './http-interceptor-mapping';

/**
 * Interface for http interceptor matchers.
 * Implement a class to set the behavior of how the interceptors are matched with the requests.
 * @author <https://github.com/offwork>
 * @export
 * @interface HttpInterceptorMatcher
 */
export interface HttpInterceptorMatcher {
  matches(request: { url: string }, mapping: HttpInterceptorMapping): boolean;
}
