import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Holiday } from '../models/Holiday';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  constructor(
    private httpClient: HttpClient
  ) {
    
   }

  getHolidays(year): Observable<Holiday[]> {
    return this.httpClient.get<Holiday[]>(`${environment.apiUrl}/api/holidays/${year}`)
  }

  addHoliday(holiday: Holiday): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/api/holidays`, holiday)
  }

  updateHoliday(holiday: Holiday): Observable<any> {
    return this.httpClient.put(`${environment.apiUrl}/api/holidays/update`, holiday)
  }

  deleteHoliday(id): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/api/holidays/${id}`)
  }

}
