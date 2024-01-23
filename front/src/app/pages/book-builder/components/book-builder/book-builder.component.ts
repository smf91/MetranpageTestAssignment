import { Component } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
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

export type ProjectState = {
  project: Project;
  buildedProject: string;
  error: string;
};

interface Form {
  projects: FormArray<FormGroup<TestType>>; //TODO TestType should be renamed!
}

type TestType = {
  //TODO подумать на типами
  template: FormControl<Template | null>;
  error: FormControl<string | null>;
  // project: FormControl<Project | null>;
  // buildedProject: FormControl<string | null>;
};

@Component({
  selector: 'app-book-builder',
  templateUrl: './book-builder.component.html',
  styleUrls: ['./book-builder.component.scss'],
})
export class BookBuilderComponent {
  bookBuilderForm: FormGroup<Form>;
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

  ngOnInit() {
    this._subscribeProjects();
  }

  private _subscribeProjects(): void {
    this.projects$.pipe(takeUntil(this._destroy$)).subscribe((p) => {
      this._initForm(p);
    });
  }

  private _initForm(projectsData: ProjectData[]): void {
    this.bookBuilderForm = this._fb.group<Form>({
      projects: this._fb.array(<FormGroup<TestType>[]>[]),
    });

    projectsData.forEach((projectData) => {
      this.bookBuilderForm.controls.projects.push(
        this._fb.group<TestType>({
          // project: new FormControl(projectData.project, Validators.required),
          template: new FormControl(null, Validators.required),
          // buildedProject: new FormControl(projectData.buildedProject),
          error: new FormControl(projectData.error),
        })
      );
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

  onCustomFilterEvent(searchString: string): void {
    this._onFilterEvent$.next(searchString);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
