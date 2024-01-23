export type Project = {
  id: number;
};

export type ProjectResponse = {
  projects: Project[];
};

//TODO: ProjectData should be renamed
export type ProjectData = {
  project: Project;
  buildedProject: string;
  error: string;
};
