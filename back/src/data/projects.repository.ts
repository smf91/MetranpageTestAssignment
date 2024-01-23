import { Injectable } from '@nestjs/common';
import { Project } from 'src/book-builder/book-builder.model';

@Injectable()
export class ProjectsRepository {
  getList(): Project[] {
    return [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
    ];
  }
}
