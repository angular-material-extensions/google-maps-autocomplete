import { Path } from '@angular-devkit/core';
import { Tree } from '@angular-devkit/schematics';
import { ModuleOptions as OriginalModuleOptions } from '@schematics/angular/utility/find-module';
export interface ModuleOptions extends OriginalModuleOptions {
}
/**
 * Find the module referred by a set of options passed to the schematics.
 */
export declare function findModuleFromOptions(host: Tree, options: ModuleOptions): Path | undefined;
/**
 * Function to find the "closest" module to a generated file's path.
 */
export declare function findModule(host: Tree, generateDir: string, moduleExt?: string, routingModuleExt?: string): Path;
/**
 * Build a relative path from one file path to another file path.
 */
export declare function buildRelativePath(from: string, to: string): string;
export declare const MODULE_EXT = ".module.ts";
export declare const ROUTING_MODULE_EXT = "-routing.module.ts";
