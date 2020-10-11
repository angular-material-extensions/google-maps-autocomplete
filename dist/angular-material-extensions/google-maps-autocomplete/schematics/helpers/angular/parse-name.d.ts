import { Location as OriginalLocation } from '@schematics/angular/utility/parse-name';
export interface Location extends OriginalLocation {
}
export declare function parseName(path: string, name: string): Location;
