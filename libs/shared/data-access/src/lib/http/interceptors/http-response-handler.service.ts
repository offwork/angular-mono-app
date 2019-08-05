import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { AppConfigService } from '@sda/shared/core';
import { throwError, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpResponseHandlerService extends HttpErrorResponse {
  public constructor(
    private _configService: AppConfigService,
    private _router: Router,
    private _translateService: TranslateService
  ) {
    super({});
  }

  public onCatch(response: any, source: Observable<any>): Observable<any> {
    console.log('Catching!!\n', '\nreponse: ', response, '\nsource: ', source);
    return throwError(response);
  }
}
