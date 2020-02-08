import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatGoogleMapsAutocompleteDirective} from './directives/mat-google-maps-autocomplete.directive';
import {MatValidateAddressDirective} from './directives/address-validator/mat-address-validator.directive';
import {MatGoogleMapsAutocompleteComponent} from './component/mat-google-maps-autocomplete.component';
// tslint:disable-next-line:max-line-length
import {MatSearchGoogleMapsAutocompleteComponent} from './component/mat-search-google-maps-autocomplete/mat-search-google-maps-autocomplete.component';


@NgModule({
  imports:
    [
      CommonModule,
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
