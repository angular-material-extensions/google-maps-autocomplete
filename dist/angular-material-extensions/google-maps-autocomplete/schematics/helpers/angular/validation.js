"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProjectName = exports.validateHtmlSelector = exports.htmlSelectorRe = exports.validateName = void 0;
const validation_1 = require("@schematics/angular/utility/validation");
function validateName(name) {
    return validation_1.validateName(name);
}
exports.validateName = validateName;
// Must start with a letter, and must contain only alphanumeric characters or dashes.
// When adding a dash the segment after the dash must also start with a letter.
exports.htmlSelectorRe = validation_1.htmlSelectorRe;
function validateHtmlSelector(selector) {
    return validation_1.validateHtmlSelector(selector);
}
exports.validateHtmlSelector = validateHtmlSelector;
function validateProjectName(projectName) {
    return validation_1.validateProjectName(projectName);
}
exports.validateProjectName = validateProjectName;
//# sourceMappingURL=validation.js.map