/// <reference types="googlemaps" />
import { EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup } from '@angular/forms';
import { GermanAddress } from '../../interfaces';
import { Appearance } from '../mat-google-maps-autocomplete.component';
export declare class MatSearchGoogleMapsAutocompleteComponent implements OnInit, ControlValueAccessor {
    private formBuilder;
    appearance: string | Appearance;
    searchAddressLabel: string;
    streetNameLabel: string;
    streetNumberLabel: string;
    postalCodeLabel: string;
    localityLabel: string;
    vicinityLabel: string;
    showVicinity: boolean;
    country: string | string[];
    placeIdOnly?: boolean;
    strictBounds?: boolean;
    types?: string[];
    type?: string;
    readonly: boolean;
    disableSearch: boolean;
    value: GermanAddress;
    onGermanAddressMapped: EventEmitter<GermanAddress>;
    germanAddress: GermanAddress;
    addressFormGroup: FormGroup;
    firstInit: boolean;
    propagateChange: (_: any) => void;
    constructor(formBuilder: FormBuilder);
    ngOnInit(): void;
    createAddressFormGroup(): void;
    syncAutoComplete($event: google.maps.places.PlaceResult): void;
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
}
