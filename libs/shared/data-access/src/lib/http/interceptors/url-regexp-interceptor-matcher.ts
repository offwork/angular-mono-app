import { HttpInterceptorMapping } from './http-interceptor-mapping';
import { HttpInterceptorMatcher } from './http-interceptor-matcher';

/**
 * Concrete implementation for http interceptor matchers.
 * This implementation uses regex to check mapping paths vs request url.
 *
 * @author <https://github.com/offwork>
 * @export
 * @class UrlRegexpInterceptorMatcher
 * @implements {HttpInterceptorMatcher}
 */
export class UrlRegexpInterceptorMatcher implements HttpInterceptorMatcher {
  public matches(
    request: { url: string },
    mapping: HttpInterceptorMapping
  ): boolean {
    return (
      mapping.paths.filter((path: string) => {
        path = path
          .replace(/\*\*/gi, '<>')
          .replace(/\*/gi, '[a-zA-Z0-9\\-_]+')
          .replace(/<>/gi, '[a-zA-Z0-9\\-_/]*');
        if (path) {
          path += '(\\?{1}.*)?$';
          return new RegExp(path).test(request.url);
        }
        return false;
      }).length > 0
    );
  }
}
