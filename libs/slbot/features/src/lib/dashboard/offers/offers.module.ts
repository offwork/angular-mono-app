import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@sda/shared/ui';
import { OffersComponent } from './offers.component';

@NgModule({
  declarations: [OffersComponent],
  imports: [CommonModule, MaterialModule],
  exports: [OffersComponent]
})
export class OffersModule {}
