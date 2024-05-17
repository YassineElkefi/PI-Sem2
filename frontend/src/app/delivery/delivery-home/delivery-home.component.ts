import { Component, OnInit, ViewChild } from '@angular/core';
import { OfferService } from '../../services/offer.service';
import { RequestService } from '../../services/request.service';
import { Offer } from '../../models/Offer';
import { map } from 'rxjs/operators';
import { DeliveryAddOfferComponent } from '../delivery-add-offer/delivery-add-offer.component';
import { DeliveryOfferDetailsComponent } from '../delivery-offer-details/delivery-offer-details.component';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';
import { DeliverySendRequestComponent } from '../delivery-send-request/delivery-send-request.component';
import { DeliveryEditOfferComponent } from '../delivery-edit-offer/delivery-edit-offer.component';

@Component({
  selector: 'app-delivery-home',
  templateUrl: './delivery-home.component.html',
  styleUrl: './delivery-home.component.css'
})
export class DeliveryHomeComponent implements OnInit{
  
  filters?: any
  offers: Offer[] = []
  selectedOffer: Offer;
  user: User;
  isLoggedIn: boolean= false;

  @ViewChild('addModal') addModal?: DeliveryAddOfferComponent;
  @ViewChild('detailsModal') detailsModal?: DeliveryOfferDetailsComponent;
  @ViewChild('sendRequestModal') sendRequest?: DeliverySendRequestComponent;
  @ViewChild('editOfferModal') editOffer?: DeliveryEditOfferComponent;
  
  constructor(private offerService: OfferService, private requestService:RequestService, private authService:AuthService){
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn){
      console.log('User is authenticated');
   }
  }
  
  handleIncomingOffer(offer: Offer){
    this.selectedOffer = offer;
  }

  openAddModal(): void {
    this.addModal?.openModal();
  }

  openDetailsModal(): void {
    this.detailsModal?.openModal();
  }

  ngOnInit(): void{
    this.isLoggedIn = this.authService.isAuthenticated();
    this.user = this.authService.getUser();
    this.fetchAllOffers();
  }

  getfilters(f : any) {
    this.filters = f
  }

  fetchAllOffers(): void {
    this.offerService.getAllOffers()
      .pipe(
        map((offers: Offer[]) => offers.filter((offer) => offer.type === 'Delivery' && offer.nb_pkg > 0))
      )
      .subscribe({
        next: (filteredOffers) => {
          this.offers = filteredOffers;
          console.log('Filtered offers fetched successfully:', this.offers);
        },
        error: (error) => {
          console.error('Error fetching filtered offers:', error);
        },
      });
  }
  

  handlePostedOffer(form: any) {
    this.offerService.postOffer(form)
      .subscribe({
        next: (response) => {
          console.log('Offer added successfully:', response);
          this.ngOnInit();
        },
        error: (error) => {
          console.error('Error adding Offer:', error);
        },
      });
  }
  

  handleUpdatedOffer(offerData: any) {
    this.offerService.editOffer(this.selectedOffer._id.toString(), offerData)
      .subscribe({
        next: (response) => {
          console.log('Offer updated successfully:', response);
          this.ngOnInit();
        },
        error: (error) => {
          console.error('Error updating the offer:', error);
        },
      });
  }
  

  handleToBeDeletedOffer(offer: Offer) {
    this.offerService.deleteOffer(offer._id.toString())
      .subscribe({
        next: (response) => {
          console.log('Offer deleted successfully:', response);
          this.ngOnInit();
        },
        error: (error) => {
          console.error('Error deleting offer:', error);
        },
      });
  }
  

  handleRequestPosted(requestData: any) {
    this.requestService.postRequest(requestData)
      .subscribe({
        next: (response) => {
          console.log('Request sent successfully:', response);
          this.ngOnInit();
        },
        error: (error) => {
          console.error('Error sending request:', error);
        },
      });
  }
  

}
