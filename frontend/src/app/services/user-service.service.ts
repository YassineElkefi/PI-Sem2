import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private baseUrl = 'http://localhost:5000/auth';

  constructor(private http:HttpClient) { }

  getUserById(userId:string){
    return this.http.get(`${this.baseUrl}/user/${userId}`);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/allUsers`);
  }

  updateProfile(userId: string, user: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/user/updateProfile/${userId}`, user);
  }

updateAvatar(userId: string, avatar: File): Observable<any> {
  const formData = new FormData();
  formData.append('avatar', avatar);

  return this.http.put<any>(`${this.baseUrl}/user/updateAvatar/${userId}`, formData);
}

deleteAccount(userId: string): Observable<any> {
  return this.http.delete<any>(`${this.baseUrl}/user/deleteAccount/${userId}`);
}
  
}
