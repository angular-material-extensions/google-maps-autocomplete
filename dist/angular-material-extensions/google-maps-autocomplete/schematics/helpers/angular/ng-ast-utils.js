"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppModulePath = exports.findBootstrapModulePath = exports.findBootstrapModuleCall = void 0;
const ng_ast_utils_1 = require("@schematics/angular/utility/ng-ast-utils");
function findBootstrapModuleCall(host, mainPath) {
    return ng_ast_utils_1.findBootstrapModuleCall(host, mainPath);
}
exports.findBootstrapModuleCall = findBootstrapModuleCall;
function findBootstrapModulePath(host, mainPath) {
    return ng_ast_utils_1.findBootstrapModulePath(host, mainPath);
}
exports.findBootstrapModulePath = findBootstrapModulePath;
function getAppModulePath(host, mainPath) {
    return ng_ast_utils_1.getAppModulePath(host, mainPath);
}
exports.getAppModulePath = getAppModulePath;
//# sourceMappingURL=ng-ast-utils.js.map