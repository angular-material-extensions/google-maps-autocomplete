/// <reference types="googlemaps" />
import PlaceResult = google.maps.places.PlaceResult;
import { GermanAddress } from '../interfaces';
export declare function parseGermanAddress(placeResult: PlaceResult): GermanAddress;
