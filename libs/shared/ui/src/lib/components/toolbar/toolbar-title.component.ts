import { Component } from '@angular/core';

@Component({
  selector: 'sda-toolbar-title',
  template: `
    <ng-content></ng-content>
  `,
  host: { class: 'sda-toolbar-title' }
})
export class ToolbarTitleComponent {}
