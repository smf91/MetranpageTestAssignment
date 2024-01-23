import { Component } from '@angular/core';
import { Observable, Subject, forkJoin, takeUntil, tap } from 'rxjs';
import { BookBuilderService } from '../../book-builder.service';
import { Project, ProjectData } from 'src/app/domains/projects';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

export type ProjectState = {
  project: Project;
  buildedProject: string;
  error: string;
};

interface Form {
  templates: FormControl<any | null>;
  projects: FormControl<any | null>;
}

@Component({
  selector: 'app-book-builder',
  templateUrl: './book-builder.component.html',
  styleUrls: ['./book-builder.component.scss'],
})
export class BookBuilderComponent {
  protected projects: ProjectState[] = [];

  form: FormGroup<Form>;
  readonly projects$: Observable<ProjectData[]> =
    this._bookBuilderService.processedProjects$;

  private readonly _destroy$: Subject<void> = new Subject<void>();
  constructor(
    // private readonly _bookBuilderApi: BookBuilderApiService,
    private readonly _fb: FormBuilder,
    private readonly _bookBuilderService: BookBuilderService
  ) {}

  ngOnInit() {
    this._subscribeProjects();
  }

  private _subscribeProjects(): void {
    this.projects$.pipe(takeUntil(this._destroy$)).subscribe();
  }

  private _initForm(): void {
    this.form = this._fb.group<Form>({
      projects: new FormControl(null, [Validators.required]),
      templates: new FormControl(null, [Validators.required]),
    });
  }

  async buildProject(id: number) {
    //   const project = this.projects.find((p) => p.project.id === id);
    //   if (!project) {
    //     return;
    //   }
    //   try {
    //     // const result = await this._bookBuilderApi.buildProject(id);
    //     project.buildedProject = result.buildedProject;
    //   } catch (e) {
    //     console.error(e);
    //     project.error = 'Something went wrong';
    //   }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
