import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { ProjectsApiService } from '../api';
import { Project } from '../model';

@Injectable({ providedIn: 'root' })
export class ProjectsFacadeService {
  private readonly _projects$: BehaviorSubject<Project[] | null> =
    new BehaviorSubject<Project[] | null>(null);
  readonly projects$: Observable<Project[] | null> =
    this._projects$.asObservable();

  constructor(private readonly _projectsApiService: ProjectsApiService) {}

  getProjects$(): Observable<Project[]> {
    return this._projectsApiService.getProjects().pipe(
      map((res) => res.projects),
      tap((p) => this._projects$.next(p))
      //..... TODO: error handling
    );
  }
}
