import { Project, Template } from './book-builder.model';

//TODO вынести в отдельный файл dto
export type TemplateResponse = {
  templates: Template[];
};
export type ProjectResponse = {
  projects: Project[];
};

export type WorkerResponse = {
  success: boolean;
  error?: string;
  buildedProject?: string;
};

export type BuildRequest = {
  id: number;
  templateId: number;
};

export type BuildResponse = {
  buildedProject: string;
};
