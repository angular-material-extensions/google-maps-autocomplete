import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {TransferHttpCacheModule} from '@nguniversal/common';

import {AppRoutingModule} from './app-routing.module';
import {AppSharedModule} from './shared/shared.module';
import {HomeModule} from './home/home.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {environment} from '../environments/environment';
import {AgmCoreModule} from '@agm/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import {} from '@types/googlemaps';

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
    // Add .withServerTransition() to support Universal rendering.
    // The application ID can be any identifier which is unique on
    // the page.
    BrowserModule.withServerTransition({appId: '@angular-material-extensions/google-maps-autocomplete-demo-id'}),
    AgmCoreModule.forRoot(googleMapsParams),
    BrowserAnimationsModule,
    FlexLayoutModule,
    TransferHttpCacheModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AppSharedModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
