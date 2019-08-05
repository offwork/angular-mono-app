import { sdaAbstractParam } from './abstract-param.decorator';

export function sdaQueryParams(): Function {
  return sdaAbstractParam('queryParams');
}
