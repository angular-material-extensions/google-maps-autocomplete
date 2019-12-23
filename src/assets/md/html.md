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
