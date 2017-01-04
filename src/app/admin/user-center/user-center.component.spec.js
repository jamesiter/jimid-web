"use strict";
/* tslint:disable:no-unused-variable */
var testing_1 = require('@angular/core/testing');
var user_center_component_1 = require('./user-center.component');
describe('UserCenterComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [user_center_component_1.UserCenterComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(user_center_component_1.UserCenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=user-center.component.spec.js.map