import {MatGoogleMapsAutocompleteDirective} from './mat-google-maps-autocomplete.directive';
import { TestBed, waitForAsync } from '@angular/core/testing';
import {Component, DebugElement, ElementRef, NgZone, PLATFORM_ID} from '@angular/core';
import {MapsAPILoader} from '@agm/core';
import {MockNgZone} from '../testing/mock-ng-zone';
import {environment} from '../../../../../../src/environments/environment';

@Component({
  template: `<input type="text">`
})
class TestGoogleMapsAutoCompleteComponent {
}

describe('MatGoogleMapsAutocompleteDirective', () => {

  let directive: MatGoogleMapsAutocompleteDirective;
  let inputEl: DebugElement;

  const elementRefPartial: Partial<ElementRef> = {};
  const mapsAPILoaderPartial: Partial<MapsAPILoader> = {};
  const ngZonePartial: Partial<NgZone> = {run: (fn: Function) => fn()};

  // spyOn(ngZonePartial, 'run').and.callFake((fn: Function) => fn());

  const googleMapsParams = {
    apiKey: environment.GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
    language: 'en',
    // region: 'DE'
  };

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      // imports: [AgmCoreModule.forRoot(googleMapsParams)],
      declarations: [],
      providers: [
        {provide: ElementRef, useValue: elementRefPartial},
        {provide: MapsAPILoader, useValue: mapsAPILoaderPartial},
        {provide: NgZone, useClass: MockNgZone},
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    directive = new MatGoogleMapsAutocompleteDirective(
      TestBed.get(PLATFORM_ID),
      TestBed.get(ElementRef),
      TestBed.get(MapsAPILoader),
      TestBed.get(NgZone));
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
