import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginUser } from '../models/LoginUser';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class UserService {

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

  getCurrentUser() : Observable<User> {
    const httpsOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('jwtToken')
      })
    }

    return this.httpClient.get<User>('http://localhost:5000/api/users/current', httpsOptions)
  }

  getUsers() : Observable<User[]> {
    const httpsOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('jwtToken')
      })
    }
    return this.httpClient.get<User[]>('http://localhost:5000/api/users', httpsOptions)
  }

  storeUserToken(token) {
    localStorage.setItem('jwtToken', token);
  }

  logout(): void {
    localStorage.clear();

  }

  loggedIn(): boolean {
    return !jwtHelper.isTokenExpired(localStorage.getItem('jwtToken'))
  }

  changePassword(data): Observable<any> {
    const httpsOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('jwtToken')
      })
    }
    return this.httpClient.put('http://localhost:5000/api/users/changepassword', data, httpsOptions)
  }

}
