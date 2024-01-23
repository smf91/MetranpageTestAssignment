import { Module } from '@nestjs/common';
import { BookBuilderService } from './book-builder.service';
import { BookBuilderController } from './book-builder.controller';
import { ProjectsRepository } from '../data/projects.repository';
import { TemplatesRepository } from '../data/templates.repository';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [BookBuilderService, ProjectsRepository, TemplatesRepository],
  controllers: [BookBuilderController],
})
export class BookBuilderModule {}
