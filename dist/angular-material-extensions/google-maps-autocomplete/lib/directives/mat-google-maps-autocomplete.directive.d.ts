/// <reference types="googlemaps" />
import { ElementRef, EventEmitter, NgZone, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { Location } from '../interfaces/location.interface';
import { GermanAddress } from '../interfaces/germand.address.interface';
import PlaceResult = google.maps.places.PlaceResult;
import AutocompleteOptions = google.maps.places.AutocompleteOptions;
export declare class MatGoogleMapsAutocompleteDirective implements OnInit, ControlValueAccessor {
    platformId: string;
    elemRef: ElementRef;
    mapsAPILoader: MapsAPILoader;
    private ngZone;
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
    value: PlaceResult;
    private onNewPlaceResult;
    private addressValidator;
    addressSearchControl: FormControl;
    propagateChange: (_: any) => void;
    constructor(platformId: string, elemRef: ElementRef, mapsAPILoader: MapsAPILoader, ngZone: NgZone);
    ngOnInit(): void;
    initGoogleMapsAutocomplete(): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    writeValue(obj: any): void;
}
