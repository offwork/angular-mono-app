import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../../material/material.module';
import { LayoutContainerComponent } from './components/layout-container/layout-container.component';
import { LayoutFooterComponent } from './components/layout-footer/layout-footer.component';
import { LayoutHeaderComponent } from './components/layout-header/layout-header.component';
import {
  SidebarActionComponent,
  SidebarMenuDirective,
  SidebarMenuExpandIconDirective,
  SidebarMenuTitleIconDirective
} from './components/sidebar-action/sidebar-action.component';
import { SidenavLayoutComponent } from './components/sidenav-layout/sidenav-layout.component';
import { SidenavLayoutContentDirective } from './directives/sidenav-layout-content.directive';
import { SidenavLayoutFooterDirective } from './directives/sidenav-layout-footer.directive';
import { SidenavLayoutHeaderDirective } from './directives/sidenav-layout-header.directive';
import { SidenavLayoutNavigationDirective } from './directives/sidenav-layout-navigation.directive';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    TranslateModule.forChild()
  ],
  declarations: [
    SidenavLayoutContentDirective,
    SidenavLayoutHeaderDirective,
    SidenavLayoutNavigationDirective,
    SidenavLayoutFooterDirective,
    LayoutHeaderComponent,
    LayoutContainerComponent,
    SidebarActionComponent,
    SidenavLayoutComponent,
    LayoutFooterComponent,
    SidebarMenuDirective,
    SidebarMenuTitleIconDirective,
    SidebarMenuExpandIconDirective
  ],
  exports: [
    SidenavLayoutContentDirective,
    SidenavLayoutHeaderDirective,
    SidenavLayoutNavigationDirective,
    SidenavLayoutFooterDirective,
    LayoutHeaderComponent,
    LayoutContainerComponent,
    SidebarActionComponent,
    SidenavLayoutComponent,
    LayoutFooterComponent,
    SidebarMenuDirective,
    SidebarMenuTitleIconDirective,
    SidebarMenuExpandIconDirective
  ]
})
export class LayoutModule {}
export { LayoutModule as SidenavLayoutModule };
