import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { AppConfigService, AppConfigValues } from './app-config.service';

@Injectable()
export class DebugConfigService extends AppConfigService {
  public constructor(private storage: StorageService, http: HttpClient) {
    super(http);
  }

  public get<T>(key: string, defaultValue?: T): T {
    if (key === AppConfigValues.OAUTHCONFIG) {
      return <T>(
        (JSON.parse(this.storage.getItem(key)) ||
          super.get<T>(key, defaultValue))
      );
    } else {
      return <T>(
        (<any>this.storage.getItem(key) || super.get<T>(key, defaultValue))
      );
    }
  }
}
