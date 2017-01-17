import {Component, OnInit, Input} from '@angular/core';
import {AuthService} from "../../core/auth.service";
import {GlobalService} from "../../core/global.service";

@Component({
  selector: 'app-user-top-nav',
  templateUrl: './user-top-nav.component.html',
  styleUrls: ['./user-top-nav.component.css']
})
export class UserTopNavComponent implements OnInit {

  @Input() login_name: string = '';

  constructor(private authService: AuthService, private gs: GlobalService) {
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }
}
