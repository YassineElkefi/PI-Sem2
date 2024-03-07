import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private baseUrl = 'http://localhost:5000/offers';

  constructor(private http: HttpClient) { }

  getAllOffers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/allOffers`);
  }

  postOffer(offer: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addOffer`, offer);
  }
  deleteOffer(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deleteOffer/${id}`);
  }

  editOffer(id: string, offer: any): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/editOffer/${id}`, offer);
  }
}
