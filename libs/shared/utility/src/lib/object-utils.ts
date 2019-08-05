export class ObjectUtils {
  /**
   * Gets a value from an object by composed key
   * ObjectUtils.getValue({ item: { nodeType: 'cm:folder' }}, 'item.nodeType') ==> 'cm:folder'
   * @param target
   * @param key
   */
  public static getValue(target: any, key: string): any {
    if (!target) {
      return undefined;
    }

    const keys = key.split('.');
    key = '';

    do {
      key += keys.shift();
      const value = target[key];
      if (value !== undefined && (typeof value === 'object' || !keys.length)) {
        target = value;
        key = '';
      } else if (!keys.length) {
        target = undefined;
      } else {
        key += '.';
      }
    } while (keys.length);

    return target;
  }

  public static merge(...objects): any {
    const result = {};

    objects.forEach(source => {
      Object.keys(source).forEach(prop => {
        if (prop in result && Array.isArray(result[prop])) {
          result[prop] = result[prop].concat(source[prop]);
        } else if (prop in result && typeof result[prop] === 'object') {
          result[prop] = ObjectUtils.merge(result[prop], source[prop]);
        } else {
          result[prop] = source[prop];
        }
      });
    });

    return result;
  }
}
