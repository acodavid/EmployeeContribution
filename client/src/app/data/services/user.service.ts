import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginUser } from '../models/LoginUser';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserRegister } from '../models/UserRegister';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  registerUser(user: UserRegister): Observable<any> {
      return this.httpClient.post(`${environment.apiUrl}/api/users/register`, user)
  }

  updateUser(user: UserRegister): Observable<any> {

    const httpsOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('jwtToken')
      })
    }
    return this.httpClient.put(`${environment.apiUrl}/api/users/update`, user, httpsOptions)
  }

  getUserById(id): Observable<UserRegister> {
    const httpsOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('jwtToken')
      })
    }
    return this.httpClient.get<UserRegister>(`${environment.apiUrl}/api/users/user/${id}`, httpsOptions)
  }

  login(user: LoginUser): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/api/users/login`, user);
  }

  getCurrentUser() : Observable<User> {
    const httpsOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('jwtToken')
      })
    }

    return this.httpClient.get<User>(`${environment.apiUrl}/api/users/current`, httpsOptions)
  }

  getUsers() : Observable<UserRegister[]> {
    const httpsOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('jwtToken')
      })
    }
    return this.httpClient.get<UserRegister[]>(`${environment.apiUrl}/api/users`, httpsOptions)
  }

  storeUserToken(token, user) {
    localStorage.setItem('jwtToken', token);
    const isAdmin = JSON.stringify(user.isAdmin)
    localStorage.setItem('isAdmin', isAdmin);
  }

  checkAdmin(): boolean {
    if(localStorage.getItem('isAdmin') === 'true') {
      return true;
    } else {
      return false;
    }
    
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
    return this.httpClient.put(`${environment.apiUrl}/api/users/changepassword`, data, httpsOptions)
  }

  deleteUser(id): Observable<any> {
    const httpsOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('jwtToken')
      })
    }
    return this.httpClient.delete(`${environment.apiUrl}/api/users/${id}`, httpsOptions)
  }

}
