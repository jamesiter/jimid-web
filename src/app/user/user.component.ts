import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import {GlobalService} from "../core/global.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private http: Http, private gs: GlobalService) { }

  ngOnInit() {
    this.gs.getSelfInfo();
  }
}
