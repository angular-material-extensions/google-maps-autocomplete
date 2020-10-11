"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUTING_MODULE_EXT = exports.MODULE_EXT = exports.buildRelativePath = exports.findModule = exports.findModuleFromOptions = void 0;
const find_module_1 = require("@schematics/angular/utility/find-module");
/**
 * Find the module referred by a set of options passed to the schematics.
 */
function findModuleFromOptions(host, options) {
    return find_module_1.findModuleFromOptions(host, options);
}
exports.findModuleFromOptions = findModuleFromOptions;
/**
 * Function to find the "closest" module to a generated file's path.
 */
function findModule(host, generateDir, moduleExt = exports.MODULE_EXT, routingModuleExt = exports.ROUTING_MODULE_EXT) {
    return find_module_1.findModule(host, generateDir, moduleExt, routingModuleExt);
}
exports.findModule = findModule;
/**
 * Build a relative path from one file path to another file path.
 */
function buildRelativePath(from, to) {
    return find_module_1.buildRelativePath(from, to);
}
exports.buildRelativePath = buildRelativePath;
exports.MODULE_EXT = find_module_1.MODULE_EXT;
exports.ROUTING_MODULE_EXT = find_module_1.ROUTING_MODULE_EXT;
//# sourceMappingURL=find-module.js.map