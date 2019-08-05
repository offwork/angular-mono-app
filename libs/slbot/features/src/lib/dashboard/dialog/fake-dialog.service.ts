import { HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  sdaBody,
  sdaGET,
  sdaPOST,
  sdaQueryParams,
  sdaResponse,
  SdaHttp
} from '@sda/shared/data-access';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@SdaHttp({
  baseUrl: 'https://jsonplaceholder.typicode.com',
  baseHeaders: new HttpHeaders({ Accept: 'application/json' })
})
@Injectable({ providedIn: 'root' })
export class FakeDialogService {
  @sdaGET({
    path: '/posts',
    options: {
      observe: 'response'
    }
  })
  public getPost(): Observable<HttpResponse<any>> {
    return;
  }

  @sdaGET({
    path: '/posts'
  })
  public getByUserId(
    @sdaQueryParams() queryParams?: HttpParams
  ): Observable<HttpResponse<any>> {
    return;
  }

  @sdaPOST({
    path: '/posts'
  })
  public newPost(
    @sdaBody() body: any,
    @sdaResponse() response?: Observable<HttpResponse<any>>
  ): Observable<any> {
    return response.pipe(map((data: any) => data));
  }
}
