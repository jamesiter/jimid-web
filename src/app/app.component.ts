import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // title = 'JimID';
  // currentURL: any;
  constructor(private router: Router) {
    this.router.events.subscribe(val => {
      console.log(val.url);
      // this.currentURL = val.url;
    });
  }

  ngOnInit() {
  }
}
