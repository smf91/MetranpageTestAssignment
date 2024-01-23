import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { TemplateApiService } from '../api';
import { Template } from '../model';

@Injectable({ providedIn: 'root' })
export class TemplatesFacadeService {
  private readonly _templates$: BehaviorSubject<Template[] | null> =
    new BehaviorSubject<Template[] | null>(null);
  readonly templates$: Observable<Template[] | null> =
    this._templates$.asObservable();

  constructor(private readonly _templatesApi: TemplateApiService) {}

  getTemplates$(): Observable<Template[]> {
    return this._templatesApi.getTemplates().pipe(map((res) => res.templates));
  }
}
