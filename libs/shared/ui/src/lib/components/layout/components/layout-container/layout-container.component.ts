import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { MatSidenav } from '@angular/material';
import {
  contentAnimationLeft,
  contentAnimationRight,
  sidenavAnimation
} from '../../animations/animations';

@Component({
  selector: 'sda-layout-container',
  templateUrl: './layout-container.component.html',
  styleUrls: ['./layout-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [sidenavAnimation, contentAnimationLeft, contentAnimationRight]
})
export class LayoutContainerComponent implements OnInit, OnDestroy {
  @Input() public sidenavMin: number;
  @Input() public sidenavMax: number;
  // " | any", because Safari throws an error otherwise...
  @Input() public mediaQueryList: MediaQueryList | any;
  @Input() public hideSidenav: boolean = false;
  @Input() public expandedSidenav: boolean = true;
  /** The side that the drawer is attached to 'start' | 'end' page */
  @Input() public position: string = 'start';

  @ViewChild(MatSidenav, {static: false}) public sidenav: MatSidenav;

  public SIDENAV_STATES = { MOBILE: {}, EXPANDED: {}, COMPACT: {} };
  public CONTENT_STATES = { MOBILE: {}, EXPANDED: {}, COMPACT: {} };

  public sidenavAnimationState: any;
  public contentAnimationState: any;

  public get isMobileScreenSize(): boolean {
    return this.mediaQueryList.matches;
  }

  public constructor() {
    this._onMediaQueryChange = this._onMediaQueryChange.bind(this);
  }

  public ngOnInit() {
    this.SIDENAV_STATES.MOBILE = {
      value: 'expanded',
      params: { width: this.sidenavMax }
    };
    this.SIDENAV_STATES.EXPANDED = {
      value: 'expanded',
      params: { width: this.sidenavMax }
    };
    this.SIDENAV_STATES.COMPACT = {
      value: 'compact',
      params: { width: this.sidenavMin }
    };

    this.CONTENT_STATES.MOBILE = { value: 'expanded', params: { margin: 0 } };
    this.CONTENT_STATES.EXPANDED = {
      value: 'expanded',
      params: { margin: this.sidenavMin }
    };
    this.CONTENT_STATES.COMPACT = {
      value: 'compact',
      params: { margin: this.sidenavMax }
    };

    this.mediaQueryList.addEventListener('change', this._onMediaQueryChange);

    if (this.isMobileScreenSize) {
      this.sidenavAnimationState = this.SIDENAV_STATES.MOBILE;
      this.contentAnimationState = this.CONTENT_STATES.MOBILE;
    } else if (this.expandedSidenav) {
      this.sidenavAnimationState = this.SIDENAV_STATES.EXPANDED;
      this.contentAnimationState = this.CONTENT_STATES.COMPACT;
    } else {
      this.sidenavAnimationState = this.SIDENAV_STATES.COMPACT;
      this.contentAnimationState = this.CONTENT_STATES.EXPANDED;
    }
  }

  public ngOnDestroy() {
    this.mediaQueryList.removeEventListener('change', this._onMediaQueryChange);
  }

  public toggleMenu() {
    if (this.isMobileScreenSize) {
      this.sidenav.toggle();
    } else {
      this.sidenavAnimationState = this.toggledSidenavAnimation;
      this.contentAnimationState = this.toggledContentAnimation;
    }
  }

  public getContentAnimationStateLeft() {
    if (this.position === 'start') {
      return this.contentAnimationState;
    } else {
      return { value: 'compact', params: { width: this.sidenavMin } };
    }
  }

  public getContentAnimationStateRight() {
    if (this.position === 'end') {
      return this.contentAnimationState;
    } else {
      return { value: 'compact', params: { width: this.sidenavMin } };
    }
  }

  public get toggledSidenavAnimation() {
    return this.sidenavAnimationState === this.SIDENAV_STATES.EXPANDED
      ? this.SIDENAV_STATES.COMPACT
      : this.SIDENAV_STATES.EXPANDED;
  }

  public get toggledContentAnimation() {
    if (this.isMobileScreenSize) {
      return this.CONTENT_STATES.MOBILE;
    }

    if (this.sidenavAnimationState === this.SIDENAV_STATES.EXPANDED) {
      return this.CONTENT_STATES.COMPACT;
    } else {
      return this.CONTENT_STATES.EXPANDED;
    }
  }

  private _onMediaQueryChange() {
    this.sidenavAnimationState = this.SIDENAV_STATES.EXPANDED;
    this.contentAnimationState = this.toggledContentAnimation;
  }
}
