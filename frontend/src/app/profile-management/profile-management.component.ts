import { Component, Input, ViewChild, viewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { CookieService } from 'ngx-cookie-service';
import { OfferService } from '../services/offer.service';
import { map } from 'rxjs';
import { RequestService } from '../services/request.service';
import { ComplaintModalComponent } from '../complaint-modal/complaint-modal.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile-management',
  templateUrl: './profile-management.component.html',
  styleUrl: './profile-management.component.css'
})
export class ProfileManagementComponent {

  userId: string;
  user:any = {};
  haveCar: boolean = false;
  car: string= '';
  selectedRequest: any;
  @ViewChild('complaintModal') complaintModal?: ComplaintModalComponent;

  newAvatar: File;
  carpoolingOffers:any;
  deliveryOffers:any;
  requests:any;

  constructor(private route: ActivatedRoute, private userService:UserServiceService, private cookieService:CookieService,private offerService: OfferService,private requestService: RequestService,private router:Router, private authService:AuthService) { }

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

    this.offerService.getAllOffers()
  .pipe(
    map((offers: any[]) => offers.filter((offer) => offer.type === 'Carpooling' && offer.offeror.id === this.userId))
  )
  .subscribe({
    next: (filteredOffers) => {
      this.carpoolingOffers = filteredOffers;
      console.log('Filtered offers fetched successfully:', this.carpoolingOffers);
    },
    error: (error) => {
      console.error('Error fetching filtered offers:', error);
    }
  });

  this.offerService.getAllOffers()
  .pipe(
    map((offers: any[]) => offers.filter((offer) => offer.type === 'Delivery' && offer.offeror.id === this.userId))
  )
  .subscribe({
    next: (filteredOffers) => {
      this.deliveryOffers = filteredOffers;
      console.log('Filtered offers fetched successfully:', this.deliveryOffers);
    },
    error: (error) => {
      console.error('Error fetching filtered offers:', error);
    }
  });

  this.requestService.getAllRequests()
  .pipe(
    map((requests: any[]) => requests.filter((request) => request.sender.id === this.userId))
  )
  .subscribe({
    next: (filteredRequests) => {
      this.requests = filteredRequests;
      console.log('Filtered requests fetched successfully:', this.requests);
    },
    error: (error) => {
      console.error('Error fetching filtered requests:', error);
    }
  });

  }


  onAvatarChange(event: any) {
    this.newAvatar = event.target.files[0];
  }

  saveAvatar() {
    if (!this.newAvatar) {
      return;
    }

    this.userService.updateAvatar(this.userId, this.newAvatar)
  .subscribe({
    next: (response) => {
      console.log('Avatar updated successfully:', response);
      this.user.avatar = response.user.avatar;
    
      const userDataString = this.cookieService.get('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        userData.avatar = response.user.avatar;
        this.cookieService.set('userData', JSON.stringify(userData), null, this.cookieService.get('userData')); // Assuming cookieService.get('userData') returns cookie options
      }
    },
    error: (error) => {
      console.error('Failed to update avatar:', error);
    }
  });
  }

  saveChanges() {
    if (!this.haveCar) {
             this.user.car = '';
    }
    this.userService.updateProfile(this.userId, this.user).subscribe({
    next: (response) => {
      console.log('Profile updated successfully:', response);
    },
    error: (error) => {
      console.error('Failed to update profile:', error);
    }
  });

  }

  recupererRequest(req:any) {
    this.selectedRequest = req;
    this.openComplaintModal()
    }

    openComplaintModal(): void {
      this.complaintModal?.openModal();
      console.log("Selected Request : ",this.selectedRequest);
      
    }

    deleteAccount(){
      this.userService.deleteAccount(this.userId).subscribe({
    next: (response) => {
      console.log('Account deleted successfully:', response);
      this.authService.logout();
      this.router.navigate(['/auth/register']);
    },
    error: (error) => {
      console.error('Failed to delete account:', error);
    }
  });

    }
}
