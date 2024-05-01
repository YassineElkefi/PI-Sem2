import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription, interval } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) { }
  isNavbarOpen = false;
  isAuthenticated = false;
  
  private cookieSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.isAuthenticated = this.cookieService.check('authToken');

    this.cookieSubscription = interval(1000).subscribe(() => {
      this.isAuthenticated = this.cookieService.check('authToken');
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
