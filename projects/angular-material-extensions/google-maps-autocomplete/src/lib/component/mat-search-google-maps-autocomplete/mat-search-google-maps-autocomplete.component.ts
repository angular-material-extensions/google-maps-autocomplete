import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';

import {parseGermanAddress} from '../../helpers/parser';
import {GermanAddress} from '../../interfaces';
import {Appearance} from '../mat-google-maps-autocomplete.component';
import {InputAnimations} from '../../animations';

@Component({
  selector: 'mat-search-google-maps-autocomplete',
  templateUrl: './mat-search-google-maps-autocomplete.component.html',
  styleUrls: ['./mat-search-google-maps-autocomplete.component.scss'],
  animations: InputAnimations,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MatSearchGoogleMapsAutocompleteComponent),
      multi: true
    }
  ]
})
export class MatSearchGoogleMapsAutocompleteComponent implements OnInit, ControlValueAccessor {

  @Input()
  appearance: string | Appearance = Appearance.STANDARD;

  @Input()
  searchAddressLabel = 'Search Address';

  @Input()
  streetNameLabel = 'Street';

  @Input()
  streetNumberLabel = 'Nr.';

  @Input()
  postalCodeLabel = 'PLZ';

  @Input()
  localityLabel = 'Locality';

  @Input()
  vicinityLabel = 'Vicinity';

  @Input()
  showVicinity: boolean;

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
  readonly: boolean;

  @Input()
  disableSearch: boolean;

  @Input()
  value: GermanAddress;

  @Output()
  onGermanAddressMapped: EventEmitter<GermanAddress> = new EventEmitter<GermanAddress>();

  germanAddress: GermanAddress;
  addressFormGroup: FormGroup;

  propagateChange = (_: any) => {
  };

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.addressFormGroup = this.createAddressFormGroup();
  }

  createAddressFormGroup(): FormGroup {
    return this.formBuilder.group({
      streetName: [this.value && this.value.streetName ? this.value.streetName : null, Validators.required],
      streetNumber: [this.value && this.value.streetNumber ? this.value.streetNumber : null, Validators.required],
      postalCode: [this.value && this.value.postalCode ? this.value.postalCode : null, Validators.required],
      vicinity: [this.value && this.value.vicinity ? this.value.vicinity : null],
      locality: this.formBuilder.group({
        long: [this.value && this.value.locality && this.value.locality.long ? this.value.locality.long : null, Validators.required],
      }),
    });
  }

  syncAutoComplete($event: google.maps.places.PlaceResult) {
    if (this.germanAddress) {
      this.addressFormGroup.reset();
    }
    const germanAddress: GermanAddress = parseGermanAddress($event);
    this.germanAddress = germanAddress;
    if (germanAddress.vicinity) {
      this.addressFormGroup.get('vicinity').patchValue(germanAddress.vicinity);
    }
    if (germanAddress.streetName) {
      this.addressFormGroup.get('streetName').patchValue(germanAddress.streetName);
    }
    if (germanAddress.streetNumber) {
      this.addressFormGroup.get('streetNumber').patchValue(germanAddress.streetNumber.toString());
    }
    if (germanAddress.postalCode) {
      this.addressFormGroup.get('postalCode').patchValue(germanAddress.postalCode);
    }
    if (germanAddress.locality && germanAddress.locality.long) {
      this.addressFormGroup.get('locality.long').patchValue(germanAddress.locality.long);
    }

    this.value = germanAddress;
    this.propagateChange(this.value);
    this.onGermanAddressMapped.emit(germanAddress);
  }

  writeValue(obj: any): void {
    if (obj) {
      this.value = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

}
