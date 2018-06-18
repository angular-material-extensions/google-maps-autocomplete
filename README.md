<p align="center">
  <img height="256px" width="256px" style="text-align: center;" src="https://cdn.rawgit.com/angular-material-extensions/google-maps-autocomplete/master/demo/src/assets/logo.svg">
</p>

# google-maps-autocomplete - Autocomplete input component for google-maps built with angular material design

[![npm version](https://badge.fury.io/js/google-maps-autocomplete.svg)](https://badge.fury.io/js/google-maps-autocomplete),
[![Join the chat at https://gitter.im/angular-material-extensions/Lobby](https://badges.gitter.im/angular-material-extensions/Lobby.svg)](https://gitter.im/angular-material-extensions/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Coverage Status](https://coveralls.io/repos/github/angular-material-extensions/google-maps-autocomplete/badge.svg?branch=master)](https://coveralls.io/github/angular-material-extensions/google-maps-autocomplete?branch=master)
[![Build Status](https://travis-ci.org/angular-material-extensions/google-maps-autocomplete.svg?branch=master)](https://travis-ci.org/angular-material-extensions/google-maps-autocomplete)
[![CircleCI branch](https://img.shields.io/circleci/project/github/angular-material-extensions/google-maps-auto/master.svg?label=circleci)](https://circleci.com/gh/angular-material-extensions/google-maps-auto)
[![dependency Status](https://david-dm.org/angular-material-extensions/google-maps-autocomplete/status.svg)](https://david-dm.org/angular-material-extensions/google-maps-autocomplete)
[![devDependency Status](https://david-dm.org/angular-material-extensions/google-maps-autocomplete/dev-status.svg?branch=master)](https://david-dm.org/angular-material-extensions/google-maps-autocomplete#info=devDependencies)
[![Greenkeeper Badge](https://badges.greenkeeper.io/angular-material-extensions/google-maps-autocomplete.svg)](https://greenkeeper.io/)
[![license](https://img.shields.io/github/license/angular-material-extensions/google-maps-autocomplete.svg?style=flat-square)](https://github.com/angular-material-extensions/google-maps-autocomplete/blob/master/LICENSE)

<p align="center">
  <img alt="@angular-material-extensions/faq" style="text-align: center;"
   src="https://raw.githubusercontent.com/angular-material-extensions/google-maps-autocomplete/HEAD/assets/demo1.gif">
</p>

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
- [Additional Requirements - material icons](#additional-requirements-material-icons)
- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)
- [Run Demo App Locally](#run-demo-app-locally)
- [Development](#development)
- [Other Angular Libraries](#other-angular-libraries)
- [Support](#support)
- [License](#license)

<a name="demo"/>

## [Demo](https://angular-material-extensions.github.io/google-maps-auto)

View all the directives and components in action at [https://angular-material-extensions.github.io/google-maps-auto](https://angular-material-extensions.github.io/google-maps-auto)

<a name="dependencies"/>

## Dependencies
* [Angular](https://angular.io) (*requires* Angular 2 or higher)

<a name="peerDependencies"/>

### Requirements (peer dependencies):
- [angular material v6.2.1](https://www.npmjs.com/package/@angular/material)
- [angular cdk v6.2.1](https://www.npmjs.com/package/@angular/cdk)
- [angular animations v6.0.5](https://www.npmjs.com/package/@angular/animations)
- [angular forms v6.0.5](https://www.npmjs.com/package/@angular/forms)

```bash
npm i @angular/cdk @angular/material @angular/animations @angular/forms 
```

<a name="additional-requirements-material-theme"/>

### Additional requirements Theme (Material Design)
- [angular material theme](https://material.angular.io/guide/getting-started#step-4-include-a-theme)

<a name="additional-requirements-material-icons"/>

## Additional Requirements - Import the material design icons [learn more](https://material.angular.io/guide/getting-started#step-6-optional-add-material-icons)

- The easiest way to import material design icons is to provide a link in your `index.html` file like below:

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

- alternative solution:

1. Install of the official npm module of the material design icons

```bash
npm i -s material-design-icons
```

2. Import them in your `angular.json` file

```json
"styles": [
        "styles.css",
        "../node_modules/material-design-icons/iconfont/material-icons.css"
      ],
```  

----

<a name="installation"/>

##  [Installation](https://angular-material-extensions.github.io/google-maps-auto/getting-started)

Install above dependencies via *npm*. 

Now install `@angular-material-extensions/google-maps-autocomplete` via:
```shell
npm install --save @angular-material-extensions/google-maps-autocomplete
```

##### SystemJS
>**Note**:If you are using `SystemJS`, you should adjust your configuration to point to the UMD bundle.
In your systemjs config file, `map` needs to tell the System loader where to look for `@angular-material-extensions/google-maps-autocomplete`:
```js
map: {
  '@angular-material-extensions/google-maps-autocomplete': 'node_modules/@angular-material-extensions/google-maps-autocomplete/bundles/google-maps-autocomplete.umd.js',
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
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';

@NgModule({
  declarations: [AppComponent, ...],
  imports: [MatGoogleMapsAutocompleteModule.forRoot(), ...],  
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
  imports: [MatGoogleMapsAutocompleteModule, ...], 
})
export class OtherModule {
}
```

<a name="usage"/>

## [Usage](https://angular-material-extensions.github.io/google-maps-autocomplete/getting-started)

add `mat-google-maps-auto-complete` element to your template

### `mat-google-maps-auto-complete` 

```html
<mat-google-maps-autocomplete (onAddressSelected)="onAddressSelected($event)"
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
      <mat-google-maps-autocomplete (onAddressSelected)="onAddressSelected($event)"
                                    (onLocationSelected)="onLocationSelected($event)">
      </mat-google-maps-autocomplete>
    </div>

  </div>
```

in your component, the code will be similar to --> 

```typescript
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Location} from '@angular-material-extensions/google-maps-autocomplete';
import {} from '@types/googlemaps';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {

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

  onAddressSelected(result: PlaceResult) {
    console.log('onAddressSelected: ', result);
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }
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
use gulp globally
```bash
$ gulp link
```

use gulp locally
```bash
$ npx gulp link
```
for some mac os users, you may use the sudo command with gulp
use gulp with sudo
```bash
$ sudo gulp link
```
or locally 
```bash
$ sudo npx gulp link
```

- navigate to the demo app directory
```bash
$ cd demo
```

- install the dependencies
```bash
$ npm i
```

- run/start/serve the app
```bash
$ npm run start
```
or
```bash
$ ng serve --open
```
- the app is now hosted by `http://localhost:4200/`


<a name="development"/>

## Development

1. clone this [repo](https://github.com/angular-material-extensions/google-maps-autocomplete.git)
2. Install the dependencies by running `npm i`
3. build the library `npm run build` or `gulp build`
To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

4. Link the library 
  - on windows `gulp link` or locally `npx gulp link`
  - on mac/linux `sudo gulp link` or locally `sudo npx gulp link`
  
 5. Navigate to the demo app's directory
  - `cd demo`
  _ `npm i`
  _ `npm start`

extras
To lint all `*.ts` files:

```bash
$ npm run lint
```
<a name="other-angular-libraries"/>

## Other Angular Libraries
- [ngx-auth-firebaseui](https://github.com/AnthonyNahas/ngx-auth-firebaseui)
- [@angular-material-extensions/pages](https://github.com/angular-material-extensions/pages)
- [@angular-material-extensions/password-strength](https://github.com/angular-material-extensions/password-strength)
- [@angular-material-extensions/faq](https://github.com/angular-material-extensions/faq)
- [@angular-material-extensions/contacts](https://github.com/angular-material-extensions/contacts)
- [@angular-material-extensions/combination-generator](https://github.com/angular-material-extensions/combination-generator)

<a name="support"/>

## Support
+ Drop an email to: [Anthony Nahas](mailto:anthony.na@hotmail.de)
+ or open an appropriate [issue](https://github.com/angular-material-extensions/google-maps-auto/issues)
+ let us chat on [Gitter](https://gitter.im/angular-material-extensions/Lobby)
 
 Built by and for developers :heart: we will help you :punch:


## License

Copyright (c) 2018 [Anthony Nahas](https://github.com/AnthonyNahas). Licensed under the MIT License (MIT)

