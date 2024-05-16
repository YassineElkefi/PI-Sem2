import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notif } from '../models/Notif';

@Injectable({
  providedIn: 'root'
})
export class NotifService {

  private baseUrl = 'http://localhost:5000/notif';


  constructor(private http: HttpClient) { }


  getAllNotifs(): any {
    return this.http.get<Notif[]>(`${this.baseUrl}/allNotifications`);
  }

  addNotification(notif: Notif): any {
    return this.http.post<Notif>(`${this.baseUrl}/addNotification`, notif);
  }

  readNotification(id: string): any {
    return this.http.patch<Notif>(`${this.baseUrl}/readNotification/${id}`, {});
  }
}
