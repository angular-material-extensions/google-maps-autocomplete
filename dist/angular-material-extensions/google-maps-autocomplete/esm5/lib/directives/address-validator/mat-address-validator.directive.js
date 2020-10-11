import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
// https://github.com/angular/angular/blob/master/packages/forms/src/directives/validators.ts
var MatValidateAddressDirective = /** @class */ (function () {
    function MatValidateAddressDirective() {
    }
    MatValidateAddressDirective.prototype.validate = function () {
        var _this = this;
        return function (control) {
            return _this.address ? null : {
                validateAddress: {
                    valid: false
                }
            };
        };
    };
    MatValidateAddressDirective.prototype.subscribe = function (eventEmitter) {
        var _this = this;
        this.subscription = eventEmitter.subscribe(function (address) {
            _this.address = address;
        });
    };
    MatValidateAddressDirective.prototype.unsubscribe = function () {
        this.subscription.unsubscribe();
    };
    Object.defineProperty(MatValidateAddressDirective.prototype, "address", {
        get: function () {
            return this._address;
        },
        set: function (value) {
            this._address = value;
        },
        enumerable: false,
        configurable: true
    });
    MatValidateAddressDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[mat-address-validate][formControlName],[MatValidateAddress][formControl],[MatValidateAddress][ngModel]',
                    providers: [
                        { provide: NG_VALIDATORS, useExisting: forwardRef(function () { return MatValidateAddressDirective; }), multi: true }
                    ]
                },] }
    ];
    MatValidateAddressDirective.ctorParameters = function () { return []; };
    return MatValidateAddressDirective;
}());
export { MatValidateAddressDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LWFkZHJlc3MtdmFsaWRhdG9yLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bhbmd1bGFyLW1hdGVyaWFsLWV4dGVuc2lvbnMvZ29vZ2xlLW1hcHMtYXV0b2NvbXBsZXRlLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvYWRkcmVzcy12YWxpZGF0b3IvbWF0LWFkZHJlc3MtdmFsaWRhdG9yLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFnQixVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEUsT0FBTyxFQUFrQixhQUFhLEVBQTJDLE1BQU0sZ0JBQWdCLENBQUM7QUFHeEcsNkZBQTZGO0FBRTdGO0lBYUU7SUFDQSxDQUFDO0lBRU0sOENBQVEsR0FBZjtRQUFBLGlCQVFDO1FBUEMsT0FBTyxVQUFDLE9BQXdCO1lBQzlCLE9BQU8sS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsZUFBZSxFQUFFO29CQUNmLEtBQUssRUFBRSxLQUFLO2lCQUNiO2FBQ0YsQ0FBQztRQUNKLENBQUMsQ0FBQTtJQUNILENBQUM7SUFFTSwrQ0FBUyxHQUFoQixVQUFpQixZQUErQjtRQUFoRCxpQkFJQztRQUhDLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFDLE9BQW9CO1lBQzlELEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLGlEQUFXLEdBQWxCO1FBQ0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsc0JBQUksZ0RBQU87YUFBWDtZQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN2QixDQUFDO2FBRUQsVUFBWSxLQUFLO1lBQ2YsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQzs7O09BSkE7O2dCQXRDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHlHQUF5RztvQkFDbkgsU0FBUyxFQUFFO3dCQUNULEVBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSwyQkFBMkIsRUFBM0IsQ0FBMkIsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7cUJBQ2xHO2lCQUNGOzs7SUFzQ0Qsa0NBQUM7Q0FBQSxBQTNDRCxJQTJDQztTQXJDWSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2wsIE5HX1ZBTElEQVRPUlMsIFZhbGlkYXRpb25FcnJvcnMsIFZhbGlkYXRvciwgVmFsaWRhdG9yRm59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IFBsYWNlUmVzdWx0ID0gZ29vZ2xlLm1hcHMucGxhY2VzLlBsYWNlUmVzdWx0O1xyXG5cclxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9ibG9iL21hc3Rlci9wYWNrYWdlcy9mb3Jtcy9zcmMvZGlyZWN0aXZlcy92YWxpZGF0b3JzLnRzXHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1ttYXQtYWRkcmVzcy12YWxpZGF0ZV1bZm9ybUNvbnRyb2xOYW1lXSxbTWF0VmFsaWRhdGVBZGRyZXNzXVtmb3JtQ29udHJvbF0sW01hdFZhbGlkYXRlQWRkcmVzc11bbmdNb2RlbF0nLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAge3Byb3ZpZGU6IE5HX1ZBTElEQVRPUlMsIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1hdFZhbGlkYXRlQWRkcmVzc0RpcmVjdGl2ZSksIG11bHRpOiB0cnVlfVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdFZhbGlkYXRlQWRkcmVzc0RpcmVjdGl2ZSBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XHJcblxyXG4gIHB1YmxpYyBzdWJzY3JpcHRpb246IGFueTtcclxuXHJcbiAgcHJpdmF0ZSBfYWRkcmVzczogUGxhY2VSZXN1bHQ7XHJcblxyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB2YWxpZGF0ZSgpOiBWYWxpZGF0b3JGbiB7XHJcbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgfCBhbnkgPT4ge1xyXG4gICAgICByZXR1cm4gdGhpcy5hZGRyZXNzID8gbnVsbCA6IHtcclxuICAgICAgICB2YWxpZGF0ZUFkZHJlc3M6IHtcclxuICAgICAgICAgIHZhbGlkOiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdWJzY3JpYmUoZXZlbnRFbWl0dGVyOiBFdmVudEVtaXR0ZXI8YW55Pikge1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSBldmVudEVtaXR0ZXIuc3Vic2NyaWJlKChhZGRyZXNzOiBQbGFjZVJlc3VsdCkgPT4ge1xyXG4gICAgICB0aGlzLmFkZHJlc3MgPSBhZGRyZXNzO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdW5zdWJzY3JpYmUoKSB7XHJcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGFkZHJlc3MoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fYWRkcmVzcztcclxuICB9XHJcblxyXG4gIHNldCBhZGRyZXNzKHZhbHVlKSB7XHJcbiAgICB0aGlzLl9hZGRyZXNzID0gdmFsdWU7XHJcbiAgfVxyXG59XHJcbiJdfQ==