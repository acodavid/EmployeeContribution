import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginUser } from '../models/LoginUser';
import {JwtHelperService} from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { UserRegister } from '../models/UserRegister';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  registerUser(user: UserRegister): Observable<any> {
      return this.httpClient.post(`${environment.apiUrl}/api/users/register`, user)
  }

  updateUser(user: UserRegister): Observable<any> {
    return this.httpClient.put(`${environment.apiUrl}/api/users/update`, user)
  }

  getUserById(id): Observable<UserRegister> {
    return this.httpClient.get<UserRegister>(`${environment.apiUrl}/api/users/user/${id}`)
  }

  login(user: LoginUser): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/api/users/login`, user);
  }

  getCurrentUser() : Observable<UserRegister> {
    return this.httpClient.get<UserRegister>(`${environment.apiUrl}/api/users/current`)
  }

  getUsers() : Observable<UserRegister[]> {
    return this.httpClient.get<UserRegister[]>(`${environment.apiUrl}/api/users`)
  }

  storeUserToken(token, user) {
    localStorage.setItem('jwtToken', token);
    const type = JSON.stringify(user.type)
    localStorage.setItem('type', type);
    localStorage.setItem('name', user.name);
  }

  checkAdmin(): boolean {

    if(localStorage.getItem('type') === '"globalAdmin"' || localStorage.getItem('type') === '"admin"') {
      return true;
    } else {
      return false;
    }
    
  }

  checkGlobalAdmin(): boolean {
    if(localStorage.getItem('type') === '"globalAdmin"') {
      return true;
    } else {
      return false;
    }
  }

  getLoggedUserName(): string {
    return localStorage.getItem('name')
  }

  logout(): void {
    localStorage.clear();

  }

  loggedIn(): boolean {
    return !jwtHelper.isTokenExpired(localStorage.getItem('jwtToken'))
  }

  changePassword(data): Observable<any> {
    return this.httpClient.put(`${environment.apiUrl}/api/users/changepassword`, data)
  }

  deleteUser(id): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/api/users/${id}`)
  }

  changePersonalData(data): Observable<any> {
    return this.httpClient.put(`${environment.apiUrl}/api/users/profile/update`, data);
  }

}
