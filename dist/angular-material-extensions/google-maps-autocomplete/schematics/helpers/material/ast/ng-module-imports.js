"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasNgModuleImport = void 0;
const schematics_1 = require("@angular/cdk/schematics");
/**
 * Whether the Angular module in the given path imports the specified module class name.
 */
function hasNgModuleImport(tree, modulePath, className) {
    return schematics_1.hasNgModuleImport(tree, modulePath, className);
}
exports.hasNgModuleImport = hasNgModuleImport;
//# sourceMappingURL=ng-module-imports.js.map