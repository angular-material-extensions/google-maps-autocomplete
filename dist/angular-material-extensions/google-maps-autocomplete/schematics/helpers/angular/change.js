"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplaceChange = exports.RemoveChange = exports.InsertChange = exports.NoopChange = void 0;
const change_1 = require("@schematics/angular/utility/change");
/**
 * An operation that does nothing.
 */
class NoopChange extends change_1.NoopChange {
}
exports.NoopChange = NoopChange;
/**
 * Will add text to the source code.
 */
class InsertChange extends change_1.InsertChange {
}
exports.InsertChange = InsertChange;
/**
 * Will remove text from the source code.
 */
class RemoveChange extends change_1.RemoveChange {
}
exports.RemoveChange = RemoveChange;
/**
 * Will replace text from the source code.
 */
class ReplaceChange extends change_1.ReplaceChange {
}
exports.ReplaceChange = ReplaceChange;
//# sourceMappingURL=change.js.map