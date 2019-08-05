import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../../material/material.module';
import { UserInfoComponent } from './components/user-info/user-info.component';

@NgModule({
  declarations: [UserInfoComponent],
  imports: [CommonModule, MaterialModule, TranslateModule.forChild()],
  exports: [UserInfoComponent]
})
export class UserInfoModule {}
