import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription, interval } from 'rxjs';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) { }
  isNavbarOpen = false;
  isAuthenticated = false;
  user: any | undefined;
  userData:any;
  private cookieSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.isAuthenticated = this.cookieService.check('authToken');

    this.cookieSubscription = interval(1000).subscribe(() => {
      this.isAuthenticated = this.cookieService.check('authToken');
      this.userData= this.cookieService.get('userData');
      if(this.userData){
        this.user = JSON.parse(this.cookieService.get('userData'));
      }
      
    });
  }
  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }


  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
