import { Component, OnInit, ViewChild } from '@angular/core';
import { OfferService } from '../../services/offer.service';
import { RequestService } from '../../services/request.service';
import { Offer } from '../../models/Offer';
import { map } from 'rxjs/operators';
import { DeliveryAddOfferComponent } from '../delivery-add-offer/delivery-add-offer.component';
import { DeliveryOfferDetailsComponent } from '../delivery-offer-details/delivery-offer-details.component';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';

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
        map((offers: Offer[]) => offers.filter(offer => offer.type === 'Delivery'))
      )
      .subscribe(filteredOffers => {
        this.offers = filteredOffers;
        console.log('Filtered offers fetched successfully:', this.offers);
      }, error => {
        console.error('Error fetching filtered offers:', error);
      });
  }

  handlePostedOffer(form: any){
    this.offerService.postOffer(form)
    .subscribe(response => {
      console.log('Offer added successfully:', response);
      this.ngOnInit();
    }, error => {
      console.error('Error adding Offer:', error);
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
