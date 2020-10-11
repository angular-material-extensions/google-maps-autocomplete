(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@agm/core'), require('@angular/animations'), require('@angular/common'), require('@angular/flex-layout'), require('@angular/material/icon'), require('@angular/material/input')) :
    typeof define === 'function' && define.amd ? define('@angular-material-extensions/google-maps-autocomplete', ['exports', '@angular/core', '@angular/forms', '@agm/core', '@angular/animations', '@angular/common', '@angular/flex-layout', '@angular/material/icon', '@angular/material/input'], factory) :
    (global = global || self, factory((global['angular-material-extensions'] = global['angular-material-extensions'] || {}, global['angular-material-extensions']['google-maps-autocomplete'] = {}), global.ng.core, global.ng.forms, global.core$1, global.ng.animations, global.ng.common, global.ng.flexLayout, global.ng.material.icon, global.ng.material.input));
}(this, (function (exports, core, forms, core$1, animations, common, flexLayout, icon, input) { 'use strict';

    // https://github.com/angular/angular/blob/master/packages/forms/src/directives/validators.ts
    var MatValidateAddressDirective = /** @class */ (function () {
        function MatValidateAddressDirective() {
        }
        MatValidateAddressDirective.prototype.validate = function () {
            var _this = this;
            return function (control) {
                return _this.address ? null : {
                    validateAddress: {
                        valid: false
                    }
                };
            };
        };
        MatValidateAddressDirective.prototype.subscribe = function (eventEmitter) {
            var _this = this;
            this.subscription = eventEmitter.subscribe(function (address) {
                _this.address = address;
            });
        };
        MatValidateAddressDirective.prototype.unsubscribe = function () {
            this.subscription.unsubscribe();
        };
        Object.defineProperty(MatValidateAddressDirective.prototype, "address", {
            get: function () {
                return this._address;
            },
            set: function (value) {
                this._address = value;
            },
            enumerable: false,
            configurable: true
        });
        MatValidateAddressDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[mat-address-validate][formControlName],[MatValidateAddress][formControl],[MatValidateAddress][ngModel]',
                        providers: [
                            { provide: forms.NG_VALIDATORS, useExisting: core.forwardRef(function () { return MatValidateAddressDirective; }), multi: true }
                        ]
                    },] }
        ];
        MatValidateAddressDirective.ctorParameters = function () { return []; };
        return MatValidateAddressDirective;
    }());


    (function (Appearance) {
        Appearance["STANDARD"] = "standard";
        Appearance["FILL"] = "fill";
        Appearance["OUTLINE"] = "outline";
        Appearance["LEGACY"] = "legacy";
    })(exports.Appearance || (exports.Appearance = {}));
    var MatGoogleMapsAutocompleteComponent = /** @class */ (function () {
        function MatGoogleMapsAutocompleteComponent(mapsAPILoader, ngZone) {
            this.mapsAPILoader = mapsAPILoader;
            this.ngZone = ngZone;
            this.addressLabelText = 'Address';
            this.placeholderText = 'Please enter the address';
            this.requiredErrorText = 'The address is required';
            this.invalidErrorText = 'The address is not valid';
            this.appearance = exports.Appearance.STANDARD;
            this.autoCompleteOptions = {};
            this.onChange = new core.EventEmitter();
            this.onAutocompleteSelected = new core.EventEmitter();
            this.onGermanAddressMapped = new core.EventEmitter();
            this.onLocationSelected = new core.EventEmitter();
            this.onNewPlaceResult = new core.EventEmitter();
            this.addressValidator = new MatValidateAddressDirective();
            this.addressSearchControl = new forms.FormControl({ value: null }, forms.Validators.compose([
                forms.Validators.required,
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
            { type: core$1.MapsAPILoader },
            { type: core.NgZone }
        ]; };
        MatGoogleMapsAutocompleteComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mat-google-maps-autocomplete',
                        exportAs: 'matGoogleMapsAutocomplete',
                        template: "<mat-form-field class=\"full-width\" [appearance]=\"appearance\">\r\n  <mat-label>{{addressLabelText}}</mat-label>\r\n  <input matInput\r\n         [(ngModel)]=\"address\"\r\n         (change)=\"onQuery($event)\"\r\n         placeholder=\"{{placeholderText}}\"\r\n         class=\"form-control\"\r\n         #search\r\n         MatValidateAddress\r\n         required>\r\n  <mat-error *ngIf=\"addressSearchControl.hasError('required')\">\r\n    {{requiredErrorText}}\r\n  </mat-error>\r\n  <mat-error *ngIf=\"addressSearchControl.hasError('validateAddress')\">\r\n    {{invalidErrorText}}\r\n  </mat-error>\r\n</mat-form-field>\r\n",
                        providers: [
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: core.forwardRef(function () { return MatGoogleMapsAutocompleteComponent; }),
                                multi: true
                            }
                        ],
                        styles: [".full-width{width:100%}"]
                    },] }
        ];
        MatGoogleMapsAutocompleteComponent.ctorParameters = function () { return [
            { type: core$1.MapsAPILoader },
            { type: core.NgZone }
        ]; };
        MatGoogleMapsAutocompleteComponent.propDecorators = {
            searchElementRef: [{ type: core.ViewChild, args: ['search',] }],
            addressLabelText: [{ type: core.Input }],
            placeholderText: [{ type: core.Input }],
            requiredErrorText: [{ type: core.Input }],
            invalidErrorText: [{ type: core.Input }],
            appearance: [{ type: core.Input }],
            value: [{ type: core.Input }],
            address: [{ type: core.Input }],
            country: [{ type: core.Input }],
            placeIdOnly: [{ type: core.Input }],
            strictBounds: [{ type: core.Input }],
            types: [{ type: core.Input }],
            type: [{ type: core.Input }],
            autoCompleteOptions: [{ type: core.Input }],
            onChange: [{ type: core.Output }],
            onAutocompleteSelected: [{ type: core.Output }],
            onGermanAddressMapped: [{ type: core.Output }],
            onLocationSelected: [{ type: core.Output }]
        };
        return MatGoogleMapsAutocompleteComponent;
    }());

    function parseGermanAddress(placeResult) {
        var germanAddress = {
            gmID: placeResult.id,
            icon: placeResult.icon,
            url: placeResult.url,
            placeID: placeResult.place_id,
            displayAddress: placeResult.formatted_address,
            name: placeResult.name,
            vicinity: placeResult.vicinity,
            locality: {},
            state: {},
            country: {},
            geoLocation: { latitude: -1, longitude: -1 },
        };
        if (placeResult.geometry && placeResult.geometry.location) {
            germanAddress.geoLocation.latitude = placeResult.geometry.location.lat();
            germanAddress.geoLocation.longitude = placeResult.geometry.location.lng();
        }
        if (placeResult.address_components && placeResult.address_components.length > 0) {
            placeResult.address_components.forEach(function (value) {
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
        }
        return germanAddress;
    }

    var customAnimation = animations.animation([
        animations.style({
            opacity: '{{opacity}}',
            transform: 'scale({{scale}}) translate3d({{x}}, {{y}}, {{z}})'
        }),
        animations.animate('{{duration}} {{delay}} cubic-bezier(0.0, 0.0, 0.2, 1)', animations.style('*'))
    ], {
        params: {
            duration: '200ms',
            delay: '0ms',
            opacity: '0',
            scale: '1',
            x: '0',
            y: '0',
            z: '0'
        }
    });
    var InputAnimations = [
        animations.trigger('animate', [animations.transition('void => *', [animations.useAnimation(customAnimation)])]),
        animations.trigger('animateStagger', [
            animations.state('50', animations.style('*')),
            animations.state('100', animations.style('*')),
            animations.state('200', animations.style('*')),
            animations.transition('void => 50', animations.query('@*', [animations.stagger('50ms', [animations.animateChild()])], { optional: true })),
            animations.transition('void => 100', animations.query('@*', [animations.stagger('100ms', [animations.animateChild()])], { optional: true })),
            animations.transition('void => 200', animations.query('@*', [animations.stagger('200ms', [animations.animateChild()])], { optional: true }))
        ]),
    ];

    var MatSearchGoogleMapsAutocompleteComponent = /** @class */ (function () {
        function MatSearchGoogleMapsAutocompleteComponent(formBuilder) {
            this.formBuilder = formBuilder;
            this.appearance = exports.Appearance.STANDARD;
            this.searchAddressLabel = 'Search Address';
            this.streetNameLabel = 'Street';
            this.streetNumberLabel = 'Nr.';
            this.postalCodeLabel = 'PLZ';
            this.localityLabel = 'Locality';
            this.vicinityLabel = 'Vicinity';
            this.onGermanAddressMapped = new core.EventEmitter();
            this.firstInit = true;
            this.propagateChange = function (_) {
            };
        }
        MatSearchGoogleMapsAutocompleteComponent.prototype.ngOnInit = function () {
            this.createAddressFormGroup();
        };
        MatSearchGoogleMapsAutocompleteComponent.prototype.createAddressFormGroup = function () {
            this.addressFormGroup = this.formBuilder.group({
                streetName: [this.value && this.value.streetName ? this.value.streetName : null, forms.Validators.required],
                streetNumber: [this.value && this.value.streetNumber ? this.value.streetNumber : null, forms.Validators.required],
                postalCode: [this.value && this.value.postalCode ? this.value.postalCode : null, forms.Validators.required],
                vicinity: [this.value && this.value.vicinity ? this.value.vicinity : null],
                locality: this.formBuilder.group({
                    long: [this.value && this.value.locality && this.value.locality.long ? this.value.locality.long : null, forms.Validators.required],
                }),
            });
        };
        MatSearchGoogleMapsAutocompleteComponent.prototype.syncAutoComplete = function ($event) {
            if (this.germanAddress) {
                this.addressFormGroup.reset();
            }
            var germanAddress = parseGermanAddress($event);
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
        };
        MatSearchGoogleMapsAutocompleteComponent.prototype.writeValue = function (obj) {
            var shouldRecreateFG = false;
            if (obj) {
                if (!this.value && this.firstInit) {
                    shouldRecreateFG = true;
                }
                this.value = obj;
                this.propagateChange(this.value);
                if (shouldRecreateFG) {
                    this.createAddressFormGroup();
                    this.firstInit = false;
                }
            }
        };
        MatSearchGoogleMapsAutocompleteComponent.prototype.registerOnChange = function (fn) {
            this.propagateChange = fn;
        };
        MatSearchGoogleMapsAutocompleteComponent.prototype.registerOnTouched = function (fn) {
        };
        MatSearchGoogleMapsAutocompleteComponent.prototype.setDisabledState = function (isDisabled) {
        };
        MatSearchGoogleMapsAutocompleteComponent.ctorParameters = function () { return [
            { type: forms.FormBuilder }
        ]; };
        MatSearchGoogleMapsAutocompleteComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'mat-search-google-maps-autocomplete',
                        template: "<div fxLayout=\"column\">\r\n  <div *ngIf=\"!disableSearch\" fxFlex=\"100\">\r\n    <!--search address-->\r\n    <mat-form-field fxFlex=\"auto\" [appearance]=\"appearance\" [@animate]=\"{ value: '*', params: { y: '100%' } }\">\r\n      <mat-label>{{searchAddressLabel}}</mat-label>\r\n      <input\r\n        (onAutocompleteSelected)=\"syncAutoComplete($event)\"\r\n        [country]=\"country\"\r\n        [placeIdOnly]=\"placeIdOnly\"\r\n        [strictBounds]=\"strictBounds\"\r\n        [types]=\"types\"\r\n        [type]=\"type\"\r\n        matGoogleMapsAutocomplete\r\n        matInput\r\n        required\r\n      />\r\n      <mat-icon color=\"primary\" matSuffix>search</mat-icon>\r\n      <!--    <mat-error>{{ 'msa.contactData.currentAddress.error' | translate }}</mat-error>-->\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <form [formGroup]=\"addressFormGroup\" fxFlex fxLayoutGap=\"10px\">\r\n    <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n      <mat-form-field fxFlex=\"80\"\r\n                      [appearance]=\"appearance\"\r\n                      [@animate]=\"{ value: '*', params: { y: '100%' } }\">\r\n        <mat-label>{{streetNameLabel}}</mat-label>\r\n        <input\r\n          [readonly]=\"readonly\"\r\n          formControlName=\"streetName\"\r\n          matInput\r\n          required\r\n        />\r\n        <!--        <mat-icon color=\"primary\" matSuffix>add_location</mat-icon>-->\r\n        <!--    <mat-error>{{ 'msa.contactData.currentAddress.error' | translate }}</mat-error>-->\r\n      </mat-form-field>\r\n      <mat-form-field fxFlex=\"20\" [appearance]=\"appearance\" [@animate]=\"{ value: '*', params: { y: '100%' } }\">\r\n        <mat-label>{{streetNumberLabel}}</mat-label>\r\n        <input\r\n          [readonly]=\"readonly\"\r\n          formControlName=\"streetNumber\"\r\n          matInput\r\n          required\r\n        />\r\n        <!--        <mat-icon color=\"primary\" matSuffix>add_location</mat-icon>-->\r\n        <!--    <mat-error>{{ 'msa.contactData.currentAddress.error' | translate }}</mat-error>-->\r\n      </mat-form-field>\r\n    </div>\r\n    <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n      <mat-form-field fxFlex=\"20\" [appearance]=\"appearance\" [@animate]=\"{ value: '*', params: { y: '100%' } }\">\r\n        <mat-label>{{postalCodeLabel}}</mat-label>\r\n        <input\r\n          [readonly]=\"readonly\"\r\n          formControlName=\"postalCode\"\r\n          matInput\r\n          required\r\n        />\r\n        <!--        <mat-icon color=\"primary\" matSuffix>add_location</mat-icon>-->\r\n        <!--    <mat-error>{{ 'msa.contactData.currentAddress.error' | translate }}</mat-error>-->\r\n      </mat-form-field>\r\n      <mat-form-field *ngIf=\"showVicinity\" fxFlex=\"auto\"\r\n                      [appearance]=\"appearance\"\r\n                      [@animate]=\"{ value: '*', params: { y: '100%' } }\">\r\n        <mat-label>{{vicinityLabel}}</mat-label>\r\n        <input\r\n          [readonly]=\"readonly\"\r\n          matInput\r\n          formControlName=\"vicinity\"\r\n        />\r\n      </mat-form-field>\r\n      <div formGroupName=\"locality\" fxFlex=\"auto\">\r\n        <mat-form-field fxFlex=\"auto\" [appearance]=\"appearance\" [@animate]=\"{ value: '*', params: { y: '100%' } }\">\r\n          <mat-label>{{localityLabel}}</mat-label>\r\n          <input\r\n            [readonly]=\"readonly\"\r\n            formControlName=\"long\"\r\n            matInput\r\n            required\r\n          />\r\n          <mat-icon color=\"primary\" matSuffix>add_location</mat-icon>\r\n          <!--    <mat-error>{{ 'msa.contactData.currentAddress.error' | translate }}</mat-error>-->\r\n        </mat-form-field>\r\n      </div>\r\n    </div>\r\n  </form>\r\n</div>\r\n",
                        animations: InputAnimations,
                        providers: [
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: core.forwardRef(function () { return MatSearchGoogleMapsAutocompleteComponent; }),
                                multi: true
                            }
                        ],
                        styles: [""]
                    },] }
        ];
        MatSearchGoogleMapsAutocompleteComponent.ctorParameters = function () { return [
            { type: forms.FormBuilder }
        ]; };
        MatSearchGoogleMapsAutocompleteComponent.propDecorators = {
            appearance: [{ type: core.Input }],
            searchAddressLabel: [{ type: core.Input }],
            streetNameLabel: [{ type: core.Input }],
            streetNumberLabel: [{ type: core.Input }],
            postalCodeLabel: [{ type: core.Input }],
            localityLabel: [{ type: core.Input }],
            vicinityLabel: [{ type: core.Input }],
            showVicinity: [{ type: core.Input }],
            country: [{ type: core.Input }],
            placeIdOnly: [{ type: core.Input }],
            strictBounds: [{ type: core.Input }],
            types: [{ type: core.Input }],
            type: [{ type: core.Input }],
            readonly: [{ type: core.Input }],
            disableSearch: [{ type: core.Input }],
            value: [{ type: core.Input }],
            onGermanAddressMapped: [{ type: core.Output }]
        };
        return MatSearchGoogleMapsAutocompleteComponent;
    }());

    var MatGoogleMapsAutocompleteDirective = /** @class */ (function () {
        function MatGoogleMapsAutocompleteDirective(platformId, elemRef, mapsAPILoader, ngZone) {
            this.platformId = platformId;
            this.elemRef = elemRef;
            this.mapsAPILoader = mapsAPILoader;
            this.ngZone = ngZone;
            this.autoCompleteOptions = {};
            this.onChange = new core.EventEmitter();
            this.onAutocompleteSelected = new core.EventEmitter();
            this.onGermanAddressMapped = new core.EventEmitter();
            this.onLocationSelected = new core.EventEmitter();
            this.onNewPlaceResult = new core.EventEmitter();
            this.addressValidator = new MatValidateAddressDirective();
            this.addressSearchControl = new forms.FormControl({ value: null }, forms.Validators.compose([
                forms.Validators.required,
                this.addressValidator.validate()
            ]));
            this.propagateChange = function (_) {
            };
        }
        MatGoogleMapsAutocompleteDirective.prototype.ngOnInit = function () {
            if (common.isPlatformBrowser(this.platformId)) {
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
            { type: String, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] },
            { type: core.ElementRef },
            { type: core$1.MapsAPILoader },
            { type: core.NgZone }
        ]; };
        MatGoogleMapsAutocompleteDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[matGoogleMapsAutocomplete]',
                        exportAs: 'matGoogleMapsAutocomplete',
                        providers: [
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                useExisting: core.forwardRef(function () { return MatGoogleMapsAutocompleteDirective; }),
                                multi: true
                            }
                        ]
                    },] }
        ];
        MatGoogleMapsAutocompleteDirective.ctorParameters = function () { return [
            { type: String, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] },
            { type: core.ElementRef },
            { type: core$1.MapsAPILoader },
            { type: core.NgZone }
        ]; };
        MatGoogleMapsAutocompleteDirective.propDecorators = {
            address: [{ type: core.Input }],
            country: [{ type: core.Input }],
            placeIdOnly: [{ type: core.Input }],
            strictBounds: [{ type: core.Input }],
            types: [{ type: core.Input }],
            type: [{ type: core.Input }],
            autoCompleteOptions: [{ type: core.Input }],
            onChange: [{ type: core.Output }],
            onAutocompleteSelected: [{ type: core.Output }],
            onGermanAddressMapped: [{ type: core.Output }],
            onLocationSelected: [{ type: core.Output }]
        };
        return MatGoogleMapsAutocompleteDirective;
    }());

    var MatGoogleMapsAutocompleteModule = /** @class */ (function () {
        function MatGoogleMapsAutocompleteModule() {
        }
        MatGoogleMapsAutocompleteModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms.FormsModule,
                            forms.ReactiveFormsModule,
                            flexLayout.FlexLayoutModule,
                            input.MatInputModule,
                            icon.MatIconModule
                        ],
                        exports: [
                            MatGoogleMapsAutocompleteComponent,
                            MatGoogleMapsAutocompleteDirective,
                            MatValidateAddressDirective,
                            MatSearchGoogleMapsAutocompleteComponent
                        ],
                        declarations: [
                            MatGoogleMapsAutocompleteComponent,
                            MatGoogleMapsAutocompleteDirective,
                            MatValidateAddressDirective,
                            MatSearchGoogleMapsAutocompleteComponent
                        ]
                    },] }
        ];
        return MatGoogleMapsAutocompleteModule;
    }());

    exports.MatGoogleMapsAutocompleteComponent = MatGoogleMapsAutocompleteComponent;
    exports.MatGoogleMapsAutocompleteDirective = MatGoogleMapsAutocompleteDirective;
    exports.MatGoogleMapsAutocompleteModule = MatGoogleMapsAutocompleteModule;
    exports.MatSearchGoogleMapsAutocompleteComponent = MatSearchGoogleMapsAutocompleteComponent;
    exports.MatValidateAddressDirective = MatValidateAddressDirective;
    exports.ɵa = MatGoogleMapsAutocompleteComponent;
    exports.ɵb = MatSearchGoogleMapsAutocompleteComponent;
    exports.ɵc = InputAnimations;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular-material-extensions-google-maps-autocomplete.umd.js.map
