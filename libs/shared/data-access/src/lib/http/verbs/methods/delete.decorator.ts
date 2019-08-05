import { HttpRestOptions } from '../../http';
import { sdaAbstractMethod } from './abstract-method.decorator';

export function sdaDELETE(config: {
  path: string;
  options?: HttpRestOptions;
}): Function {
  return sdaAbstractMethod(<any>{ method: 'DELETE', ...config });
}
