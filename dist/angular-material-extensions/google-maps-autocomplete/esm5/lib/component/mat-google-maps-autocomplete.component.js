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
var MatGoogleMapsAutocompleteComponent = /** @class */ (function () {
    function MatGoogleMapsAutocompleteComponent(mapsAPILoader, ngZone) {
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
        this.propagateChange = function (_) {
        };
    }
    MatGoogleMapsAutocompleteComponent.prototype.ngOnInit = function () {
        this.addressValidator.subscribe(this.onNewPlaceResult);
        var options = {
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
    };
    MatGoogleMapsAutocompleteComponent.prototype.initGoogleMapsAutocomplete = function () {
        var _this = this;
        this.mapsAPILoader
            .load()
            .then(function () {
            var autocomplete = new google.maps.places.Autocomplete(_this.searchElementRef.nativeElement, _this.autoCompleteOptions);
            autocomplete.addListener('place_changed', function () {
                _this.ngZone.run(function () {
                    // get the place result
                    var place = autocomplete.getPlace();
                    var germanAddress = {
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
                    place.address_components.forEach(function (value) {
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
                    _this.onGermanAddressMapped.emit(germanAddress);
                    if (!place.place_id || place.geometry === undefined || place.geometry === null) {
                        // place result is not valid
                        return;
                    }
                    else {
                        // show dialog to select a address from the input
                        // emit failed event
                        _this.value = place;
                        _this.propagateChange(_this.value);
                    }
                    _this.address = place.formatted_address;
                    _this.onAutocompleteSelected.emit(place);
                    // console.log('onAutocompleteSelected -> ', place);
                    _this.onLocationSelected.emit({
                        latitude: place.geometry.location.lat(),
                        longitude: place.geometry.location.lng()
                    });
                });
            });
        })
            .catch(function (err) { return console.log(err); });
    };
    MatGoogleMapsAutocompleteComponent.prototype.onQuery = function (event) {
        // console.log('onChange()', event);
        this.onChange.emit(this.address);
    };
    MatGoogleMapsAutocompleteComponent.prototype.resetAddress = function () {
        this.address = null;
        this.addressSearchControl.updateValueAndValidity();
    };
    MatGoogleMapsAutocompleteComponent.prototype.writeValue = function (obj) {
        if (obj) {
            this.value = obj;
        }
    };
    MatGoogleMapsAutocompleteComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    MatGoogleMapsAutocompleteComponent.prototype.registerOnTouched = function (fn) {
        throw new Error('Method not implemented.');
    };
    MatGoogleMapsAutocompleteComponent.prototype.setDisabledState = function (isDisabled) {
        throw new Error('Method not implemented.');
    };
    MatGoogleMapsAutocompleteComponent.ctorParameters = function () { return [
        { type: MapsAPILoader },
        { type: NgZone }
    ]; };
    MatGoogleMapsAutocompleteComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mat-google-maps-autocomplete',
                    exportAs: 'matGoogleMapsAutocomplete',
                    template: "<mat-form-field class=\"full-width\" [appearance]=\"appearance\">\r\n  <mat-label>{{addressLabelText}}</mat-label>\r\n  <input matInput\r\n         [(ngModel)]=\"address\"\r\n         (change)=\"onQuery($event)\"\r\n         placeholder=\"{{placeholderText}}\"\r\n         class=\"form-control\"\r\n         #search\r\n         MatValidateAddress\r\n         required>\r\n  <mat-error *ngIf=\"addressSearchControl.hasError('required')\">\r\n    {{requiredErrorText}}\r\n  </mat-error>\r\n  <mat-error *ngIf=\"addressSearchControl.hasError('validateAddress')\">\r\n    {{invalidErrorText}}\r\n  </mat-error>\r\n</mat-form-field>\r\n",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return MatGoogleMapsAutocompleteComponent; }),
                            multi: true
                        }
                    ],
                    styles: [".full-width{width:100%}"]
                },] }
    ];
    MatGoogleMapsAutocompleteComponent.ctorParameters = function () { return [
        { type: MapsAPILoader },
        { type: NgZone }
    ]; };
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
    return MatGoogleMapsAutocompleteComponent;
}());
export { MatGoogleMapsAutocompleteComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LWdvb2dsZS1tYXBzLWF1dG9jb21wbGV0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1tYXRlcmlhbC1leHRlbnNpb25zL2dvb2dsZS1tYXBzLWF1dG9jb21wbGV0ZS8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQvbWF0LWdvb2dsZS1tYXBzLWF1dG9jb21wbGV0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hILE9BQU8sRUFBdUIsV0FBVyxFQUFFLGlCQUFpQixFQUFFLFVBQVUsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ2hHLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDeEMsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0saUVBQWlFLENBQUM7QUFNNUcsTUFBTSxDQUFOLElBQVksVUFLWDtBQUxELFdBQVksVUFBVTtJQUNwQixtQ0FBcUIsQ0FBQTtJQUNyQiwyQkFBYSxDQUFBO0lBQ2IsaUNBQW1CLENBQUE7SUFDbkIsK0JBQWlCLENBQUE7QUFDbkIsQ0FBQyxFQUxXLFVBQVUsS0FBVixVQUFVLFFBS3JCO0FBRUQ7SUFrRkUsNENBQW9CLGFBQTRCLEVBQzVCLE1BQWM7UUFEZCxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBaEVsQyxxQkFBZ0IsR0FBRyxTQUFTLENBQUM7UUFHN0Isb0JBQWUsR0FBRywwQkFBMEIsQ0FBQztRQUc3QyxzQkFBaUIsR0FBRyx5QkFBeUIsQ0FBQztRQUc5QyxxQkFBZ0IsR0FBRywwQkFBMEIsQ0FBQztRQUc5QyxlQUFVLEdBQXdCLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUF5QnRELHdCQUFtQixHQUF3QixFQUFFLENBQUM7UUFHOUMsYUFBUSxHQUE4QyxJQUFJLFlBQVksRUFBK0IsQ0FBQztRQUd0RywyQkFBc0IsR0FBOEIsSUFBSSxZQUFZLEVBQWUsQ0FBQztRQUdwRiwwQkFBcUIsR0FBZ0MsSUFBSSxZQUFZLEVBQWlCLENBQUM7UUFHdkYsdUJBQWtCLEdBQTJCLElBQUksWUFBWSxFQUFZLENBQUM7UUFHbEUscUJBQWdCLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDekQscUJBQWdCLEdBQWdDLElBQUksMkJBQTJCLEVBQUUsQ0FBQztRQUVuRix5QkFBb0IsR0FBZ0IsSUFBSSxXQUFXLENBQUMsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFDLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQztZQUMzRixVQUFVLENBQUMsUUFBUTtZQUNuQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFO1NBQUMsQ0FBQyxDQUNuQyxDQUFDO1FBRUYsb0JBQWUsR0FBRyxVQUFDLENBQU07UUFDekIsQ0FBQyxDQUFDO0lBSUYsQ0FBQztJQUVELHFEQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXZELElBQU0sT0FBTyxHQUF3QjtZQUNuQyxzQkFBc0I7WUFDdEIsa0RBQWtEO1lBQ2xELFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztZQUM3QixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7WUFDL0IscUJBQXFCO1lBQ3JCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtTQUNoQixDQUFDO1FBRUYsZ0RBQWdEO1FBQ2hELElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsR0FBRyxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUM5RSxnREFBZ0Q7UUFDaEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFakQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzVFLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFTSx1RUFBMEIsR0FBakM7UUFBQSxpQkFrRkM7UUFqRkMsSUFBSSxDQUFDLGFBQWE7YUFDZixJQUFJLEVBQUU7YUFDTixJQUFJLENBQUM7WUFDSixJQUFNLFlBQVksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ3hILFlBQVksQ0FBQyxXQUFXLENBQUMsZUFBZSxFQUFFO2dCQUN4QyxLQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztvQkFDZCx1QkFBdUI7b0JBQ3ZCLElBQU0sS0FBSyxHQUFnQixZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBRW5ELElBQU0sYUFBYSxHQUFrQjt3QkFDbkMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFO3dCQUNkLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTt3QkFDaEIsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHO3dCQUNkLE9BQU8sRUFBRSxLQUFLLENBQUMsUUFBUTt3QkFDdkIsY0FBYyxFQUFFLEtBQUssQ0FBQyxpQkFBaUI7d0JBQ3ZDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTt3QkFDaEIsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO3dCQUN4QixRQUFRLEVBQUUsRUFBRTt3QkFDWixLQUFLLEVBQUUsRUFBRTt3QkFDVCxPQUFPLEVBQUUsRUFBRTt3QkFDWCxXQUFXLEVBQUUsRUFBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFDO3FCQUMzQyxDQUFDO29CQUVGLElBQUksS0FBSyxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTt3QkFDN0MsYUFBYSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7d0JBQ25FLGFBQWEsQ0FBQyxXQUFXLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO3FCQUNyRTtvQkFFRCxLQUFLLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSzt3QkFDcEMsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTs0QkFDN0MsYUFBYSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDO3lCQUMvQzt3QkFDRCxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFOzRCQUNyQyxhQUFhLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7eUJBQzVDO3dCQUNELElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7NEJBQzNDLGFBQWEsQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQzt5QkFDckQ7d0JBQ0QsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTs0QkFDM0MsYUFBYSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO3lCQUM3Qzt3QkFDRCxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFOzRCQUN4QyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDOzRCQUM5QyxhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDO3lCQUNqRDt3QkFDRCxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLDZCQUE2QixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7NEJBQzNELGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7NEJBQzNDLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7eUJBQzlDO3dCQUNELElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7NEJBQ3ZDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7NEJBQzdDLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7eUJBQ2hEO3dCQUNELElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsNkJBQTZCLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTs0QkFDM0QsYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQzt5QkFDakQ7b0JBQ0gsQ0FBQyxDQUFDLENBQUM7b0JBRUgsS0FBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFFL0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxTQUFTLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxJQUFJLEVBQUU7d0JBQzlFLDRCQUE0Qjt3QkFDNUIsT0FBTztxQkFDUjt5QkFBTTt3QkFDTCxpREFBaUQ7d0JBQ2pELG9CQUFvQjt3QkFDcEIsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7d0JBQ25CLEtBQUksQ0FBQyxlQUFlLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO3FCQUNqQztvQkFDRCxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQztvQkFDdkMsS0FBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDeEMsb0RBQW9EO29CQUNwRCxLQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUMxQjt3QkFDRSxRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFO3dCQUN2QyxTQUFTLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFO3FCQUN6QyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFDLEdBQUcsSUFBSyxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQWhCLENBQWdCLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRU0sb0RBQU8sR0FBZCxVQUFlLEtBQVU7UUFDdkIsb0NBQW9DO1FBQ3BDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRU8seURBQVksR0FBcEI7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsb0JBQW9CLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUNyRCxDQUFDO0lBRUQsdURBQVUsR0FBVixVQUFXLEdBQVE7UUFDakIsSUFBSSxHQUFHLEVBQUU7WUFDUCxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztTQUNsQjtJQUNILENBQUM7SUFFRCw2REFBZ0IsR0FBaEIsVUFBaUIsRUFBTztRQUN0QixJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsOERBQWlCLEdBQWpCLFVBQWtCLEVBQU87UUFDdkIsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCw2REFBZ0IsR0FBaEIsVUFBa0IsVUFBbUI7UUFDbkMsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQzdDLENBQUM7O2dCQXZJa0MsYUFBYTtnQkFDcEIsTUFBTTs7O2dCQW5GbkMsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSw4QkFBOEI7b0JBQ3hDLFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLG1vQkFBNEQ7b0JBRTVELFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxrQ0FBa0MsRUFBbEMsQ0FBa0MsQ0FBQzs0QkFDakUsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7O2lCQUNGOzs7Z0JBMUJPLGFBQWE7Z0JBRjJDLE1BQU07OzttQ0ErQm5FLFNBQVMsU0FBQyxRQUFRO21DQUdsQixLQUFLO2tDQUdMLEtBQUs7b0NBR0wsS0FBSzttQ0FHTCxLQUFLOzZCQUdMLEtBQUs7d0JBR0wsS0FBSzswQkFHTCxLQUFLOzBCQUdMLEtBQUs7OEJBR0wsS0FBSzsrQkFHTCxLQUFLO3dCQUdMLEtBQUs7dUJBSUwsS0FBSztzQ0FHTCxLQUFLOzJCQUdMLE1BQU07eUNBR04sTUFBTTt3Q0FHTixNQUFNO3FDQUdOLE1BQU07O0lBd0pULHlDQUFDO0NBQUEsQUEzTkQsSUEyTkM7U0E5TVksa0NBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSW5wdXQsIE5nWm9uZSwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIEZvcm1Db250cm9sLCBOR19WQUxVRV9BQ0NFU1NPUiwgVmFsaWRhdG9yc30gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQge01hcHNBUElMb2FkZXJ9IGZyb20gJ0BhZ20vY29yZSc7XHJcbmltcG9ydCB7TWF0VmFsaWRhdGVBZGRyZXNzRGlyZWN0aXZlfSBmcm9tICcuLi9kaXJlY3RpdmVzL2FkZHJlc3MtdmFsaWRhdG9yL21hdC1hZGRyZXNzLXZhbGlkYXRvci5kaXJlY3RpdmUnO1xyXG5pbXBvcnQge0xvY2F0aW9ufSBmcm9tICcuLi9pbnRlcmZhY2VzL2xvY2F0aW9uLmludGVyZmFjZSc7XHJcbmltcG9ydCB7R2VybWFuQWRkcmVzc30gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XHJcbmltcG9ydCBQbGFjZVJlc3VsdCA9IGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZVJlc3VsdDtcclxuaW1wb3J0IEF1dG9jb21wbGV0ZU9wdGlvbnMgPSBnb29nbGUubWFwcy5wbGFjZXMuQXV0b2NvbXBsZXRlT3B0aW9ucztcclxuXHJcbmV4cG9ydCBlbnVtIEFwcGVhcmFuY2Uge1xyXG4gIFNUQU5EQVJEID0gJ3N0YW5kYXJkJyxcclxuICBGSUxMID0gJ2ZpbGwnLFxyXG4gIE9VVExJTkUgPSAnb3V0bGluZScsXHJcbiAgTEVHQUNZID0gJ2xlZ2FjeScsXHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbWF0LWdvb2dsZS1tYXBzLWF1dG9jb21wbGV0ZScsXHJcbiAgZXhwb3J0QXM6ICdtYXRHb29nbGVNYXBzQXV0b2NvbXBsZXRlJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbWF0LWdvb2dsZS1tYXBzLWF1dG9jb21wbGV0ZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbWF0LWdvb2dsZS1tYXBzLWF1dG9jb21wbGV0ZS5jb21wb25lbnQuc2NzcyddLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAge1xyXG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWF0R29vZ2xlTWFwc0F1dG9jb21wbGV0ZUNvbXBvbmVudCksXHJcbiAgICAgIG11bHRpOiB0cnVlXHJcbiAgICB9XHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWF0R29vZ2xlTWFwc0F1dG9jb21wbGV0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG5cclxuICBAVmlld0NoaWxkKCdzZWFyY2gnKVxyXG4gIHB1YmxpYyBzZWFyY2hFbGVtZW50UmVmOiBFbGVtZW50UmVmO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGFkZHJlc3NMYWJlbFRleHQgPSAnQWRkcmVzcyc7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgcGxhY2Vob2xkZXJUZXh0ID0gJ1BsZWFzZSBlbnRlciB0aGUgYWRkcmVzcyc7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgcmVxdWlyZWRFcnJvclRleHQgPSAnVGhlIGFkZHJlc3MgaXMgcmVxdWlyZWQnO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGludmFsaWRFcnJvclRleHQgPSAnVGhlIGFkZHJlc3MgaXMgbm90IHZhbGlkJztcclxuXHJcbiAgQElucHV0KClcclxuICBhcHBlYXJhbmNlOiBzdHJpbmcgfCBBcHBlYXJhbmNlID0gQXBwZWFyYW5jZS5TVEFOREFSRDtcclxuXHJcbiAgQElucHV0KClcclxuICB2YWx1ZTogUGxhY2VSZXN1bHQ7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgYWRkcmVzczogUGxhY2VSZXN1bHQgfCBzdHJpbmc7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgY291bnRyeTogc3RyaW5nIHwgc3RyaW5nW107XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgcGxhY2VJZE9ubHk/OiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHN0cmljdEJvdW5kcz86IGJvb2xlYW47XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgdHlwZXM/OiBzdHJpbmdbXTtcclxuICAvLyB0eXBlczogc3RyaW5nW10gPSBbJ2FkZHJlc3MnXTtcclxuXHJcbiAgQElucHV0KClcclxuICB0eXBlPzogc3RyaW5nO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGF1dG9Db21wbGV0ZU9wdGlvbnM6IEF1dG9jb21wbGV0ZU9wdGlvbnMgPSB7fTtcclxuXHJcbiAgQE91dHB1dCgpXHJcbiAgb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxQbGFjZVJlc3VsdCB8IHN0cmluZyB8IG51bGw+ID0gbmV3IEV2ZW50RW1pdHRlcjxQbGFjZVJlc3VsdCB8IHN0cmluZyB8IG51bGw+KCk7XHJcblxyXG4gIEBPdXRwdXQoKVxyXG4gIG9uQXV0b2NvbXBsZXRlU2VsZWN0ZWQ6IEV2ZW50RW1pdHRlcjxQbGFjZVJlc3VsdD4gPSBuZXcgRXZlbnRFbWl0dGVyPFBsYWNlUmVzdWx0PigpO1xyXG5cclxuICBAT3V0cHV0KClcclxuICBvbkdlcm1hbkFkZHJlc3NNYXBwZWQ6IEV2ZW50RW1pdHRlcjxHZXJtYW5BZGRyZXNzPiA9IG5ldyBFdmVudEVtaXR0ZXI8R2VybWFuQWRkcmVzcz4oKTtcclxuXHJcbiAgQE91dHB1dCgpXHJcbiAgb25Mb2NhdGlvblNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8TG9jYXRpb24+ID0gbmV3IEV2ZW50RW1pdHRlcjxMb2NhdGlvbj4oKTtcclxuXHJcblxyXG4gIHByaXZhdGUgb25OZXdQbGFjZVJlc3VsdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgcHJpdmF0ZSBhZGRyZXNzVmFsaWRhdG9yOiBNYXRWYWxpZGF0ZUFkZHJlc3NEaXJlY3RpdmUgPSBuZXcgTWF0VmFsaWRhdGVBZGRyZXNzRGlyZWN0aXZlKCk7XHJcblxyXG4gIHB1YmxpYyBhZGRyZXNzU2VhcmNoQ29udHJvbDogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woe3ZhbHVlOiBudWxsfSwgVmFsaWRhdG9ycy5jb21wb3NlKFtcclxuICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXHJcbiAgICB0aGlzLmFkZHJlc3NWYWxpZGF0b3IudmFsaWRhdGUoKV0pXHJcbiAgKTtcclxuXHJcbiAgcHJvcGFnYXRlQ2hhbmdlID0gKF86IGFueSkgPT4ge1xyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbWFwc0FQSUxvYWRlcjogTWFwc0FQSUxvYWRlcixcclxuICAgICAgICAgICAgICBwcml2YXRlIG5nWm9uZTogTmdab25lKSB7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuYWRkcmVzc1ZhbGlkYXRvci5zdWJzY3JpYmUodGhpcy5vbk5ld1BsYWNlUmVzdWx0KTtcclxuXHJcbiAgICBjb25zdCBvcHRpb25zOiBBdXRvY29tcGxldGVPcHRpb25zID0ge1xyXG4gICAgICAvLyB0eXBlczogWydhZGRyZXNzJ10sXHJcbiAgICAgIC8vIGNvbXBvbmVudFJlc3RyaWN0aW9uczoge2NvdW50cnk6IHRoaXMuY291bnRyeX0sXHJcbiAgICAgIHBsYWNlSWRPbmx5OiB0aGlzLnBsYWNlSWRPbmx5LFxyXG4gICAgICBzdHJpY3RCb3VuZHM6IHRoaXMuc3RyaWN0Qm91bmRzLFxyXG4gICAgICAvLyB0eXBlczogdGhpcy50eXBlcyxcclxuICAgICAgdHlwZTogdGhpcy50eXBlXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby11bnVzZWQtZXhwcmVzc2lvblxyXG4gICAgdGhpcy5jb3VudHJ5ID8gb3B0aW9ucy5jb21wb25lbnRSZXN0cmljdGlvbnMgPSB7Y291bnRyeTogdGhpcy5jb3VudHJ5fSA6IG51bGw7XHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW51c2VkLWV4cHJlc3Npb25cclxuICAgIHRoaXMuY291bnRyeSA/IG9wdGlvbnMudHlwZXMgPSB0aGlzLnR5cGVzIDogbnVsbDtcclxuXHJcbiAgICB0aGlzLmF1dG9Db21wbGV0ZU9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHRoaXMuYXV0b0NvbXBsZXRlT3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICB0aGlzLmluaXRHb29nbGVNYXBzQXV0b2NvbXBsZXRlKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaW5pdEdvb2dsZU1hcHNBdXRvY29tcGxldGUoKSB7XHJcbiAgICB0aGlzLm1hcHNBUElMb2FkZXJcclxuICAgICAgLmxvYWQoKVxyXG4gICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYXV0b2NvbXBsZXRlID0gbmV3IGdvb2dsZS5tYXBzLnBsYWNlcy5BdXRvY29tcGxldGUodGhpcy5zZWFyY2hFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHRoaXMuYXV0b0NvbXBsZXRlT3B0aW9ucyk7XHJcbiAgICAgICAgYXV0b2NvbXBsZXRlLmFkZExpc3RlbmVyKCdwbGFjZV9jaGFuZ2VkJywgKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBwbGFjZSByZXN1bHRcclxuICAgICAgICAgICAgY29uc3QgcGxhY2U6IFBsYWNlUmVzdWx0ID0gYXV0b2NvbXBsZXRlLmdldFBsYWNlKCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBnZXJtYW5BZGRyZXNzOiBHZXJtYW5BZGRyZXNzID0ge1xyXG4gICAgICAgICAgICAgIGdtSUQ6IHBsYWNlLmlkLFxyXG4gICAgICAgICAgICAgIGljb246IHBsYWNlLmljb24sXHJcbiAgICAgICAgICAgICAgdXJsOiBwbGFjZS51cmwsXHJcbiAgICAgICAgICAgICAgcGxhY2VJRDogcGxhY2UucGxhY2VfaWQsXHJcbiAgICAgICAgICAgICAgZGlzcGxheUFkZHJlc3M6IHBsYWNlLmZvcm1hdHRlZF9hZGRyZXNzLFxyXG4gICAgICAgICAgICAgIG5hbWU6IHBsYWNlLm5hbWUsXHJcbiAgICAgICAgICAgICAgdmljaW5pdHk6IHBsYWNlLnZpY2luaXR5LFxyXG4gICAgICAgICAgICAgIGxvY2FsaXR5OiB7fSxcclxuICAgICAgICAgICAgICBzdGF0ZToge30sXHJcbiAgICAgICAgICAgICAgY291bnRyeToge30sXHJcbiAgICAgICAgICAgICAgZ2VvTG9jYXRpb246IHtsYXRpdHVkZTogLTEsIGxvbmdpdHVkZTogLTF9LFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgaWYgKHBsYWNlLmdlb21ldHJ5ICYmIHBsYWNlLmdlb21ldHJ5LmxvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgICAgZ2VybWFuQWRkcmVzcy5nZW9Mb2NhdGlvbi5sYXRpdHVkZSA9IHBsYWNlLmdlb21ldHJ5LmxvY2F0aW9uLmxhdCgpO1xyXG4gICAgICAgICAgICAgIGdlcm1hbkFkZHJlc3MuZ2VvTG9jYXRpb24ubG9uZ2l0dWRlID0gcGxhY2UuZ2VvbWV0cnkubG9jYXRpb24ubG5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHBsYWNlLmFkZHJlc3NfY29tcG9uZW50cy5mb3JFYWNoKHZhbHVlID0+IHtcclxuICAgICAgICAgICAgICBpZiAodmFsdWUudHlwZXMuaW5kZXhPZignc3RyZWV0X251bWJlcicpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIGdlcm1hbkFkZHJlc3Muc3RyZWV0TnVtYmVyID0gdmFsdWUuc2hvcnRfbmFtZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYgKHZhbHVlLnR5cGVzLmluZGV4T2YoJ3JvdXRlJykgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgZ2VybWFuQWRkcmVzcy5zdHJlZXROYW1lID0gdmFsdWUubG9uZ19uYW1lO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZiAodmFsdWUudHlwZXMuaW5kZXhPZigncG9zdGFsX2NvZGUnKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBnZXJtYW5BZGRyZXNzLnBvc3RhbENvZGUgPSBOdW1iZXIodmFsdWUuc2hvcnRfbmFtZSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGlmICh2YWx1ZS50eXBlcy5pbmRleE9mKCdzdWJsb2NhbGl0eScpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIGdlcm1hbkFkZHJlc3Muc3VibG9jYWxpdHkgPSB2YWx1ZS5sb25nX25hbWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGlmICh2YWx1ZS50eXBlcy5pbmRleE9mKCdsb2NhbGl0eScpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIGdlcm1hbkFkZHJlc3MubG9jYWxpdHkubG9uZyA9IHZhbHVlLmxvbmdfbmFtZTtcclxuICAgICAgICAgICAgICAgIGdlcm1hbkFkZHJlc3MubG9jYWxpdHkuc2hvcnQgPSB2YWx1ZS5zaG9ydF9uYW1lO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZiAodmFsdWUudHlwZXMuaW5kZXhPZignYWRtaW5pc3RyYXRpdmVfYXJlYV9sZXZlbF8xJykgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgZ2VybWFuQWRkcmVzcy5zdGF0ZS5sb25nID0gdmFsdWUubG9uZ19uYW1lO1xyXG4gICAgICAgICAgICAgICAgZ2VybWFuQWRkcmVzcy5zdGF0ZS5zaG9ydCA9IHZhbHVlLnNob3J0X25hbWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGlmICh2YWx1ZS50eXBlcy5pbmRleE9mKCdjb3VudHJ5JykgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgZ2VybWFuQWRkcmVzcy5jb3VudHJ5LmxvbmcgPSB2YWx1ZS5sb25nX25hbWU7XHJcbiAgICAgICAgICAgICAgICBnZXJtYW5BZGRyZXNzLmNvdW50cnkuc2hvcnQgPSB2YWx1ZS5zaG9ydF9uYW1lO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZiAodmFsdWUudHlwZXMuaW5kZXhPZignYWRtaW5pc3RyYXRpdmVfYXJlYV9sZXZlbF8zJykgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgZ2VybWFuQWRkcmVzcy5sb2NhbGl0eS5zaG9ydCA9IHZhbHVlLnNob3J0X25hbWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMub25HZXJtYW5BZGRyZXNzTWFwcGVkLmVtaXQoZ2VybWFuQWRkcmVzcyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXBsYWNlLnBsYWNlX2lkIHx8IHBsYWNlLmdlb21ldHJ5ID09PSB1bmRlZmluZWQgfHwgcGxhY2UuZ2VvbWV0cnkgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAvLyBwbGFjZSByZXN1bHQgaXMgbm90IHZhbGlkXHJcbiAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIC8vIHNob3cgZGlhbG9nIHRvIHNlbGVjdCBhIGFkZHJlc3MgZnJvbSB0aGUgaW5wdXRcclxuICAgICAgICAgICAgICAvLyBlbWl0IGZhaWxlZCBldmVudFxyXG4gICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBwbGFjZTtcclxuICAgICAgICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSh0aGlzLnZhbHVlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYWRkcmVzcyA9IHBsYWNlLmZvcm1hdHRlZF9hZGRyZXNzO1xyXG4gICAgICAgICAgICB0aGlzLm9uQXV0b2NvbXBsZXRlU2VsZWN0ZWQuZW1pdChwbGFjZSk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdvbkF1dG9jb21wbGV0ZVNlbGVjdGVkIC0+ICcsIHBsYWNlKTtcclxuICAgICAgICAgICAgdGhpcy5vbkxvY2F0aW9uU2VsZWN0ZWQuZW1pdChcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsYXRpdHVkZTogcGxhY2UuZ2VvbWV0cnkubG9jYXRpb24ubGF0KCksXHJcbiAgICAgICAgICAgICAgICBsb25naXR1ZGU6IHBsYWNlLmdlb21ldHJ5LmxvY2F0aW9uLmxuZygpXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUubG9nKGVycikpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uUXVlcnkoZXZlbnQ6IGFueSkge1xyXG4gICAgLy8gY29uc29sZS5sb2coJ29uQ2hhbmdlKCknLCBldmVudCk7XHJcbiAgICB0aGlzLm9uQ2hhbmdlLmVtaXQodGhpcy5hZGRyZXNzKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVzZXRBZGRyZXNzKCkge1xyXG4gICAgdGhpcy5hZGRyZXNzID0gbnVsbDtcclxuICAgIHRoaXMuYWRkcmVzc1NlYXJjaENvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xyXG4gIH1cclxuXHJcbiAgd3JpdGVWYWx1ZShvYmo6IGFueSk6IHZvaWQge1xyXG4gICAgaWYgKG9iaikge1xyXG4gICAgICB0aGlzLnZhbHVlID0gb2JqO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdNZXRob2Qgbm90IGltcGxlbWVudGVkLicpO1xyXG4gIH1cclxuXHJcbiAgc2V0RGlzYWJsZWRTdGF0ZT8oaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdNZXRob2Qgbm90IGltcGxlbWVudGVkLicpO1xyXG4gIH1cclxuXHJcbn1cclxuIl19