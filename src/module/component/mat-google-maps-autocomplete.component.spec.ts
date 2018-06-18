import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MatGoogleMapsAutocompleteComponent } from './mat-google-maps-autocomplete.component';

describe('LibComponent', function () {
  let de: DebugElement;
  let comp: MatGoogleMapsAutocompleteComponent;
  let fixture: ComponentFixture<MatGoogleMapsAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatGoogleMapsAutocompleteComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatGoogleMapsAutocompleteComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('p.description'));
  });

  it('should create component', () => expect(comp).toBeDefined());

  it('should have expected <p> text', () => {
    fixture.detectChanges();
    const p = de.nativeElement;
    const description = 'Autocomplete input component for google-maps built with angular material design';
    expect(p.textContent).toEqual(description);
  });
});
