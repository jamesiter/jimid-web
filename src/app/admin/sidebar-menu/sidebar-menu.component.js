import { Component } from '@angular/core';
export var SidebarMenuComponent = (function () {
    function SidebarMenuComponent() {
    }
    SidebarMenuComponent.prototype.ngOnInit = function () {
    };
    SidebarMenuComponent.prototype.ngAfterViewInit = function () {
        this.sidebarMenu = $('#sidebar-menu');
    };
    SidebarMenuComponent.prototype.anchorClicked = function (event) {
        this.li = $(event.toElement).parent();
        if (!this.li.is('.active')) {
            if (!this.li.parent().is('.child_menu')) {
                this.sidebarMenu.find('li').removeClass('active active-sm');
                this.sidebarMenu.find('li ul').slideUp();
            }
            this.li.addClass('active');
            $('ul:first', this.li).slideDown();
        }
        else {
            this.li.removeClass('active active-sm');
            $('ul:first', this.li).slideUp();
        }
    };
    SidebarMenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-sidebar-menu',
                    templateUrl: './sidebar-menu.component.html',
                    styleUrls: ['./sidebar-menu.component.css']
                },] },
    ];
    /** @nocollapse */
    SidebarMenuComponent.ctorParameters = [];
    return SidebarMenuComponent;
}());
//# sourceMappingURL=sidebar-menu.component.js.map