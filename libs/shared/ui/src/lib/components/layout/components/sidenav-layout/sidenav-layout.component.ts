import { MediaMatcher } from '@angular/cdk/layout';
import {
  AfterViewInit,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SidenavLayoutContentDirective } from '../../directives/sidenav-layout-content.directive';
import { SidenavLayoutFooterDirective } from '../../directives/sidenav-layout-footer.directive';
import { SidenavLayoutHeaderDirective } from '../../directives/sidenav-layout-header.directive';
import { SidenavLayoutNavigationDirective } from '../../directives/sidenav-layout-navigation.directive';

@Component({
  selector: 'sda-sidenav-layout',
  templateUrl: './sidenav-layout.component.html',
  styleUrls: ['./sidenav-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { class: 'sda-sidenav-layout' }
})
export class SidenavLayoutComponent
  implements OnInit, AfterViewInit, OnDestroy {
  public static STEP_OVER = 600;

  /** The side that the drawer is attached to. Possible values are 'start' and 'end'. */
  @Input() public position = 'start';
  /** Minimum size of the navigation region. */
  @Input() public sidenavMin: number;
  /** Maximum size of the navigation region. */
  @Input() public sidenavMax: number;
  /** Screen size at which display switches from small screen to large screen configuration. */
  @Input() public stepOver: number;
  /** Toggles showing/hiding the navigation region. */
  @Input() public hideSidenav = false;
  /** Should the navigation region be expanded initially? */
  @Input() public expandedSidenav = true;

  /** Emitted when the menu toggle and the collapsed/expanded state of the sideNav changes. */
  @Output() public expanded = new EventEmitter<boolean>();

  @ContentChild(SidenavLayoutHeaderDirective, {static: false})
  public headerDirective: SidenavLayoutHeaderDirective;
  @ContentChild(SidenavLayoutNavigationDirective, {static: false})
  public navigationDirective: SidenavLayoutNavigationDirective;
  @ContentChild(SidenavLayoutContentDirective, {static: false})
  public contentDirective: SidenavLayoutContentDirective;
  @ContentChild(SidenavLayoutFooterDirective, {static: false})
  public footerDirective: SidenavLayoutFooterDirective;

  @ViewChild('container', {static: false}) public container: any;
  @ViewChild('emptyTemplate', {static: false}) public emptyTemplate: any;

  public menuOpenState$: Observable<boolean>;
  public mediaQueryList: MediaQueryList;
  public templateContext = {
    toggleMenu: () => {},
    isMenuMinimized: () => this.isMenuMinimized
  };

  private _menuOpenStateSubject: BehaviorSubject<boolean>;
  private _isMenuMinimized: boolean;

  public get isMenuMinimized() {
    return this._isMenuMinimized;
  }

  public set isMenuMinimized(menuState: boolean) {
    this._isMenuMinimized = menuState;
    this._menuOpenStateSubject.next(!menuState);
  }

  public get isHeaderInside() {
    return this.mediaQueryList.matches;
  }

  public get headerTemplate(): TemplateRef<any> {
    return (
      (this.headerDirective && this.headerDirective.template) ||
      this.emptyTemplate
    );
  }

  public get navigationTemplate(): TemplateRef<any> {
    return (
      (this.navigationDirective && this.navigationDirective.template) ||
      this.emptyTemplate
    );
  }

  public get contentTemplate(): TemplateRef<any> {
    return (
      (this.contentDirective && this.contentDirective.template) ||
      this.emptyTemplate
    );
  }

  public get footerTemplate(): TemplateRef<any> {
    return (
      (this.footerDirective && this.footerDirective.template) ||
      this.emptyTemplate
    );
  }

  public constructor(private mediaMatcher: MediaMatcher) {
    this._onMediaQueryChange = this._onMediaQueryChange.bind(this);
  }

  public ngOnInit() {
    const initialMenuState = !this.expandedSidenav;

    this._menuOpenStateSubject = new BehaviorSubject<boolean>(initialMenuState);
    this.menuOpenState$ = this._menuOpenStateSubject.asObservable();

    const stepOver = this.stepOver || SidenavLayoutComponent.STEP_OVER;
    this.isMenuMinimized = initialMenuState;

    this.mediaQueryList = this.mediaMatcher.matchMedia(
      `(max-width: ${stepOver}px)`
    );
    this.mediaQueryList.addEventListener('change', this._onMediaQueryChange);
  }

  public ngAfterViewInit() {
    this.templateContext.toggleMenu = this.toggleMenu.bind(this);
  }

  public ngOnDestroy(): void {
    this.mediaQueryList.removeEventListener('change', this._onMediaQueryChange);
  }

  public toggleMenu() {
    if (!this.mediaQueryList.matches) {
      this.isMenuMinimized = !this.isMenuMinimized;
    } else {
      this.isMenuMinimized = false;
    }

    this.container.toggleMenu();
    this.expanded.emit(!this.isMenuMinimized);
  }

  private _onMediaQueryChange() {
    this.isMenuMinimized = false;
    this.expanded.emit(!this.isMenuMinimized);
  }
}
