import { Component, ElementRef, EventEmitter, forwardRef, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { MatValidateAddressDirective } from '../directives/address-validator/mat-address-validator.directive';
export var Appearance;
(function (Appearance) {
    Appearance["STANDARD"] = "standard";
    Appearance["FILL"] = "fill";
    Appearance["OUTLINE"] = "outline";
    Appearance["LEGACY"] = "legacy";
})(Appearance || (Appearance = {}));
export class MatGoogleMapsAutocompleteComponent {
    constructor(mapsAPILoader, ngZone) {
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.addressLabelText = 'Address';
        this.placeholderText = 'Please enter the address';
        this.requiredErrorText = 'The address is required';
        this.invalidErrorText = 'The address is not valid';
        this.appearance = Appearance.STANDARD;
        this.autoCompleteOptions = {};
        this.onChange = new EventEmitter();
        this.onAutocompleteSelected = new EventEmitter();
        this.onGermanAddressMapped = new EventEmitter();
        this.onLocationSelected = new EventEmitter();
        this.onNewPlaceResult = new EventEmitter();
        this.addressValidator = new MatValidateAddressDirective();
        this.addressSearchControl = new FormControl({ value: null }, Validators.compose([
            Validators.required,
            this.addressValidator.validate()
        ]));
        this.propagateChange = (_) => {
        };
    }
    ngOnInit() {
        this.addressValidator.subscribe(this.onNewPlaceResult);
        const options = {
            // types: ['address'],
            // componentRestrictions: {country: this.country},
            placeIdOnly: this.placeIdOnly,
            strictBounds: this.strictBounds,
            // types: this.types,
            type: this.type
        };
        // tslint:disable-next-line:no-unused-expression
        this.country ? options.componentRestrictions = { country: this.country } : null;
        // tslint:disable-next-line:no-unused-expression
        this.country ? options.types = this.types : null;
        this.autoCompleteOptions = Object.assign(this.autoCompleteOptions, options);
        this.initGoogleMapsAutocomplete();
    }
    initGoogleMapsAutocomplete() {
        this.mapsAPILoader
            .load()
            .then(() => {
            const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, this.autoCompleteOptions);
            autocomplete.addListener('place_changed', () => {
                this.ngZone.run(() => {
                    // get the place result
                    const place = autocomplete.getPlace();
                    const germanAddress = {
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
                        geoLocation: { latitude: -1, longitude: -1 },
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
                    }
                    else {
                        // show dialog to select a address from the input
                        // emit failed event
                        this.value = place;
                        this.propagateChange(this.value);
                    }
                    this.address = place.formatted_address;
                    this.onAutocompleteSelected.emit(place);
                    // console.log('onAutocompleteSelected -> ', place);
                    this.onLocationSelected.emit({
                        latitude: place.geometry.location.lat(),
                        longitude: place.geometry.location.lng()
                    });
                });
            });
        })
            .catch((err) => console.log(err));
    }
    onQuery(event) {
        // console.log('onChange()', event);
        this.onChange.emit(this.address);
    }
    resetAddress() {
        this.address = null;
        this.addressSearchControl.updateValueAndValidity();
    }
    writeValue(obj) {
        if (obj) {
            this.value = obj;
        }
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn) {
        throw new Error('Method not implemented.');
    }
    setDisabledState(isDisabled) {
        throw new Error('Method not implemented.');
    }
}
MatGoogleMapsAutocompleteComponent.ctorParameters = () => [
    { type: MapsAPILoader },
    { type: NgZone }
];
MatGoogleMapsAutocompleteComponent.decorators = [
    { type: Component, args: [{
                selector: 'mat-google-maps-autocomplete',
                exportAs: 'matGoogleMapsAutocomplete',
                template: "<mat-form-field class=\"full-width\" [appearance]=\"appearance\">\r\n  <mat-label>{{addressLabelText}}</mat-label>\r\n  <input matInput\r\n         [(ngModel)]=\"address\"\r\n         (change)=\"onQuery($event)\"\r\n         placeholder=\"{{placeholderText}}\"\r\n         class=\"form-control\"\r\n         #search\r\n         MatValidateAddress\r\n         required>\r\n  <mat-error *ngIf=\"addressSearchControl.hasError('required')\">\r\n    {{requiredErrorText}}\r\n  </mat-error>\r\n  <mat-error *ngIf=\"addressSearchControl.hasError('validateAddress')\">\r\n    {{invalidErrorText}}\r\n  </mat-error>\r\n</mat-form-field>\r\n",
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => MatGoogleMapsAutocompleteComponent),
                        multi: true
                    }
                ],
                styles: [".full-width{width:100%}"]
            },] }
];
MatGoogleMapsAutocompleteComponent.ctorParameters = () => [
    { type: MapsAPILoader },
    { type: NgZone }
];
MatGoogleMapsAutocompleteComponent.propDecorators = {
    searchElementRef: [{ type: ViewChild, args: ['search',] }],
    addressLabelText: [{ type: Input }],
    placeholderText: [{ type: Input }],
    requiredErrorText: [{ type: Input }],
    invalidErrorText: [{ type: Input }],
    appearance: [{ type: Input }],
    value: [{ type: Input }],
    address: [{ type: Input }],
    country: [{ type: Input }],
    placeIdOnly: [{ type: Input }],
    strictBounds: [{ type: Input }],
    types: [{ type: Input }],
    type: [{ type: Input }],
    autoCompleteOptions: [{ type: Input }],
    onChange: [{ type: Output }],
    onAutocompleteSelected: [{ type: Output }],
    onGermanAddressMapped: [{ type: Output }],
    onLocationSelected: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LWdvb2dsZS1tYXBzLWF1dG9jb21wbGV0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1tYXRlcmlhbC1leHRlbnNpb25zL2dvb2dsZS1tYXBzLWF1dG9jb21wbGV0ZS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvbWF0LWdvb2dsZS1tYXBzLWF1dG9jb21wbGV0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hILE9BQU8sRUFBdUIsV0FBVyxFQUFFLGlCQUFpQixFQUFFLFVBQVUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2hHLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDeEMsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0saUVBQWlFLENBQUM7QUFNNUcsTUFBTSxDQUFOLElBQVksVUFLWDtBQUxELFdBQVksVUFBVTtJQUNwQixtQ0FBcUIsQ0FBQTtJQUNyQiwyQkFBYSxDQUFBO0lBQ2IsaUNBQW1CLENBQUE7SUFDbkIsK0JBQWlCLENBQUE7QUFDbkIsQ0FBQyxFQUxXLFVBQVUsS0FBVixVQUFVLFFBS3JCO0FBZUQsTUFBTSxPQUFPLGtDQUFrQztJQXFFN0MsWUFBb0IsYUFBNEIsRUFDNUIsTUFBYztRQURkLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFoRWxDLHFCQUFnQixHQUFHLFNBQVMsQ0FBQztRQUc3QixvQkFBZSxHQUFHLDBCQUEwQixDQUFDO1FBRzdDLHNCQUFpQixHQUFHLHlCQUF5QixDQUFDO1FBRzlDLHFCQUFnQixHQUFHLDBCQUEwQixDQUFDO1FBRzlDLGVBQVUsR0FBd0IsVUFBVSxDQUFD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Q0FBQztJQUVELGlCQUFpQixDQUFDLEVBQU87UUFDdkIsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxnQkFBZ0IsQ0FBRSxVQUFtQjtRQUNuQyxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDN0MsQ0FBQzs7O1lBdklrQyxhQUFhO1lBQ3BCLE1BQU07OztZQW5GbkMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw4QkFBOEI7Z0JBQ3hDLFFBQVEsRUFBRSwyQkFBMkI7Z0JBQ3JDLG1vQkFBNEQ7Z0JBRTVELFNBQVMsRUFBRTtvQkFDVDt3QkFDRSxPQUFPLEVBQUUsaUJBQWlCO3dCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGtDQUFrQyxDQUFDO3dCQUNqRSxLQUFLLEVBQUUsSUFBSTtxQkFDWjtpQkFDRjs7YUFDRjs7O1lBMUJPLGFBQWE7WUFGMkMsTUFBTTs7OytCQStCbkUsU0FBUyxTQUFDLFFBQVE7K0JBR2xCLEtBQUs7OEJBR0wsS0FBSztnQ0FHTCxLQUFLOytCQUdMLEtBQUs7eUJBR0wsS0FBSztvQkFHTCxLQUFLO3NCQUdMLEtBQUs7c0JBR0wsS0FBSzswQkFHTCxLQUFLOzJCQUdMLEtBQUs7b0JBR0wsS0FBSzttQkFJTCxLQUFLO2tDQUdMLEtBQUs7dUJBR0wsTUFBTTtxQ0FHTixNQUFNO29DQUdOLE1BQU07aUNBR04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIElucHV0LCBOZ1pvbmUsIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBGb3JtQ29udHJvbCwgTkdfVkFMVUVfQUNDRVNTT1IsIFZhbGlkYXRvcnN9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHtNYXBzQVBJTG9hZGVyfSBmcm9tICdAYWdtL2NvcmUnO1xyXG5pbXBvcnQge01hdFZhbGlkYXRlQWRkcmVzc0RpcmVjdGl2ZX0gZnJvbSAnLi4vZGlyZWN0aXZlcy9hZGRyZXNzLXZhbGlkYXRvci9tYXQtYWRkcmVzcy12YWxpZGF0b3IuZGlyZWN0aXZlJztcclxuaW1wb3J0IHtMb2NhdGlvbn0gZnJvbSAnLi4vaW50ZXJmYWNlcy9sb2NhdGlvbi5pbnRlcmZhY2UnO1xyXG5pbXBvcnQge0dlcm1hbkFkZHJlc3N9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xyXG5pbXBvcnQgUGxhY2VSZXN1bHQgPSBnb29nbGUubWFwcy5wbGFjZXMuUGxhY2VSZXN1bHQ7XHJcbmltcG9ydCBBdXRvY29tcGxldGVPcHRpb25zID0gZ29vZ2xlLm1hcHMucGxhY2VzLkF1dG9jb21wbGV0ZU9wdGlvbnM7XHJcblxyXG5leHBvcnQgZW51bSBBcHBlYXJhbmNlIHtcclxuICBTVEFOREFSRCA9ICdzdGFuZGFyZCcsXHJcbiAgRklMTCA9ICdmaWxsJyxcclxuICBPVVRMSU5FID0gJ291dGxpbmUnLFxyXG4gIExFR0FDWSA9ICdsZWdhY3knLFxyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ21hdC1nb29nbGUtbWFwcy1hdXRvY29tcGxldGUnLFxyXG4gIGV4cG9ydEFzOiAnbWF0R29vZ2xlTWFwc0F1dG9jb21wbGV0ZScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL21hdC1nb29nbGUtbWFwcy1hdXRvY29tcGxldGUuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL21hdC1nb29nbGUtbWFwcy1hdXRvY29tcGxldGUuY29tcG9uZW50LnNjc3MnXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHtcclxuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1hdEdvb2dsZU1hcHNBdXRvY29tcGxldGVDb21wb25lbnQpLFxyXG4gICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgfVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdEdvb2dsZU1hcHNBdXRvY29tcGxldGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcclxuXHJcbiAgQFZpZXdDaGlsZCgnc2VhcmNoJylcclxuICBwdWJsaWMgc2VhcmNoRWxlbWVudFJlZjogRWxlbWVudFJlZjtcclxuXHJcbiAgQElucHV0KClcclxuICBhZGRyZXNzTGFiZWxUZXh0ID0gJ0FkZHJlc3MnO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHBsYWNlaG9sZGVyVGV4dCA9ICdQbGVhc2UgZW50ZXIgdGhlIGFkZHJlc3MnO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHJlcXVpcmVkRXJyb3JUZXh0ID0gJ1RoZSBhZGRyZXNzIGlzIHJlcXVpcmVkJztcclxuXHJcbiAgQElucHV0KClcclxuICBpbnZhbGlkRXJyb3JUZXh0ID0gJ1RoZSBhZGRyZXNzIGlzIG5vdCB2YWxpZCc7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgYXBwZWFyYW5jZTogc3RyaW5nIHwgQXBwZWFyYW5jZSA9IEFwcGVhcmFuY2UuU1RBTkRBUkQ7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgdmFsdWU6IFBsYWNlUmVzdWx0O1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGFkZHJlc3M6IFBsYWNlUmVzdWx0IHwgc3RyaW5nO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGNvdW50cnk6IHN0cmluZyB8IHN0cmluZ1tdO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHBsYWNlSWRPbmx5PzogYm9vbGVhbjtcclxuXHJcbiAgQElucHV0KClcclxuICBzdHJpY3RCb3VuZHM/OiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHR5cGVzPzogc3RyaW5nW107XHJcbiAgLy8gdHlwZXM6IHN0cmluZ1tdID0gWydhZGRyZXNzJ107XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgdHlwZT86IHN0cmluZztcclxuXHJcbiAgQElucHV0KClcclxuICBhdXRvQ29tcGxldGVPcHRpb25zOiBBdXRvY29tcGxldGVPcHRpb25zID0ge307XHJcblxyXG4gIEBPdXRwdXQoKVxyXG4gIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8UGxhY2VSZXN1bHQgfCBzdHJpbmcgfCBudWxsPiA9IG5ldyBFdmVudEVtaXR0ZXI8UGxhY2VSZXN1bHQgfCBzdHJpbmcgfCBudWxsPigpO1xyXG5cclxuICBAT3V0cHV0KClcclxuICBvbkF1dG9jb21wbGV0ZVNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8UGxhY2VSZXN1bHQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxQbGFjZVJlc3VsdD4oKTtcclxuXHJcbiAgQE91dHB1dCgpXHJcbiAgb25HZXJtYW5BZGRyZXNzTWFwcGVkOiBFdmVudEVtaXR0ZXI8R2VybWFuQWRkcmVzcz4gPSBuZXcgRXZlbnRFbWl0dGVyPEdlcm1hbkFkZHJlc3M+KCk7XHJcblxyXG4gIEBPdXRwdXQoKVxyXG4gIG9uTG9jYXRpb25TZWxlY3RlZDogRXZlbnRFbWl0dGVyPExvY2F0aW9uPiA9IG5ldyBFdmVudEVtaXR0ZXI8TG9jYXRpb24+KCk7XHJcblxyXG5cclxuICBwcml2YXRlIG9uTmV3UGxhY2VSZXN1bHQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIHByaXZhdGUgYWRkcmVzc1ZhbGlkYXRvcjogTWF0VmFsaWRhdGVBZGRyZXNzRGlyZWN0aXZlID0gbmV3IE1hdFZhbGlkYXRlQWRkcmVzc0RpcmVjdGl2ZSgpO1xyXG5cclxuICBwdWJsaWMgYWRkcmVzc1NlYXJjaENvbnRyb2w6IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKHt2YWx1ZTogbnVsbH0sIFZhbGlkYXRvcnMuY29tcG9zZShbXHJcbiAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxyXG4gICAgdGhpcy5hZGRyZXNzVmFsaWRhdG9yLnZhbGlkYXRlKCldKVxyXG4gICk7XHJcblxyXG4gIHByb3BhZ2F0ZUNoYW5nZSA9IChfOiBhbnkpID0+IHtcclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1hcHNBUElMb2FkZXI6IE1hcHNBUElMb2FkZXIsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSkge1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmFkZHJlc3NWYWxpZGF0b3Iuc3Vic2NyaWJlKHRoaXMub25OZXdQbGFjZVJlc3VsdCk7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9uczogQXV0b2NvbXBsZXRlT3B0aW9ucyA9IHtcclxuICAgICAgLy8gdHlwZXM6IFsnYWRkcmVzcyddLFxyXG4gICAgICAvLyBjb21wb25lbnRSZXN0cmljdGlvbnM6IHtjb3VudHJ5OiB0aGlzLmNvdW50cnl9LFxyXG4gICAgICBwbGFjZUlkT25seTogdGhpcy5wbGFjZUlkT25seSxcclxuICAgICAgc3RyaWN0Qm91bmRzOiB0aGlzLnN0cmljdEJvdW5kcyxcclxuICAgICAgLy8gdHlwZXM6IHRoaXMudHlwZXMsXHJcbiAgICAgIHR5cGU6IHRoaXMudHlwZVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW51c2VkLWV4cHJlc3Npb25cclxuICAgIHRoaXMuY291bnRyeSA/IG9wdGlvbnMuY29tcG9uZW50UmVzdHJpY3Rpb25zID0ge2NvdW50cnk6IHRoaXMuY291bnRyeX0gOiBudWxsO1xyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVudXNlZC1leHByZXNzaW9uXHJcbiAgICB0aGlzLmNvdW50cnkgPyBvcHRpb25zLnR5cGVzID0gdGhpcy50eXBlcyA6IG51bGw7XHJcblxyXG4gICAgdGhpcy5hdXRvQ29tcGxldGVPcHRpb25zID0gT2JqZWN0LmFzc2lnbih0aGlzLmF1dG9Db21wbGV0ZU9wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgdGhpcy5pbml0R29vZ2xlTWFwc0F1dG9jb21wbGV0ZSgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGluaXRHb29nbGVNYXBzQXV0b2NvbXBsZXRlKCkge1xyXG4gICAgdGhpcy5tYXBzQVBJTG9hZGVyXHJcbiAgICAgIC5sb2FkKClcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGF1dG9jb21wbGV0ZSA9IG5ldyBnb29nbGUubWFwcy5wbGFjZXMuQXV0b2NvbXBsZXRlKHRoaXMuc2VhcmNoRWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLmF1dG9Db21wbGV0ZU9wdGlvbnMpO1xyXG4gICAgICAgIGF1dG9jb21wbGV0ZS5hZGRMaXN0ZW5lcigncGxhY2VfY2hhbmdlZCcsICgpID0+IHtcclxuICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGdldCB0aGUgcGxhY2UgcmVzdWx0XHJcbiAgICAgICAgICAgIGNvbnN0IHBsYWNlOiBQbGFjZVJlc3VsdCA9IGF1dG9jb21wbGV0ZS5nZXRQbGFjZSgpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZ2VybWFuQWRkcmVzczogR2VybWFuQWRkcmVzcyA9IHtcclxuICAgICAgICAgICAgICBnbUlEOiBwbGFjZS5pZCxcclxuICAgICAgICAgICAgICBpY29uOiBwbGFjZS5pY29uLFxyXG4gICAgICAgICAgICAgIHVybDogcGxhY2UudXJsLFxyXG4gICAgICAgICAgICAgIHBsYWNlSUQ6IHBsYWNlLnBsYWNlX2lkLFxyXG4gICAgICAgICAgICAgIGRpc3BsYXlBZGRyZXNzOiBwbGFjZS5mb3JtYXR0ZWRfYWRkcmVzcyxcclxuICAgICAgICAgICAgICBuYW1lOiBwbGFjZS5uYW1lLFxyXG4gICAgICAgICAgICAgIHZpY2luaXR5OiBwbGFjZS52aWNpbml0eSxcclxuICAgICAgICAgICAgICBsb2NhbGl0eToge30sXHJcbiAgICAgICAgICAgICAgc3RhdGU6IHt9LFxyXG4gICAgICAgICAgICAgIGNvdW50cnk6IHt9LFxyXG4gICAgICAgICAgICAgIGdlb0xvY2F0aW9uOiB7bGF0aXR1ZGU6IC0xLCBsb25naXR1ZGU6IC0xfSxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwbGFjZS5nZW9tZXRyeSAmJiBwbGFjZS5nZW9tZXRyeS5sb2NhdGlvbikge1xyXG4gICAgICAgICAgICAgIGdlcm1hbkFkZHJlc3MuZ2VvTG9jYXRpb24ubGF0aXR1ZGUgPSBwbGFjZS5nZW9tZXRyeS5sb2NhdGlvbi5sYXQoKTtcclxuICAgICAgICAgICAgICBnZXJtYW5BZGRyZXNzLmdlb0xvY2F0aW9uLmxvbmdpdHVkZSA9IHBsYWNlLmdlb21ldHJ5LmxvY2F0aW9uLmxuZygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHMuZm9yRWFjaCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKHZhbHVlLnR5cGVzLmluZGV4T2YoJ3N0cmVldF9udW1iZXInKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBnZXJtYW5BZGRyZXNzLnN0cmVldE51bWJlciA9IHZhbHVlLnNob3J0X25hbWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGlmICh2YWx1ZS50eXBlcy5pbmRleE9mKCdyb3V0ZScpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIGdlcm1hbkFkZHJlc3Muc3RyZWV0TmFtZSA9IHZhbHVlLmxvbmdfbmFtZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYgKHZhbHVlLnR5cGVzLmluZGV4T2YoJ3Bvc3RhbF9jb2RlJykgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgZ2VybWFuQWRkcmVzcy5wb3N0YWxDb2RlID0gTnVtYmVyKHZhbHVlLnNob3J0X25hbWUpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZiAodmFsdWUudHlwZXMuaW5kZXhPZignc3VibG9jYWxpdHknKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBnZXJtYW5BZGRyZXNzLnN1YmxvY2FsaXR5ID0gdmFsdWUubG9uZ19uYW1lO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZiAodmFsdWUudHlwZXMuaW5kZXhPZignbG9jYWxpdHknKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBnZXJtYW5BZGRyZXNzLmxvY2FsaXR5LmxvbmcgPSB2YWx1ZS5sb25nX25hbWU7XHJcbiAgICAgICAgICAgICAgICBnZXJtYW5BZGRyZXNzLmxvY2FsaXR5LnNob3J0ID0gdmFsdWUuc2hvcnRfbmFtZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYgKHZhbHVlLnR5cGVzLmluZGV4T2YoJ2FkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMScpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIGdlcm1hbkFkZHJlc3Muc3RhdGUubG9uZyA9IHZhbHVlLmxvbmdfbmFtZTtcclxuICAgICAgICAgICAgICAgIGdlcm1hbkFkZHJlc3Muc3RhdGUuc2hvcnQgPSB2YWx1ZS5zaG9ydF9uYW1lO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZiAodmFsdWUudHlwZXMuaW5kZXhPZignY291bnRyeScpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIGdlcm1hbkFkZHJlc3MuY291bnRyeS5sb25nID0gdmFsdWUubG9uZ19uYW1lO1xyXG4gICAgICAgICAgICAgICAgZ2VybWFuQWRkcmVzcy5jb3VudHJ5LnNob3J0ID0gdmFsdWUuc2hvcnRfbmFtZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYgKHZhbHVlLnR5cGVzLmluZGV4T2YoJ2FkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMycpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIGdlcm1hbkFkZHJlc3MubG9jYWxpdHkuc2hvcnQgPSB2YWx1ZS5zaG9ydF9uYW1lO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm9uR2VybWFuQWRkcmVzc01hcHBlZC5lbWl0KGdlcm1hbkFkZHJlc3MpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFwbGFjZS5wbGFjZV9pZCB8fCBwbGFjZS5nZW9tZXRyeSA9PT0gdW5kZWZpbmVkIHx8IHBsYWNlLmdlb21ldHJ5ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgLy8gcGxhY2UgcmVzdWx0IGlzIG5vdCB2YWxpZFxyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAvLyBzaG93IGRpYWxvZyB0byBzZWxlY3QgYSBhZGRyZXNzIGZyb20gdGhlIGlucHV0XHJcbiAgICAgICAgICAgICAgLy8gZW1pdCBmYWlsZWQgZXZlbnRcclxuICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gcGxhY2U7XHJcbiAgICAgICAgICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UodGhpcy52YWx1ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmFkZHJlc3MgPSBwbGFjZS5mb3JtYXR0ZWRfYWRkcmVzcztcclxuICAgICAgICAgICAgdGhpcy5vbkF1dG9jb21wbGV0ZVNlbGVjdGVkLmVtaXQocGxhY2UpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnb25BdXRvY29tcGxldGVTZWxlY3RlZCAtPiAnLCBwbGFjZSk7XHJcbiAgICAgICAgICAgIHRoaXMub25Mb2NhdGlvblNlbGVjdGVkLmVtaXQoXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGF0aXR1ZGU6IHBsYWNlLmdlb21ldHJ5LmxvY2F0aW9uLmxhdCgpLFxyXG4gICAgICAgICAgICAgICAgbG9uZ2l0dWRlOiBwbGFjZS5nZW9tZXRyeS5sb2NhdGlvbi5sbmcoKVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmxvZyhlcnIpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvblF1ZXJ5KGV2ZW50OiBhbnkpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKCdvbkNoYW5nZSgpJywgZXZlbnQpO1xyXG4gICAgdGhpcy5vbkNoYW5nZS5lbWl0KHRoaXMuYWRkcmVzcyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlc2V0QWRkcmVzcygpIHtcclxuICAgIHRoaXMuYWRkcmVzcyA9IG51bGw7XHJcbiAgICB0aGlzLmFkZHJlc3NTZWFyY2hDb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcclxuICB9XHJcblxyXG4gIHdyaXRlVmFsdWUob2JqOiBhbnkpOiB2b2lkIHtcclxuICAgIGlmIChvYmopIHtcclxuICAgICAgdGhpcy52YWx1ZSA9IG9iajtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UgPSBmbjtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC4nKTtcclxuICB9XHJcblxyXG4gIHNldERpc2FibGVkU3RhdGU/KGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC4nKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==