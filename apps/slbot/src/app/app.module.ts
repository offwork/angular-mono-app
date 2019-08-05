import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  AppConfigService,
  AutomationService,
  DebugConfigService,
  SharedCoreModule,
  TRANSLATION_PROVIDER
} from '@sda/shared/core';
import { HttpModule } from '@sda/shared/data-access';

import { routing } from './app-routes';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    routing,
    HttpClientModule,
    FlexLayoutModule,
    SharedCoreModule.forRoot(),
    HttpModule.forRoot()
  ],
  providers: [
    { provide: AppConfigService, useClass: DebugConfigService },
    {
      provide: TRANSLATION_PROVIDER,
      useValue: {
        name: 'app',
        source: 'resources'
      },
      multi: true
    },
    AutomationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  public constructor(automationService: AutomationService) {
    automationService.setup();
  }
}
