import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private baseUrl = 'http://localhost:5000/requests';

  constructor(private http: HttpClient) { }

  getAllRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/allRequests`);
  }

  postRequest(request: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addRequest`, request);
  }
  deleteRequest(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deleteRequest/${id}`);
  }

  updateRequest(id: string, request: any): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/updateRequest/${id}`, request);
  }
}
