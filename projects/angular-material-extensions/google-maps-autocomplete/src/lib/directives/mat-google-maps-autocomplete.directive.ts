import {Directive, ElementRef, EventEmitter, forwardRef, HostListener, Inject, Input, NgZone, OnInit, Output, PLATFORM_ID} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {MatValidateAddressDirective} from '../directives/address-validator/mat-address-validator.directive';
import {MapsAPILoader} from '@agm/core';
import {Location} from '../interfaces/location.interface';
import {isPlatformBrowser} from '@angular/common';
import {GermanAddress} from '../interfaces/germand.address.interface';
import PlaceResult = google.maps.places.PlaceResult;
import AutocompleteOptions = google.maps.places.AutocompleteOptions;

@Directive({
  selector: '[matGoogleMapsAutocomplete]',
  exportAs: 'matGoogleMapsAutocomplete',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MatGoogleMapsAutocompleteDirective),
      multi: true
    }
  ]
})
export class MatGoogleMapsAutocompleteDirective implements OnInit, ControlValueAccessor {

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

  value: PlaceResult;

  private onNewPlaceResult: EventEmitter<any> = new EventEmitter();
  private addressValidator: MatValidateAddressDirective = new MatValidateAddressDirective();

  public addressSearchControl: FormControl = new FormControl({value: null}, Validators.compose([
    Validators.required,
    this.addressValidator.validate()])
  );

  propagateChange = (_: any) => {
  };

  constructor(@Inject(PLATFORM_ID) public platformId: string,
              public elemRef: ElementRef,
              public mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {
  }

  @HostListener('input', ['$event'])
  onInputChange(event) {
    this.onChange.emit(event?.target?.value);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
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

  }

  public initGoogleMapsAutocomplete() {
    this.mapsAPILoader
      .load()
      .then(() => {
        const autocomplete = new google.maps.places.Autocomplete(this.elemRef.nativeElement, this.autoCompleteOptions);
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

            this.onGermanAddressMapped.emit(germanAddress);

            if (!place.place_id || place.geometry === undefined || place.geometry === null) {
              // place result is not valid
              return;
            } else {
              // show dialog to select a address from the input
              // emit failed event
              this.value = place;
              this.propagateChange(this.value)
            }
            this.address = place.formatted_address;
            this.onAutocompleteSelected.emit(place);
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

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    if (obj) {
      this.value = obj;
    }
  }

}
