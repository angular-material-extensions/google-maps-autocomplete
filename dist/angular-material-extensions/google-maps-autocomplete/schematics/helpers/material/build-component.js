"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildComponent = void 0;
const schematics_1 = require("@angular/cdk/schematics");
/**
 * Rule that copies and interpolates the files that belong to this schematic context. Additionally
 * a list of file paths can be passed to this rule in order to expose them inside the EJS
 * template context.
 *
 * This allows inlining the external template or stylesheet files in EJS without having
 * to manually duplicate the file content.
 */
function buildComponent(options, additionalFiles = {}) {
    return schematics_1.buildComponent(options, additionalFiles);
}
exports.buildComponent = buildComponent;
//# sourceMappingURL=build-component.js.map