import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { BookBuilderService } from '../../book-builder.service';
import { Project, ProjectData } from 'src/app/domains/projects';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Template } from '@domains/templates';
import { BuildRequest } from '@domains/book-builder';

interface BuildProjectForm {
  projects: FormArray<FormGroup<BuildProjectControllers>>;
}

interface BuildProjectControllers {
  template: FormControl<number[] | null>;
  project: FormControl<Project | null>;
  error: FormControl<string | null>;
  buildedProject: FormControl<string | null>;
}

@Component({
  selector: 'app-book-builder',
  templateUrl: './book-builder.component.html',
  styleUrls: ['./book-builder.component.scss'],
})
export class BookBuilderComponent {
  bookBuilderForm: FormGroup<BuildProjectForm>;
  readonly projects$: Observable<ProjectData[]> =
    this._bookBuilderService.processedProjects$;
  private readonly _onFilterEvent$: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  readonly onFilterEvent$: Observable<string> =
    this._onFilterEvent$.asObservable();
  templatesSource$: Observable<Template[]> = this.onFilterEvent$.pipe(
    debounceTime(600),
    distinctUntilChanged(),
    switchMap((searhString: string) =>
      this._bookBuilderService.getTemplates$(searhString)
    )
  );
  private readonly _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _bookBuilderService: BookBuilderService
  ) {}

  ngOnInit(): void {
    this._subscribeProjects();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  buildProject(formGroup: FormGroup<BuildProjectControllers>): void {
    if (formGroup.invalid) throw new Error('Form is invalid');
    const payload = this._preparedBuildProjectPayload(formGroup);
    this._bookBuilderService
      .buildProject$(payload)
      .pipe(
        take(1),
        tap((r) =>
          formGroup.controls.buildedProject.patchValue(r.buildedProject)
        ),
        catchError((err) => {
          formGroup.controls.buildedProject.patchValue(err);
          console.log('some error: ', err);
          return err;
        }),
        takeUntil(this._destroy$)
      )
      .subscribe();
  }

  onCustomFilterEvent(searchString: string): void {
    this._onFilterEvent$.next(searchString);
  }

  private _subscribeProjects(): void {
    this.projects$
      .pipe(
        tap((p) => this._initForm(p)),
        takeUntil(this._destroy$)
      )
      .subscribe();
  }

  private _initForm(projectsData: ProjectData[]): void {
    this.bookBuilderForm = this._fb.group<BuildProjectForm>({
      projects: this._fb.array(<FormGroup<BuildProjectControllers>[]>[]),
    });
    projectsData.forEach((projectData: ProjectData) => {
      this.bookBuilderForm.controls.projects.push(
        this._fb.group<BuildProjectControllers>({
          template: new FormControl(null, Validators.required),
          project: new FormControl(projectData.project, Validators.required),
          error: new FormControl(projectData.error),
          buildedProject: new FormControl(null),
        })
      );
    });
  }

  //TODO вынести из компонентаs
  private _preparedBuildProjectPayload(
    formGroup: FormGroup<BuildProjectControllers>
  ): BuildRequest {
    const { template, project } = formGroup.value;
    if (!template || !project) {
      throw new Error('Template and project are required');
    } else {
      return {
        id: project.id,
        templateId: template[0],
      };
    }
  }
}
