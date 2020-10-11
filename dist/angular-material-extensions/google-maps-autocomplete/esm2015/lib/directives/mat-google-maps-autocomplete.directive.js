import { Directive, ElementRef, EventEmitter, forwardRef, Inject, Input, NgZone, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MatValidateAddressDirective } from '../directives/address-validator/mat-address-validator.directive';
import { MapsAPILoader } from '@agm/core';
import { isPlatformBrowser } from '@angular/common';
export class MatGoogleMapsAutocompleteDirective {
    constructor(platformId, elemRef, mapsAPILoader, ngZone) {
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
        this.propagateChange = (_) => {
        };
    }
    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
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
    }
    initGoogleMapsAutocomplete() {
        this.mapsAPILoader
            .load()
            .then(() => {
            const autocomplete = new google.maps.places.Autocomplete(this.elemRef.nativeElement, this.autoCompleteOptions);
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
                    this.onLocationSelected.emit({
                        latitude: place.geometry.location.lat(),
                        longitude: place.geometry.location.lng()
                    });
                });
            });
        })
            .catch((err) => console.log(err));
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn) {
    }
    setDisabledState(isDisabled) {
    }
    writeValue(obj) {
        if (obj) {
            this.value = obj;
        }
    }
}
MatGoogleMapsAutocompleteDirective.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: ElementRef },
    { type: MapsAPILoader },
    { type: NgZone }
];
MatGoogleMapsAutocompleteDirective.decorators = [
    { type: Directive, args: [{
                selector: '[matGoogleMapsAutocomplete]',
                exportAs: 'matGoogleMapsAutocomplete',
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => MatGoogleMapsAutocompleteDirective),
                        multi: true
                    }
                ]
            },] }
];
MatGoogleMapsAutocompleteDirective.ctorParameters = () => [
    { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: ElementRef },
    { type: MapsAPILoader },
    { type: NgZone }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LWdvb2dsZS1tYXBzLWF1dG9jb21wbGV0ZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1tYXRlcmlhbC1leHRlbnNpb25zL2dvb2dsZS1tYXBzLWF1dG9jb21wbGV0ZS8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL21hdC1nb29nbGUtbWFwcy1hdXRvY29tcGxldGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEksT0FBTyxFQUF1QixXQUFXLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEcsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0saUVBQWlFLENBQUM7QUFDNUcsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUV4QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQWdCbEQsTUFBTSxPQUFPLGtDQUFrQztJQWdEN0MsWUFBd0MsVUFBa0IsRUFDdkMsT0FBbUIsRUFDbkIsYUFBNEIsRUFDM0IsTUFBYztRQUhNLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDdkMsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUMzQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBOUJsQyx3QkFBbUIsR0FBd0IsRUFBRSxDQUFDO1FBRzlDLGFBQVEsR0FBOEMsSUFBSSxZQUFZLEVBQStCLENBQUM7UUFHdEcsMkJBQXNCLEdBQThCLElBQUksWUFBWSxFQUFlLENBQUM7UUFHcEYsMEJBQXFCLEdBQWdDLElBQUksWUFBWSxFQUFpQixDQUFDO1FBR3ZGLHVCQUFr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O3lDQWlEYyxNQUFNLFNBQUMsV0FBVztZQXJFZCxVQUFVO1lBR3JCLGFBQWE7WUFIbUQsTUFBTTs7O3NCQXVCM0UsS0FBSztzQkFHTCxLQUFLOzBCQUdMLEtBQUs7MkJBR0wsS0FBSztvQkFHTCxLQUFLO21CQUdMLEtBQUs7a0NBR0wsS0FBSzt1QkFHTCxNQUFNO3FDQUdOLE1BQU07b0NBR04sTUFBTTtpQ0FHTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSW5qZWN0LCBJbnB1dCwgTmdab25lLCBPbkluaXQsIE91dHB1dCwgUExBVEZPUk1fSUR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBGb3JtQ29udHJvbCwgTkdfVkFMVUVfQUNDRVNTT1IsIFZhbGlkYXRvcnN9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHtNYXRWYWxpZGF0ZUFkZHJlc3NEaXJlY3RpdmV9IGZyb20gJy4uL2RpcmVjdGl2ZXMvYWRkcmVzcy12YWxpZGF0b3IvbWF0LWFkZHJlc3MtdmFsaWRhdG9yLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7TWFwc0FQSUxvYWRlcn0gZnJvbSAnQGFnbS9jb3JlJztcclxuaW1wb3J0IHtMb2NhdGlvbn0gZnJvbSAnLi4vaW50ZXJmYWNlcy9sb2NhdGlvbi5pbnRlcmZhY2UnO1xyXG5pbXBvcnQge2lzUGxhdGZvcm1Ccm93c2VyfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQge0dlcm1hbkFkZHJlc3N9IGZyb20gJy4uL2ludGVyZmFjZXMvZ2VybWFuZC5hZGRyZXNzLmludGVyZmFjZSc7XHJcbmltcG9ydCBQbGFjZVJlc3VsdCA9IGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZVJlc3VsdDtcclxuaW1wb3J0IEF1dG9jb21wbGV0ZU9wdGlvbnMgPSBnb29nbGUubWFwcy5wbGFjZXMuQXV0b2NvbXBsZXRlT3B0aW9ucztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW21hdEdvb2dsZU1hcHNBdXRvY29tcGxldGVdJyxcclxuICBleHBvcnRBczogJ21hdEdvb2dsZU1hcHNBdXRvY29tcGxldGUnLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAge1xyXG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWF0R29vZ2xlTWFwc0F1dG9jb21wbGV0ZURpcmVjdGl2ZSksXHJcbiAgICAgIG11bHRpOiB0cnVlXHJcbiAgICB9XHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWF0R29vZ2xlTWFwc0F1dG9jb21wbGV0ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGFkZHJlc3M6IFBsYWNlUmVzdWx0IHwgc3RyaW5nO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGNvdW50cnk6IHN0cmluZyB8IHN0cmluZ1tdO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHBsYWNlSWRPbmx5PzogYm9vbGVhbjtcclxuXHJcbiAgQElucHV0KClcclxuICBzdHJpY3RCb3VuZHM/OiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHR5cGVzPzogc3RyaW5nW107XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgdHlwZT86IHN0cmluZztcclxuXHJcbiAgQElucHV0KClcclxuICBhdXRvQ29tcGxldGVPcHRpb25zOiBBdXRvY29tcGxldGVPcHRpb25zID0ge307XHJcblxyXG4gIEBPdXRwdXQoKVxyXG4gIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8UGxhY2VSZXN1bHQgfCBzdHJpbmcgfCBudWxsPiA9IG5ldyBFdmVudEVtaXR0ZXI8UGxhY2VSZXN1bHQgfCBzdHJpbmcgfCBudWxsPigpO1xyXG5cclxuICBAT3V0cHV0KClcclxuICBvbkF1dG9jb21wbGV0ZVNlbGVjdGVkOiBFdmVudEVtaXR0ZXI8UGxhY2VSZXN1bHQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxQbGFjZVJlc3VsdD4oKTtcclxuXHJcbiAgQE91dHB1dCgpXHJcbiAgb25HZXJtYW5BZGRyZXNzTWFwcGVkOiBFdmVudEVtaXR0ZXI8R2VybWFuQWRkcmVzcz4gPSBuZXcgRXZlbnRFbWl0dGVyPEdlcm1hbkFkZHJlc3M+KCk7XHJcblxyXG4gIEBPdXRwdXQoKVxyXG4gIG9uTG9jYXRpb25TZWxlY3RlZDogRXZlbnRFbWl0dGVyPExvY2F0aW9uPiA9IG5ldyBFdmVudEVtaXR0ZXI8TG9jYXRpb24+KCk7XHJcblxyXG4gIHZhbHVlOiBQbGFjZVJlc3VsdDtcclxuXHJcbiAgcHJpdmF0ZSBvbk5ld1BsYWNlUmVzdWx0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBwcml2YXRlIGFkZHJlc3NWYWxpZGF0b3I6IE1hdFZhbGlkYXRlQWRkcmVzc0RpcmVjdGl2ZSA9IG5ldyBNYXRWYWxpZGF0ZUFkZHJlc3NEaXJlY3RpdmUoKTtcclxuXHJcbiAgcHVibGljIGFkZHJlc3NTZWFyY2hDb250cm9sOiBGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCh7dmFsdWU6IG51bGx9LCBWYWxpZGF0b3JzLmNvbXBvc2UoW1xyXG4gICAgVmFsaWRhdG9ycy5yZXF1aXJlZCxcclxuICAgIHRoaXMuYWRkcmVzc1ZhbGlkYXRvci52YWxpZGF0ZSgpXSlcclxuICApO1xyXG5cclxuICBwcm9wYWdhdGVDaGFuZ2UgPSAoXzogYW55KSA9PiB7XHJcbiAgfTtcclxuXHJcbiAgY29uc3RydWN0b3IoQEluamVjdChQTEFURk9STV9JRCkgcHVibGljIHBsYXRmb3JtSWQ6IHN0cmluZyxcclxuICAgICAgICAgICAgICBwdWJsaWMgZWxlbVJlZjogRWxlbWVudFJlZixcclxuICAgICAgICAgICAgICBwdWJsaWMgbWFwc0FQSUxvYWRlcjogTWFwc0FQSUxvYWRlcixcclxuICAgICAgICAgICAgICBwcml2YXRlIG5nWm9uZTogTmdab25lKSB7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XHJcbiAgICAgIHRoaXMuYWRkcmVzc1ZhbGlkYXRvci5zdWJzY3JpYmUodGhpcy5vbk5ld1BsYWNlUmVzdWx0KTtcclxuICAgICAgY29uc3Qgb3B0aW9uczogQXV0b2NvbXBsZXRlT3B0aW9ucyA9IHtcclxuICAgICAgICAvLyB0eXBlczogWydhZGRyZXNzJ10sXHJcbiAgICAgICAgLy8gY29tcG9uZW50UmVzdHJpY3Rpb25zOiB7Y291bnRyeTogdGhpcy5jb3VudHJ5fSxcclxuICAgICAgICBwbGFjZUlkT25seTogdGhpcy5wbGFjZUlkT25seSxcclxuICAgICAgICBzdHJpY3RCb3VuZHM6IHRoaXMuc3RyaWN0Qm91bmRzLFxyXG4gICAgICAgIC8vIHR5cGVzOiB0aGlzLnR5cGVzLFxyXG4gICAgICAgIHR5cGU6IHRoaXMudHlwZVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXVudXNlZC1leHByZXNzaW9uXHJcbiAgICAgIHRoaXMuY291bnRyeSA/IG9wdGlvbnMuY29tcG9uZW50UmVzdHJpY3Rpb25zID0ge2NvdW50cnk6IHRoaXMuY291bnRyeX0gOiBudWxsO1xyXG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdW51c2VkLWV4cHJlc3Npb25cclxuICAgICAgdGhpcy5jb3VudHJ5ID8gb3B0aW9ucy50eXBlcyA9IHRoaXMudHlwZXMgOiBudWxsO1xyXG5cclxuICAgICAgdGhpcy5hdXRvQ29tcGxldGVPcHRpb25zID0gT2JqZWN0LmFzc2lnbih0aGlzLmF1dG9Db21wbGV0ZU9wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgICB0aGlzLmluaXRHb29nbGVNYXBzQXV0b2NvbXBsZXRlKCk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgcHVibGljIGluaXRHb29nbGVNYXBzQXV0b2NvbXBsZXRlKCkge1xyXG4gICAgdGhpcy5tYXBzQVBJTG9hZGVyXHJcbiAgICAgIC5sb2FkKClcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGF1dG9jb21wbGV0ZSA9IG5ldyBnb29nbGUubWFwcy5wbGFjZXMuQXV0b2NvbXBsZXRlKHRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50LCB0aGlzLmF1dG9Db21wbGV0ZU9wdGlvbnMpO1xyXG4gICAgICAgIGF1dG9jb21wbGV0ZS5hZGRMaXN0ZW5lcigncGxhY2VfY2hhbmdlZCcsICgpID0+IHtcclxuICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGdldCB0aGUgcGxhY2UgcmVzdWx0XHJcbiAgICAgICAgICAgIGNvbnN0IHBsYWNlOiBQbGFjZVJlc3VsdCA9IGF1dG9jb21wbGV0ZS5nZXRQbGFjZSgpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZ2VybWFuQWRkcmVzczogR2VybWFuQWRkcmVzcyA9IHtcclxuICAgICAgICAgICAgICBnbUlEOiBwbGFjZS5pZCxcclxuICAgICAgICAgICAgICBpY29uOiBwbGFjZS5pY29uLFxyXG4gICAgICAgICAgICAgIHVybDogcGxhY2UudXJsLFxyXG4gICAgICAgICAgICAgIHBsYWNlSUQ6IHBsYWNlLnBsYWNlX2lkLFxyXG4gICAgICAgICAgICAgIGRpc3BsYXlBZGRyZXNzOiBwbGFjZS5mb3JtYXR0ZWRfYWRkcmVzcyxcclxuICAgICAgICAgICAgICBuYW1lOiBwbGFjZS5uYW1lLFxyXG4gICAgICAgICAgICAgIHZpY2luaXR5OiBwbGFjZS52aWNpbml0eSxcclxuICAgICAgICAgICAgICBsb2NhbGl0eToge30sXHJcbiAgICAgICAgICAgICAgc3RhdGU6IHt9LFxyXG4gICAgICAgICAgICAgIGNvdW50cnk6IHt9LFxyXG4gICAgICAgICAgICAgIGdlb0xvY2F0aW9uOiB7bGF0aXR1ZGU6IC0xLCBsb25naXR1ZGU6IC0xfSxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwbGFjZS5nZW9tZXRyeSAmJiBwbGFjZS5nZW9tZXRyeS5sb2NhdGlvbikge1xyXG4gICAgICAgICAgICAgIGdlcm1hbkFkZHJlc3MuZ2VvTG9jYXRpb24ubGF0aXR1ZGUgPSBwbGFjZS5nZW9tZXRyeS5sb2NhdGlvbi5sYXQoKTtcclxuICAgICAgICAgICAgICBnZXJtYW5BZGRyZXNzLmdlb0xvY2F0aW9uLmxvbmdpdHVkZSA9IHBsYWNlLmdlb21ldHJ5LmxvY2F0aW9uLmxuZygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHMuZm9yRWFjaCh2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKHZhbHVlLnR5cGVzLmluZGV4T2YoJ3N0cmVldF9udW1iZXInKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBnZXJtYW5BZGRyZXNzLnN0cmVldE51bWJlciA9IHZhbHVlLnNob3J0X25hbWU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGlmICh2YWx1ZS50eXBlcy5pbmRleE9mKCdyb3V0ZScpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIGdlcm1hbkFkZHJlc3Muc3RyZWV0TmFtZSA9IHZhbHVlLmxvbmdfbmFtZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYgKHZhbHVlLnR5cGVzLmluZGV4T2YoJ3Bvc3RhbF9jb2RlJykgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgZ2VybWFuQWRkcmVzcy5wb3N0YWxDb2RlID0gTnVtYmVyKHZhbHVlLnNob3J0X25hbWUpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZiAodmFsdWUudHlwZXMuaW5kZXhPZignc3VibG9jYWxpdHknKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBnZXJtYW5BZGRyZXNzLnN1YmxvY2FsaXR5ID0gdmFsdWUubG9uZ19uYW1lO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZiAodmFsdWUudHlwZXMuaW5kZXhPZignbG9jYWxpdHknKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBnZXJtYW5BZGRyZXNzLmxvY2FsaXR5LmxvbmcgPSB2YWx1ZS5sb25nX25hbWU7XHJcbiAgICAgICAgICAgICAgICBnZXJtYW5BZGRyZXNzLmxvY2FsaXR5LnNob3J0ID0gdmFsdWUuc2hvcnRfbmFtZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYgKHZhbHVlLnR5cGVzLmluZGV4T2YoJ2FkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMScpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIGdlcm1hbkFkZHJlc3Muc3RhdGUubG9uZyA9IHZhbHVlLmxvbmdfbmFtZTtcclxuICAgICAgICAgICAgICAgIGdlcm1hbkFkZHJlc3Muc3RhdGUuc2hvcnQgPSB2YWx1ZS5zaG9ydF9uYW1lO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZiAodmFsdWUudHlwZXMuaW5kZXhPZignY291bnRyeScpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIGdlcm1hbkFkZHJlc3MuY291bnRyeS5sb25nID0gdmFsdWUubG9uZ19uYW1lO1xyXG4gICAgICAgICAgICAgICAgZ2VybWFuQWRkcmVzcy5jb3VudHJ5LnNob3J0ID0gdmFsdWUuc2hvcnRfbmFtZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYgKHZhbHVlLnR5cGVzLmluZGV4T2YoJ2FkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMycpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIGdlcm1hbkFkZHJlc3MubG9jYWxpdHkuc2hvcnQgPSB2YWx1ZS5zaG9ydF9uYW1lO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm9uR2VybWFuQWRkcmVzc01hcHBlZC5lbWl0KGdlcm1hbkFkZHJlc3MpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFwbGFjZS5wbGFjZV9pZCB8fCBwbGFjZS5nZW9tZXRyeSA9PT0gdW5kZWZpbmVkIHx8IHBsYWNlLmdlb21ldHJ5ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgLy8gcGxhY2UgcmVzdWx0IGlzIG5vdCB2YWxpZFxyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAvLyBzaG93IGRpYWxvZyB0byBzZWxlY3QgYSBhZGRyZXNzIGZyb20gdGhlIGlucHV0XHJcbiAgICAgICAgICAgICAgLy8gZW1pdCBmYWlsZWQgZXZlbnRcclxuICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gcGxhY2U7XHJcbiAgICAgICAgICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UodGhpcy52YWx1ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmFkZHJlc3MgPSBwbGFjZS5mb3JtYXR0ZWRfYWRkcmVzcztcclxuICAgICAgICAgICAgdGhpcy5vbkF1dG9jb21wbGV0ZVNlbGVjdGVkLmVtaXQocGxhY2UpO1xyXG4gICAgICAgICAgICB0aGlzLm9uTG9jYXRpb25TZWxlY3RlZC5lbWl0KFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxhdGl0dWRlOiBwbGFjZS5nZW9tZXRyeS5sb2NhdGlvbi5sYXQoKSxcclxuICAgICAgICAgICAgICAgIGxvbmdpdHVkZTogcGxhY2UuZ2VvbWV0cnkubG9jYXRpb24ubG5nKClcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5sb2coZXJyKSk7XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XHJcbiAgfVxyXG5cclxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICB9XHJcblxyXG4gIHdyaXRlVmFsdWUob2JqOiBhbnkpOiB2b2lkIHtcclxuICAgIGlmIChvYmopIHtcclxuICAgICAgdGhpcy52YWx1ZSA9IG9iajtcclxuICAgIH1cclxuICB9XHJcblxyXG59XHJcbiJdfQ==