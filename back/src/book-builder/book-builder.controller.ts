import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BookBuilderService } from './book-builder.service';
import { Observable } from 'rxjs';
import { BuildRequest, BuildResponse, TemplateResponse } from './sheme.dto';

//TODO вынести роуты в константу с путями и типизировать
@Controller('book-builder')
export class BookBuilderController {
  constructor(private readonly _bookBuilderService: BookBuilderService) {}

  @Get('projects')
  getProjects() {
    return this._bookBuilderService.getProjects();
  }

  @Get('templates')
  getTemplates(@Query('search') searchString: string): TemplateResponse {
    return { templates: this._bookBuilderService.getTemplates(searchString) };
  }

  @Post('build')
  buildProject(@Body() request: BuildRequest): Observable<BuildResponse> {
    return this._bookBuilderService.buildProject(request);
  }
}
