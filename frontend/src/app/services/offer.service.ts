import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservedValuesFromArray } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private baseUrl = 'http://localhost:5000/offers';

  constructor(private http: HttpClient) { }

  findOfferById(id: string): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/findOfferById/${id}`);
  }

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

  acceptRequest(id: string): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/acceptRequest/${id}`, {});
  }

  declineRequest(id: string): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/declineRequest/${id}`, {});
  }

  completeOffer(id: string): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/completeOffer/${id}`, {});
  }

  rateOffer(offerId: string, userId: string, rating: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/rateOffer/${offerId}/${userId}/${rating}`, {});
  }

}
