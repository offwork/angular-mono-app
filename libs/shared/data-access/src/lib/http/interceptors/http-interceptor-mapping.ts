import { HttpInterceptor } from './http-interceptor';

/**
 *
 * Interface for http interceptor mappings.
 * Maps the interceptor with the desired interception rule.
 *
 * @author <https://github.com/offwork>
 * @export
 * @interface HttpInterceptorMapping
 */
export interface HttpInterceptorMapping {
  interceptor: HttpInterceptor;
  paths: string[];
}
