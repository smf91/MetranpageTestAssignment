import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BookBuilderApiService } from './book-builder.api';
import { ProjectData, ProjectsFacadeService } from 'src/app/domains/projects';
import { filterNil } from '@kernel/pipes';

@Injectable()
export class BookBuilderService {
  // private readonly _projects$: BehaviorSubject<any[] | null> =
  //   new BehaviorSubject<any[] | null>(null);
  // readonly projects$: Observable<any[] | null> = this._projects$.asObservable();

  //TODO processedProjects should be renamed!
  readonly processedProjects$: Observable<ProjectData[]> =
    this._projectsFacade.projects$.pipe(
      filterNil(),
      map((projectData) =>
        projectData.map((project) => ({
          project,
          buildedProject: '',
          error: '',
        }))
      )
    );
  // readonly templates$: Observable<any[] | null> = this._templatesFacade;

  constructor(
    private readonly _projectsFacade: ProjectsFacadeService,
    private readonly _templatesFacade: BookBuilderApiService,
    private readonly _bookBuilderApi: BookBuilderApiService
  ) {}

  //   getProjects$(): Observable<Project[]> {
  //     return this._bookBuilderApi.getProjects().pipe(map((res) => res.projects));
  //   }

  //   getTemplates$(): Observable<Template[]> {
  //     return this._bookBuilderApi.getTemplates().pipe(map((res) => res.templates));
  //   }
  // }
}
