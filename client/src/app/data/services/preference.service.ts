import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Preference } from '../models/Preference';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  constructor(
    private httpClient: HttpClient
  ) { }

  addPreference(preference: Preference): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/api/preferences/create`, preference)
  }

  setPreferenceCreated(id): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/api/preferences/set/preference-created`, id)
  }

  getPreferenceCurrentUser(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/api/preferences/current`)
  }

  getPreferenceById(id): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/api/preferences/preference/${id}`);
  }

  updatePreference(preference: Preference): Observable<any> {
    return this.httpClient.put(`${environment.apiUrl}/api/preferences/update`, preference)
  }
}
