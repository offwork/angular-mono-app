import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Message } from '@sda/api-interface';

@Component({
  selector: 'sda-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public link$ = this.http.get<Message>('/api/link');

  public constructor(private http: HttpClient) {}
}
