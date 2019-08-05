import { sdaAbstractParam } from './abstract-param.decorator';

export function sdaResponse(): Function {
  return sdaAbstractParam('response');
}
