import { Component, OnInit, ViewChild } from '@angular/core';
import { OfferService } from '../../services/offer.service';
import { PostOfferModalComponent } from '../post-offer-modal/post-offer-modal.component';
import { CarpoolingDetailsModalComponent } from '../carpooling-details-modal/carpooling-details-modal.component';
import { RequestModalComponent } from '../request-modal/request-modal.component';
import { RequestService } from '../../services/request.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Offer } from '../../models/Offer';
import { map } from 'rxjs/operators';
import { User } from '../../models/User';


@Component({
  selector: 'app-carpooling-home',
  templateUrl: './carpooling-home.component.html',
  styleUrl: './carpooling-home.component.css'
})
export class CarpoolingHomeComponent implements OnInit{
  offers?: any[];
  locations: string[]=[];
  user: User;
  selectedOffer: any;
  isLoggedIn: boolean= false;

  @ViewChild('modal') modal?: PostOfferModalComponent;
  @ViewChild('modal2') modal2?: CarpoolingDetailsModalComponent;
  @ViewChild('modal3') modal3?: RequestModalComponent;
  filters: any;


  recupererOffre(offer: any){
  this.selectedOffer = offer;
  }

  constructor(private offerService: OfferService, private requestService:RequestService, private authService:AuthService){
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn){
      console.log('User is authenticated');
  }

  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.user = this.authService.getUser();
    this.fetchAllCarpoolingOffers();
  }


  fetchAllCarpoolingOffers(): void {
    this.offerService.getAllOffers()
    .pipe(
      map((offers: Offer[]) => offers.filter(offer => offer.type === 'Carpooling'))
    )
    .subscribe(filteredOffers => {
      this.offers = filteredOffers;
      console.log('Filtered offers fetched successfully:', this.offers);
    }, error => {
      console.error('Error fetching filtered offers:', error);
    });
  }

  openModal(): void {
    this.modal?.openModal();
  }
  openModal2(): void {
    this.modal2?.openModal();
  }

  handlePostedOffer(offerData: any) {

    this.offerService.postOffer(offerData)
        .subscribe(response => {
          console.log('Offer posted successfully:', response);
          this.fetchAllCarpoolingOffers();
        }, error => {
          console.error('Error posting the offer:', error);
        });
  }

  openRequestModal() {
    this.modal3?.openModal();
  }

  closeRequestModal() {
    this.modal3?.closeModal();
  }

  handleRequestPosted(requestData: any) {
    this.requestService.postRequest(requestData)
    .subscribe(response => {
      console.log('Request sent successfully:', response);
      this.ngOnInit();
      // Handle success response
    }, error => {
      console.error('Error sending request:', error);
      // Handle error response
    });
  }

  getfilters(f : any) {
    this.filters = f
  }

  handleToBeDeletedOffer(offer: Offer){
    this.offerService.deleteOffer(offer._id.toString())
    .subscribe(response => {
      console.log('Offer deleted successfully:', response);
      this.ngOnInit();
    }, error => {
      console.error('Error adding Offer:', error);
    });
  }

}
