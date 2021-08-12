import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AbsenceTypeService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAbsenceTypes(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/api/absence/type`)
  }

  addAbsenceType(absenceType): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/api/absence/type`, absenceType)
  }

  updateAbsenceType(absenceType): Observable<any> {
    return this.httpClient.put(`${environment.apiUrl}/api/absence/type/update`, absenceType)
  }

  deleteAbsenceTypen(id): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/api/absence/type/${id}`)
  }
}
