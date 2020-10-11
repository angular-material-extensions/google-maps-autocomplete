import { Tree } from '@angular-devkit/schematics';
import { WorkspaceProject } from '@angular-devkit/core/src/experimental/workspace';
/** Import and add module to root app module. */
export declare function addModuleImportToRootModule(host: Tree, moduleName: string, src: string, project: WorkspaceProject): void;
/**
 * Import and add module to specific module path.
 * @param host the tree we are updating
 * @param modulePath src location of the module to import
 * @param moduleName name of module to import
 * @param src src location to import
 */
export declare function addModuleImportToModule(host: Tree, modulePath: string, moduleName: string, src: string): void;
