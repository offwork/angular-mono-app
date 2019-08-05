import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sda-layout-footer',
  templateUrl: './layout-footer.component.html',
  styleUrls: ['./layout-footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutFooterComponent implements OnInit {
  /** Title of the application. */
  @Input() public info: string;

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

  public ngOnInit() {
    if (!this.logo) {
      this.logo = './assets/images/f-logo.svg';
    }
  }
}
