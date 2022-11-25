import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AgmCoreModule} from '@agm/core';
import {HttpClientModule} from '@angular/common/http';

import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ConfigComponent} from '../config/config.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {environment} from '../environments/environment';
import {Angulartics2Module} from 'angulartics2';
import {MarkdownModule} from 'ngx-markdown';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';

const googleMapsParams = {
  apiKey: environment.GOOGLE_MAPS_API_KEY,
  libraries: ['places'],
  language: 'en',
  // region: 'DE'
};

@NgModule({
  declarations: [
    AppComponent,
    ConfigComponent
  ],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    BrowserAnimationsModule,
    RouterModule.forRoot([], {
      initialNavigation: 'enabledBlocking',
      // relativeLinkResolution: 'legacy'
    }),
    Angulartics2Module.forRoot(),
    MarkdownModule.forRoot(),
    AgmCoreModule.forRoot(googleMapsParams),
    MatGoogleMapsAutocompleteModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatCardModule,
    MatInputModule,
    MatExpansionModule,
    MatTabsModule,
    MatRadioModule
  ],
  providers: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
