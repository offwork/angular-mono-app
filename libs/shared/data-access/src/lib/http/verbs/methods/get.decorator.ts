import { HttpRestOptions } from '../../http';
import { sdaAbstractMethod } from './abstract-method.decorator';

export function sdaGET(config: {
  path: string;
  options?: HttpRestOptions;
}): Function {
  return sdaAbstractMethod(<any>{ method: 'GET', ...config });
}
