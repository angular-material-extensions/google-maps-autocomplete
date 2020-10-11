import { Rule, Tree } from '@angular-devkit/schematics';
export declare function addPackageJsonDependencies(): Rule;
export declare function installPackageJsonDependencies(): Rule;
export declare function addModuleToImports(options: any): Rule;
/** Gets the version of the specified package by looking at the package.json in the given tree. */
export declare function getPackageVersionFromPackageJson(tree: Tree, name: string): string | null;
export default function (options: any): Rule;
