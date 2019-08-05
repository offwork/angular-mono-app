import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'sda-toolbar-divider',
  template: `
    <div></div>
  `,
  host: { class: 'sda-toolbar-divider' },
  styles: [
    `
      .sda-toolbar-divider > div {
        height: 24px;
        width: 1px;
        background: rgba(0, 0, 0, 0.26);
        margin-left: 5px;
        margin-right: 5px;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarDividerComponent {}
