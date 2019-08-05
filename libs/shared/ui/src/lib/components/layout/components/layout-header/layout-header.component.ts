import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'sda-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss'],
  host: { class: 'sda-layout-header' },
  encapsulation: ViewEncapsulation.None
})
export class LayoutHeaderComponent implements OnInit {
  /** Title of the application. */
  @Input() public title: string;

  /** Path to an image file for the application logo. */
  @Input() public logo: string;

  /** The router link for the application logo, when clicked. */
  @Input() public redirectUrl: string | any[] = '/';

  /** The tooltip text for the application logo. */
  @Input() public tooltip: string;

  /**
   * Background color for the header. It can be any hex color code or one
   * of the Material theme colors: 'primary', 'accent' or 'warn'.
   */
  @Input() public color: string;

  /**
   * Toggles whether the sidenav button will be displayed in the header
   * or not.
   */
  @Input() public showSidenavToggle: boolean = true;

  /** Emitted when the sidenav button is clicked. */
  @Output() public clicked = new EventEmitter<any>();

  /** The side of the page that the drawer is attached to (can be 'start' or 'end') */
  @Input() public position = 'start';

  public toggleMenu() {
    this.clicked.emit(true);
  }

  public ngOnInit() {
    if (!this.logo) {
      this.logo = './assets/images/logo.svg';
    }
  }
}
