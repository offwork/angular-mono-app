import { HttpRestOptions } from '../../http';
import { sdaAbstractMethod } from './abstract-method.decorator';

export function sdaPATCH(config: {
  path: string;
  options?: HttpRestOptions;
}): Function {
  return sdaAbstractMethod(<any>{ method: 'PATCH', ...config });
}
