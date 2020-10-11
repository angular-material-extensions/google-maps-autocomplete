"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectFromWorkspace = void 0;
const schematics_1 = require("@angular/cdk/schematics");
/**
 * Finds the specified project configuration in the workspace. Throws an error if the project
 * couldn't be found.
 */
function getProjectFromWorkspace(workspace, projectName) {
    return schematics_1.getProjectFromWorkspace(workspace, projectName);
}
exports.getProjectFromWorkspace = getProjectFromWorkspace;
//# sourceMappingURL=get-project.js.map