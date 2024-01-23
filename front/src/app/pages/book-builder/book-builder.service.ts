import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BookBuilderApiService } from './book-builder.api';
import { ProjectData, ProjectsFacadeService } from 'src/app/domains/projects';
import { filterNil } from '@kernel/pipes';
import { Template, TemplatesFacadeService } from '@domains/templates';

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
  // readonly templates$: Observable<any[] | null> = this._templatesFacade;

  constructor(
    private readonly _projectsFacade: ProjectsFacadeService,
    private readonly _templatesFacade: TemplatesFacadeService,
    private readonly _bookBuilderApi: BookBuilderApiService
  ) {}

  getTemplates$(searhString: string): Observable<Template[]> {
    return this._templatesFacade.getTemplates$(searhString);
  }

  buildSomething(): void {
    this._bookBuilderApi;
  }
}
