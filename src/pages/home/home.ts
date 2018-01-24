import {Component} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthProvider} from "../../providers/auth/auth";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  firstName: string;
  lastName: string;
  fullName: string;

  constructor(private readonly authProvider: AuthProvider,
              jwtHelper: JwtHelperService) {

    this.authProvider.authUser.subscribe(jwt => {
      if (jwt) {
        const decoded = jwtHelper.decodeToken(jwt);
        this.firstName = decoded.first_name;
        this.lastName = decoded.last_name;
        this.fullName = this.firstName + ' ' + this.lastName;
      }
      else {
        this.fullName = null;
      }
    });

  }

  logout() {
    this.authProvider.logout();
  }
}
