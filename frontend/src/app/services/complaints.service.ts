import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintsService {

  private baseUrl = 'http://localhost:5000/complaints';

  constructor(private http:HttpClient) { }

  findAllComplaints(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/allComplaints`);
  }
  addComplaint(complaint: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addComplaint`, complaint);
  }

  acceptComplaint(id: string): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/acceptComplaint/${id}`, {});
  }
  rejectComplaint(id: string): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/rejectComplaint/${id}`, {});
  }
}
