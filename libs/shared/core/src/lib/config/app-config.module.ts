import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppConfigPipe } from './app-config.pipe';

@NgModule({
  declarations: [AppConfigPipe],
  exports: [AppConfigPipe],
  imports: [HttpClientModule]
})
export class AppConfigModule {}
