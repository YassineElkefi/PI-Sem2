import { Component, Input, OnChanges } from '@angular/core';
import { User } from '../models/User';
import { RequestService } from '../services/request.service';
import { map } from 'rxjs';
import { OfferService } from '../services/offer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-offers-requests',
  templateUrl: './offers-requests.component.html',
  styleUrls: ['./offers-requests.component.css']
})
export class OffersRequestsComponent implements OnChanges {
  constructor(private requestService: RequestService, private offerService: OfferService) { }

  isOpen: boolean = false;
  user?: User;
  requests: any[] = [];
  @Input() selectedOffer?: any;
  offerRequests: any[] = [];
  
  ngOnChanges(): void {
    if (this.selectedOffer) {
      this.fetchAllRequests();
    }
  }

  openModal() {
    this.isOpen = true; 
  }

  fetchAllRequests(): void {
    if (this.selectedOffer?._id) {
      this.requestService.getAllRequests()
        .pipe(
          map((requests: any[]) => requests.filter((request) =>
            request.offer?._id === this.selectedOffer._id && request.state === 'Pending'
          ))
        )
        .subscribe({
          next: (filteredRequests) => {
            this.offerRequests = filteredRequests;
            console.log('Filtered requests fetched successfully:', this.offerRequests);
          },
          error: (error) => {
            console.error('Error fetching filtered requests:', error);
          },
        });
    } else {
      console.warn('Selected offer ID not available for fetching requests.');
    }
  }
  

  acceptRequest(id: string): void {
    console.log(id);
    this.offerService.acceptRequest(id)
      .subscribe({
        next: (response) => {
          console.log('Request accepted successfully:', response);
          this.ngOnChanges();
        },
        error: (error) => {
          if (error.status === 400) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'This offer is full',
              confirmButtonColor: '#C21515',
            });
          } else {
            console.error('Error accepting the request:', error);
          }
        },
      });
  }
  
  
  
  declineRequest(id: string): void {
    this.offerService.declineRequest(id)
      .subscribe({
        next: (response) => {
          console.log('Request declined successfully:', response);
          this.ngOnChanges();
        },
        error: (error) => {
          console.error('Error declining the request:', error);
        },
      });
  }
  
  completeOffer(id: any): void {
    if (this.selectedOffer?._id) {
      this.offerService.completeOffer(this.selectedOffer._id)
        .subscribe({
          next: (response) => {
            console.log('Offer completed successfully:', response);
            this.ngOnChanges();
          },
          error: (error) => {
            console.error('Error completing the offer:', error);
          },
        });
    } else {
      console.warn('Selected offer ID not available for completion.');
    }
  }
  
  
}
