import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LanguageMenuModule } from './components/language-menu';
import { SidenavLayoutModule } from './components/layout';
import { ToolbarModule } from './components/toolbar';
import { UserInfoModule } from './components/user-info';
import { MaterialModule } from './material/material.module';

@NgModule({
  imports: [
    CommonModule,
    SidenavLayoutModule,
    LanguageMenuModule,
    UserInfoModule,
    ToolbarModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    SidenavLayoutModule,
    LanguageMenuModule,
    UserInfoModule,
    ToolbarModule,
    MaterialModule
  ]
})
export class SharedUiModule {}
