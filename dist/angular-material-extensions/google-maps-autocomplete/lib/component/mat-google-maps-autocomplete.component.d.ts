/// <reference types="googlemaps" />
import { ElementRef, EventEmitter, NgZone, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { Location } from '../interfaces/location.interface';
import { GermanAddress } from '../interfaces';
import PlaceResult = google.maps.places.PlaceResult;
import AutocompleteOptions = google.maps.places.AutocompleteOptions;
export declare enum Appearance {
    STANDARD = "standard",
    FILL = "fill",
    OUTLINE = "outline",
    LEGACY = "legacy"
}
export declare class MatGoogleMapsAutocompleteComponent implements OnInit, ControlValueAccessor {
    private mapsAPILoader;
    private ngZone;
    searchElementRef: ElementRef;
    addressLabelText: string;
    placeholderText: string;
    requiredErrorText: string;
    invalidErrorText: string;
    appearance: string | Appearance;
    value: PlaceResult;
    address: PlaceResult | string;
    country: string | string[];
    placeIdOnly?: boolean;
    strictBounds?: boolean;
    types?: string[];
    type?: string;
    autoCompleteOptions: AutocompleteOptions;
    onChange: EventEmitter<PlaceResult | string | null>;
    onAutocompleteSelected: EventEmitter<PlaceResult>;
    onGermanAddressMapped: EventEmitter<GermanAddress>;
    onLocationSelected: EventEmitter<Location>;
    private onNewPlaceResult;
    private addressValidator;
    addressSearchControl: FormControl;
    propagateChange: (_: any) => void;
    constructor(mapsAPILoader: MapsAPILoader, ngZone: NgZone);
    ngOnInit(): void;
    initGoogleMapsAutocomplete(): void;
    onQuery(event: any): void;
    private resetAddress;
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState?(isDisabled: boolean): void;
}
