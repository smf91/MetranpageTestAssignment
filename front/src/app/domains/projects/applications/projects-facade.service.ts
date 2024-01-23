import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { ProjectsApiService } from '../api';
import { Project } from '../model';

@Injectable({ providedIn: 'root' })
export class ProjectsFacadeService {
  readonly projects$: Observable<Project[] | null> = this._projectsApiService
    .getProjects()
    .pipe(map((res) => res.projects));

  constructor(private readonly _projectsApiService: ProjectsApiService) {}

  buildProject(project: any): Observable<any> {
    //TODO not implemented
    return of([]);
  }
}
