import {
  Directive,
  Inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

export class LetContext<T> {
  get ngLet(): T {
    return this._directive.ngLet;
  }
  constructor(private readonly _directive: LetDirective<T>) {}
}

@Directive({
  selector: '[ngLet]',
})
export class LetDirective<T> {
  @Input() ngLet: T;

  constructor(
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Inject(TemplateRef) templateRef: TemplateRef<LetContext<T>>
  ) {
    viewContainer.createEmbeddedView(templateRef, new LetContext<T>(this));
  }
}
