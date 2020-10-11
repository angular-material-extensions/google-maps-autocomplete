"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWorkspaceProject = exports.isWorkspaceSchema = exports.getProject = exports.buildDefaultPath = void 0;
const project_1 = require("@schematics/angular/utility/project");
/**
 * Build a default project path for generating.
 * @param project The project to build the path for.
 */
function buildDefaultPath(project) {
    return project_1.buildDefaultPath(project);
}
exports.buildDefaultPath = buildDefaultPath;
function getProject(workspaceOrHost, projectName) {
    return project_1.getProject(workspaceOrHost, projectName);
}
exports.getProject = getProject;
function isWorkspaceSchema(workspace) {
    return project_1.isWorkspaceSchema(workspace);
}
exports.isWorkspaceSchema = isWorkspaceSchema;
function isWorkspaceProject(project) {
    return project_1.isWorkspaceProject(project);
}
exports.isWorkspaceProject = isWorkspaceProject;
//# sourceMappingURL=project.js.map