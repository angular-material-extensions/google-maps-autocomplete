import { Appearance } from '@angular-material-extensions/google-maps-autocomplete';
import { Component } from '@angular/core';

@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.scss']
})
export class ConfigComponent {
    addressLabelText = 'Address';

    placeholderText = 'Please enter the address';

    requiredErrorText = 'The address is required';

    invalidErrorText = 'The address is not valid';

    country;

    appearance = Appearance.OUTLINE;
    appearanceOptions = Object.keys(Appearance);
}
