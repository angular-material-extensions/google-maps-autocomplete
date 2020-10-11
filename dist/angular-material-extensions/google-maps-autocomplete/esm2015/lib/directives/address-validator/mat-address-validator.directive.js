import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
// https://github.com/angular/angular/blob/master/packages/forms/src/directives/validators.ts
export class MatValidateAddressDirective {
    constructor() {
    }
    validate() {
        return (control) => {
            return this.address ? null : {
                validateAddress: {
                    valid: false
                }
            };
        };
    }
    subscribe(eventEmitter) {
        this.subscription = eventEmitter.subscribe((address) => {
            this.address = address;
        });
    }
    unsubscribe() {
        this.subscription.unsubscribe();
    }
    get address() {
        return this._address;
    }
    set address(value) {
        this._address = value;
    }
}
MatValidateAddressDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mat-address-validate][formControlName],[MatValidateAddress][formControl],[MatValidateAddress][ngModel]',
                providers: [
                    { provide: NG_VALIDATORS, useExisting: forwardRef(() => MatValidateAddressDirective), multi: true }
                ]
            },] }
];
MatValidateAddressDirective.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LWFkZHJlc3MtdmFsaWRhdG9yLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLW1hdGVyaWFsLWV4dGVuc2lvbnMvZ29vZ2xlLW1hcHMtYXV0b2NvbXBsZXRlLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvYWRkcmVzcy12YWxpZGF0b3IvbWF0LWFkZHJlc3MtdmFsaWRhdG9yLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFnQixVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxFQUFrQixhQUFhLEVBQTJDLE1BQU0sZ0JBQWdCLENBQUM7QUFHeEcsNkZBQTZGO0FBUTdGLE1BQU0sT0FBTywyQkFBMkI7SUFPdEM7SUFDQSxDQUFDO0lBRU0sUUFBUTtRQUNiLE9BQU8sQ0FBQyxPQUF3QixFQUEwQixFQUFFO1lBQzFELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsZUFBZSxFQUFFO29CQUNmLEtBQUssRUFBRSxLQUFLO2lCQUNiO2FBQ0YsQ0FBQztRQUNKLENBQUMsQ0FBQTtJQUNILENBQUM7SUFFTSxTQUFTLENBQUMsWUFBK0I7UUFDOUMsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBb0IsRUFBRSxFQUFFO1lBQ2xFLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLFdBQVc7UUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLE9BQU8sQ0FBQyxLQUFLO1FBQ2YsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQzs7O1lBMUNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUseUdBQXlHO2dCQUNuSCxTQUFTLEVBQUU7b0JBQ1QsRUFBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsMkJBQTJCLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO2lCQUNsRzthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sLCBOR19WQUxJREFUT1JTLCBWYWxpZGF0aW9uRXJyb3JzLCBWYWxpZGF0b3IsIFZhbGlkYXRvckZufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCBQbGFjZVJlc3VsdCA9IGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZVJlc3VsdDtcclxuXHJcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvYmxvYi9tYXN0ZXIvcGFja2FnZXMvZm9ybXMvc3JjL2RpcmVjdGl2ZXMvdmFsaWRhdG9ycy50c1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbWF0LWFkZHJlc3MtdmFsaWRhdGVdW2Zvcm1Db250cm9sTmFtZV0sW01hdFZhbGlkYXRlQWRkcmVzc11bZm9ybUNvbnRyb2xdLFtNYXRWYWxpZGF0ZUFkZHJlc3NdW25nTW9kZWxdJyxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHtwcm92aWRlOiBOR19WQUxJREFUT1JTLCB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNYXRWYWxpZGF0ZUFkZHJlc3NEaXJlY3RpdmUpLCBtdWx0aTogdHJ1ZX1cclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXRWYWxpZGF0ZUFkZHJlc3NEaXJlY3RpdmUgaW1wbGVtZW50cyBWYWxpZGF0b3Ige1xyXG5cclxuICBwdWJsaWMgc3Vic2NyaXB0aW9uOiBhbnk7XHJcblxyXG4gIHByaXZhdGUgX2FkZHJlc3M6IFBsYWNlUmVzdWx0O1xyXG5cclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdmFsaWRhdGUoKTogVmFsaWRhdG9yRm4ge1xyXG4gICAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHwgYW55ID0+IHtcclxuICAgICAgcmV0dXJuIHRoaXMuYWRkcmVzcyA/IG51bGwgOiB7XHJcbiAgICAgICAgdmFsaWRhdGVBZGRyZXNzOiB7XHJcbiAgICAgICAgICB2YWxpZDogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3Vic2NyaWJlKGV2ZW50RW1pdHRlcjogRXZlbnRFbWl0dGVyPGFueT4pIHtcclxuICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gZXZlbnRFbWl0dGVyLnN1YnNjcmliZSgoYWRkcmVzczogUGxhY2VSZXN1bHQpID0+IHtcclxuICAgICAgdGhpcy5hZGRyZXNzID0gYWRkcmVzcztcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHVuc3Vic2NyaWJlKCkge1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIGdldCBhZGRyZXNzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2FkZHJlc3M7XHJcbiAgfVxyXG5cclxuICBzZXQgYWRkcmVzcyh2YWx1ZSkge1xyXG4gICAgdGhpcy5fYWRkcmVzcyA9IHZhbHVlO1xyXG4gIH1cclxufVxyXG4iXX0=