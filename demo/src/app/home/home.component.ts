import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete';
import sdk from '@stackblitz/sdk';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {

  html = `<div fxFlex>
              <agm-map [latitude]="latitude" [longitude]="longitude" [scrollwheel]="false" [zoom]="zoom">
                <agm-marker [latitude]="latitude" [longitude]="longitude"></agm-marker>
              </agm-map>
            </div>

            <div fxFlex fxFlexAlign="center"
                 class="autocomplete-container"
                 [ngStyle.xs]="{'min-width.%': 100}"
                 [ngStyle.sm]="{'width.%': 70}">
              <mat-google-maps-autocomplete [appearance]="appearance.OUTLINE"
                                              (onAutocompleteSelected)="onAutocompleteSelected($event)"
                                              (onLocationSelected)="onLocationSelected($event)">
              </mat-google-maps-autocomplete>
            </div>`;

  htmlAsDirective = `<div fxLayout="column" >
                        <mat-form-field class="full-width" [appearance]="config.appearance">
                          <mat-label>Address << using the directive >></mat-label>
                          <input matInput
                           matValidateAddress
                           matGoogleMapsAutocomplete
                           #matGoogleMapsAutocomplete="matGoogleMapsAutocomplete"
                           placeholder="{{config.placeholderText}}"
                           class="form-control"
                           [country]="config.country"
                           (onAutocompleteSelected)="onAutocompleteSelected($event)"
                           (onLocationSelected)="onLocationSelected($event)"
                           required>
                          <mat-error *ngIf="matGoogleMapsAutocomplete.addressSearchControl.hasError('required')">
                            {{config.requiredErrorText}}
                           </mat-error>
                           <mat-error *ngIf="matGoogleMapsAutocomplete.addressSearchControl.hasError('validateAddress')">
                             {{config.invalidErrorText}}
                            </mat-error>
                       </mat-form-field>

                      </div>`;

  ts = `import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete';
import sdk from '@stackblitz/sdk';
import {} from '@types/googlemaps';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {

  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public selectedAddress: PlaceResult;

  constructor() {
  }

  ngOnInit() {
    this.titleService.setTitle('Home | @angular-material-extensions/google-maps-autocomplete');

    this.zoom = 10;
    this.latitude = 52.520008;
    this.longitude = 13.404954;

    this.setCurrentPosition();

  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  onAddressSelected(result: PlaceResult) {
    console.log('onAddressSelected: ', result);
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }
}`;

  scss = `agm-map {
  height: 400px;
}

.autocomplete-container {
  padding: 1rem 0 1rem 0;
  width: 50%;
}`;

  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public selectedAddress: PlaceResult;

  public showAsDirective = false;
  public showAsComponent = true;

  constructor(private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('Home | @angular-material-extensions/google-maps-autocomplete');

    this.zoom = 10;
    this.latitude = 52.520008;
    this.longitude = 13.404954;

    this.setCurrentPosition();

  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAddressSelected: ', result);
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }

  editOnStackBlitz() {
    sdk.openGithubProject('angular-material-extensions/google-maps-autocomplete/tree/master/demo');
  }

  flip() {
    this.showAsDirective = !this.showAsDirective;
    this.showAsComponent = !this.showAsDirective
  }
}
