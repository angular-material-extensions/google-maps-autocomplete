import {Location} from './location.interface';

/**
 * @author Anthony Nahas
 * @since 23.12.19
 * @version 1.0
 */
export interface GermanAddress {
  id?: string;
  gmID: string;
  placeID: string;
  name?: string;
  icon?: string;
  displayAddress: string;
  postalCode: number;
  streetNumber: number;
  streetName: string;
  sublocality: string;
  locality: string;
  state: string;
  country: string;
  vicinity?: string;
  url?: string;
  location?: Location;
}
