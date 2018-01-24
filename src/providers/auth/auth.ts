import { Injectable } from "@angular/core";
import { tap } from 'rxjs/operators/tap';
import { ReplaySubject, Observable } from "rxjs";
import { SERVER_URL } from "../../../config";
import { Storage } from "@ionic/storage";
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class AuthProvider {
  private jwtTokenName = 'jwt_token';

  authUser = new ReplaySubject<any>(1);

  constructor(private readonly httpClient: HttpClient,
              private readonly storage: Storage,
              private readonly jwtHelper: JwtHelperService) {
    console.log('Hello AuthProvider Provider');
  }

  checkLogin() {
    return this.storage.get(this.jwtTokenName).then(jwt => {
      if (!jwt || this.jwtHelper.isTokenExpired(jwt)) {
        this.storage.remove(this.jwtTokenName).then(() => this.authUser.next(null));
      } else {
        this.authUser.next(jwt);
      }
    })
  }

  login(values: any): Observable<any> {
    return this.httpClient.post(`${SERVER_URL}/login`, values, {responseType: 'text'})
      .pipe(tap(jwt => this.handleJwtResponse(jwt)));
  }

  logout() {
    this.storage.remove(this.jwtTokenName).then(() => this.authUser.next(null));
  }

  signup(values: any): Observable<any> {
    let logInfos: any;

    logInfos = {
      'username': values.email,
      'password': values.plain_password
    };
    return this.httpClient.post(`${SERVER_URL}/users`, values)
      .pipe(tap(jwt => {
        if (jwt !== 'EXISTS') {
          return this.login(logInfos).subscribe(
            () => {
            }
          );
        }
        return jwt;
      }));
  }

  private handleJwtResponse(jwt: string) {
    return this.storage.set(this.jwtTokenName, jwt)
      .then(() => this.authUser.next(jwt))
      .then(() => jwt);
  }
}
