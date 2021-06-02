import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginUser } from '../models/LoginUser';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const httpsOptions = {
  headers: new HttpHeaders({
    Authorization: localStorage.getItem('jwtToken')
  })
}

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class UserService {

  authToken: any;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  registerUser(user: User): Observable<any> {
      return this.httpClient.post('http://localhost:5000/api/users/register', user)
  }

  login(user: LoginUser): Observable<any> {
    return this.httpClient.post('http://localhost:5000/api/users/login', user);
  }

  storeUserData(token, user) {
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    localStorage.clear();
  }

  loggedIn(): boolean {
    return !jwtHelper.isTokenExpired(localStorage.getItem('jwtToken'))
  }

  changePassword(data): Observable<any> {
    return this.httpClient.put('http://localhost:5000/api/users/changepassword', data, httpsOptions)
  }

  getUserData(): any {

    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  }

  setUserData() {
    const user = JSON.parse(localStorage.getItem('user'));
    user.firstLogin = false;
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['/']);
  }

}
