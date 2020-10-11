import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { parseGermanAddress } from '../../helpers/parser';
import { Appearance } from '../mat-google-maps-autocomplete.component';
import { InputAnimations } from '../../animations';
export class MatSearchGoogleMapsAutocompleteComponent {
    constructor(formBuilder) {
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
        this.propagateChange = (_) => {
        };
    }
    ngOnInit() {
        this.createAddressFormGroup();
    }
    createAddressFormGroup() {
        this.addressFormGroup = this.formBuilder.group({
            streetName: [this.value && this.value.streetName ? this.value.streetName : null, Validators.required],
            streetNumber: [this.value && this.value.streetNumber ? this.value.streetNumber : null, Validators.required],
            postalCode: [this.value && this.value.postalCode ? this.value.postalCode : null, Validators.required],
            vicinity: [this.value && this.value.vicinity ? this.value.vicinity : null],
            locality: this.formBuilder.group({
                long: [this.value && this.value.locality && this.value.locality.long ? this.value.locality.long : null, Validators.required],
            }),
        });
    }
    syncAutoComplete($event) {
        if (this.germanAddress) {
            this.addressFormGroup.reset();
        }
        const germanAddress = parseGermanAddress($event);
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
    }
    writeValue(obj) {
        let shouldRecreateFG = false;
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
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn) {
    }
    setDisabledState(isDisabled) {
    }
}
MatSearchGoogleMapsAutocompleteComponent.ctorParameters = () => [
    { type: FormBuilder }
];
MatSearchGoogleMapsAutocompleteComponent.decorators = [
    { type: Component, args: [{
                selector: 'mat-search-google-maps-autocomplete',
                template: "<div fxLayout=\"column\">\r\n  <div *ngIf=\"!disableSearch\" fxFlex=\"100\">\r\n    <!--search address-->\r\n    <mat-form-field fxFlex=\"auto\" [appearance]=\"appearance\" [@animate]=\"{ value: '*', params: { y: '100%' } }\">\r\n      <mat-label>{{searchAddressLabel}}</mat-label>\r\n      <input\r\n        (onAutocompleteSelected)=\"syncAutoComplete($event)\"\r\n        [country]=\"country\"\r\n        [placeIdOnly]=\"placeIdOnly\"\r\n        [strictBounds]=\"strictBounds\"\r\n        [types]=\"types\"\r\n        [type]=\"type\"\r\n        matGoogleMapsAutocomplete\r\n        matInput\r\n        required\r\n      />\r\n      <mat-icon color=\"primary\" matSuffix>search</mat-icon>\r\n      <!--    <mat-error>{{ 'msa.contactData.currentAddress.error' | translate }}</mat-error>-->\r\n    </mat-form-field>\r\n  </div>\r\n\r\n  <form [formGroup]=\"addressFormGroup\" fxFlex fxLayoutGap=\"10px\">\r\n    <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n      <mat-form-field fxFlex=\"80\"\r\n                      [appearance]=\"appearance\"\r\n                      [@animate]=\"{ value: '*', params: { y: '100%' } }\">\r\n        <mat-label>{{streetNameLabel}}</mat-label>\r\n        <input\r\n          [readonly]=\"readonly\"\r\n          formControlName=\"streetName\"\r\n          matInput\r\n          required\r\n        />\r\n        <!--        <mat-icon color=\"primary\" matSuffix>add_location</mat-icon>-->\r\n        <!--    <mat-error>{{ 'msa.contactData.currentAddress.error' | translate }}</mat-error>-->\r\n      </mat-form-field>\r\n      <mat-form-field fxFlex=\"20\" [appearance]=\"appearance\" [@animate]=\"{ value: '*', params: { y: '100%' } }\">\r\n        <mat-label>{{streetNumberLabel}}</mat-label>\r\n        <input\r\n          [readonly]=\"readonly\"\r\n          formControlName=\"streetNumber\"\r\n          matInput\r\n          required\r\n        />\r\n        <!--        <mat-icon color=\"primary\" matSuffix>add_location</mat-icon>-->\r\n        <!--    <mat-error>{{ 'msa.contactData.currentAddress.error' | translate }}</mat-error>-->\r\n      </mat-form-field>\r\n    </div>\r\n    <div fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n      <mat-form-field fxFlex=\"20\" [appearance]=\"appearance\" [@animate]=\"{ value: '*', params: { y: '100%' } }\">\r\n        <mat-label>{{postalCodeLabel}}</mat-label>\r\n        <input\r\n          [readonly]=\"readonly\"\r\n          formControlName=\"postalCode\"\r\n          matInput\r\n          required\r\n        />\r\n        <!--        <mat-icon color=\"primary\" matSuffix>add_location</mat-icon>-->\r\n        <!--    <mat-error>{{ 'msa.contactData.currentAddress.error' | translate }}</mat-error>-->\r\n      </mat-form-field>\r\n      <mat-form-field *ngIf=\"showVicinity\" fxFlex=\"auto\"\r\n                      [appearance]=\"appearance\"\r\n                      [@animate]=\"{ value: '*', params: { y: '100%' } }\">\r\n        <mat-label>{{vicinityLabel}}</mat-label>\r\n        <input\r\n          [readonly]=\"readonly\"\r\n          matInput\r\n          formControlName=\"vicinity\"\r\n        />\r\n      </mat-form-field>\r\n      <div formGroupName=\"locality\" fxFlex=\"auto\">\r\n        <mat-form-field fxFlex=\"auto\" [appearance]=\"appearance\" [@animate]=\"{ value: '*', params: { y: '100%' } }\">\r\n          <mat-label>{{localityLabel}}</mat-label>\r\n          <input\r\n            [readonly]=\"readonly\"\r\n            formControlName=\"long\"\r\n            matInput\r\n            required\r\n          />\r\n          <mat-icon color=\"primary\" matSuffix>add_location</mat-icon>\r\n          <!--    <mat-error>{{ 'msa.contactData.currentAddress.error' | translate }}</mat-error>-->\r\n        </mat-form-field>\r\n      </div>\r\n    </div>\r\n  </form>\r\n</div>\r\n",
                animations: InputAnimations,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => MatSearchGoogleMapsAutocompleteComponent),
                        multi: true
                    }
                ],
                styles: [""]
            },] }
];
MatSearchGoogleMapsAutocompleteComponent.ctorParameters = () => [
    { type: FormBuilder }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXNlYXJjaC1nb29nbGUtbWFwcy1hdXRvY29tcGxldGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFuZ3VsYXItbWF0ZXJpYWwtZXh0ZW5zaW9ucy9nb29nbGUtbWFwcy1hdXRvY29tcGxldGUvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50L21hdC1zZWFyY2gtZ29vZ2xlLW1hcHMtYXV0b2NvbXBsZXRlL21hdC1zZWFyY2gtZ29vZ2xlLW1hcHMtYXV0b2NvbXBsZXRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6RixPQUFPLEVBQUMsb0JBQW9CLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzRyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUV4RCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFDckUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBZWpELE1BQU0sT0FBTyx3Q0FBd0M7SUE4RG5ELFlBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBM0Q1QyxlQUFVLEdBQXdCLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFHdEQsdUJBQWtCLEdBQUcsZ0JBQWdCLENBQUM7UUFHdEMsb0JBQWUsR0FBRyxRQUFRLENBQUM7UUFHM0Isc0JBQWlCLEdBQUcsS0FBSyxDQUFDO1FBRzFCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBR3hCLGtCQUFhLEdBQUcsVUFBVSxDQUFDO1FBRzNCLGtCQUFhLEdBQUcsVUFBVSxDQUFDO1FBK0IzQiwwQkFBcUIsR0FBZ0MsSUFBSSxZQUFZLEVBQWlCLENBQUM7UUFLdkYsY0FBUyxHQUFHLElBQUksQ0FBQztRQUVqQixvQkFBZSxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUU7UUFDN0IsQ0FBQyxDQUFDO0lBR0YsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsc0JBQXNCO1FBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztZQUM3QyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFDckcsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsUUFBUSxDQUFDO1lBQzNHLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUNyRyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQzFFLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztnQkFDL0IsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFB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QUNUO3dCQUNFLE9BQU8sRUFBRSxpQkFBaUI7d0JBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsd0NBQXdDLENBQUM7d0JBQ3ZFLEtBQUssRUFBRSxJQUFJO3FCQUNaO2lCQUNGOzthQUNGOzs7WUFuQjZCLFdBQVc7Ozt5QkFzQnRDLEtBQUs7aUNBR0wsS0FBSzs4QkFHTCxLQUFLO2dDQUdMLEtBQUs7OEJBR0wsS0FBSzs0QkFHTCxLQUFLOzRCQUdMLEtBQUs7MkJBR0wsS0FBSztzQkFHTCxLQUFLOzBCQUdMLEtBQUs7MkJBR0wsS0FBSztvQkFHTCxLQUFLO21CQUlMLEtBQUs7dUJBR0wsS0FBSzs0QkFHTCxLQUFLO29CQUdMLEtBQUs7b0NBR0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIElucHV0LCBPbkluaXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIE5HX1ZBTFVFX0FDQ0VTU09SLCBWYWxpZGF0b3JzfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQge3BhcnNlR2VybWFuQWRkcmVzc30gZnJvbSAnLi4vLi4vaGVscGVycy9wYXJzZXInO1xyXG5pbXBvcnQge0dlcm1hbkFkZHJlc3N9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMnO1xyXG5pbXBvcnQge0FwcGVhcmFuY2V9IGZyb20gJy4uL21hdC1nb29nbGUtbWFwcy1hdXRvY29tcGxldGUuY29tcG9uZW50JztcclxuaW1wb3J0IHtJbnB1dEFuaW1hdGlvbnN9IGZyb20gJy4uLy4uL2FuaW1hdGlvbnMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdtYXQtc2VhcmNoLWdvb2dsZS1tYXBzLWF1dG9jb21wbGV0ZScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL21hdC1zZWFyY2gtZ29vZ2xlLW1hcHMtYXV0b2NvbXBsZXRlLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9tYXQtc2VhcmNoLWdvb2dsZS1tYXBzLWF1dG9jb21wbGV0ZS5jb21wb25lbnQuc2NzcyddLFxyXG4gIGFuaW1hdGlvbnM6IElucHV0QW5pbWF0aW9ucyxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHtcclxuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1hdFNlYXJjaEdvb2dsZU1hcHNBdXRvY29tcGxldGVDb21wb25lbnQpLFxyXG4gICAgICBtdWx0aTogdHJ1ZVxyXG4gICAgfVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdFNlYXJjaEdvb2dsZU1hcHNBdXRvY29tcGxldGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcclxuXHJcbiAgQElucHV0KClcclxuICBhcHBlYXJhbmNlOiBzdHJpbmcgfCBBcHBlYXJhbmNlID0gQXBwZWFyYW5jZS5TVEFOREFSRDtcclxuXHJcbiAgQElucHV0KClcclxuICBzZWFyY2hBZGRyZXNzTGFiZWwgPSAnU2VhcmNoIEFkZHJlc3MnO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHN0cmVldE5hbWVMYWJlbCA9ICdTdHJlZXQnO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHN0cmVldE51bWJlckxhYmVsID0gJ05yLic7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgcG9zdGFsQ29kZUxhYmVsID0gJ1BMWic7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgbG9jYWxpdHlMYWJlbCA9ICdMb2NhbGl0eSc7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgdmljaW5pdHlMYWJlbCA9ICdWaWNpbml0eSc7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc2hvd1ZpY2luaXR5OiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGNvdW50cnk6IHN0cmluZyB8IHN0cmluZ1tdO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHBsYWNlSWRPbmx5PzogYm9vbGVhbjtcclxuXHJcbiAgQElucHV0KClcclxuICBzdHJpY3RCb3VuZHM/OiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHR5cGVzPzogc3RyaW5nW107XHJcbiAgLy8gdHlwZXM6IHN0cmluZ1tdID0gWydhZGRyZXNzJ107XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgdHlwZT86IHN0cmluZztcclxuXHJcbiAgQElucHV0KClcclxuICByZWFkb25seTogYm9vbGVhbjtcclxuXHJcbiAgQElucHV0KClcclxuICBkaXNhYmxlU2VhcmNoOiBib29sZWFuO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHZhbHVlOiBHZXJtYW5BZGRyZXNzO1xyXG5cclxuICBAT3V0cHV0KClcclxuICBvbkdlcm1hbkFkZHJlc3NNYXBwZWQ6IEV2ZW50RW1pdHRlcjxHZXJtYW5BZGRyZXNzPiA9IG5ldyBFdmVudEVtaXR0ZXI8R2VybWFuQWRkcmVzcz4oKTtcclxuXHJcbiAgZ2VybWFuQWRkcmVzczogR2VybWFuQWRkcmVzcztcclxuICBhZGRyZXNzRm9ybUdyb3VwOiBGb3JtR3JvdXA7XHJcblxyXG4gIGZpcnN0SW5pdCA9IHRydWU7XHJcblxyXG4gIHByb3BhZ2F0ZUNoYW5nZSA9IChfOiBhbnkpID0+IHtcclxuICB9O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZvcm1CdWlsZGVyOiBGb3JtQnVpbGRlcikge1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmNyZWF0ZUFkZHJlc3NGb3JtR3JvdXAoKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUFkZHJlc3NGb3JtR3JvdXAoKTogdm9pZCB7XHJcbiAgICB0aGlzLmFkZHJlc3NGb3JtR3JvdXAgPSB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcclxuICAgICAgc3RyZWV0TmFtZTogW3RoaXMudmFsdWUgJiYgdGhpcy52YWx1ZS5zdHJlZXROYW1lID8gdGhpcy52YWx1ZS5zdHJlZXROYW1lIDogbnVsbCwgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXHJcbiAgICAgIHN0cmVldE51bWJlcjogW3RoaXMudmFsdWUgJiYgdGhpcy52YWx1ZS5zdHJlZXROdW1iZXIgPyB0aGlzLnZhbHVlLnN0cmVldE51bWJlciA6IG51bGwsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxyXG4gICAgICBwb3N0YWxDb2RlOiBbdGhpcy52YWx1ZSAmJiB0aGlzLnZhbHVlLnBvc3RhbENvZGUgPyB0aGlzLnZhbHVlLnBvc3RhbENvZGUgOiBudWxsLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcclxuICAgICAgdmljaW5pdHk6IFt0aGlzLnZhbHVlICYmIHRoaXMudmFsdWUudmljaW5pdHkgPyB0aGlzLnZhbHVlLnZpY2luaXR5IDogbnVsbF0sXHJcbiAgICAgIGxvY2FsaXR5OiB0aGlzLmZvcm1CdWlsZGVyLmdyb3VwKHtcclxuICAgICAgICBsb25nOiBbdGhpcy52YWx1ZSAmJiB0aGlzLnZhbHVlLmxvY2FsaXR5ICYmIHRoaXMudmFsdWUubG9jYWxpdHkubG9uZyA/IHRoaXMudmFsdWUubG9jYWxpdHkubG9uZyA6IG51bGwsIFZhbGlkYXRvcnMucmVxdWlyZWRdLFxyXG4gICAgICB9KSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgc3luY0F1dG9Db21wbGV0ZSgkZXZlbnQ6IGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZVJlc3VsdCkge1xyXG4gICAgaWYgKHRoaXMuZ2VybWFuQWRkcmVzcykge1xyXG4gICAgICB0aGlzLmFkZHJlc3NGb3JtR3JvdXAucmVzZXQoKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGdlcm1hbkFkZHJlc3M6IEdlcm1hbkFkZHJlc3MgPSBwYXJzZUdlcm1hbkFkZHJlc3MoJGV2ZW50KTtcclxuICAgIHRoaXMuZ2VybWFuQWRkcmVzcyA9IGdlcm1hbkFkZHJlc3M7XHJcbiAgICBpZiAoZ2VybWFuQWRkcmVzcy52aWNpbml0eSkge1xyXG4gICAgICB0aGlzLmFkZHJlc3NGb3JtR3JvdXAuZ2V0KCd2aWNpbml0eScpLnBhdGNoVmFsdWUoZ2VybWFuQWRkcmVzcy52aWNpbml0eSk7XHJcbiAgICB9XHJcbiAgICBpZiAoZ2VybWFuQWRkcmVzcy5zdHJlZXROYW1lKSB7XHJcbiAgICAgIHRoaXMuYWRkcmVzc0Zvcm1Hcm91cC5nZXQoJ3N0cmVldE5hbWUnKS5wYXRjaFZhbHVlKGdlcm1hbkFkZHJlc3Muc3RyZWV0TmFtZSk7XHJcbiAgICB9XHJcbiAgICBpZiAoZ2VybWFuQWRkcmVzcy5zdHJlZXROdW1iZXIpIHtcclxuICAgICAgdGhpcy5hZGRyZXNzRm9ybUdyb3VwLmdldCgnc3RyZWV0TnVtYmVyJykucGF0Y2hWYWx1ZShnZXJtYW5BZGRyZXNzLnN0cmVldE51bWJlci50b1N0cmluZygpKTtcclxuICAgIH1cclxuICAgIGlmIChnZXJtYW5BZGRyZXNzLnBvc3RhbENvZGUpIHtcclxuICAgICAgdGhpcy5hZGRyZXNzRm9ybUdyb3VwLmdldCgncG9zdGFsQ29kZScpLnBhdGNoVmFsdWUoZ2VybWFuQWRkcmVzcy5wb3N0YWxDb2RlKTtcclxuICAgIH1cclxuICAgIGlmIChnZXJtYW5BZGRyZXNzLmxvY2FsaXR5ICYmIGdlcm1hbkFkZHJlc3MubG9jYWxpdHkubG9uZykge1xyXG4gICAgICB0aGlzLmFkZHJlc3NGb3JtR3JvdXAuZ2V0KCdsb2NhbGl0eS5sb25nJykucGF0Y2hWYWx1ZShnZXJtYW5BZGRyZXNzLmxvY2FsaXR5LmxvbmcpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudmFsdWUgPSBnZXJtYW5BZGRyZXNzO1xyXG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UodGhpcy52YWx1ZSk7XHJcbiAgICB0aGlzLm9uR2VybWFuQWRkcmVzc01hcHBlZC5lbWl0KGdlcm1hbkFkZHJlc3MpO1xyXG4gIH1cclxuXHJcbiAgd3JpdGVWYWx1ZShvYmo6IGFueSk6IHZvaWQge1xyXG4gICAgbGV0IHNob3VsZFJlY3JlYXRlRkcgPSBmYWxzZTtcclxuICAgIGlmIChvYmopIHtcclxuICAgICAgaWYgKCF0aGlzLnZhbHVlICYmIHRoaXMuZmlyc3RJbml0KSB7XHJcbiAgICAgICAgc2hvdWxkUmVjcmVhdGVGRyA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy52YWx1ZSA9IG9iajtcclxuICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UodGhpcy52YWx1ZSk7XHJcbiAgICAgIGlmIChzaG91bGRSZWNyZWF0ZUZHKSB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVBZGRyZXNzRm9ybUdyb3VwKCk7XHJcbiAgICAgICAgdGhpcy5maXJzdEluaXQgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xyXG4gIH1cclxuXHJcbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=