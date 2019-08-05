import { SerdooApiService } from './serdoo-api.service';

export function startupServiceFactory(
  serdooApiService: SerdooApiService
): Function {
  return () => serdooApiService.load();
}
