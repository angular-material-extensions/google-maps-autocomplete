<p align="center">
  <img alt="angular-material-extensions's logo"
   height="256px" width="256px" style="text-align: center;" 
   src="https://cdn.rawgit.com/angular-material-extensions/google-maps-autocomplete/master/assets/angular-material-extensions-logo.svg">
</p>

# @angular-material-extensions/google-maps-autocomplete - Autocomplete input component for google-maps built with angular material design

[![npm version](https://badge.fury.io/js/%40angular-material-extensions%2Fgoogle-maps-autocomplete.svg)](https://badge.fury.io/js/%40angular-material-extensions%2Fgoogle-maps-autocomplete)
[![npm demo](https://img.shields.io/badge/demo-online-ed1c46.svg)](https://angular-material-extensions.github.io/google-maps-autocomplete)
[![Join the chat at https://gitter.im/angular-material-extensions/Lobby](https://badges.gitter.im/angular-material-extensions/Lobby.svg)](https://gitter.im/angular-material-extensions/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Coverage Status](https://coveralls.io/repos/github/angular-material-extensions/google-maps-autocomplete/badge.svg?branch=master)](https://coveralls.io/github/angular-material-extensions/google-maps-autocomplete?branch=master)
[![Build Status](https://travis-ci.org/angular-material-extensions/google-maps-autocomplete.svg?branch=master)](https://travis-ci.org/angular-material-extensions/google-maps-autocomplete)
[![CircleCI branch](https://img.shields.io/circleci/project/github/angular-material-extensions/google-maps-autocomplete/master.svg?label=circleci)](https://circleci.com/gh/angular-material-extensions/google-maps-autocomplete)
[![dependency Status](https://david-dm.org/angular-material-extensions/google-maps-autocomplete/status.svg)](https://david-dm.org/angular-material-extensions/google-maps-autocomplete)
[![devDependency Status](https://david-dm.org/angular-material-extensions/google-maps-autocomplete/dev-status.svg?branch=master)](https://david-dm.org/angular-material-extensions/google-maps-autocomplete#info=devDependencies)
[![Greenkeeper Badge](https://badges.greenkeeper.io/angular-material-extensions/google-maps-autocomplete.svg)](https://greenkeeper.io/)
[![license](https://img.shields.io/github/license/angular-material-extensions/google-maps-autocomplete.svg?style=flat-square)](https://github.com/angular-material-extensions/google-maps-autocomplete/blob/master/LICENSE)
[![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/gdi2290/awesome-angular)


<p align="center">
  <img alt="@angular-material-extensions/google-maps-autocomplete" style="text-align: center;"
   src="https://raw.githubusercontent.com/angular-material-extensions/google-maps-autocomplete/HEAD/assets/demo1.gif">
</p>

<p align="center">
  <img alt="@angular-material-extensions/google-maps-autocomplete" style="text-align: center;"
   src="https://raw.githubusercontent.com/angular-material-extensions/google-maps-autocomplete/HEAD/assets/v3.0.0/search.gif">
</p>

Stating with v1.3.0, you can now use this library without material2's dependency! To
enable this goolgle maps autocomplate api as feature, you can just add `matGoogleMapsAutocomplete` 
to any html input element! 

## Built by and for developers :heart:
Do you have any question or suggestion ? Please do not hesitate to contact us!
Alternatively, provide a PR | open an appropriate issue [here](https://github.com/angular-material-extensions/google-maps-auto/issues)

If did you like this project, support [angular-material-extensions](https://github.com/angular-material-extensions) 
by starring :star: and sharing it :loudspeaker:

## Table of Contents
- [Demo](#demo)
- [Dependencies](#dependencies)
- [Peer Dependencies](#peerDependencies)
- [Additional Requirements - material (Include a theme)](#additional-requirements-material-theme)
- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)
- [Run Demo App Locally](#run-demo-app-locally)
- [Development](#development)
- [Other Angular Libraries](#other-angular-libraries)
- [Support](#support)
- [License](#license)

<a name="demo"/>

## [Demo](https://angular-material-extensions.github.io/google-maps-autocomplete)

View all the directives and components in action at [https://angular-material-extensions.github.io/google-maps-autocomplete](https://angular-material-extensions.github.io/google-maps-autocomplete)

<a name="dependencies"/>

## Dependencies
* [Angular](https://angular.io) (*requires* Angular 2 or higher | we are using already V11 ;)

for the directive as standalone you just need to install the agm core module
- [agm - angular google maps v3.0.0-beta.0](https://www.npmjs.com/package/@agm/core)

```bash
npm i @agm/core 
```

optional

```bash
npm i -D @types/googlemaps 
```

<a name="installation"/>

##  [Installation](https://angular-material-extensions.github.io/google-maps-autocomplete/getting-started)

## 1. Install via *ng add*. (Recommended)

If Angular Material Design is not setup, just run `ng add @angular/material` [learn more](https://material.angular.io/guide/getting-started)

Now add the library via the `angular schematics` and everything will be setup for you
```shell
ng add @angular-material-extensions/google-maps-autocomplete
```


## 2. Install via *npm*. (Alternative) 

Now install `@angular-material-extensions/google-maps-autocomplete` via:
```shell
npm install --save @angular-material-extensions/google-maps-autocomplete
```

<a name="peerDependencies"/>

### Requirements (peer dependencies):

for the ui input component, please consider installing the following packages
- [angular animations v11.x](https://www.npmjs.com/package/@angular/animations)
- [angular forms v11.x](https://www.npmjs.com/package/@angular/forms)
- [angular material v11.x](https://www.npmjs.com/package/@angular/material)
- [angular cdk v11.x](https://www.npmjs.com/package/@angular/cdk)
- [agm - angular google maps v3.0.0-beta.0](https://www.npmjs.com/package/@agm/core)

```bash
npm i @angular/cdk @angular/material @angular/animations @angular/forms 
```

<a name="additional-requirements-material-theme"/>

### Additional requirements Theme (Material Design)
- [angular material theme](https://material.angular.io/guide/getting-started#step-4-include-a-theme)

----

##### SystemJS
>**Note**:If you are using `SystemJS`, you should adjust your configuration to point to the UMD bundle.
In your systemjs config file, `map` needs to tell the System loader where to look for `@angular-material-extensions/google-maps-autocomplete`:
```js
{
  '@angular-material-extensions/google-maps-autocomplete';: 'node_modules/@angular-material-extensions/google-maps-autocomplete/bundles/google-maps-autocomplete.umd.js',
}
```
---

Once installed you need to import the main module:
```js
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
```
The only remaining part is to list the imported module in your application module. The exact method will be slightly
different for the root (top-level) module for which you should end up with the code similar to (notice ` MatGoogleMapsAutocompleteModule.forRoot()`):
```js
import { AgmCoreModule } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';

@NgModule({
  declarations: [AppComponent, ...],
  imports: [
     // important !!!
     AgmCoreModule.forRoot({
          apiKey: 'YOUR_KEY',
          libraries: ['places']
        }),
     MatGoogleMapsAutocompleteModule, ...],  
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Other modules in your application can simply import ` MatGoogleMapsAutocompleteModule `:

```js
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';

@NgModule({
  declarations: [OtherComponent, ...],
  imports: [
     MatGoogleMapsAutocompleteModule, ...], 
})
export class OtherModule {
}
```

<a name="usage"/>

## [Usage](https://angular-material-extensions.github.io/google-maps-autocomplete/getting-started)

### As directive

add `matGoogleMapsAutocomplete` to your target html input element to enable the google maps autocomplete api as feature

```html
<mat-form-field>
  <mat-label>Address << using the directive >></mat-label>
  <input matInput
       matGoogleMapsAutocomplete
       [country]="de"
       (onAutocompleteSelected)="onAutocompleteSelected($event)"
       (onLocationSelected)="onLocationSelected($event)">
</mat-form-field>
```
### As components

#### or alternatively use `mat-google-maps-auto-complete`, the UI wrapper

add `mat-google-maps-auto-complete` element to your template

### `mat-google-maps-auto-complete` 

```html
<mat-google-maps-autocomplete [appearance]="appearance.OUTLINE"
                              (onAutocompleteSelected)="onAutocompleteSelected($event)"
                              (onLocationSelected)="onLocationSelected($event)">
      </mat-google-maps-autocomplete>
```

A customized `mat-google-maps-autocomplete` 

```html
<mat-google-maps-autocomplete  country="us"
                               type="address"
                               (onAutocompleteSelected)="onAutocompleteSelected($event)"
                               (onLocationSelected)="onLocationSelected($event)">
</mat-google-maps-autocomplete>
```

combine the result of the `mat-google-maps-autocomplete` with a google map instance via [@agm](https://angular-maps.com/api-docs/agm-core/)

```html
<div class="container" fxLayout="column" fxLayoutAlign="center">

    <div fxFlex>
      <agm-map [latitude]="latitude" [longitude]="longitude" [scrollwheel]="false" [zoom]="zoom">
        <agm-marker [latitude]="latitude" [longitude]="longitude"></agm-marker>
      </agm-map>
    </div>

    <div fxFlex fxFlexAlign="center"
         class="autocomplete-container"
         [ngStyle.xs]="{'min-width.%': 100}"
         [ngStyle.sm]="{'width.%': 70}">
      <mat-google-maps-autocomplete (onAutocompleteSelected)="onAutocompleteSelected($event)"
                                    (onLocationSelected)="onLocationSelected($event)"
                                    (onGermanAddressMapped)="onGermanAddressMapped($event)">
      </mat-google-maps-autocomplete>
    </div>

  </div>
```


in your component, the code will be similar to --> 

```typescript
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Location, Appearance, GermanAddress} from '@angular-material-extensions/google-maps-autocomplete';
import {} from '@types/googlemaps';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {

  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public selectedAddress: PlaceResult;

  constructor(private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('Home | @angular-material-extensions/google-maps-autocomplete');

    this.zoom = 10;
    this.latitude = 52.520008;
    this.longitude = 13.404954;

    this.setCurrentPosition();

  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }

 onGermanAddressMapped($event: GermanAddress) {
    console.log('onGermanAddressMapped', $event);
  }

}

```


#### Reactive Forms Example

```html
<form [formGroup]="addressFormGroup">
    <mat-search-google-maps-autocomplete formControlName="address">
    </mat-search-google-maps-autocomplete>
    
    // OR

    <mat-google-maps-autocomplete formControlName="address">
    </mat-google-maps-autocomplete>

</form>
```

```typescript

import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  addressFormGroup: FormGroup;

  ngOnInit(): void {
    this.addressFormGroup = new FormGroup({
      address: new FormControl(),
    });

    this.addressFormGroup.get('address').valueChanges.subscribe(value => console.log('value changed', value))
  }
}

```

<a name="api"/>

### API - for more info please visit the official documentation [Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/places-autocomplete?hl=en)

### `matGoogleMapsAutocomplete`
| option | bind  |  type  |   default    | description  |
|:-------------------|:--------:|:------:|:------------:|:-------------------------------------------------------------------------------------------------|    
| value               | `Input()`   |  PlaceResult ;      | - |  
| address             | `Input()`   |  PlaceResult | string;      | - |  
| country             | `Input()`   | string | string[];          | - | can be used to restrict results to specific groups. Currently, you can use componentRestrictions to filter by up to 5 countries. Countries must be passed as as a two-character, ISO 3166-1 Alpha-2 compatible country code. Multiple countries must be passed as a list of country codes.  
| placeIdOnly         | `Input()`   | boolean                     | - | can be used to instruct the Autocomplete widget to retrieve only Place IDs. On calling getPlace() on the Autocomplete object, the PlaceResult made available will only have the place id, types and name properties set. You can use the returned place ID with calls to the Places, Geocoding, Directions or Distance Matrix services.
| strictBounds        | `Input()`   | boolean                     | - | is a boolean specifying whether the API must return only those places that are strictly within the region defined by the given bounds. The API does not return results outside this region even if they match the user input.
| types               | `Input()`   | string[]                    | - |  An array of types specifies an explicit type or a type collection, as listed in the supported types below. If nothing is specified, all types are returned. In general only a single type is allowed. The exception is that you can safely mix the geocode and establishment types, but note that this will have the same effect as specifying no types. Supported types are listed below. |
| type                | `Input()`   | string                      | - |  
| autoCompleteOptions | `Input()`   | AutocompleteOptions         | - |  all above inputs in one object! The passed data to this object will be merged with the input if they exists
| onChange            | `Output()`  | PlaceResult | string | null | - |  event when the input form value changed
| onAutocompleteSelected   | `Output()`  | PlaceResult            | - |  the event will be fired when a place has been selected via the google maps autocomplete component
| onGermanAddressMapped  | `Output()`  | GermanAddress               | - |  the event will be fired when a place has been selected and mapped to the german address interface |
| onLocationSelected  | `Output()`  | Location                    | - |  the event will be fired when a place has been selected via the google maps autocomplete component |

#### Supported Types

| type | description |
| --- | --- |
| geocode | instructs the Places service to return only geocoding results, rather than business results. |
| address | instructs the Places service to return only geocoding results with a precise address. | 
| establishment | instructs the Places service to return only business results. |
|regions | instructs the Places service to return any result matching the following types: locality, sublocality, postal_code, country, administrative_area1, administrative_area2 |
| cities | instructs the Places service to return results that match either locality or administrative_area3. |


### `mat-google-maps-autocomplete` 

everything included in `matGoogleMapsAutocomplete` + the following

| option | bind  |  type  |   default    | description  |
|:-------------------|:--------:|:------:|:------------:|:-------------------------------------------------------------------------------------------------|    
| addressLabelText  | `Input()`   |  string;      | Address using the component |  self explanatory
| placeholderText  | `Input()`   |  string;      | Please enter the address |  self explanatory
| requiredErrorText  | `Input()`   |  string;      | The address is required |  self explanatory
| invalidErrorText  | `Input()`   |  string;      | The address is not valid |  self explanatory
| appearance          | `Input()`   |  Appearance | string;      | Appearance.STANDARD |  Style the `mat-form-field` by setting the appearance option : standard, fill, outline or legacy

### `mat-search-google-maps-autocomplete` 

| option | bind  |  type  |   default    | description  |
|:-------------------|:--------:|:------:|:------------:|:-------------------------------------------------------------------------------------------------|    
| appearance          | `Input()`   |  Appearance | string;      | Appearance.STANDARD |  Style the `mat-form-field` by setting the appearance option : standard, fill, outline or legacy
| searchAddressLabel  | `Input()`   |  string;      | `Search Address` |  input label
| streetNameLabel     | `Input()`   |  string;      | `Street` |  input label
| streetNumberLabel   | `Input()`   |  string;      | `Nr.` |  input label
| postalCodeLabel     | `Input()`   |  string;      | `PLZ` |  input label
| vicinityLabel       | `Input()`   |  string;      | `Locality` |  input label
| localityLabel       | `Input()`   |  string;      | `Locality` |  input label
| showVicinity       | `Input()`   |  boolean;      | `false` |  input label - whether to display the vecinity
| readonly             | `Input()`   |  boolean;      | `false` |  readonly input
| disableSearch             | `Input()`   |  boolean;      | `false` |  disabled users to search a place
| value             | `Input()`   |  `GermanAddress`;          | - | the initial value of the component  
| country             | `Input()`   | string | string[];          | - | can be used to restrict results to specific groups. Currently, you can use componentRestrictions to filter by up to 5 countries. Countries must be passed as as a two-character, ISO 3166-1 Alpha-2 compatible country code. Multiple countries must be passed as a list of country codes.  
| placeIdOnly         | `Input()`   | boolean                     | - | can be used to instruct the Autocomplete widget to retrieve only Place IDs. On calling getPlace() on the Autocomplete object, the PlaceResult made available will only have the place id, types and name properties set. You can use the returned place ID with calls to the Places, Geocoding, Directions or Distance Matrix services.
| strictBounds        | `Input()`   | boolean                     | - | is a boolean specifying whether the API must return only those places that are strictly within the region defined by the given bounds. The API does not return results outside this region even if they match the user input.
| types               | `Input()`   | string[]                    | - |  An array of types specifies an explicit type or a type collection, as listed in the supported types below. If nothing is specified, all types are returned. In general only a single type is allowed. The exception is that you can safely mix the geocode and establishment types, but note that this will have the same effect as specifying no types. Supported types are listed below. |
| type                | `Input()`   | string                      | - | 
| onGermanAddressMapped  | `Output()`  |  EventEmitter<GermanAddress> | string;      | Appearance.STANDARD |  asd


<p align="center">
  <img alt="@angular-material-extensions/google-maps-autocomplete" style="text-align: center;"
   src="https://raw.githubusercontent.com/angular-material-extensions/google-maps-autocomplete/HEAD/assets/v3.0.0/search1.png">
</p>

```html
<mat-card>
   <mat-card-title>Auto Parse Address</mat-card-title>
   <mat-card-content>
     <!-- #######   here we go !! ######-->
     <mat-search-google-maps-autocomplete appearance="outline"
                                          country="de"
                                          (onGermanAddressMapped)="onGermanAddressMapped($event)">
     ></mat-search-google-maps-autocomplete>
   </mat-card-content>
</mat-card>
```


```typescript
import {Appearance, GermanAddress, Location} from '@angular-material-extensions/google-maps-autocomplete';

 onGermanAddressMapped($event;: GermanAddress;) {
    console.log('onGermanAddressMapped', $event);
  }
```



<a name="documentation"/>

## [Documentation](https://angular-material-extensions.github.io/google-maps-autocomplete/doc/index.html)

Please checkout the full documentation [here](https://angular-material-extensions.github.io//google-maps-autocomplete/doc/index.html) 
or follow the official [tutorial](https://angular-material-extensions.github.io//google-maps-autocomplete/getting-started)


<a name="run-demo-app-locally"/>

## Run Demo App Locally

- [clone this repo](https://github.com/angular-material-extensions/google-maps-autocomplete.git) by running
```bash
$ git clone https://github.com/angular-material-extensions/google-maps-autocomplete.git
```

- link the **@angular-material-extensions/google-maps-autocomplete** package

```bash
$ gulp link
```

- navigate to the demo app directory, install the dependencies and serve the app
```bash
$ cd demo && npm i && npm start
```

- the app is now hosted by `http://localhost:4200/`


<a name="development"/>

## Development

1. clone this [repo](https://github.com/angular-material-extensions/google-maps-autocomplete.git)
2. Install the dependencies by running `npm i`
3. go to lib directory under `projects/angular-material-extensions/google-maps-autocomplete`
4. build the library `npm run build`


<a name="other-angular-libraries"/>

## Other Angular Libraries
- [ngx-auth-firebaseui](https://github.com/AnthonyNahas/ngx-auth-firebaseui)
- [ngx-linkifyjs](https://github.com/AnthonyNahas/ngx-linkifyjs)
- [ngx-mailto](https://github.com/AnthonyNahas/ngx-mailto)
- [@firebaseui/ng-bootstrap](https://github.com/firebaseui/ng-bootstrap)
- [@angular-material-extensions/pages](https://github.com/angular-material-extensions/pages)
- [@angular-material-extensions/link-preview](https://github.com/angular-material-extensions/link-preview)
- [@angular-material-extensions/password-strength](https://github.com/angular-material-extensions/password-strength)
- [@angular-material-extensions/select-country](https://github.com/angular-material-extensions/select-country)
- [@angular-material-extensions/select-icon](https://github.com/angular-material-extensions/select-icon)
- [@angular-material-extensions/fab-menu](https://github.com/angular-material-extensions/fab-menu)
- [@angular-material-extensions/faq](https://github.com/angular-material-extensions/faq)
- [@angular-material-extensions/contacts](https://github.com/angular-material-extensions/contacts)

<a name="support"/>

## Support
+ Drop an email to: [Anthony Nahas](mailto:anthony.na@hotmail.de)
+ or open an appropriate [issue](https://github.com/angular-material-extensions/google-maps-autocomplete/issues)
+ let us chat on [Gitter](https://gitter.im/angular-material-extensions/Lobby)
 
 Built by and for developers :heart: we will help you :punch:


## License

Copyright (c) 2019-2020 [Anthony Nahas](https://github.com/AnthonyNahas). Licensed under the MIT License (MIT) <p align="center">
                                                                                                            <img alt="angular-material-extensions's logo"
                                                                                                             height="92px" width="92px" style="text-align: center;" 
                                                                                                             src="https://cdn.jsdelivr.net/gh/angular-material-extensions/google-maps-autocomplete@master/assets/badge_made-in-germany.svg">
                                                                                                          </p>
