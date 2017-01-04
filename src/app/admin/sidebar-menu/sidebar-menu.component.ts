import {Component, OnInit, AfterViewInit} from '@angular/core';
declare let $: any;


@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit, AfterViewInit {

  sidebarMenu: any;
  li: any;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.sidebarMenu = $('#sidebar-menu');
  }

  anchorClicked(event: MouseEvent) {
    this.li = $(event.toElement).parent();
    if (!this.li.is('.active')) {

      if (!this.li.parent().is('.child_menu')) {
        this.sidebarMenu.find('li').removeClass('active active-sm');
        this.sidebarMenu.find('li ul').slideUp();
      }

      this.li.addClass('active');
      $('ul:first', this.li).slideDown();

    } else {

      this.li.removeClass('active active-sm');
      $('ul:first', this.li).slideUp();

    }
  }
}
