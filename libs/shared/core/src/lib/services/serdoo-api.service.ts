import { Injectable } from '@angular/core';
import { AppConfigService } from '../config/app-config.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SerdooApiService {
  public constructor(
    protected appConfig: AppConfigService,
    protected storage: StorageService
  ) {}

  public async load() {
    await this.appConfig.load().then(() => {
      this.initSerdooApi();
    });
  }

  protected initSerdooApi() {
    // TODO: The paths of Silent URL, Base URL, and API router
    // that the application needs are must configure here.
    console.log('... do sometimes serdo api initialized!!!');
  }
}
