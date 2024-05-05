import { Component, Input, OnChanges } from '@angular/core';
import { Offer } from '../models/Offer';
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
  @Input() selectedOffer?: Offer;
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
    this.requestService.getAllRequests().pipe(
      map((requests: any) => requests.filter(request => request.offer?._id === this.selectedOffer?._id && request.state === 'Pending'))
    ).subscribe(filteredRequests => {      
      this.offerRequests = filteredRequests;
      console.log('Filtered requests fetched successfully:', this.offerRequests);
    }, error => {
      console.error('Error fetching filtered requests:', error);
    });
  }

  acceptRequest(id:any){
    console.log(id);
    this.offerService.acceptRequest(id).subscribe(response => {
      console.log('Request accepted successfully:', response);
      this.ngOnChanges();
    }
    , error => {
      if(error.status === 400){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'This offer is full',
          confirmButtonColor:"#C21515",
        });
      }
      console.error('Error accepting the request:', error);
    }
    );
  }
  
  
  declineRequest(id: any) {
    this.offerService.declineRequest(id)
        .subscribe(response => {
            console.log('Request declined successfully:', response);
            this.ngOnChanges();
        }, error => {
            console.error('Error declining the request:', error);
        });
  }
  
}
