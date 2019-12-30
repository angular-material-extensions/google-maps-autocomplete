import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule, MatInputModule} from '@angular/material';
import {MatGoogleMapsAutocompleteDirective} from './directives/mat-google-maps-autocomplete.directive';
import {MatValidateAddressDirective} from './directives/address-validator/mat-address-validator.directive';
import {CommonModule} from '@angular/common';
import {MatGoogleMapsAutocompleteComponent, MatSearchGoogleMapsAutocompleteComponent} from './component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  imports:
    [
      CommonModule,
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      FlexLayoutModule,
      MatInputModule,
      MatIconModule
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
})
export class MatGoogleMapsAutocompleteModule {
}
