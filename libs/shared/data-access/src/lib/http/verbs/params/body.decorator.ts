import { sdaAbstractParam } from './abstract-param.decorator';

export function sdaBody(): Function {
  return sdaAbstractParam('body');
}
