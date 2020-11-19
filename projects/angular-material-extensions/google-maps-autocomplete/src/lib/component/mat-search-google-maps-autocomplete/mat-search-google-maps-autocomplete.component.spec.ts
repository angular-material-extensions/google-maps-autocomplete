import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatSearchGoogleMapsAutocompleteComponent } from './mat-search-google-maps-autocomplete.component';

describe('MatSearchGoogleMapsAutocompleteComponent', () => {
  let component: MatSearchGoogleMapsAutocompleteComponent;
  let fixture: ComponentFixture<MatSearchGoogleMapsAutocompleteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MatSearchGoogleMapsAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatSearchGoogleMapsAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
