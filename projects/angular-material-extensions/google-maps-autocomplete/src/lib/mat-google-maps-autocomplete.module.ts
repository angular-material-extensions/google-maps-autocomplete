import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatGoogleMapsAutocompleteDirective} from './directives/mat-google-maps-autocomplete.directive';
import {MatValidateAddressDirective} from './directives/address-validator/mat-address-validator.directive';
// tslint:disable-next-line:max-line-length
import {MatGoogleMapsAutocompleteComponent, MatSearchGoogleMapsAutocompleteComponent} from './component';
import {MatInputModule} from '@angular/material/input';


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
  ],
  providers: [
    // {
    //   provide: NG_VALUE_ACCESSOR,
    //   useExisting: forwardRef(() => MatGoogleMapsAutocompleteDirective),
    //   multi: true
    // }
  ]
})
export class MatGoogleMapsAutocompleteModule {
}
