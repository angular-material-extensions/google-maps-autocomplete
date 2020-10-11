import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatGoogleMapsAutocompleteDirective } from './directives/mat-google-maps-autocomplete.directive';
import { MatValidateAddressDirective } from './directives/address-validator/mat-address-validator.directive';
import { MatGoogleMapsAutocompleteComponent } from './component/mat-google-maps-autocomplete.component';
// tslint:disable-next-line:max-line-length
import { MatSearchGoogleMapsAutocompleteComponent } from './component/mat-search-google-maps-autocomplete/mat-search-google-maps-autocomplete.component';
export class MatGoogleMapsAutocompleteModule {
}
MatGoogleMapsAutocompleteModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    FlexLayoutModule,
                    MatInputModule,
                    MatIconModule
                ],
                exports: [
                    MatGoogleMapsAutocompleteComponent,
                    MatGoogleMapsAutocompleteDirective,
                    MatValidateAddressDirective,
                    MatSearchGoogleMapsAutocompleteComponent
                ],
                declarations: [
                    MatGoogleMapsAutocompleteComponent,
                    MatGoogleMapsAutocompleteDirective,
                    MatValidateAddressDirective,
                    MatSearchGoogleMapsAutocompleteComponent
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LWdvb2dsZS1tYXBzLWF1dG9jb21wbGV0ZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYW5ndWxhci1tYXRlcmlhbC1leHRlbnNpb25zL2dvb2dsZS1tYXBzLWF1dG9jb21wbGV0ZS8iLCJzb3VyY2VzIjpbImxpYi9tYXQtZ29vZ2xlLW1hcHMtYXV0b2NvbXBsZXRlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RCxPQUFPLEVBQUMsV0FBVyxFQUFFLG1CQUFtQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsa0NBQWtDLEVBQUMsTUFBTSxxREFBcUQsQ0FBQztBQUN2RyxPQUFPLEVBQUMsMkJBQTJCLEVBQUMsTUFBTSxnRUFBZ0UsQ0FBQztBQUMzRyxPQUFPLEVBQUMsa0NBQWtDLEVBQUMsTUFBTSxvREFBb0QsQ0FBQztBQUN0RywyQ0FBMkM7QUFDM0MsT0FBTyxFQUFDLHdDQUF3QyxFQUFDLE1BQU0sK0ZBQStGLENBQUM7QUEwQnZKLE1BQU0sT0FBTywrQkFBK0I7OztZQXZCM0MsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFDTDtvQkFDRSxZQUFZO29CQUNaLFdBQVc7b0JBQ1gsbUJBQW1CO29CQUNuQixnQkFBZ0I7b0JBQ2hCLGNBQWM7b0JBQ2QsYUFBYTtpQkFDZDtnQkFDSCxPQUFPLEVBQUU7b0JBQ1Asa0NBQWtDO29CQUNsQyxrQ0FBa0M7b0JBQ2xDLDJCQUEyQjtvQkFDM0Isd0NBQXdDO2lCQUN6QztnQkFDRCxZQUFZLEVBQUU7b0JBQ1osa0NBQWtDO29CQUNsQyxrQ0FBa0M7b0JBQ2xDLDJCQUEyQjtvQkFDM0Isd0NBQXdDO2lCQUN6QzthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0ZsZXhMYXlvdXRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcclxuaW1wb3J0IHtGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XHJcbmltcG9ydCB7IE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaW5wdXQnO1xyXG5pbXBvcnQge01hdEdvb2dsZU1hcHNBdXRvY29tcGxldGVEaXJlY3RpdmV9IGZyb20gJy4vZGlyZWN0aXZlcy9tYXQtZ29vZ2xlLW1hcHMtYXV0b2NvbXBsZXRlLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7TWF0VmFsaWRhdGVBZGRyZXNzRGlyZWN0aXZlfSBmcm9tICcuL2RpcmVjdGl2ZXMvYWRkcmVzcy12YWxpZGF0b3IvbWF0LWFkZHJlc3MtdmFsaWRhdG9yLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7TWF0R29vZ2xlTWFwc0F1dG9jb21wbGV0ZUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnQvbWF0LWdvb2dsZS1tYXBzLWF1dG9jb21wbGV0ZS5jb21wb25lbnQnO1xyXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXHJcbmltcG9ydCB7TWF0U2VhcmNoR29vZ2xlTWFwc0F1dG9jb21wbGV0ZUNvbXBvbmVudH0gZnJvbSAnLi9jb21wb25lbnQvbWF0LXNlYXJjaC1nb29nbGUtbWFwcy1hdXRvY29tcGxldGUvbWF0LXNlYXJjaC1nb29nbGUtbWFwcy1hdXRvY29tcGxldGUuY29tcG9uZW50JztcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6XHJcbiAgICBbXHJcbiAgICAgIENvbW1vbk1vZHVsZSxcclxuICAgICAgRm9ybXNNb2R1bGUsXHJcbiAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICAgIEZsZXhMYXlvdXRNb2R1bGUsXHJcbiAgICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgICBNYXRJY29uTW9kdWxlXHJcbiAgICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIE1hdEdvb2dsZU1hcHNBdXRvY29tcGxldGVDb21wb25lbnQsXHJcbiAgICBNYXRHb29nbGVNYXBzQXV0b2NvbXBsZXRlRGlyZWN0aXZlLFxyXG4gICAgTWF0VmFsaWRhdGVBZGRyZXNzRGlyZWN0aXZlLFxyXG4gICAgTWF0U2VhcmNoR29vZ2xlTWFwc0F1dG9jb21wbGV0ZUNvbXBvbmVudFxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBNYXRHb29nbGVNYXBzQXV0b2NvbXBsZXRlQ29tcG9uZW50LFxyXG4gICAgTWF0R29vZ2xlTWFwc0F1dG9jb21wbGV0ZURpcmVjdGl2ZSxcclxuICAgIE1hdFZhbGlkYXRlQWRkcmVzc0RpcmVjdGl2ZSxcclxuICAgIE1hdFNlYXJjaEdvb2dsZU1hcHNBdXRvY29tcGxldGVDb21wb25lbnRcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXRHb29nbGVNYXBzQXV0b2NvbXBsZXRlTW9kdWxlIHtcclxufVxyXG4iXX0=