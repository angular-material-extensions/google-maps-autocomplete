import PlaceResult = google.maps.places.PlaceResult;
import {GermanAddress} from '../interfaces';

export function parseGermanAddress(placeResult: PlaceResult): GermanAddress {
  const germanAddress: GermanAddress = {
    gmID: placeResult.id,
    icon: placeResult.icon,
    url: placeResult.url,
    placeID: placeResult.place_id,
    displayAddress: placeResult.formatted_address,
    name: placeResult.name,
    vicinity: placeResult.vicinity,
    locality: {},
    state: {},
    country: {},
    geoLocation: {latitude: -1, longitude: -1},
  };

  if (placeResult.geometry && placeResult.geometry.location) {
    germanAddress.geoLocation.latitude = placeResult.geometry.location.lat();
    germanAddress.geoLocation.longitude = placeResult.geometry.location.lng();
  }

  if (placeResult.address_components && placeResult.address_components.length > 0) {
    placeResult.address_components.forEach(value => {
      if (value.types.indexOf('street_number') > -1) {
        germanAddress.streetNumber = value.short_name;
      }
      if (value.types.indexOf('route') > -1) {
        germanAddress.streetName = value.long_name;
      }
      if (value.types.indexOf('postal_code') > -1) {
        germanAddress.postalCode = Number(value.short_name);
      }
      if (value.types.indexOf('sublocality') > -1) {
        germanAddress.sublocality = value.long_name;
      }
      if (value.types.indexOf('locality') > -1) {
        germanAddress.locality.long = value.long_name;
        germanAddress.locality.short = value.short_name;
      }
      if (value.types.indexOf('administrative_area_level_1') > -1) {
        germanAddress.state.long = value.long_name;
        germanAddress.state.short = value.short_name;
      }
      if (value.types.indexOf('country') > -1) {
        germanAddress.country.long = value.long_name;
        germanAddress.country.short = value.short_name;
      }
      if (value.types.indexOf('administrative_area_level_3') > -1) {
        germanAddress.locality.short = value.short_name;
      }
    });
  }
  return germanAddress;
}
