import { sdaAbstractParam } from './abstract-param.decorator';

export function sdaParam(param: string): Function {
  return sdaAbstractParam('param', param);
}
