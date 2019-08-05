import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedUiModule } from '@sda/shared/ui';
import { dashboardRoutes, DashboardModule } from '@sda/slbot/features';

import { TranslateModule } from '@ngx-translate/core';
import { SlbotLayoutComponent } from './components/slbot-layout/slbot-layout.component';
import { NestedMenuPositionDirective } from './directives/nested-menu-position.directive';

const routes: Routes = [
  {
    path: '',
    component: SlbotLayoutComponent,
    children: dashboardRoutes
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedUiModule,
    DashboardModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild()
  ],
  declarations: [SlbotLayoutComponent, NestedMenuPositionDirective],
  exports: [SlbotLayoutComponent]
})
export class SlbotFeatureShellModule {}
