import { filter, Observable } from 'rxjs';

export const filterNil =
  <T>() =>
  (source: Observable<T>): Observable<NonNullable<T>> =>
    source.pipe(
      filter<T, NonNullable<T>>(
        (value: T): value is NonNullable<T> =>
          value !== null && value !== undefined
      )
    );
