import {Directive, EventEmitter, forwardRef} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from '@angular/forms';
import PlaceResult = google.maps.places.PlaceResult;

// https://github.com/angular/angular/blob/master/packages/forms/src/directives/validators.ts

@Directive({
  selector: '[mat-address-validate][formControlName],[MatValidateAddress][formControl],[MatValidateAddress][ngModel]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: forwardRef(() => MatValidateAddressDirective), multi: true}
  ]
})
export class MatValidateAddressDirective implements Validator {

  public subscription: any;

  private _address: PlaceResult;


  constructor() {
  }

  public validate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | any => {
      return this.address ? null : {
        validateAddress: {
          valid: false
        }
      };
    }
  }

  public subscribe(eventEmitter: EventEmitter<any>) {
    this.subscription = eventEmitter.subscribe((address: PlaceResult) => {
      this.address = address;
    });
  }

  public unsubscribe() {
    this.subscription.unsubscribe();
  }

  get address() {
    return this._address;
  }

  set address(value) {
    this._address = value;
  }
}
