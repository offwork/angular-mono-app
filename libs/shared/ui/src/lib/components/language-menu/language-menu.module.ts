import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../../material/material.module';
import { LanguageMenuComponent } from './language-menu/language-menu.component';

@NgModule({
  declarations: [LanguageMenuComponent],
  imports: [CommonModule, MaterialModule],
  exports: [LanguageMenuComponent]
})
export class LanguageMenuModule {}
