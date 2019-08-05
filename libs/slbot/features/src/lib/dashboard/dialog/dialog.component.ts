import { Component, OnInit } from '@angular/core';
import { FakeDialogService } from './fake-dialog.service';

@Component({
  selector: 'sda-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  public constructor(private _fakeService: FakeDialogService) {}

  public ngOnInit() {}

  public fetchPosts() {
    this._fakeService.getPost().subscribe(console.log);
    // this._fakeService.getByUserId(<any>{ userId: '9' }).subscribe(console.log);
    // this._fakeService
    //   .newPost({
    //     title: 'Foo',
    //     body: 'merhaba bugun hava cok guzel!',
    //     userId: 1
    //   })
    //   .subscribe(console.log);
  }
}
