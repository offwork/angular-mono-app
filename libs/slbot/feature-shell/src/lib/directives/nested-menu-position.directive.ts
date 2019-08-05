import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[sdaNestedMenuPosition]'
})
export class NestedMenuPositionDirective {
  @Input() public menuMinimized: string;

  public nestedMenuLeftPadding: string = '220px';

  @HostListener('click', ['$event'])
  public onClick() {
    const overlayContainer = document.querySelector(
      '.cdk-overlay-connected-position-bounding-box'
    ) as HTMLElement;
    (document.querySelector('.cdk-overlay-pane') as HTMLElement).style.width =
      '100%';

    if (!this.menuMinimized) {
      setTimeout(() => {
        overlayContainer.style.left = this.nestedMenuLeftPadding;
      });
    }
  }
}
