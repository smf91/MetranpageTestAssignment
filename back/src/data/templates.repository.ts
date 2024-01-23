import { Injectable } from '@nestjs/common';
import { Template } from 'src/book-builder/book-builder.model';

@Injectable()
export class TemplatesRepository {
  getList(): Template[] {
    return [
      {
        id: 1,
        arg1: 'arg1-1',
        arg2: 'arg2-1',
      },
      {
        id: 2,
        arg1: 'arg1-2',
        arg2: 'arg2-2',
      },
      {
        id: 3,
        arg1: 'arg1-3',
        arg2: 'arg2-3',
      },
    ];
  }
}
