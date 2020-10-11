import { Directive, ElementRef, EventEmitter, forwardRef, Inject, Input, NgZone, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MatValidateAddressDirective } from '../directives/address-validator/mat-address-validator.directive';
import { MapsAPILoader } from '@agm/core';
import { isPlatformBrowser } from '@angular/common';
var MatGoogleMapsAutocompleteDirective = /** @class */ (function () {
    function MatGoogleMapsAutocompleteDirective(platformId, elemRef, mapsAPILoader, ngZone) {
        this.platformId = platformId;
        this.elemRef = elemRef;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
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
    MatGoogleMapsAutocompleteDirective.prototype.ngOnInit = function () {
        if (isPlatformBrowser(this.platformId)) {
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
        }
    };
    MatGoogleMapsAutocompleteDirective.prototype.initGoogleMapsAutocomplete = function () {
        var _this = this;
        this.mapsAPILoader
            .load()
            .then(function () {
            var autocomplete = new google.maps.places.Autocomplete(_this.elemRef.nativeElement, _this.autoCompleteOptions);
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
                    _this.onLocationSelected.emit({
                        latitude: place.geometry.location.lat(),
                        longitude: place.geometry.location.lng()
                    });
                });
            });
        })
            .catch(function (err) { return console.log(err); });
    };
    MatGoogleMapsAutocompleteDirective.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    MatGoogleMapsAutocompleteDirective.prototype.registerOnTouched = function (fn) {
    };
    MatGoogleMapsAutocompleteDirective.prototype.setDisabledState = function (isDisabled) {
    };
    MatGoogleMapsAutocompleteDirective.prototype.writeValue = function (obj) {
        if (obj) {
            this.value = obj;
        }
    };
    MatGoogleMapsAutocompleteDirective.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: ElementRef },
        { type: MapsAPILoader },
        { type: NgZone }
    ]; };
    MatGoogleMapsAutocompleteDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[matGoogleMapsAutocomplete]',
                    exportAs: 'matGoogleMapsAutocomplete',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return MatGoogleMapsAutocompleteDirective; }),
                            multi: true
                        }
                    ]
                },] }
    ];
    MatGoogleMapsAutocompleteDirective.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
        { type: ElementRef },
        { type: MapsAPILoader },
        { type: NgZone }
    ]; };
    MatGoogleMapsAutocompleteDirective.propDecorators = {
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
    return MatGoogleMapsAutocompleteDirective;
}());
export { MatGoogleMapsAutocompleteDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LWdvb2dsZS1tYXBzLWF1dG9jb21wbGV0ZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1tYXRlcmlhbC1leHRlbnNpb25zL2dvb2dsZS1tYXBzLWF1dG9jb21wbGV0ZS8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL21hdC1nb29nbGUtbWFwcy1hdXRvY29tcGxldGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEksT0FBTyxFQUF1QixXQUFXLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEcsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0saUVBQWlFLENBQUM7QUFDNUcsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUV4QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUtsRDtJQTJERSw0Q0FBd0MsVUFBa0IsRUFDdkMsT0FBbUIsRUFDbkIsYUFBNEIsRUFDM0IsTUFBYztRQUhNLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDdkMsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUMzQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBOUJsQyx3QkFBbUIsR0FBd0IsRUFBRSxDQUFDO1FBRzlDLGFBQVEsR0FBOEMsSUFBSSxZQUFZLEVBQStCLENBQUM7UUFHdEcsMkJBQXNCLEdBQThCLElBQUksWUFBWSxFQUFlLENBQUM7UUFHcEYsMEJBQXFCLEdBQWdDLElBQUksWUFBWSxFQUFpQixDQUFDO1FBR3ZGLHVCQUFrQixHQUEyQixJQUFJLFlBQVks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QUNGOzs7NkNBaURjLE1BQU0sU0FBQyxXQUFXO2dCQXJFZCxVQUFVO2dCQUdyQixhQUFhO2dCQUhtRCxNQUFNOzs7MEJBdUIzRSxLQUFLOzBCQUdMLEtBQUs7OEJBR0wsS0FBSzsrQkFHTCxLQUFLO3dCQUdMLEtBQUs7dUJBR0wsS0FBSztzQ0FHTCxLQUFLOzJCQUdMLE1BQU07eUNBR04sTUFBTTt3Q0FHTixNQUFNO3FDQUdOLE1BQU07O0lBZ0pULHlDQUFDO0NBQUEsQUEzTEQsSUEyTEM7U0FoTFksa0NBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSW5qZWN0LCBJbnB1dCwgTmdab25lLCBPbkluaXQsIE91dHB1dCwgUExBVEZPUk1fSUR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBGb3JtQ29udHJvbCwgTkdfVkFMVUVfQUNDRVNTT1IsIFZhbGlkYXRvcnN9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHtNYXRWYWxpZGF0ZUFkZHJlc3NEaXJlY3RpdmV9IGZyb20gJy4uL2RpcmVjdGl2ZXMvYWRkcmVzcy12YWxpZGF0b3IvbWF0LWFkZHJlc3MtdmFsaWRhdG9yLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7TWFwc0FQSUxvYWRlcn0gZnJvbSAnQGFnbS9jb3JlJztcclxuaW1wb3J0IHtMb2NhdGlvbn0gZnJvbSAnLi4vaW50ZXJmYWNlcy9sb2NhdGlvbi5pbnRlcmZhY2UnO1xyXG5pbXBvcnQge2lzUGxhdGZvcm1Ccm93c2VyfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge0dlcm1hbkFkZHJlc3N9IGZyb20gJy4uL2ludGVyZmFjZXMvZ2VybWFuZC5hZGRyZXNzLmludGVyZmFjZSc7XHJcbmltcG9ydCBQbGFjZVJlc3VsdCA9IGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZVJlc3VsdDtcclxuaW1wb3J0IEF1dG9jb21wbGV0ZU9wdGlvbnMgPSBnb29nbGUubWFwcy5wbGFjZXMuQXV0b2NvbXBsZXRlT3B0aW9ucztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW21hdEdvb2dsZU1hcHNBdXRvY29tcGxldGVdJyxcclxuICBleHBvcnRBczogJ21hdEdvb2dsZU1hcHNBdXRvY29tcGxldGUnLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAge1xyXG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWF0R29vZ2xlTWFwc0F1dG9jb21wbGV0ZURpcmVjdGl2ZSksXHJcbiAgICAgIG11bHRpOiB0cnVlXHJcbiAgICB9XHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWF0R29vZ2xlTWFwc0F1dG9jb21wbGV0ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGFkZHJlc3M6IFBsYWNlUmVzdWx0IHwgc3RyaW5nO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGNvdW50cnk6IHN0cmluZyB8IHN0cmluZ1tdO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHBsYWNlSWRPbmx5PzogYm9vbGVhbjtcclxuXHJcbiAgQElucHV0KClcclxuICBzdHJpY3RCb3VuZHM/OiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHR5cGVzPzogc3RyaW5nW107XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgdHlwZT86IHN0cmluZztcclxuXHJcbiAgQElucHV0KClcclxuICBhdXRvQ29tcGxldGVPcHRpb25zOiBBdXRvY29tcGxldGVPcHRpb25zID0ge307XHJcblxyXG4gIEBPdXRwdXQoKVxyXG4gIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8UGxhY2VSZXN1bHQgfCBzdHJpbmcgfCBudWxsPiA9IG5ldyBFdmVudEVtaXR0ZXI8UGxhY2VSZXN1bHQgfCBzdHJpbmcgfCBudWxsPigpO1xyXG5cclxuICBAT3V0cHV0KClcclxuICBvbkF1dG9jb21wbGV0ZVNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8UGxhY2VSZXN1bHQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxQbGFjZVJlc3VsdD4oKTtcclxuXHJcbiAgQE91dHB1dCgpXHJcbiAgb25HZXJtYW5BZGRyZXNzTWFwcGVkOiBFdmVudEVtaXR0ZXI8R2VybWFuQWRkcmVzcz4gPSBuZXcgRXZlbnRFbWl0dGVyPEdlcm1hbkFkZHJlc3M+KCk7XHJcblxyXG4gIEBPdXRwdXQoKVxyXG4gIG9uTG9jYXRpb25TZWxlY3RlZDogRXZlbnRFbWl0dGVyPExvY2F0aW9uPiA9IG5ldyBFdmVudEVtaXR0ZXI8TG9jYXRpb24+KCk7XHJcblxyXG4gIHZhbHVlOiBQbGFjZVJlc3VsdDtcclxuXHJcbiAgcHJpdmF0ZSBvbk5ld1BsYWNlUmVzdWx0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBwcml2YXRlIGFkZHJlc3NWYWxpZGF0b3I6IE1hdFZhbGlkYXRlQWRkcmVzc0RpcmVjdGl2ZSA9IG5ldyBNYXRWYWxpZGF0ZUFkZHJlc3NEaXJlY3RpdmUoKTtcclxuXHJcbiAgcHVibGljIGFkZHJlc3NTZWFyY2hDb250cm9sOiBGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCh7dmFsdWU6IG51bGx9LCBWYWxpZGF0b3JzLmNvbXBvc2UoW1xyXG4gICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcclxuICAgIHRoaXMuYWRkcmVzc1ZhbGlkYXRvci52YWxpZGF0ZSgpXSlcclxuICApO1xyXG5cclxuICBwcm9wYWdhdGVDaGFuZ2UgPSAoXzogYW55KSA9PiB7XHJcbiAgfTtcclxuXHJcbiAgY29uc3RydWN0b3IoQEluamVjdChQTEFURk9STV9JRCkgcHVibGljIHBsYXRmb3JtSWQ6IHN0cmluZyxcclxuICAgICAgICAgICAgICBwdWJsaWMgZWxlbVJlZjogRWxlbWVudFJlZixcclxuICAgICAgICAgICAgICBwdWJsaWMgbWFwc0FQSUxvYWRlcjogTWFwc0FQSUxvYWRlcixcclxuICAgICAgICAgICAgICBwcml2YXRlIG5nWm9uZTogTmdab25lKSB7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XHJcbiAgICAgIHRoaXMuYWRkcmVzc1ZhbGlkYXRvci5zdWJzY3JpYmUodGhpcy5vbk5ld1BsYWNlUmVzdWx0KTtcclxuICAgICAgY29uc3Qgb3B0aW9uczogQXV0b2NvbXBsZXRlT3B0aW9ucyA9IHtcclxuICAgICAgICAvLyB0eXBlczogWydhZGRyZXNzJ10sXHJcbiAgICAgICAgLy8gY29tcG9uZW50UmVzdHJpY3Rpb25zOiB7Y291bnRyeTogdGhpcy5jb3VudHJ5fSxcclxuICAgICAgICBwbGFjZUlkT25seTogdGhpcy5wbGFjZUlkT25seSxcclxuICAgICAgICBzdHJpY3RCb3VuZHM6IHRoaXMuc3RyaWN0Qm91bmRzLFxyXG4gICAgICAgIC8vIHR5cGVzOiB0aGlzLnR5cGVzLFxyXG4gICAgICAgIHR5cGU6IHRoaXMudHlwZVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVudXNlZC1leHByZXNzaW9uXHJcbiAgICAgIHRoaXMuY291bnRyeSA/IG9wdGlvbnMuY29tcG9uZW50UmVzdHJpY3Rpb25zID0ge2NvdW50cnk6IHRoaXMuY291bnRyeX0gOiBudWxsO1xyXG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW51c2VkLWV4cHJlc3Npb25cclxuICAgICAgdGhpcy5jb3VudHJ5ID8gb3B0aW9ucy50eXBlcyA9IHRoaXMudHlwZXMgOiBudWxsO1xyXG5cclxuICAgICAgdGhpcy5hdXRvQ29tcGxldGVPcHRpb25zID0gT2JqZWN0LmFzc2lnbih0aGlzLmF1dG9Db21wbGV0ZU9wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgICB0aGlzLmluaXRHb29nbGVNYXBzQXV0b2NvbXBsZXRlKCk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgcHVibGljIGluaXRHb29nbGVNYXBzQXV0b2NvbXBsZXRlKCkge1xyXG4gICAgdGhpcy5tYXBzQVBJTG9hZGVyXHJcbiAgICAgIC5sb2FkKClcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGF1dG9jb21wbGV0ZSA9IG5ldyBnb29nbGUubWFwcy5wbGFjZXMuQXV0b2NvbXBsZXRlKHRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLmF1dG9Db21wbGV0ZU9wdGlvbnMpO1xyXG4gICAgICAgIGF1dG9jb21wbGV0ZS5hZGRMaXN0ZW5lcigncGxhY2VfY2hhbmdlZCcsICgpID0+IHtcclxuICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGdldCB0aGUgcGxhY2UgcmVzdWx0XHJcbiAgICAgICAgICAgIGNvbnN0IHBsYWNlOiBQbGFjZVJlc3VsdCA9IGF1dG9jb21wbGV0ZS5nZXRQbGFjZSgpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZ2VybWFuQWRkcmVzczogR2VybWFuQWRkcmVzcyA9IHtcclxuICAgICAgICAgICAgICBnbUlEOiBwbGFjZS5pZCxcclxuICAgICAgICAgICAgICBpY29uOiBwbGFjZS5pY29uLFxyXG4gICAgICAgICAgICAgIHVybDogcGxhY2UudXJsLFxyXG4gICAgICAgICAgICAgIHBsYWNlSUQ6IHBsYWNlLnBsYWNlX2lkLFxyXG4gICAgICAgICAgICAgIGRpc3BsYXlBZGRyZXNzOiBwbGFjZS5mb3JtYXR0ZWRfYWRkcmVzcyxcclxuICAgICAgICAgICAgICBuYW1lOiBwbGFjZS5uYW1lLFxyXG4gICAgICAgICAgICAgIHZpY2luaXR5OiBwbGFjZS52aWNpbml0eSxcclxuICAgICAgICAgICAgICBsb2NhbGl0eToge30sXHJcbiAgICAgICAgICAgICAgc3RhdGU6IHt9LFxyXG4gICAgICAgICAgICAgIGNvdW50cnk6IHt9LFxyXG4gICAgICAgICAgICAgIGdlb0xvY2F0aW9uOiB7bGF0aXR1ZGU6IC0xLCBsb25naXR1ZGU6IC0xfSxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwbGFjZS5nZW9tZXRyeSAmJiBwbGFjZS5nZW9tZXRyeS5sb2NhdGlvbikge1xyXG4gICAgICAgICAgICAgIGdlcm1hbkFkZHJlc3MuZ2VvTG9jYXRpb24ubGF0aXR1ZGUgPSBwbGFjZS5nZW9tZXRyeS5sb2NhdGlvbi5sYXQoKTtcclxuICAgICAgICAgICAgICBnZXJtYW5BZGRyZXNzLmdlb0xvY2F0aW9uLmxvbmdpdHVkZSA9IHBsYWNlLmdlb21ldHJ5LmxvY2F0aW9uLmxuZygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHMuZm9yRWFjaCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKHZhbHVlLnR5cGVzLmluZGV4T2YoJ3N0cmVldF9udW1iZXInKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBnZXJtYW5BZGRyZXNzLnN0cmVldE51bWJlciA9IHZhbHVlLnNob3J0X25hbWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGlmICh2YWx1ZS50eXBlcy5pbmRleE9mKCdyb3V0ZScpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIGdlcm1hbkFkZHJlc3Muc3RyZWV0TmFtZSA9IHZhbHVlLmxvbmdfbmFtZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYgKHZhbHVlLnR5cGVzLmluZGV4T2YoJ3Bvc3RhbF9jb2RlJykgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgZ2VybWFuQWRkcmVzcy5wb3N0YWxDb2RlID0gTnVtYmVyKHZhbHVlLnNob3J0X25hbWUpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZiAodmFsdWUudHlwZXMuaW5kZXhPZignc3VibG9jYWxpdHknKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBnZXJtYW5BZGRyZXNzLnN1YmxvY2FsaXR5ID0gdmFsdWUubG9uZ19uYW1lO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZiAodmFsdWUudHlwZXMuaW5kZXhPZignbG9jYWxpdHknKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBnZXJtYW5BZGRyZXNzLmxvY2FsaXR5LmxvbmcgPSB2YWx1ZS5sb25nX25hbWU7XHJcbiAgICAgICAgICAgICAgICBnZXJtYW5BZGRyZXNzLmxvY2FsaXR5LnNob3J0ID0gdmFsdWUuc2hvcnRfbmFtZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYgKHZhbHVlLnR5cGVzLmluZGV4T2YoJ2FkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMScpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIGdlcm1hbkFkZHJlc3Muc3RhdGUubG9uZyA9IHZhbHVlLmxvbmdfbmFtZTtcclxuICAgICAgICAgICAgICAgIGdlcm1hbkFkZHJlc3Muc3RhdGUuc2hvcnQgPSB2YWx1ZS5zaG9ydF9uYW1lO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZiAodmFsdWUudHlwZXMuaW5kZXhPZignY291bnRyeScpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIGdlcm1hbkFkZHJlc3MuY291bnRyeS5sb25nID0gdmFsdWUubG9uZ19uYW1lO1xyXG4gICAgICAgICAgICAgICAgZ2VybWFuQWRkcmVzcy5jb3VudHJ5LnNob3J0ID0gdmFsdWUuc2hvcnRfbmFtZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYgKHZhbHVlLnR5cGVzLmluZGV4T2YoJ2FkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMycpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIGdlcm1hbkFkZHJlc3MubG9jYWxpdHkuc2hvcnQgPSB2YWx1ZS5zaG9ydF9uYW1lO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm9uR2VybWFuQWRkcmVzc01hcHBlZC5lbWl0KGdlcm1hbkFkZHJlc3MpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFwbGFjZS5wbGFjZV9pZCB8fCBwbGFjZS5nZW9tZXRyeSA9PT0gdW5kZWZpbmVkIHx8IHBsYWNlLmdlb21ldHJ5ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgLy8gcGxhY2UgcmVzdWx0IGlzIG5vdCB2YWxpZFxyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAvLyBzaG93IGRpYWxvZyB0byBzZWxlY3QgYSBhZGRyZXNzIGZyb20gdGhlIGlucHV0XHJcbiAgICAgICAgICAgICAgLy8gZW1pdCBmYWlsZWQgZXZlbnRcclxuICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gcGxhY2U7XHJcbiAgICAgICAgICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UodGhpcy52YWx1ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmFkZHJlc3MgPSBwbGFjZS5mb3JtYXR0ZWRfYWRkcmVzcztcclxuICAgICAgICAgICAgdGhpcy5vbkF1dG9jb21wbGV0ZVNlbGVjdGVkLmVtaXQocGxhY2UpO1xyXG4gICAgICAgICAgICB0aGlzLm9uTG9jYXRpb25TZWxlY3RlZC5lbWl0KFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxhdGl0dWRlOiBwbGFjZS5nZW9tZXRyeS5sb2NhdGlvbi5sYXQoKSxcclxuICAgICAgICAgICAgICAgIGxvbmdpdHVkZTogcGxhY2UuZ2VvbWV0cnkubG9jYXRpb24ubG5nKClcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5sb2coZXJyKSk7XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XHJcbiAgfVxyXG5cclxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICB9XHJcblxyXG4gIHdyaXRlVmFsdWUob2JqOiBhbnkpOiB2b2lkIHtcclxuICAgIGlmIChvYmopIHtcclxuICAgICAgdGhpcy52YWx1ZSA9IG9iajtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcbiJdfQ==