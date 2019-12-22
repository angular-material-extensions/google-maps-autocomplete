import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from '../../demo/src/environments/environment';
import {AgmCoreModule} from '@agm/core';
import {HttpClientModule} from '@angular/common/http';

import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';

const googleMapsParams = {
  apiKey: environment.GOOGLE_MAPS_API_KEY,
  libraries: ['places'],
  language: 'en',
  // region: 'DE'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    BrowserAnimationsModule,
    AgmCoreModule.forRoot(googleMapsParams),
    MatGoogleMapsAutocompleteModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
