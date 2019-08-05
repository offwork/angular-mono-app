import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
  TranslateStore
} from '@ngx-translate/core';

import { AppConfigModule } from './config/app-config.module';
import { SerdooApiService } from './services/serdoo-api.service';
import { startupServiceFactory } from './services/startup-service-factory';
import { TranslateLoaderService } from './services/translate-loader.service';
import { TranslationService } from './services/translation.service';
@NgModule({
  imports: [TranslateModule.forChild(), CommonModule, AppConfigModule],
  exports: [TranslateModule, CommonModule, AppConfigModule]
})
export class SharedCoreModule {
  public static forChild(): ModuleWithProviders {
    return {
      ngModule: SharedCoreModule
    };
  }

  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedCoreModule,
      providers: [
        TranslateStore,
        TranslateService,
        { provide: TranslateLoader, useClass: TranslateLoaderService },
        {
          provide: APP_INITIALIZER,
          useFactory: startupServiceFactory,
          deps: [SerdooApiService],
          multi: true
        }
      ]
    };
  }

  public constructor(public translation: TranslationService) {
    translation.addTranslationFolder('ui', 'assets/ui');
  }
}
