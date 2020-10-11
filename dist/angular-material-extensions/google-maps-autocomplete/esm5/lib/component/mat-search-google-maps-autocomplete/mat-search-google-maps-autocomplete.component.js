import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { parseGermanAddress } from '../../helpers/parser';
import { Appearance } from '../mat-google-maps-autocomplete.component';
import { InputAnimations } from '../../animations';
var MatSearchGoogleMapsAutocompleteComponent = /** @class */ (function () {
    function MatSearchGoogleMapsAutocompleteComponent(formBuilder) {
        this.formBuilder = formBuilder;
        this.appearance = Appearance.STANDARD;
        this.searchAddressLabel = 'Search Address';
        this.streetNameLabel = 'Street';
        this.streetNumberLabel = 'Nr.';
        this.postalCodeLabel = 'PLZ';
        this.localityLabel = 'Locality';
        this.vicinityLabel = 'Vicinity';
        this.onGermanAddressMapped = new EventEmitter();
        this.firstInit = true;
        this.propagateChange = function (_) {
        };
    }
    MatSearchGoogleMapsAutocompleteComponent.prototype.ngOnInit = function () {
        this.createAddressFormGroup();
    };
    MatSearchGoogleMapsAutocompleteComponent.prototype.createAddressFormGroup = function () {
        this.addressFormGroup = this.formBuilder.group({
            streetName: [this.value && this.value.streetName ? this.value.streetName : null, Validators.required],
            streetNumber: [this.value && this.value.streetNumber ? this.value.streetNumber : null, Validators.required],
            postalCode: [this.value && this.value.postalCode ? this.value.postalCode : null, Validators.required],
            vicinity: [this.value && this.value.vicinity ? this.value.vicinity : null],
            locality: this.formBuilder.group({
                long: [this.value && this.value.locality && this.value.locality.long ? this.value.locality.long : null, Validators.required],
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
        { type: FormBuilder }
    ]; };
    MatSearchGoogleMapsAutocompleteComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mat-search-google-maps-autocomplete',
                    template: "<div fxLayout=\"column\">\r\n  <div *ngIf=\"!disableSearch\" fxFlex=\"100\">\r\n    <!--search address-->\r\n    <mat-form-field fxFlex=\"auto\" [appearance]=\"appearance\" [@animate]=\"{ value: '*', params: { y: '100%' } }\">\r\n      <mat-label>{{searchAddressLabel}}</mat-label>\r\n      <input\r\n        (onAutocompleteSelected)=\"syncAutoComplete($event)\"\r\n        [country]=\"country\"\r\n        [placeIdOnly]=\"placeIdOnly\"\r\n        [strictBounds]=\"strictBounds\"\r\n        [types]=\"types\"\r\n        [type]=\"type\"\r\n        matGoogleMapsAutocomplete\r\n        matInput\r\n        required\r\n      />\r\n      <mat-icon color=\"primary\" matSuffix>search</mat-icon>\r\n      <!--    <mat-error>{{ 'msa.contactData.currentAddress.error' | translate }}</mat-error>-->\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <form [formGroup]=\"addressFormGroup\" fxFlex fxLayoutGap=\"10px\">\r\n    <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n      <mat-form-field fxFlex=\"80\"\r\n                      [appearance]=\"appearance\"\r\n                      [@animate]=\"{ value: '*', params: { y: '100%' } }\">\r\n        <mat-label>{{streetNameLabel}}</mat-label>\r\n        <input\r\n          [readonly]=\"readonly\"\r\n          formControlName=\"streetName\"\r\n          matInput\r\n          required\r\n        />\r\n        <!--        <mat-icon color=\"primary\" matSuffix>add_location</mat-icon>-->\r\n        <!--    <mat-error>{{ 'msa.contactData.currentAddress.error' | translate }}</mat-error>-->\r\n      </mat-form-field>\r\n      <mat-form-field fxFlex=\"20\" [appearance]=\"appearance\" [@animate]=\"{ value: '*', params: { y: '100%' } }\">\r\n        <mat-label>{{streetNumberLabel}}</mat-label>\r\n        <input\r\n          [readonly]=\"readonly\"\r\n          formControlName=\"streetNumber\"\r\n          matInput\r\n          required\r\n        />\r\n        <!--        <mat-icon color=\"primary\" matSuffix>add_location</mat-icon>-->\r\n        <!--    <mat-error>{{ 'msa.contactData.currentAddress.error' | translate }}</mat-error>-->\r\n      </mat-form-field>\r\n    </div>\r\n    <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n      <mat-form-field fxFlex=\"20\" [appearance]=\"appearance\" [@animate]=\"{ value: '*', params: { y: '100%' } }\">\r\n        <mat-label>{{postalCodeLabel}}</mat-label>\r\n        <input\r\n          [readonly]=\"readonly\"\r\n          formControlName=\"postalCode\"\r\n          matInput\r\n          required\r\n        />\r\n        <!--        <mat-icon color=\"primary\" matSuffix>add_location</mat-icon>-->\r\n        <!--    <mat-error>{{ 'msa.contactData.currentAddress.error' | translate }}</mat-error>-->\r\n      </mat-form-field>\r\n      <mat-form-field *ngIf=\"showVicinity\" fxFlex=\"auto\"\r\n                      [appearance]=\"appearance\"\r\n                      [@animate]=\"{ value: '*', params: { y: '100%' } }\">\r\n        <mat-label>{{vicinityLabel}}</mat-label>\r\n        <input\r\n          [readonly]=\"readonly\"\r\n          matInput\r\n          formControlName=\"vicinity\"\r\n        />\r\n      </mat-form-field>\r\n      <div formGroupName=\"locality\" fxFlex=\"auto\">\r\n        <mat-form-field fxFlex=\"auto\" [appearance]=\"appearance\" [@animate]=\"{ value: '*', params: { y: '100%' } }\">\r\n          <mat-label>{{localityLabel}}</mat-label>\r\n          <input\r\n            [readonly]=\"readonly\"\r\n            formControlName=\"long\"\r\n            matInput\r\n            required\r\n          />\r\n          <mat-icon color=\"primary\" matSuffix>add_location</mat-icon>\r\n          <!--    <mat-error>{{ 'msa.contactData.currentAddress.error' | translate }}</mat-error>-->\r\n        </mat-form-field>\r\n      </div>\r\n    </div>\r\n  </form>\r\n</div>\r\n",
                    animations: InputAnimations,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return MatSearchGoogleMapsAutocompleteComponent; }),
                            multi: true
                        }
                    ],
                    styles: [""]
                },] }
    ];
    MatSearchGoogleMapsAutocompleteComponent.ctorParameters = function () { return [
        { type: FormBuilder }
    ]; };
    MatSearchGoogleMapsAutocompleteComponent.propDecorators = {
        appearance: [{ type: Input }],
        searchAddressLabel: [{ type: Input }],
        streetNameLabel: [{ type: Input }],
        streetNumberLabel: [{ type: Input }],
        postalCodeLabel: [{ type: Input }],
        localityLabel: [{ type: Input }],
        vicinityLabel: [{ type: Input }],
        showVicinity: [{ type: Input }],
        country: [{ type: Input }],
        placeIdOnly: [{ type: Input }],
        strictBounds: [{ type: Input }],
        types: [{ type: Input }],
        type: [{ type: Input }],
        readonly: [{ type: Input }],
        disableSearch: [{ type: Input }],
        value: [{ type: Input }],
        onGermanAddressMapped: [{ type: Output }]
    };
    return MatSearchGoogleMapsAutocompleteComponent;
}());
export { MatSearchGoogleMapsAutocompleteComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXNlYXJjaC1nb29nbGUtbWFwcy1hdXRvY29tcGxldGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItbWF0ZXJpYWwtZXh0ZW5zaW9ucy9nb29nbGUtbWFwcy1hdXRvY29tcGxldGUvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50L21hdC1zZWFyY2gtZ29vZ2xlLW1hcHMtYXV0b2NvbXBsZXRlL21hdC1zZWFyY2gtZ29vZ2xlLW1hcHMtYXV0b2NvbXBsZXRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6RixPQUFPLEVBQUMsb0JBQW9CLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzRyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUV4RCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFDckUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRWpEO0lBMkVFLGtEQUFvQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQTNENUMsZUFBVSxHQUF3QixVQUFVLENBQUMsUUFBUSxDQUFDO1FBR3RELHVCQUFrQixHQUFHLGdCQUFnQixDQUFDO1FBR3RDLG9CQUFlLEdBQUcsUUFBUSxDQUFDO1FBRzNCLHNCQUFpQixHQUFHLEtBQUssQ0FBQztRQUcxQixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUd4QixrQkFBYSxHQUFHLFVBQVUsQ0FBQztRQUczQixrQkFBYSxHQUFHLFVBQVUsQ0FBQztRQStCM0IsMEJBQXFCLEdBQWdDLElBQUksWUFBWSxFQUFpQixDQUFDO1FBS3ZGLGNBQVMsR0FBRyxJQUFJLENB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b0JBQzNCLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSx3Q0FBd0MsRUFBeEMsQ0FBd0MsQ0FBQzs0QkFDdkUsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7O2lCQUNGOzs7Z0JBbkI2QixXQUFXOzs7NkJBc0J0QyxLQUFLO3FDQUdMLEtBQUs7a0NBR0wsS0FBSztvQ0FHTCxLQUFLO2tDQUdMLEtBQUs7Z0NBR0wsS0FBSztnQ0FHTCxLQUFLOytCQUdMLEtBQUs7MEJBR0wsS0FBSzs4QkFHTCxLQUFLOytCQUdMLEtBQUs7d0JBR0wsS0FBSzt1QkFJTCxLQUFLOzJCQUdMLEtBQUs7Z0NBR0wsS0FBSzt3QkFHTCxLQUFLO3dDQUdMLE1BQU07O0lBa0ZULCtDQUFDO0NBQUEsQUFsSkQsSUFrSkM7U0FySVksd0NBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgTkdfVkFMVUVfQUNDRVNTT1IsIFZhbGlkYXRvcnN9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7cGFyc2VHZXJtYW5BZGRyZXNzfSBmcm9tICcuLi8uLi9oZWxwZXJzL3BhcnNlcic7XHJcbmltcG9ydCB7R2VybWFuQWRkcmVzc30gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7QXBwZWFyYW5jZX0gZnJvbSAnLi4vbWF0LWdvb2dsZS1tYXBzLWF1dG9jb21wbGV0ZS5jb21wb25lbnQnO1xyXG5pbXBvcnQge0lucHV0QW5pbWF0aW9uc30gZnJvbSAnLi4vLi4vYW5pbWF0aW9ucyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ21hdC1zZWFyY2gtZ29vZ2xlLW1hcHMtYXV0b2NvbXBsZXRlJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbWF0LXNlYXJjaC1nb29nbGUtbWFwcy1hdXRvY29tcGxldGUuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL21hdC1zZWFyY2gtZ29vZ2xlLW1hcHMtYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgYW5pbWF0aW9uczogSW5wdXRBbmltYXRpb25zLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAge1xyXG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWF0U2VhcmNoR29vZ2xlTWFwc0F1dG9jb21wbGV0ZUNvbXBvbmVudCksXHJcbiAgICAgIG11bHRpOiB0cnVlXHJcbiAgICB9XHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWF0U2VhcmNoR29vZ2xlTWFwc0F1dG9jb21wbGV0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGFwcGVhcmFuY2U6IHN0cmluZyB8IEFwcGVhcmFuY2UgPSBBcHBlYXJhbmNlLlNUQU5EQVJEO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHNlYXJjaEFkZHJlc3NMYWJlbCA9ICdTZWFyY2ggQWRkcmVzcyc7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc3RyZWV0TmFtZUxhYmVsID0gJ1N0cmVldCc7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc3RyZWV0TnVtYmVyTGFiZWwgPSAnTnIuJztcclxuXHJcbiAgQElucHV0KClcclxuICBwb3N0YWxDb2RlTGFiZWwgPSAnUExaJztcclxuXHJcbiAgQElucHV0KClcclxuICBsb2NhbGl0eUxhYmVsID0gJ0xvY2FsaXR5JztcclxuXHJcbiAgQElucHV0KClcclxuICB2aWNpbml0eUxhYmVsID0gJ1ZpY2luaXR5JztcclxuXHJcbiAgQElucHV0KClcclxuICBzaG93VmljaW5pdHk6IGJvb2xlYW47XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgY291bnRyeTogc3RyaW5nIHwgc3RyaW5nW107XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgcGxhY2VJZE9ubHk/OiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHN0cmljdEJvdW5kcz86IGJvb2xlYW47XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgdHlwZXM/OiBzdHJpbmdbXTtcclxuICAvLyB0eXBlczogc3RyaW5nW10gPSBbJ2FkZHJlc3MnXTtcclxuXHJcbiAgQElucHV0KClcclxuICB0eXBlPzogc3RyaW5nO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHJlYWRvbmx5OiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGRpc2FibGVTZWFyY2g6IGJvb2xlYW47XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgdmFsdWU6IEdlcm1hbkFkZHJlc3M7XHJcblxyXG4gIEBPdXRwdXQoKVxyXG4gIG9uR2VybWFuQWRkcmVzc01hcHBlZDogRXZlbnRFbWl0dGVyPEdlcm1hbkFkZHJlc3M+ID0gbmV3IEV2ZW50RW1pdHRlcjxHZXJtYW5BZGRyZXNzPigpO1xyXG5cclxuICBnZXJtYW5BZGRyZXNzOiBHZXJtYW5BZGRyZXNzO1xyXG4gIGFkZHJlc3NGb3JtR3JvdXA6IEZvcm1Hcm91cDtcclxuXHJcbiAgZmlyc3RJbml0ID0gdHJ1ZTtcclxuXHJcbiAgcHJvcGFnYXRlQ2hhbmdlID0gKF86IGFueSkgPT4ge1xyXG4gIH07XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyKSB7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuY3JlYXRlQWRkcmVzc0Zvcm1Hcm91cCgpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlQWRkcmVzc0Zvcm1Hcm91cCgpOiB2b2lkIHtcclxuICAgIHRoaXMuYWRkcmVzc0Zvcm1Hcm91cCA9IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xyXG4gICAgICBzdHJlZXROYW1lOiBbdGhpcy52YWx1ZSAmJiB0aGlzLnZhbHVlLnN0cmVldE5hbWUgPyB0aGlzLnZhbHVlLnN0cmVldE5hbWUgOiBudWxsLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcclxuICAgICAgc3RyZWV0TnVtYmVyOiBbdGhpcy52YWx1ZSAmJiB0aGlzLnZhbHVlLnN0cmVldE51bWJlciA/IHRoaXMudmFsdWUuc3RyZWV0TnVtYmVyIDogbnVsbCwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXHJcbiAgICAgIHBvc3RhbENvZGU6IFt0aGlzLnZhbHVlICYmIHRoaXMudmFsdWUucG9zdGFsQ29kZSA/IHRoaXMudmFsdWUucG9zdGFsQ29kZSA6IG51bGwsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxyXG4gICAgICB2aWNpbml0eTogW3RoaXMudmFsdWUgJiYgdGhpcy52YWx1ZS52aWNpbml0eSA/IHRoaXMudmFsdWUudmljaW5pdHkgOiBudWxsXSxcclxuICAgICAgbG9jYWxpdHk6IHRoaXMuZm9ybUJ1aWxkZXIuZ3JvdXAoe1xyXG4gICAgICAgIGxvbmc6IFt0aGlzLnZhbHVlICYmIHRoaXMudmFsdWUubG9jYWxpdHkgJiYgdGhpcy52YWx1ZS5sb2NhbGl0eS5sb25nID8gdGhpcy52YWx1ZS5sb2NhbGl0eS5sb25nIDogbnVsbCwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXHJcbiAgICAgIH0pLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzeW5jQXV0b0NvbXBsZXRlKCRldmVudDogZ29vZ2xlLm1hcHMucGxhY2VzLlBsYWNlUmVzdWx0KSB7XHJcbiAgICBpZiAodGhpcy5nZXJtYW5BZGRyZXNzKSB7XHJcbiAgICAgIHRoaXMuYWRkcmVzc0Zvcm1Hcm91cC5yZXNldCgpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgZ2VybWFuQWRkcmVzczogR2VybWFuQWRkcmVzcyA9IHBhcnNlR2VybWFuQWRkcmVzcygkZXZlbnQpO1xyXG4gICAgdGhpcy5nZXJtYW5BZGRyZXNzID0gZ2VybWFuQWRkcmVzcztcclxuICAgIGlmIChnZXJtYW5BZGRyZXNzLnZpY2luaXR5KSB7XHJcbiAgICAgIHRoaXMuYWRkcmVzc0Zvcm1Hcm91cC5nZXQoJ3ZpY2luaXR5JykucGF0Y2hWYWx1ZShnZXJtYW5BZGRyZXNzLnZpY2luaXR5KTtcclxuICAgIH1cclxuICAgIGlmIChnZXJtYW5BZGRyZXNzLnN0cmVldE5hbWUpIHtcclxuICAgICAgdGhpcy5hZGRyZXNzRm9ybUdyb3VwLmdldCgnc3RyZWV0TmFtZScpLnBhdGNoVmFsdWUoZ2VybWFuQWRkcmVzcy5zdHJlZXROYW1lKTtcclxuICAgIH1cclxuICAgIGlmIChnZXJtYW5BZGRyZXNzLnN0cmVldE51bWJlcikge1xyXG4gICAgICB0aGlzLmFkZHJlc3NGb3JtR3JvdXAuZ2V0KCdzdHJlZXROdW1iZXInKS5wYXRjaFZhbHVlKGdlcm1hbkFkZHJlc3Muc3RyZWV0TnVtYmVyLnRvU3RyaW5nKCkpO1xyXG4gICAgfVxyXG4gICAgaWYgKGdlcm1hbkFkZHJlc3MucG9zdGFsQ29kZSkge1xyXG4gICAgICB0aGlzLmFkZHJlc3NGb3JtR3JvdXAuZ2V0KCdwb3N0YWxDb2RlJykucGF0Y2hWYWx1ZShnZXJtYW5BZGRyZXNzLnBvc3RhbENvZGUpO1xyXG4gICAgfVxyXG4gICAgaWYgKGdlcm1hbkFkZHJlc3MubG9jYWxpdHkgJiYgZ2VybWFuQWRkcmVzcy5sb2NhbGl0eS5sb25nKSB7XHJcbiAgICAgIHRoaXMuYWRkcmVzc0Zvcm1Hcm91cC5nZXQoJ2xvY2FsaXR5LmxvbmcnKS5wYXRjaFZhbHVlKGdlcm1hbkFkZHJlc3MubG9jYWxpdHkubG9uZyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy52YWx1ZSA9IGdlcm1hbkFkZHJlc3M7XHJcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSh0aGlzLnZhbHVlKTtcclxuICAgIHRoaXMub25HZXJtYW5BZGRyZXNzTWFwcGVkLmVtaXQoZ2VybWFuQWRkcmVzcyk7XHJcbiAgfVxyXG5cclxuICB3cml0ZVZhbHVlKG9iajogYW55KTogdm9pZCB7XHJcbiAgICBsZXQgc2hvdWxkUmVjcmVhdGVGRyA9IGZhbHNlO1xyXG4gICAgaWYgKG9iaikge1xyXG4gICAgICBpZiAoIXRoaXMudmFsdWUgJiYgdGhpcy5maXJzdEluaXQpIHtcclxuICAgICAgICBzaG91bGRSZWNyZWF0ZUZHID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnZhbHVlID0gb2JqO1xyXG4gICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSh0aGlzLnZhbHVlKTtcclxuICAgICAgaWYgKHNob3VsZFJlY3JlYXRlRkcpIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZUFkZHJlc3NGb3JtR3JvdXAoKTtcclxuICAgICAgICB0aGlzLmZpcnN0SW5pdCA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XHJcbiAgfVxyXG5cclxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XHJcbiAgfVxyXG5cclxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==