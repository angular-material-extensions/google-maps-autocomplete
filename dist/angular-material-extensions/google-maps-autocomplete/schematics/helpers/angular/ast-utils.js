"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRouteDeclarationToModule = exports.getRouterModuleDeclaration = exports.isImported = exports.addEntryComponentToModule = exports.addBootstrapToModule = exports.addExportToModule = exports.addProviderToModule = exports.addImportToModule = exports.addDeclarationToModule = exports.addSymbolToNgModuleMetadata = exports.getMetadataField = exports.getFirstNgModuleName = exports.getDecoratorMetadata = exports.getContentOfKeyLiteral = exports.insertAfterLastOccurrence = exports.findNode = exports.getSourceNodes = exports.findNodes = exports.insertImport = void 0;
const ast_utils_1 = require("@schematics/angular/utility/ast-utils");
/**
 * Add Import `import { symbolName } from fileName` if the import doesn't exit
 * already. Assumes fileToEdit can be resolved and accessed.
 * @param fileToEdit (file we want to add import to)
 * @param symbolName (item to import)
 * @param fileName (path to the file)
 * @param isDefault (if true, import follows style for importing default exports)
 * @return Change
 */
function insertImport(source, fileToEdit, symbolName, fileName, isDefault = false) {
    return ast_utils_1.insertImport(source, fileToEdit, symbolName, fileName, isDefault);
}
exports.insertImport = insertImport;
/**
 * Find all nodes from the AST in the subtree of node of SyntaxKind kind.
 * @param node
 * @param kind
 * @param max The maximum number of items to return.
 * @param recursive Continue looking for nodes of kind recursive until end
 * the last child even when node of kind has been found.
 * @return all nodes of kind, or [] if none is found
 */
function findNodes(node, kind, max = Infinity, recursive = false) {
    return ast_utils_1.findNodes(node, kind, max, recursive);
}
exports.findNodes = findNodes;
/**
 * Get all the nodes from a source.
 * @param sourceFile The source file object.
 * @returns {Observable<ts.Node>} An observable of all the nodes in the source.
 */
function getSourceNodes(sourceFile) {
    return ast_utils_1.getSourceNodes(sourceFile);
}
exports.getSourceNodes = getSourceNodes;
function findNode(node, kind, text) {
    return ast_utils_1.findNode(node, kind, text);
}
exports.findNode = findNode;
/**
 * Insert `toInsert` after the last occurence of `ts.SyntaxKind[nodes[i].kind]`
 * or after the last of occurence of `syntaxKind` if the last occurence is a sub child
 * of ts.SyntaxKind[nodes[i].kind] and save the changes in file.
 *
 * @param nodes insert after the last occurence of nodes
 * @param toInsert string to insert
 * @param file file to insert changes into
 * @param fallbackPos position to insert if toInsert happens to be the first occurence
 * @param syntaxKind the ts.SyntaxKind of the subchildren to insert after
 * @return Change instance
 * @throw Error if toInsert is first occurence but fall back is not set
 */
function insertAfterLastOccurrence(nodes, toInsert, file, fallbackPos, syntaxKind) {
    return ast_utils_1.insertAfterLastOccurrence(nodes, toInsert, file, fallbackPos, syntaxKind);
}
exports.insertAfterLastOccurrence = insertAfterLastOccurrence;
function getContentOfKeyLiteral(_source, node) {
    return ast_utils_1.getContentOfKeyLiteral(_source, node);
}
exports.getContentOfKeyLiteral = getContentOfKeyLiteral;
function getDecoratorMetadata(source, identifier, module) {
    return ast_utils_1.getDecoratorMetadata(source, identifier, module);
}
exports.getDecoratorMetadata = getDecoratorMetadata;
/**
 * Given a source file with @NgModule class(es), find the name of the first @NgModule class.
 *
 * @param source source file containing one or more @NgModule
 * @returns the name of the first @NgModule, or `undefined` if none is found
 */
function getFirstNgModuleName(source) {
    return ast_utils_1.getFirstNgModuleName(source);
}
exports.getFirstNgModuleName = getFirstNgModuleName;
function getMetadataField(node, metadataField) {
    return ast_utils_1.getMetadataField(node, metadataField);
}
exports.getMetadataField = getMetadataField;
function addSymbolToNgModuleMetadata(source, ngModulePath, metadataField, symbolName, importPath = null) {
    return ast_utils_1.addSymbolToNgModuleMetadata(source, ngModulePath, metadataField, symbolName, importPath);
}
exports.addSymbolToNgModuleMetadata = addSymbolToNgModuleMetadata;
/**
 * Custom function to insert a declaration (component, pipe, directive)
 * into NgModule declarations. It also imports the component.
 */
function addDeclarationToModule(source, modulePath, classifiedName, importPath) {
    return ast_utils_1.addDeclarationToModule(source, modulePath, classifiedName, importPath);
}
exports.addDeclarationToModule = addDeclarationToModule;
/**
 * Custom function to insert an NgModule into NgModule imports. It also imports the module.
 */
function addImportToModule(source, modulePath, classifiedName, importPath) {
    return ast_utils_1.addImportToModule(source, modulePath, classifiedName, importPath);
}
exports.addImportToModule = addImportToModule;
/**
 * Custom function to insert a provider into NgModule. It also imports it.
 */
function addProviderToModule(source, modulePath, classifiedName, importPath) {
    return ast_utils_1.addProviderToModule(source, modulePath, classifiedName, importPath);
}
exports.addProviderToModule = addProviderToModule;
/**
 * Custom function to insert an export into NgModule. It also imports it.
 */
function addExportToModule(source, modulePath, classifiedName, importPath) {
    return ast_utils_1.addExportToModule(source, modulePath, classifiedName, importPath);
}
exports.addExportToModule = addExportToModule;
/**
 * Custom function to insert an export into NgModule. It also imports it.
 */
function addBootstrapToModule(source, modulePath, classifiedName, importPath) {
    return ast_utils_1.addBootstrapToModule(source, modulePath, classifiedName, importPath);
}
exports.addBootstrapToModule = addBootstrapToModule;
/**
 * Custom function to insert an entryComponent into NgModule. It also imports it.
 */
function addEntryComponentToModule(source, modulePath, classifiedName, importPath) {
    return ast_utils_1.addEntryComponentToModule(source, modulePath, classifiedName, importPath);
}
exports.addEntryComponentToModule = addEntryComponentToModule;
/**
 * Determine if an import already exists.
 */
function isImported(source, classifiedName, importPath) {
    return ast_utils_1.isImported(source, classifiedName, importPath);
}
exports.isImported = isImported;
/**
 * Returns the RouterModule declaration from NgModule metadata, if any.
 */
function getRouterModuleDeclaration(source) {
    return ast_utils_1.getRouterModuleDeclaration(source);
}
exports.getRouterModuleDeclaration = getRouterModuleDeclaration;
/**
 * Adds a new route declaration to a router module (i.e. has a RouterModule declaration)
 */
function addRouteDeclarationToModule(source, fileToAdd, routeLiteral) {
    return ast_utils_1.addRouteDeclarationToModule(source, fileToAdd, routeLiteral);
}
exports.addRouteDeclarationToModule = addRouteDeclarationToModule;
//# sourceMappingURL=ast-utils.js.map