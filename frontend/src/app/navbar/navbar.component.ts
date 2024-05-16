import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription, interval, map } from 'rxjs';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';
import { NotifService } from '../services/notif.service';
import { Notif } from '../models/Notif';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService, private notificationService: NotifService) { }
  notifications: string[] = []; 
  isNavbarOpen = false;
  isAuthenticated = false;
  user: any | undefined;
  userData:any;
  notifs: Notif[] = [];
  private cookieSubscription: Subscription | undefined;
  notificationInterval: any;

  ngOnInit(): void {

    //this.fetchNotifications();

    // Fetch notifications every 10 seconds

    this.isAuthenticated = this.cookieService.check('authToken');

    this.cookieSubscription = interval(1000).subscribe(() => {
      this.isAuthenticated = this.cookieService.check('authToken');
      this.userData= this.cookieService.get('userData');
      if(this.userData){
        this.user = JSON.parse(this.cookieService.get('userData'));
      }
      
    });

    if(this.isAuthenticated){
      this.startNotificationInterval();
    }
  }
  ngOnDestroy(): void {
    this.cookieSubscription.unsubscribe();
    this.clearNotificationInterval();
  }

  startNotificationInterval(): void {
    this.notificationInterval = setInterval(() => {
      this.fetchNotifications();
    }, 10000);
  }

  clearNotificationInterval(): void {
    if (this.notificationInterval) {
      clearInterval(this.notificationInterval);
    }
  }
  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  fetchNotifications(): void {
    this.notificationService.getAllNotifs()
    .pipe(
      map((notifs: Notif[]) => notifs.filter(notif => notif.user.id === this.user?.id && notif.state === 'unread'))
    )
    .subscribe(filteredNotifs => {
      this.notifs = filteredNotifs;
      console.log('Notificaions:', this.notifs);
    }, error => {
      console.error('Error fetching filtered notifications:', error);
    });
  }
  markNotificationAsRead(notif: Notif): void {
    this.notificationService.readNotification(notif._id)
    .subscribe(() => {
      notif.state = 'read';
    }, error => {
      console.error('Error marking notification as read:', error);
    });
  }
  

  // fetchNotifications() {
  //   this.notificationService.getAllNotifs().subscribe(
  //     (data) => {
  //       // Update notifications array with new notifications
  //       this.notifications = data;
  //       console.log("Notifications: ", this.notifications);
  //     },
  //     (error) => {
  //       console.error('Error fetching notifications:', error);
  //     }
  //   );
  // }

  logout(){
    this.authService.logout();
    this.clearNotificationInterval();
    this.router.navigateByUrl('/auth/login');
  }
}
