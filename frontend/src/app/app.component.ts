import { Component} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  
  showFooter: boolean = true;
  showNavbar: boolean = true;
  title = 'frontend';

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const excludedRoutesFooter = ['/admin/admin-dashboard',"/auth/login","/auth/register"];
        this.showFooter = !excludedRoutesFooter.includes(event.url);

        const excludedRoutesNavbar = ["/auth/login","/auth/register"];
        this.showNavbar = !excludedRoutesNavbar.includes(event.url);
      }
    });
  }
}