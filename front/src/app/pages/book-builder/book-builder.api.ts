import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

// TODO в идеале опреелить стандартный интерфейс для ответа от сервера и использовать его через generics, переместить в DTO файл
type BuildResponse = {
  buildedProject: string;
};

@Injectable()
export class BookBuilderApiService {
  private readonly _baseUrl = 'http://localhost:4443';

  constructor(private readonly _http: HttpClient) {}

  async buildProject(id: number) {
    return firstValueFrom(
      this._http.post<BuildResponse>(`${this._baseUrl}/book-builder/build`, {
        id,
        // TODO templateId
      })
    );
  }
}
