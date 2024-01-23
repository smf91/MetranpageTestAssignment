import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookBuilderService } from './book-builder.service';

type BuildRequest = {
  id: number;
  // TODO templateId
};

@Controller('book-builder')
export class BookBuilderController {
  constructor(private readonly _bookBuilderService: BookBuilderService) {}

  @Get('projects')
  getProjects() {
    return this._bookBuilderService.getProjects();
  }

  @Get('templates')
  getTemplates() {
    return this._bookBuilderService.getTemplates();
  }

  @Post('build')
  buildProject(@Body() request: BuildRequest) {
    return this._bookBuilderService.buildProject(request.id);
  }
}
