import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, Validators} from '@angular/forms';
import {GermanAddress, Location} from '../interfaces';
import {isPlatformBrowser} from '@angular/common';
import {ScriptLoaderService} from "../services/script-loader.service";
import {ApiKeyToken} from "../tokens";
import PlaceResult = google.maps.places.PlaceResult;
import AutocompleteOptions = google.maps.places.AutocompleteOptions;

@Directive({
  selector: '[matGoogleMapsAutocomplete]',
  exportAs: 'matGoogleMapsAutocomplete',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MatGoogleMapsAutocompleteDirective),
      multi: true
    }
  ]
})
export class MatGoogleMapsAutocompleteDirective implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {

  @ViewChild('inputField')
  inputField!: ElementRef;

  autocomplete: google.maps.places.Autocomplete | undefined;

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

  disabled: boolean

  _value: string;

  get value(): string {
    return this._value;
  }

  @Input()
  set value(value: string) {
    this._value = value;
    this.propagateChange(this.value);
    this.cf.markForCheck();
  }

  private onNewPlaceResult: EventEmitter<any> = new EventEmitter();

  propagateChange = (_: any) => {
  };

  constructor(@Inject(PLATFORM_ID) public platformId: string,
              @Inject(ApiKeyToken)
              public apiKey: string,
              public elemRef: ElementRef,
              private cf: ChangeDetectorRef,
              private loaderService: ScriptLoaderService,
              private ngZone: NgZone) {
  }

  ngOnDestroy(): void {
    if (this.autocomplete) {
      google.maps.event.clearInstanceListeners(this.autocomplete);
    }
  }

  ngAfterViewInit(): void {
    this.loadMap();
  }

  ngOnInit(): void {
  }

  validate(fc: FormControl) {
    return fc.hasValidator(Validators.required) ? !!fc?.value : true;
  }

  @HostListener('change')
  onChangeInputValue(): void {
    const value = (this.elemRef.nativeElement as HTMLInputElement)?.value;
    this.value = value;
  }

  public initGoogleMapsAutocomplete() {
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

        // console.log("place.address_components --> ", place.address_components);
        place.address_components.forEach(value => {
          if (value.types.indexOf('street_number') > -1) {
            germanAddress.streetNumber = value.short_name;
          }
          if (value.types.indexOf('route') > -1) {
            germanAddress.streetName = value.long_name;
          }
          if (value.types.indexOf('postal_code') > -1) {
            germanAddress.postalCode = value.short_name;
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

        this.value = place.formatted_address;
        this.address = place.formatted_address;
        this.onAutocompleteSelected.emit(place);
        this.onLocationSelected.emit(
          {
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng()
          });
      });
    });
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: any): void {
    if (obj) {
      this.value = obj;
    }
  }

  loadMap(): void {
    this.loaderService.loadScript(`https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=places`)
      .then(() => {
        this.initMap();
      })
      .catch(error => console.error('Google Maps loading failed: ', error));
  }

  initMap() {
    if (isPlatformBrowser(this.platformId)) {

      this.autocomplete = new google.maps.places.Autocomplete(
        this.elemRef.nativeElement
      );

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

}
