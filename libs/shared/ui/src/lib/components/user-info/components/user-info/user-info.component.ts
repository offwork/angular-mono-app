import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sda-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserInfoComponent implements OnInit {
  /** Custom choice for opening the menu at the bottom. Can be `before` or `after`. */
  @Input() public menuPositionX: string = 'after';

  /** Custom choice for opening the menu at the bottom. Can be `above` or `below`. */
  @Input() public menuPositionY: string = 'below';

  public constructor() {}

  public ngOnInit() {}
}
