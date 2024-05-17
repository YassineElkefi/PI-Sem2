import { Component, OnInit } from '@angular/core';
import { OfferService } from '../../services/offer.service';
import { map } from 'rxjs/operators';
import { Offer } from '../../models/Offer';
import { UserServiceService } from '../../services/user-service.service';
import { ComplaintsService } from '../../services/complaints.service';
import { Complaint } from '../../models/Complaint';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{


  Data: { key: string, value: number }[] = [];
  complaints: Complaint[];
  deliveryOffers: number = 0;
  carpoolingOffers: number = 0;
  users: number = 0;

  constructor(private complaintService: ComplaintsService, private offerService : OfferService, private userService: UserServiceService){};

  ngOnInit(): void {
      this.fetchAllOffers();
      this.fetchAllUsers();
      this.loadComplaints();
      console.log(this.Data);
  }
  
  fetchAllOffers(): void {
    this.offerService.getAllOffers()
      .pipe(
        map((offers: Offer[]) => offers.filter((offer) => offer.type === 'Carpooling'))
      )
      .subscribe({
        next: (filteredOffers) => {
          this.carpoolingOffers = filteredOffers.length;
          this.Data.push({ key: 'Carpooling Offers', value: this.carpoolingOffers });
          console.log('Filtered Carpooling offers fetched successfully:', this.Data);
        },
        error: (error) => {
          console.error('Error fetching filtered Carpooling offers:', error);
        },
        complete: () => {
          console.log('Subscription to filtered Carpooling offers completed.');
        },
      });
  
      this.offerService.getAllOffers()
      .pipe(
        map((offers: Offer[]) => offers.filter((offer) => offer.type === 'Delivery'))
      )
      .subscribe({
        next: (filteredOffers) => {
          this.deliveryOffers = filteredOffers.length;
          this.Data.push({ key: 'Delivery Offers', value: this.deliveryOffers });
          console.log('Filtered Delivery offers fetched successfully:', this.Data);
        },
        error: (error) => {
          console.error('Error fetching filtered Delivery offers:', error);
        },
        complete: () => {
          console.log('Subscription to filtered Delivery offers completed.');
        },
      });
  }

  fetchAllUsers(): void {
    this.userService.getAllUsers()
      .subscribe({
        next: (users) => {
          this.users = users.length;
          this.Data.push({ key: 'Users', value: this.users });
          console.log('Users fetched successfully:', this.Data);
        },
        error: (error) => {
          console.error('Error fetching users:', error);
        },
        complete: () => {
          console.log('Subscription to users fetched completed.');
        },
      });
  }

  loadComplaints(): void {
    this.complaintService.findAllComplaints()
      .subscribe({
        next: (complaints: Complaint[]) => {
          this.complaints = complaints;
          this.Data.push({ key: 'Complaints', value: this.complaints.length });
          console.log('Complaints fetched successfully:', this.complaints);
        },
        error: (error) => {
          console.error('Error fetching complaints:', error);
        },
        complete: () => {
          console.log('Subscription to complaints fetched completed.');
        },
      });
  }
  

  respondToComplaint(response: any) {
    if (response.response) {
      this.complaintService.acceptComplaint(response.complaint._id)
        .subscribe({
          next: (complaint) => {
            console.log('Complaint approved:', complaint);
            response.complaint = null;
            this.ngOnInit(); 
          },
          error: (error) => {
            console.error('Complaint could not be approved:', error);
          },
        });
    } else {
      this.complaintService.rejectComplaint(response.complaint._id)
        .subscribe({
          next: (complaint) => {
            console.log('Complaint rejected:', complaint);
            response.complaint = null;
            this.ngOnInit();
          },
          error: (error) => {
            console.error('Complaint could not be rejected:', error);
          },
        });
    }
  }
  

}
