import { Location } from './location.interface';
/**
 * @author Anthony Nahas
 * @since 23.12.19
 * @version 1.0
 */
export interface GermanAddress {
    id?: string;
    gmID?: string;
    placeID?: string;
    name?: string;
    icon?: string;
    displayAddress?: string;
    postalCode?: number;
    streetNumber?: string;
    streetName?: string;
    sublocality?: string;
    locality?: {
        short?: string;
        long?: string;
    };
    state?: {
        short?: string;
        long?: string;
    };
    country?: {
        short?: string;
        long?: string;
    };
    vicinity?: string;
    url?: string;
    geoLocation?: Location;
}
