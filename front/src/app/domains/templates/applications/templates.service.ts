import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Template } from '../model';
import { TemplateApiService } from '../api';

@Injectable({ providedIn: 'root' })
export class TemplatesFacadeService {
  private readonly _templates$: BehaviorSubject<Template[] | null> =
    new BehaviorSubject<Template[] | null>(null);
  readonly templates$: Observable<Template[] | null> =
    this._templates$.asObservable();

  constructor(private readonly _templatesApi: TemplateApiService) {}

  getTemplates$(searhString: string): Observable<Template[]> {
    return this._templatesApi
      .getTemplates$(searhString)
      .pipe(map((res) => res.templates));
  }
}
