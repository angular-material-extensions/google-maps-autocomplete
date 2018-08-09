import {Directive, ElementRef, EventEmitter, Input, NgZone, OnInit, Output} from '@angular/core';
import {MapsAPILoader} from '@agm/core';
import {Location} from '../interfaces/location.interface';
import PlaceResult = google.maps.places.PlaceResult;
import AutocompleteOptions = google.maps.places.AutocompleteOptions;

@Directive({
  selector: '[matGoogleMapsAutocomplete]',
  exportAs: '[matGoogleMapsAutocomplete]',
})
export class MatGoogleMapsAutocompleteDirective implements OnInit {

  @Input()
  address: PlaceResult | string;

  @Input()
  country: string | string[];

  @Input()
  placeIdOnly?: boolean;

  @Input()
  strictBounds?: boolean;

  @Input()
  types?: string[];

  @Input()
  type?: string;

  @Input()
  autoCompleteOptions: AutocompleteOptions = {};

  @Output()
  onChange: EventEmitter<PlaceResult | string | null> = new EventEmitter<PlaceResult | string | null>();

  @Output()
  onAutocompleteSelected: EventEmitter<PlaceResult> = new EventEmitter<PlaceResult>();

  @Output()
  onLocationSelected: EventEmitter<Location> = new EventEmitter<Location>();

  constructor(public elemRef: ElementRef,
              public mapsAPILoader: MapsAPILoader,
              private _ngZone: NgZone) {
  }

  ngOnInit(): void {
    const options = {
      // types: ['address'],
      componentRestrictions: {country: this.country},
      placeIdOnly: this.placeIdOnly,
      strictBounds: this.strictBounds,
      types: this.types,
      type: this.type
    };

    this.autoCompleteOptions = Object.assign(this.autoCompleteOptions, options);
    this.initGoogleMapsAutocomplete();

  }

  public initGoogleMapsAutocomplete() {
    this.mapsAPILoader
      .load()
      .then(() => {
        const autocomplete = new google.maps.places.Autocomplete(this.elemRef.nativeElement, this.autoCompleteOptions);
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
            this.onAutocompleteSelected.emit(place);
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

}
