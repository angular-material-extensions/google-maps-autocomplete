import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AgmCoreModule} from '@agm/core';
import {environment} from '../../environments/environment';

const googleMapsParams = {
  apiKey: environment.GOOGLE_MAPS_API_KEY,
  libraries: ['places'],
  language: 'de',
  // region: 'DE'
};

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatGoogleMapsAutocompleteModule.forRoot(),
    HomeRoutingModule,
    AgmCoreModule
  ],
  declarations: [HomeComponent],
})
export class HomeModule {
}
