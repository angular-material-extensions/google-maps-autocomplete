"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addModuleImportToModule = exports.addModuleImportToRootModule = void 0;
const schematics_1 = require("@angular/cdk/schematics");
/** Import and add module to root app module. */
function addModuleImportToRootModule(host, moduleName, src, project) {
    return schematics_1.addModuleImportToRootModule(host, moduleName, src, project);
}
exports.addModuleImportToRootModule = addModuleImportToRootModule;
/**
 * Import and add module to specific module path.
 * @param host the tree we are updating
 * @param modulePath src location of the module to import
 * @param moduleName name of module to import
 * @param src src location to import
 */
function addModuleImportToModule(host, modulePath, moduleName, src) {
    return schematics_1.addModuleImportToModule(host, modulePath, moduleName, src);
}
exports.addModuleImportToModule = addModuleImportToModule;
//# sourceMappingURL=ast.js.map