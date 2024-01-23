import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectResponse } from '../model';

@Injectable({ providedIn: 'root' })
export class ProjectsApiService {
  private readonly _backendUrl = 'http://localhost:4443';
  constructor(private readonly _httpClient: HttpClient) {}

  getProjects() {
    return this._httpClient.get<ProjectResponse>(
      `${this._backendUrl}/book-builder/projects`
    );
  }
}
