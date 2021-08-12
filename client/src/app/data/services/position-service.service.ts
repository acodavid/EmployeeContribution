import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PositionServiceService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getPositions(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/api/positions`)
  }

  addPosition(position): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/api/positions`, position)
  }

  updatePostion(position): Observable<any> {
    return this.httpClient.put(`${environment.apiUrl}/api/positions/update`, position)
  }

  deletePosition(id): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/api/positions/${id}`)
  }
}
