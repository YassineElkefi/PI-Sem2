import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { OfferService } from '../services/offer.service';
import { RequestService } from '../services/request.service';
import { map } from 'rxjs';
import { OffersRequestsComponent } from '../offers-requests/offers-requests.component';
import { UserServiceService } from '../services/user-service.service';
import { Offer } from '../models/Offer';

@Component({
  selector: 'app-offers-management',
  templateUrl: './offers-management.component.html',
  styleUrl: './offers-management.component.css'
})
export class OffersManagementComponent {
  carpoolingOffers:any;
  deliveryOffers:any;
  userId: string;
  selectedOffer:any;
  user:any = {};
  @ViewChild('offerRequestsModal') offersRequestsModal?: OffersRequestsComponent;


  constructor(private route: ActivatedRoute, private userService:UserServiceService, private cookieService:CookieService,private offerService: OfferService,private requestService: RequestService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['_id'];
      this.userService.getUserById(this.userId).subscribe(user => {
        this.user = user;
        console.log(this.user);
      });
    });
    this.fetchCarpoolingOffers();
    this.fetchDeliveryOffers();
  }

  fetchCarpoolingOffers(): void {
    this.offerService.getAllOffers()
      .pipe(
        map((offers: Offer[]) => offers.filter((offer) => offer.type === 'Carpooling' && offer.offeror.id === this.userId))
      )
      .subscribe({
        next: (filteredOffers) => {
          this.carpoolingOffers = filteredOffers;
          console.log('Filtered Carpooling offers fetched successfully:', this.carpoolingOffers);
        },
        error: (error) => {
          console.error('Error fetching filtered Carpooling offers:', error);
        },
      });
  }
  
  fetchDeliveryOffers(): void {
    this.offerService.getAllOffers()
      .pipe(
        map((offers: Offer[]) => offers.filter((offer) => offer.type === 'Delivery' && offer.offeror.id === this.userId))
      )
      .subscribe({
        next: (filteredOffers) => {
          this.deliveryOffers = filteredOffers;
          console.log('Filtered Delivery offers fetched successfully:', this.deliveryOffers);
        },
        error: (error) => {
          console.error('Error fetching filtered Delivery offers:', error);
        },
      });
  }

  openPostOfferModal(): void {
    this.offersRequestsModal?.openModal();
  }

  recuperer(offer) {
    this.selectedOffer = offer;
    this.openPostOfferModal();
    }
}
