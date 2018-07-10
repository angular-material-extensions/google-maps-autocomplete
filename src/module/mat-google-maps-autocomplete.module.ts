import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';

import {MatGoogleMapsAutocompleteComponent} from './component/mat-google-maps-autocomplete.component';
import {MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatValidateAddressDirective} from './directives/address-validator/mat-address-validator.directive';

// Export module's public API
export {MatGoogleMapsAutocompleteComponent, Location, Appearance} from './component/mat-google-maps-autocomplete.component';

// export {MatValidateAddressDirective} from './directives/address-validator/mat-address-validator.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  exports: [MatGoogleMapsAutocompleteComponent],
  declarations: [MatGoogleMapsAutocompleteComponent, MatValidateAddressDirective]
})
export class MatGoogleMapsAutocompleteModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MatGoogleMapsAutocompleteModule,
      providers: []
    };
  }
}
