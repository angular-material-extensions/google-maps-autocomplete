"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPropertyInAstObject = exports.appendValueInAstArray = exports.removePropertyInAstObject = exports.insertPropertyInAstObjectInOrder = exports.appendPropertyInAstObject = void 0;
const json_utils_1 = require("@schematics/angular/utility/json-utils");
function appendPropertyInAstObject(recorder, node, propertyName, value, indent) {
    return json_utils_1.appendPropertyInAstObject(recorder, node, propertyName, value, indent);
}
exports.appendPropertyInAstObject = appendPropertyInAstObject;
function insertPropertyInAstObjectInOrder(recorder, node, propertyName, value, indent) {
    return json_utils_1.insertPropertyInAstObjectInOrder(recorder, node, propertyName, value, indent);
}
exports.insertPropertyInAstObjectInOrder = insertPropertyInAstObjectInOrder;
function removePropertyInAstObject(recorder, node, propertyName) {
    return json_utils_1.removePropertyInAstObject(recorder, node, propertyName);
}
exports.removePropertyInAstObject = removePropertyInAstObject;
function appendValueInAstArray(recorder, node, value, indent = 4) {
    return json_utils_1.appendValueInAstArray(recorder, node, value, indent);
}
exports.appendValueInAstArray = appendValueInAstArray;
function findPropertyInAstObject(node, propertyName) {
    return json_utils_1.findPropertyInAstObject(node, propertyName);
}
exports.findPropertyInAstObject = findPropertyInAstObject;
//# sourceMappingURL=json-utils.js.map