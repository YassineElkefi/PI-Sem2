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

  updateCar(userId: string, car: string): void {
    this.http.put<any>(`${this.baseUrl}/user/updateCar/${userId}`, { car }).subscribe(
        response => {
            console.log(response);
        },
        error => {
            console.error(error);
        }
    );
}

updateAvatar(userId: string, avatar: File): Observable<any> {
  const formData = new FormData();
  formData.append('avatar', avatar);

  return this.http.put<any>(`${this.baseUrl}/user/updateAvatar/${userId}`, formData);
}
}
