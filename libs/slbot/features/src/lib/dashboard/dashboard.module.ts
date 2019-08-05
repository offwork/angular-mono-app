import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DialogComponent, DialogModule } from './dialog';
import { OffersComponent, OffersModule } from './offers';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: DialogComponent },
      { path: 'offers', component: OffersComponent }
    ]
  }
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, DialogModule, OffersModule, RouterModule],
  exports: [DashboardComponent]
})
export class DashboardModule {}
