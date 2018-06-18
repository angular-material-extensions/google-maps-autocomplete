import {Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatValidateAddressDirective} from '../directives/address-validator/mat-address-validator.directive';
import {MapsAPILoader} from '@agm/core';
import PlaceResult = google.maps.places.PlaceResult;

export interface Location {
  latitude: number,
  longitude: number;
}

@Component({
  selector: 'mat-google-maps-autocomplete',
  templateUrl: './mat-google-maps-autocomplete.component.html',
  styleUrls: ['./mat-google-maps-autocomplete.component.scss']
})
export class MatGoogleMapsAutocompleteComponent implements OnInit {

  @ViewChild('search')
  public searchElementRef: ElementRef;

  @Input()
  address: PlaceResult | string;

  @Input()
  country = 'de';

  @Input()
  types: string[] = ['address'];

  @Output()
  onChange: EventEmitter<PlaceResult | string | null> = new EventEmitter<PlaceResult | string | null>();

  @Output()
  onAddressSelected: EventEmitter<PlaceResult> = new EventEmitter<PlaceResult>();

  @Output()
  onLocationSelected: EventEmitter<Location> = new EventEmitter<Location>();

  private onNewPlaceResult: EventEmitter<any> = new EventEmitter();
  private addressValidator: MatValidateAddressDirective = new MatValidateAddressDirective();

  public addressSearchControl: FormControl = new FormControl({value: null}, Validators.compose([
    Validators.required,
    this.addressValidator.validate()])
  );

  constructor(private _mapsAPILoader: MapsAPILoader,
              private _ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.addressValidator.subscribe(this.onNewPlaceResult);

    const options = {
      types: ['address'],
      componentRestrictions: {country: 'de'}
    };

    this._mapsAPILoader
      .load()
      .then(() => {
        /* Instantiate a placesService */
        // if (this.immoAd.address.place_id) {
        //   const placesService = new google.maps.places.PlacesService(this.searchElementRef.nativeElement);
        //   placesService.getDetails({
        //     placeId: this.immoAd.address.place_id
        //   }, (placeResult: PlaceResult, status) => {
        //     console.log('status: ', status);
        //     if (status === google.maps.places.PlacesServiceStatus.OK) {
        //       console.log('place result: ', placeResult);
        //       this.address = placeResult;
        //
        //       if (placeResult.place_id) {
        //         this.updateAddress(placeResult)
        //       }
        //     }
        //   });
        // }
        const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, options);
        autocomplete.addListener('place_changed', () => {
          this._ngZone.run(() => {
            // get the place result
            const place: PlaceResult = autocomplete.getPlace();

            if (!place.place_id || place.geometry === undefined || place.geometry === null) {
              // place result is not valid
              return;
            } else {
              // show dialog to select a address from the input
              // emit failed event
            }
            this.address = place.formatted_address;
            this.onAddressSelected.emit(place);
            this.onLocationSelected.emit(
              {
                latitude: place.geometry.location.lat(),
                longitude: place.geometry.location.lng()
              })
          });
        });
      })
      .catch((err) => console.log(err));
  }

  public onQuery(event: any) {
    console.log('onChange()', event);
    this.onChange.emit(this.address);
  }

  private resetAddress() {
    this.address = null;
    this.addressSearchControl.updateValueAndValidity();
  }

}
