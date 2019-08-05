import { HttpRestOptions } from '../../http';
import { sdaAbstractMethod } from './abstract-method.decorator';

export function sdaPUT(config: {
  path: string;
  options?: HttpRestOptions;
}): Function {
  return sdaAbstractMethod(<any>{ method: 'PUT', ...config });
}
