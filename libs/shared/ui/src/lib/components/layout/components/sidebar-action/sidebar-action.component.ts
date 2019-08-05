import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  Input,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'sda-sidebar-action',
  templateUrl: './sidebar-action.component.html',
  styleUrls: ['./sidebar-action.component.scss'],
  host: { class: 'sda-sidebar-action-menu' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarActionComponent {
  /** The title of the sidebar action. */
  @Input() public title: string;
  /** Toggle the sidebar action menu on expand. */
  @Input() public expanded: boolean;
  /** Width in pixels for sidebar action menu options. */
  @Input() public width: number = 272;

  public isExpanded(): boolean {
    return this.expanded;
  }
}

// tslint:disable-next-line: directive-selector
@Directive({ selector: 'sidebar-menu-options' })
export class SidebarMenuDirective {}
// tslint:disable-next-line: directive-selector
@Directive({ selector: 'sidebar-menu-title-icon' })
export class SidebarMenuTitleIconDirective {}
// tslint:disable-next-line: directive-selector
@Directive({ selector: 'sidebar-menu-expand-icon' })
export class SidebarMenuExpandIconDirective {}
