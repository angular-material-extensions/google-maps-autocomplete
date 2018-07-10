import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AgmCoreModule} from '@agm/core';
import {HighlightModule} from 'ngx-highlightjs';
import {MatButtonModule, MatCardModule, MatIconModule, MatTabsModule} from '@angular/material';
import {MatJumbotronModule} from '@angular-material-extensions/jumbotron';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatGoogleMapsAutocompleteModule,
    HighlightModule.forRoot({theme: 'vs2015'}),
    HomeRoutingModule,
    MatJumbotronModule,
    AgmCoreModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule
  ],
  declarations: [HomeComponent],
})
export class HomeModule {
}
