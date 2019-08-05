import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@sda/shared/ui';
import { DialogComponent } from './dialog.component';
import { FakeDialogService } from './fake-dialog.service';

@NgModule({
  declarations: [DialogComponent],
  imports: [CommonModule, MaterialModule],
  providers: [FakeDialogService],
  exports: [DialogComponent]
})
export class DialogModule {}
