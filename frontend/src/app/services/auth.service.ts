import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/auth';

  constructor(private http: HttpClient,private cookieService:CookieService) { }

  register(user:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/register`,user);
  }

  login(credentials:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/login`,credentials)
    .pipe(
      tap(res => this.setAuthToken(res)),
      catchError(error =>{
        return of(error);
      })
    )
  }

  logout():void{
    this.deleteAuthToken();
  }
  isAuthenticated():boolean{ 
    return this.getAuthToken() !== '';
  }
  
  getUser(): any {
    const userData = this.cookieService.get('userData');
    return JSON.parse(userData);
  }

private setAuthToken(response:any):void{
  const token = response.token || response.accessToken || null;
  if (token) {
    this.cookieService.set('authToken', token);
    this.cookieService.set('userData', JSON.stringify(response.user)); 
  }
}

private getAuthToken():string{
  return this.cookieService.get('authToken');
}

private deleteAuthToken():void{
  this.cookieService.delete('authToken');
  this.cookieService.delete('userData');
}

}
