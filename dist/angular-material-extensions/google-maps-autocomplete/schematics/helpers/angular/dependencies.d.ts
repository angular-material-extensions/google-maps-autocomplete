import { Tree } from '@angular-devkit/schematics';
import { NodeDependency as OriginalNodeDependency } from '@schematics/angular/utility/dependencies';
export declare enum NodeDependencyType {
    Default = "dependencies",
    Dev = "devDependencies",
    Peer = "peerDependencies",
    Optional = "optionalDependencies"
}
export interface NodeDependency extends OriginalNodeDependency {
}
export declare function addPackageJsonDependency(tree: Tree, dependency: NodeDependency): void;
export declare function removePackageJsonDependency(tree: Tree, name: string): void;
export declare function getPackageJsonDependency(tree: Tree, name: string): NodeDependency | null;
