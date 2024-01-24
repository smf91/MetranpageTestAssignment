import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BuildRequest, BuildResponse } from '../model';

@Injectable()
export class BookBuilderApiService {
  private readonly _baseUrl = 'http://localhost:4443';

  constructor(private readonly _http: HttpClient) {}

  buildProject(payload: BuildRequest): Observable<BuildResponse> {
    return this._http.post<BuildResponse>(
      `${this._baseUrl}/book-builder/build`,
      payload
    );
  }
}
