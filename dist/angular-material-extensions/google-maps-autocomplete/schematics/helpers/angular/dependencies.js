"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackageJsonDependency = exports.removePackageJsonDependency = exports.addPackageJsonDependency = exports.NodeDependencyType = void 0;
const dependencies_1 = require("@schematics/angular/utility/dependencies");
var NodeDependencyType;
(function (NodeDependencyType) {
    NodeDependencyType["Default"] = "dependencies";
    NodeDependencyType["Dev"] = "devDependencies";
    NodeDependencyType["Peer"] = "peerDependencies";
    NodeDependencyType["Optional"] = "optionalDependencies";
})(NodeDependencyType = exports.NodeDependencyType || (exports.NodeDependencyType = {}));
function addPackageJsonDependency(tree, dependency) {
    return dependencies_1.addPackageJsonDependency(tree, dependency);
}
exports.addPackageJsonDependency = addPackageJsonDependency;
function removePackageJsonDependency(tree, name) {
    return dependencies_1.removePackageJsonDependency(tree, name);
}
exports.removePackageJsonDependency = removePackageJsonDependency;
function getPackageJsonDependency(tree, name) {
    return dependencies_1.getPackageJsonDependency(tree, name);
}
exports.getPackageJsonDependency = getPackageJsonDependency;
//# sourceMappingURL=dependencies.js.map