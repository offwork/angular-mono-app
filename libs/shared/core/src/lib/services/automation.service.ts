import { Injectable } from '@angular/core';
import { AppConfigService } from '../config/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class AutomationService {
  public constructor(private appConfigService: AppConfigService) {}

  public setup() {
    const sdaProxy = window['sda'] || {};
    sdaProxy.setConfigField = (field: string, value: string) => {
      this.appConfigService.config[field] = JSON.parse(value);
    };
    window['sda'] = sdaProxy;
  }
}
