import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-profile-management',
  templateUrl: './profile-management.component.html',
  styleUrl: './profile-management.component.css'
})
export class ProfileManagementComponent {

  userId: string;
  user:any;
  haveCar: boolean = false;
  car: string= '';

  newAvatar: File;

  constructor(private route: ActivatedRoute, private userService:UserServiceService, private cookieService:CookieService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['_id'];
      this.userService.getUserById(this.userId).subscribe(user => {
        this.user = user;
        this.haveCar = !!this.user.car;
        this.car = this.user.car || '';
        console.log(this.user);
      });
    });
  }

  onAvatarChange(event: any) {
    this.newAvatar = event.target.files[0];
  }

  saveAvatar() {
    if (!this.newAvatar) {
      return;
    }

    this.userService.updateAvatar(this.userId, this.newAvatar).subscribe(
      response => {
        console.log('Avatar updated successfully:', response);
        this.user.avatar = response.user.avatar;
        const userDataString = this.cookieService.get('userData');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          userData.avatar = response.user.avatar;
          const cookieOptions = this.cookieService.get('userData')
          this.cookieService.set('userData', JSON.stringify(userData), null, cookieOptions);
        }
      },
      error => {
        // Handle error
        console.error('Failed to update avatar:', error);
      }
    );
  }

  saveCar(){
    if (!this.haveCar) {
      this.car = '';
    }
    this.user.car = this.car;
    this.userService.updateCar(this.userId, this.user.car);
    this.ngOnInit();
}
}
