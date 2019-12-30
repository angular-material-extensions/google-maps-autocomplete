import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GermanAddress} from '../../interfaces';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {parseGermanAddress} from '../../helpers/parser';
import {Appearance} from '../mat-google-maps-autocomplete.component';
import {InputAnimations} from '../../animations';

@Component({
  selector: 'mat-search-google-maps-autocomplete',
  templateUrl: './mat-search-google-maps-autocomplete.component.html',
  styleUrls: ['./mat-search-google-maps-autocomplete.component.scss'],
  animations: InputAnimations
})
export class MatSearchGoogleMapsAutocompleteComponent implements OnInit {

  @Input()
  appearance: string | Appearance = Appearance.STANDARD;

  @Input()
  searchAddressLabel = 'Search Address';

  @Input()
  streetNameLabel = 'Street';

  @Input()
  streetNumberLabel = 'Nr.';

  @Input()
  postalCodeLabel = 'PLZ';

  @Input()
  localityLabel = 'Locality';

  @Input()
  errorText: string;


  @Output()
  onGermanAddressMapped: EventEmitter<GermanAddress> = new EventEmitter<GermanAddress>();

  germanAddress: GermanAddress;
  addressFormGroup: FormGroup;


  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.addressFormGroup = this.createAddressFormGroup();
  }

  createAddressFormGroup(): FormGroup {
    return this.formBuilder.group({
      streetName: [null, Validators.required],
      streetNumber: [null, Validators.required],
      postalCode: [null, Validators.required],
      locality: this.formBuilder.group({
        long: [null, Validators.required],
      }),
    });
  }

  syncAutoComplete($event: google.maps.places.PlaceResult) {
    if (this.germanAddress) {
      this.addressFormGroup.reset();
    }
    const germanAddress: GermanAddress = parseGermanAddress($event);
    this.germanAddress = germanAddress;
    console.log('syncAutoComplete', $event, 'after parsing', germanAddress);
    if (germanAddress.streetName) {
      this.addressFormGroup.get('streetName').patchValue(germanAddress.streetName);
    }
    if (germanAddress.streetNumber) {
      this.addressFormGroup.get('streetNumber').patchValue(germanAddress.streetNumber);
    }
    if (germanAddress.postalCode) {
      this.addressFormGroup.get('postalCode').patchValue(germanAddress.postalCode);
    }
    if (germanAddress.locality && germanAddress.locality.long) {
      this.addressFormGroup.get('locality.long').patchValue(germanAddress.locality.long);
    }

    this.onGermanAddressMapped.emit(germanAddress);

    console.log('address', this.addressFormGroup.getRawValue());
  }

}
