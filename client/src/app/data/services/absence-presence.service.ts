import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PresenceAbsence } from '../models/PresenceAbsence';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AbsencePresenceService {

  constructor(
    private httpClient: HttpClient
  ) { }

  addPresenceAbsence(presenceAbsence: PresenceAbsence): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/api/presence/absence/create`, presenceAbsence)
  }

  getAbsencePresenceBusinessTrip(user: string, date: Date): Observable<PresenceAbsence> {
    return this.httpClient.get<PresenceAbsence>(`${environment.apiUrl}/api/presence/absence/${user}/${date}`);
  }

  getById(id): Observable<PresenceAbsence> {
    return this.httpClient.get<PresenceAbsence>(`${environment.apiUrl}/api/presence/absence/get/${id}`)
  }

  editData(data): Observable<any> {
    return this.httpClient.put(`${environment.apiUrl}/api/presence/absence/update`, data)
  }

  deleteDataById(id): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/api/presence/absence/${id}`)
  }

  deleteDataByUserIDAndDate(user, date): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/api/presence/absence/date/${date}/${user}`)
  }

  getDataFromRange(user, date1, date2): Observable<PresenceAbsence[]> {
    return this.httpClient.get<PresenceAbsence[]>(`${environment.apiUrl}/api/presence/absence/user/range/${user}/${date1}/${date2}`)
  }
}
