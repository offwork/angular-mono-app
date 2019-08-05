import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'sda-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  host: { class: 'sda-toolbar' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
  /** Toolbar title. */
  @Input() public title: string = '';
  /** Toolbar color. Can be changed to empty value (default), `primary`, `accent` or `warn`. */
  @Input() public color: string = '';
}
