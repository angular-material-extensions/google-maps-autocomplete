"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPackageToPackageJson = void 0;
const package_config_1 = require("@angular/cdk/schematics/ng-add/package-config");
/** Adds a package to the package.json in the given host tree. */
function addPackageToPackageJson(host, pkg, version) {
    return package_config_1.addPackageToPackageJson(host, pkg, version);
}
exports.addPackageToPackageJson = addPackageToPackageJson;
//# sourceMappingURL=package-config.js.map