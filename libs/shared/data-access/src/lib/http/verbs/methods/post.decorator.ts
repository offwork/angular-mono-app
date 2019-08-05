import { HttpRestOptions } from '../../http';
import { sdaAbstractMethod } from './abstract-method.decorator';

export function sdaPOST(config: {
  path: string;
  options?: HttpRestOptions;
}): Function {
  return sdaAbstractMethod(<any>{ method: 'POST', ...config });
}
