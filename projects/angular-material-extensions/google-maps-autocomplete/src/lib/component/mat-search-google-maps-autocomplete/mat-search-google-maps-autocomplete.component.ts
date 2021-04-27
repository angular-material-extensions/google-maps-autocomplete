import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';

import {parseGermanAddress} from '../../helpers/parser';
import {GermanAddress} from '../../interfaces';
import {Appearance} from '../mat-google-maps-autocomplete.component';
import {InputAnimations} from '../../animations';
import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

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

  constructor(private formBuilder: FormBuilder) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  @Input()
  searchBarAppearance: string | Appearance;

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

  @Input() private _value: GermanAddress;

  @Output()
  onGermanAddressMapped: EventEmitter<GermanAddress> = new EventEmitter<GermanAddress>();

  germanAddress: GermanAddress;
  addressFormGroup: FormGroup;

  firstInit = true;

  // Private
  private _unsubscribeAll: Subject<any>;

  propagateChange = (_: any) => {
  };


  get value(): GermanAddress {
    return this._value;
  }

  @Input()
  set value(value: GermanAddress) {
    this._value = value;
    this.propagateChange(this.value);
    console.log('setValue', this._value);
  }

  ngOnInit() {
    this.createAddressFormGroup();
    this.enableCustomInput();
  }

  createAddressFormGroup(): void {
    this.addressFormGroup = this.formBuilder.group({
      streetName: [this.value && this.value.streetName ? this.value.streetName : null, Validators.required],
      streetNumber: [this.value && this.value.streetNumber ? this.value.streetNumber : null, Validators.required],
      postalCode: [this.value && this.value.postalCode ? this.value.postalCode : null, Validators.required],
      vicinity: [this.value && this.value.vicinity ? this.value.vicinity : null],
      locality: this.formBuilder.group({
        long: [this.value && this.value.locality && this.value.locality.long ? this.value.locality.long : null, Validators.required],
      }),
    });
  }

  enableCustomInput() {
    this.addressFormGroup
      .get('streetName')
      .valueChanges
      .pipe(distinctUntilChanged(), debounceTime(400), takeUntil(this._unsubscribeAll))
      .subscribe(streetName => {
        console.log('custom input for street Name', streetName);
        console.log('custom input - new german address streetName', this.value);
        !this.value ? this.value = {streetName} : this.value.streetName = streetName;
        this.value.displayAddress = this.parseDisplayAddress();
        this.propagateChange(this.value);
      });
    this.addressFormGroup
      .get('streetNumber')
      .valueChanges
      .pipe(distinctUntilChanged(), debounceTime(400), takeUntil(this._unsubscribeAll))
      .subscribe(streetNumber => {
        !this.value ? this.value = {streetNumber} : this.value.streetNumber = streetNumber;
        console.log('custom input - new german address streetNumber', this.value);
        this.value.displayAddress = this.parseDisplayAddress();
        this.propagateChange(this.value);
      });
    this.addressFormGroup
      .get('postalCode')
      .valueChanges
      .pipe(distinctUntilChanged(), debounceTime(400), takeUntil(this._unsubscribeAll))
      .subscribe(postalCode => {
        !this.value ? this.value = {postalCode} : this.value.postalCode = postalCode;
        console.log('custom input - new german address postalCode', this.value);
        this.value.displayAddress = this.parseDisplayAddress();
        this.propagateChange(this.value);
      });
    this.addressFormGroup
      .get('vicinity')
      .valueChanges
      .pipe(distinctUntilChanged(), debounceTime(400), takeUntil(this._unsubscribeAll))
      .subscribe(vicinity => {
        !this.value ? this.value = {vicinity} : this.value.vicinity = vicinity;
        console.log('custom input - new german address vicinity', this.value);
        this.value.displayAddress = this.parseDisplayAddress();
        this.propagateChange(this.value);
      });
    this.addressFormGroup
      .get('locality')
      .valueChanges
      .pipe(distinctUntilChanged(), debounceTime(400), takeUntil(this._unsubscribeAll))
      .subscribe(locality => {
        !this.value ? this.value = {locality} : this.value.locality = locality;
        console.log('custom input - new german address locality', this.value);
        this.value.displayAddress = this.parseDisplayAddress();
        this.propagateChange(this.value);
      });
  }

  parseDisplayAddress() {
    return `${this.value?.streetName ? this.value?.streetName : ''} ${this.value?.streetNumber ? this.value?.streetNumber : ''}${this.value?.postalCode || this.value?.locality?.long ? ', ' : ''}${this.value?.postalCode ? this.value?.postalCode : ''} ${this.value?.locality?.long ? this.value?.locality?.long : ''}`
  }

  syncAutoComplete($event: google.maps.places.PlaceResult) {
    if (this.germanAddress) {
      this.addressFormGroup.reset();
    }
    const germanAddress: GermanAddress = parseGermanAddress($event);
    this.germanAddress = germanAddress;
    if (germanAddress.vicinity) {
      this.addressFormGroup.get('vicinity').patchValue(germanAddress.vicinity, {emitEvent: false, onlySelf: true});
    }
    if (germanAddress.streetName) {
      this.addressFormGroup.get('streetName').patchValue(germanAddress.streetName, {emitEvent: false, onlySelf: true});
    }
    if (germanAddress.streetNumber) {
      this.addressFormGroup.get('streetNumber').patchValue(germanAddress.streetNumber.toString(), {emitEvent: false, onlySelf: true});
    }
    if (germanAddress.postalCode) {
      this.addressFormGroup.get('postalCode').patchValue(germanAddress.postalCode, {emitEvent: false, onlySelf: true});
    }
    if (germanAddress.locality && germanAddress.locality.long) {
      this.addressFormGroup.get('locality.long').patchValue(germanAddress.locality.long, {emitEvent: false, onlySelf: true});
    }

    this.value = germanAddress;
    this.onGermanAddressMapped.emit(germanAddress);
  }

  writeValue(obj: any): void {
    let shouldRecreateFG = false;
    if (obj) {
      if (!this.value && this.firstInit) {
        shouldRecreateFG = true;
      }
      this.value = obj;
      if (shouldRecreateFG) {
        this.createAddressFormGroup();
        this.firstInit = false;
      }
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
