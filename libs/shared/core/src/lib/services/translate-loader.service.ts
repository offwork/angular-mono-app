import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { ObjectUtils } from '@sda/shared/utility';
import { forkJoin, of, throwError, Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { ComponentTranslationModel } from '../models/component.model';

@Injectable({
  providedIn: 'root'
})
export class TranslateLoaderService implements TranslateLoader {
  private prefix: string = 'i18n';
  private suffix: string = '.json';
  private providers: ComponentTranslationModel[] = [];
  private queue: string[][] = [];
  private defaultLang: string = 'tr';

  public constructor(private http: HttpClient) {}

  public setDefaultLang(value: string) {
    this.defaultLang = value || 'tr';
  }

  public registerProvider(name: string, path: string) {
    const registered = this.providers.find(provider => provider.name === name);
    if (registered) {
      registered.path = path;
    } else {
      this.providers.push(new ComponentTranslationModel({ name, path }));
    }
  }

  public providerRegistered(name: string): boolean {
    return this.providers.find(x => x.name === name) ? true : false;
  }

  public fetchLanguageFile(
    lang: string,
    component: ComponentTranslationModel,
    fallbackUrl?: string
  ): Observable<void> {
    const translationUrl =
      fallbackUrl ||
      `${component.path}/${this.prefix}/${lang}${this.suffix}?v=${Date.now()}`;

    return this.http.get(translationUrl).pipe(
      map((res: HttpResponse<any>) => {
        component.json[lang] = res;
      }),
      retry(3),
      catchError(() => {
        if (!fallbackUrl && lang.includes('-')) {
          const [langId] = lang.split('-');

          if (langId && langId !== this.defaultLang) {
            const url = `${component.path}/${this.prefix}/${langId}${
              this.suffix
            }?v=${Date.now()}`;

            return this.fetchLanguageFile(lang, component, url);
          }
        }
        return throwError(`Failed to load ${translationUrl}`);
      })
    );
  }

  public getComponentToFetch(lang: string): Array<Observable<any>> {
    const observableBatch = [];
    if (!this.queue[lang]) {
      this.queue[lang] = [];
    }
    this.providers.forEach(component => {
      if (!this.isComponentInQueue(lang, component.name)) {
        this.queue[lang].push(component.name);

        observableBatch.push(this.fetchLanguageFile(lang, component));
      }
    });

    return observableBatch;
  }

  public init(lang: string) {
    if (this.queue[lang] === undefined) {
      this.queue[lang] = [];
    }
  }

  public isComponentInQueue(lang: string, name: string) {
    return (this.queue[lang] || []).find(x => x === name) ? true : false;
  }

  public getFullTranslationJSON(lang: string): any {
    let result = {};

    this.providers
      .slice(0)
      .sort((a, b) => {
        if (a.name === 'app') {
          return 1;
        }
        if (b.name === 'app') {
          return -1;
        }
        return a.name.localeCompare(b.name);
      })
      .forEach(model => {
        if (model.json && model.json[lang]) {
          result = ObjectUtils.merge(result, model.json[lang]);
        }
      });

    return result;
  }

  public getTranslation(lang: string): Observable<any> {
    let hasFailures = false;
    const batch = [
      ...this.getComponentToFetch(lang).map(observable => {
        return observable.pipe(
          catchError(error => {
            console.warn(error);
            hasFailures = true;
            return of(error);
          })
        );
      })
    ];

    return new Observable(observer => {
      if (batch.length > 0) {
        forkJoin(batch).subscribe(
          () => {
            const fullTranslation = this.getFullTranslationJSON(lang);
            if (fullTranslation) {
              observer.next(fullTranslation);
            }
            if (hasFailures) {
              observer.error('Failed to load some resources');
            } else {
              observer.complete();
            }
          },
          err => {
            observer.error('Failed to load some resources');
          }
        );
      } else {
        const fullTranslation = this.getFullTranslationJSON(lang);
        if (fullTranslation) {
          observer.next(fullTranslation);
          observer.complete();
        }
      }
    });
  }
}
