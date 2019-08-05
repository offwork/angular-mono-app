import { Pipe, PipeTransform } from '@angular/core';
import { AppConfigService } from './app-config.service';

@Pipe({
  name: 'sdaAppConfig'
})
export class AppConfigPipe implements PipeTransform {
  public constructor(private config: AppConfigService) {}

  public transform(value: string, fallback: any): any {
    return this.config.get(value, fallback);
  }
}
