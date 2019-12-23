import {Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MapsAPILoader} from '@agm/core';
import {MatValidateAddressDirective} from '../directives/address-validator/mat-address-validator.directive';
import {Location} from '../interfaces/location.interface';
import {GermanAddress} from '../interfaces';
import PlaceResult = google.maps.places.PlaceResult;
import AutocompleteOptions = google.maps.places.AutocompleteOptions;

export enum Appearance {
  STANDARD = 'standard',
  FILL = 'fill',
  OUTLINE = 'outline',
  LEGACY = 'legacy',
}

@Component({
  selector: 'mat-google-maps-autocomplete',
  exportAs: 'matGoogleMapsAutocomplete',
  templateUrl: './mat-google-maps-autocomplete.component.html',
  styleUrls: ['./mat-google-maps-autocomplete.component.scss']
})
export class MatGoogleMapsAutocompleteComponent implements OnInit {

  @ViewChild('search', {static: false})
  public searchElementRef: ElementRef;

  @Input()
  addressLabelText = 'Address';

  @Input()
  placeholderText = 'Please enter the address';

  @Input()
  requiredErrorText = 'The address is required';

  @Input()
  invalidErrorText = 'The address is not valid';

  @Input()
  appearance: string | Appearance = Appearance.STANDARD;

  @Input()
  address: PlaceResult | string;

  @Input()
  country: string | string[];

  @Input()
  placeIdOnly?: boolean;

  @Input()
  strictBounds?: boolean;

  @Input()
  types?: string[];
  // types: string[] = ['address'];

  @Input()
  type?: string;

  @Input()
  autoCompleteOptions: AutocompleteOptions = {};

  @Output()
  onChange: EventEmitter<PlaceResult | string | null> = new EventEmitter<PlaceResult | string | null>();

  @Output()
  onAutocompleteSelected: EventEmitter<PlaceResult> = new EventEmitter<PlaceResult>();

  @Output()
  onGermanAddressMapped: EventEmitter<GermanAddress> = new EventEmitter<GermanAddress>();

  @Output()
  onLocationSelected: EventEmitter<Location> = new EventEmitter<Location>();

  private onNewPlaceResult: EventEmitter<any> = new EventEmitter();
  private addressValidator: MatValidateAddressDirective = new MatValidateAddressDirective();

  public addressSearchControl: FormControl = new FormControl({value: null}, Validators.compose([
    Validators.required,
    this.addressValidator.validate()])
  );

  constructor(private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.addressValidator.subscribe(this.onNewPlaceResult);

    const options: AutocompleteOptions = {
      // types: ['address'],
      // componentRestrictions: {country: this.country},
      placeIdOnly: this.placeIdOnly,
      strictBounds: this.strictBounds,
      // types: this.types,
      type: this.type
    };

    // tslint:disable-next-line:no-unused-expression
    this.country ? options.componentRestrictions = {country: this.country} : null;
    // tslint:disable-next-line:no-unused-expression
    this.country ? options.types = this.types : null;

    this.autoCompleteOptions = Object.assign(this.autoCompleteOptions, options);
    this.initGoogleMapsAutocomplete();
  }

  public initGoogleMapsAutocomplete() {
    this.mapsAPILoader
      .load()
      .then(() => {
        const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, this.autoCompleteOptions);
        autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            // get the place result
            const place: PlaceResult = autocomplete.getPlace();

            const germanAddress: GermanAddress = {
              gmID: place.id,
              icon: place.icon,
              url: place.url,
              placeID: place.place_id,
              displayAddress: place.formatted_address,
              name: place.name,
              vicinity: place.vicinity,
              locality: {},
              state: {},
              country: {},
              geoLocation: {latitude: -1, longitude: -1},
            };

            if (place.geometry && place.geometry.location) {
              germanAddress.geoLocation.latitude = place.geometry.location.lat();
              germanAddress.geoLocation.longitude = place.geometry.location.lng();
            }

            place.address_components.forEach(value => {
              if (value.types.indexOf('street_number') > -1) {
                germanAddress.streetNumber = Number(value.short_name);
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

            this.onGermanAddressMapped.emit(germanAddress);

            if (!place.place_id || place.geometry === undefined || place.geometry === null) {
              // place result is not valid
              return;
            } else {
              // show dialog to select a address from the input
              // emit failed event
            }
            this.address = place.formatted_address;
            this.onAutocompleteSelected.emit(place);
            // console.log('onAutocompleteSelected -> ', place);
            this.onLocationSelected.emit(
              {
                latitude: place.geometry.location.lat(),
                longitude: place.geometry.location.lng()
              });
          });
        });
      })
      .catch((err) => console.log(err));
  }

  public onQuery(event: any) {
    // console.log('onChange()', event);
    this.onChange.emit(this.address);
  }

  private resetAddress() {
    this.address = null;
    this.addressSearchControl.updateValueAndValidity();
  }

}
