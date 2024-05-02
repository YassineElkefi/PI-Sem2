import { Component, OnInit, ViewChild } from '@angular/core';
import { OfferService } from '../../services/offer.service';
import { PostOfferModalComponent } from '../post-offer-modal/post-offer-modal.component';
import { CarpoolingDetailsModalComponent } from '../carpooling-details-modal/carpooling-details-modal.component';
import { RequestModalComponent } from '../request-modal/request-modal.component';
import { RequestService } from '../../services/request.service';
import { AuthService } from '../../services/auth.service';
import { Offer } from '../../models/Offer';
import { map } from 'rxjs/operators';
import { User } from '../../models/User';
import { CarpoolingEditOfferComponent } from '../carpooling-edit-offer/carpooling-edit-offer.component';


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

  @ViewChild('postOfferModal') postOffer?: PostOfferModalComponent;
  @ViewChild('offerDetailsModal') offerDetails?: CarpoolingDetailsModalComponent;
  @ViewChild('sendRequestModal') sendRequest?: RequestModalComponent;
  @ViewChild('editOfferModal') editOffer?: CarpoolingEditOfferComponent;
  filters: any;


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

  
  recupererOffre(offer: any){
    this.selectedOffer = offer;
    }

  getfilters(f : any) {
    this.filters = f
  }
  
  openPostOfferModal(): void {
    this.postOffer?.openModal();
  }

  openOfferDetailsModal(): void {
    this.offerDetails?.openModal();
  }

  openRequestModal() {
    this.sendRequest?.openModal();
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

  handleRequestPosted(requestData: any) {
    this.requestService.postRequest(requestData)
    .subscribe(response => {
      console.log('Request sent successfully:', response);
      this.ngOnInit();
    }, error => {
      console.error('Error sending request:', error);
    });
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
