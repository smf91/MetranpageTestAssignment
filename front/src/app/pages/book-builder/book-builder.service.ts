import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProjectData, ProjectsFacadeService } from 'src/app/domains/projects';
import { filterNil } from '@kernel/pipes';
import { Template, TemplatesFacadeService } from '@domains/templates';
import {
  BookBuilderApiService,
  BuildRequest,
  BuildResponse,
} from '@domains/book-builder';

//TODO возможно логику стоит вытащить в отдельный фасад
@Injectable()
export class BookBuilderService {
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

  constructor(
    private readonly _projectsFacade: ProjectsFacadeService,
    private readonly _templatesFacade: TemplatesFacadeService,
    private readonly _bookBuilderApi: BookBuilderApiService
  ) {}

  getTemplates$(searhString: string): Observable<Template[]> {
    return this._templatesFacade.getTemplates$(searhString);
  }

  buildProject$(payload: BuildRequest): Observable<BuildResponse> {
    return this._bookBuilderApi.buildProject(payload);
  }
}
