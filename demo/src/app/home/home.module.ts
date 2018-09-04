import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AgmCoreModule} from '@agm/core';
import {HighlightModule} from 'ngx-highlightjs';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatTabsModule,
} from '@angular/material';
import {MatJumbotronModule} from '@angular-material-extensions/jumbotron';
import {ConfigComponent} from './config/config.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatGoogleMapsAutocompleteModule,
    HighlightModule.forRoot({theme: 'vs2015'}),
    HomeRoutingModule,
    MatJumbotronModule,
    AgmCoreModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatExpansionModule,
    MatInputModule,
    MatRadioModule,
    MatButtonToggleModule
  ],
  declarations: [HomeComponent, ConfigComponent],
})
export class HomeModule {
}
