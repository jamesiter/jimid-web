"use strict";
/* tslint:disable:no-unused-variable */
var testing_1 = require('@angular/core/testing');
var user_log_component_1 = require('./user-log.component');
describe('UserLogComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [user_log_component_1.UserLogComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(user_log_component_1.UserLogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=user-log.component.spec.js.map