declare const Reflect: any;
export type sdaParamType = 'param' | 'response' | 'body' | 'queryParams';
export const sdaHttpParam: Symbol = Symbol('sdaHttpParam');

export function sdaAbstractParam(type: sdaParamType, param?: string): Function {
  return function(
    target: Object,
    propertyKey: string | symbol,
    paramterIndex: number
  ): void {
    const parameters: { index: number; param: string; type: sdaParamType }[] =
      Reflect.getOwnMetadata(sdaHttpParam, target, propertyKey) || [];
    parameters.push({
      index: paramterIndex,
      param,
      type
    });
    Reflect.defineMetadata(sdaHttpParam, parameters, target, propertyKey);
  };
}
