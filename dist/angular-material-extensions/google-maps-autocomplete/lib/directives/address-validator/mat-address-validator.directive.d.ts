/// <reference types="googlemaps" />
import { EventEmitter } from '@angular/core';
import { Validator, ValidatorFn } from '@angular/forms';
import PlaceResult = google.maps.places.PlaceResult;
export declare class MatValidateAddressDirective implements Validator {
    subscription: any;
    private _address;
    constructor();
    validate(): ValidatorFn;
    subscribe(eventEmitter: EventEmitter<any>): void;
    unsubscribe(): void;
    get address(): PlaceResult;
    set address(value: PlaceResult);
}
