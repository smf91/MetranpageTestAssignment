import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TemplateResponse } from '../model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TemplateApiService {
  private readonly _baseURL = 'http://localhost:4443';

  constructor(private readonly _httpClient: HttpClient) {}

  getTemplates$(searhString: string): Observable<TemplateResponse> {
    const params = new HttpParams().set('search', searhString);
    return this._httpClient.get<TemplateResponse>(
      `${this._baseURL}/book-builder/templates`,
      { params }
    );
  }
}
