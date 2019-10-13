import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { MatGoogleMapsAutocompleteComponent } from './component/mat-google-maps-autocomplete.component';
import { MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatValidateAddressDirective } from './directives/address-validator/mat-address-validator.directive';
import { MatGoogleMapsAutocompleteDirective } from './directives/mat-google-maps-autocomplete.directive';

// Export module's public API
export { MatGoogleMapsAutocompleteComponent, Appearance } from './component/mat-google-maps-autocomplete.component';
export { MatValidateAddressDirective } from './directives/address-validator/mat-address-validator.directive';
export { MatGoogleMapsAutocompleteDirective } from './directives/mat-google-maps-autocomplete.directive';
export { Location } from './interfaces/location.interface';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule],
    exports: [MatGoogleMapsAutocompleteComponent, MatGoogleMapsAutocompleteDirective, MatValidateAddressDirective],
    declarations: [MatGoogleMapsAutocompleteComponent, MatGoogleMapsAutocompleteDirective, MatValidateAddressDirective]
})
export class MatGoogleMapsAutocompleteModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MatGoogleMapsAutocompleteModule,
            providers: []
        };
    }
}
