import { Injectable } from '@nestjs/common';
import { ProjectsRepository } from '../data/projects.repository';
import { TemplatesRepository } from '../data/templates.repository';
import {
  map,
  firstValueFrom,
  from,
  of,
  combineLatestWith,
  catchError,
  throwError,
  Observable,
} from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Template } from './book-builder.model';
import { filterNil } from '../kernel/pipes';
import { BuildRequest, BuildResponse, WorkerResponse } from './sheme.dto';

@Injectable()
//TODO типизировать все методы и пр
export class BookBuilderService {
  private readonly _workerUrl: string;

  constructor(
    private readonly _projectsRepository: ProjectsRepository,
    private readonly _templatesRepository: TemplatesRepository,
    private readonly _httpService: HttpService,
  ) {
    this._workerUrl = process.env.WORKER_URL;
  }

  getProjects(): ProjectResponse {
    return { projects: this._projectsRepository.getList() };
  }

  getTemplates(searchString: string): Template[] {
    return this._templatesRepository
      .getList()
      .filter((t) =>
        t.id.toString().toLocaleLowerCase().includes(searchString),
      );
  }

  buildProject(payload: BuildRequest): Observable<BuildResponse> {
    const { id, templateId } = payload;
    const response = this.makeRequest(`${this._workerUrl}/build`, {
      id,
    });
    return from(response).pipe(
      filterNil(),
      combineLatestWith(of(this.getTemplates(templateId.toString()))),
      map(([workerResponse, template]) => {
        //TODO  логику ниже вытащить в отдельый метод и отрефакторить
        const { arg1, arg2 } = template[0];
        return {
          buildedProject: `Additionally proccessed data from worker: ${workerResponse['buildedProject']} Template args: arg1=${arg1} arg2=${arg2}`,
        };
      }),
      catchError((err) => {
        console.error(`Something went wrong: ${err}`);
        return throwError(() => err);
      }),
    );
  }

  async makeRequest(
    url: string,
    body?: object,
  ): Promise<WorkerResponse | false> {
    if (!url) {
      throw new Error('No url');
    }
    return firstValueFrom(
      this._httpService.post(url, {
        ...body,
      }),
    )
      .then((response) => {
        if (response.data.success && response.data.success === true) {
          return response.data;
        }
        console.error(`Request is ok, but service returned an error ${url}:`);
        console.error(response);
        return false;
      })
      .catch((error) => {
        console.error(`Cannot make request ${url}:`);
        console.error(error);
        return false;
      });
  }
}
