import { ContentChild, Directive, TemplateRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'sda-sidenav-layout-header'
})
export class SidenavLayoutHeaderDirective {
  @ContentChild(TemplateRef, {static: false})
  public template: TemplateRef<any>;
}
