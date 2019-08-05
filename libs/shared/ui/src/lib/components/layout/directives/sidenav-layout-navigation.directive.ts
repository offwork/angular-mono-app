import { ContentChild, Directive, TemplateRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'sda-sidenav-layout-navigation'
})
export class SidenavLayoutNavigationDirective {
  @ContentChild(TemplateRef, {static: false})
  public template: TemplateRef<any>;
}
