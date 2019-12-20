import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material';
import {MatGoogleMapsAutocompleteDirective} from './directives/mat-google-maps-autocomplete.directive';
import {MatGoogleMapsAutocompleteComponent} from './component/mat-google-maps-autocomplete.component';
import {MatValidateAddressDirective} from './directives/address-validator/mat-address-validator.directive';


@NgModule({
  imports:
    [
      FormsModule,
      ReactiveFormsModule,
      MatInputModule
    ],
  exports: [
    MatGoogleMapsAutocompleteComponent,
    MatGoogleMapsAutocompleteDirective,
    MatValidateAddressDirective
  ],
  declarations: [
    MatGoogleMapsAutocompleteComponent,
    MatGoogleMapsAutocompleteDirective,
    MatValidateAddressDirective
  ]
})
export class GoogleMapsAutocompleteModule {
}
