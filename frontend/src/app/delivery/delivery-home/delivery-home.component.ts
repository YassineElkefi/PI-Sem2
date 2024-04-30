import { Component, OnInit } from '@angular/core';
import { OfferService } from '../../offer.service';
import { RequestService } from '../../request.service';
import { Offer } from '../../models/Offer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-delivery-home',
  templateUrl: './delivery-home.component.html',
  styleUrl: './delivery-home.component.css'
})
export class DeliveryHomeComponent implements OnInit{
  constructor(private offerService: OfferService, private requestService:RequestService){}
  filters?: any
  offers: Offer[] = []

  ngOnInit(): void{
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

}
