import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TemplateResponse } from '../model';
import { Observable, map, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TemplateApiService {
  private readonly _baseURL = 'http://localhost:4443';

  constructor(private readonly _httpClient: HttpClient) {}

  //TODO временно с моками
  getTemplates$(searhString: string): Observable<TemplateResponse> {
    const params = new HttpParams().set('search', searhString);
    return of({
      templates: [
        { id: 1, arg1: 'test1', arg2: 'testTest_1' },
        { id: 2, arg1: 'test2', arg2: 'testTest_2' },
        { id: 3, arg1: 'test3', arg2: 'testTest_3' },
        { id: 4, arg1: 'test4', arg2: 'testTest_4' },
      ],
    }).pipe(
      map((data) => ({
        templates: data.templates.filter((t) =>
          t.id.toString().toLocaleLowerCase().includes(searhString)
        ),
      })),
      tap(console.log)
    );
  }

  // getTemplates$(searhString: string): Observable<TemplateResponse> {
  //   const params = new HttpParams().set('search', searhString);
  //   return this._httpClient.get<TemplateResponse>(
  //     `${this._baseURL}/book-builder/templates`,
  //     { params }
  //   );
  // }
}
