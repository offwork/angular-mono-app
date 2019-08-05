import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { ToolbarDividerComponent } from './toolbar-divider.component';
import { ToolbarTitleComponent } from './toolbar-title.component';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    ToolbarTitleComponent,
    ToolbarDividerComponent
  ],
  imports: [CommonModule, MaterialModule],
  exports: [ToolbarComponent, ToolbarTitleComponent, ToolbarDividerComponent]
})
export class ToolbarModule {}
