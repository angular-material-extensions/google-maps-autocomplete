```typescript
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectCountryModule} from '@angular-material-extensions/select-country';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatSelectCountryModule,  // <-- import the library 
    // (will be automatically imported if you use angular schematics)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}


```
