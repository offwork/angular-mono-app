import { ModuleWithProviders } from '@angular/compiler/src/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/' },
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        loadChildren: '@sda/slbot/feature-shell#SlbotFeatureShellModule'
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {
  initialNavigation: true
});
