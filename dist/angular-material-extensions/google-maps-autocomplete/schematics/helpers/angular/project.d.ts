import { Tree } from '@angular-devkit/schematics';
import { ProjectType, WorkspaceProject, WorkspaceSchema } from '@schematics/angular/utility/workspace-models';
/**
 * Build a default project path for generating.
 * @param project The project to build the path for.
 */
export declare function buildDefaultPath(project: WorkspaceProject): string;
export declare function getProject<TProjectType extends ProjectType = ProjectType.Application>(workspaceOrHost: WorkspaceSchema | Tree, projectName: string): WorkspaceProject<TProjectType>;
export declare function isWorkspaceSchema(workspace: any): workspace is WorkspaceSchema;
export declare function isWorkspaceProject(project: any): project is WorkspaceProject;
