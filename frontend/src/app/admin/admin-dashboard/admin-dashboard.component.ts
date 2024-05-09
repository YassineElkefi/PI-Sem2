import { Component, OnInit } from '@angular/core';
import { OfferService } from '../../services/offer.service';
import { map } from 'rxjs/operators';
import { Offer } from '../../models/Offer';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{


  Data: { key: string, value: number }[] = [];

  deliveryOffers: number = 0;
  carpoolingOffers: number = 0;
  users: number = 0;

  constructor(private offerService : OfferService, private userService: UserServiceService){};

  ngOnInit(): void {
      this.fetchAllOffers();
      this.fetchAllUsers();
  }
  
  fetchAllOffers(): void {
    this.offerService.getAllOffers()
      .pipe(
        map((offers: Offer[]) => offers.filter(offer => offer.type === 'Carpooling'))
      )
      .subscribe(filteredOffers => {
        this.carpoolingOffers = filteredOffers.length;
        this.Data.push({ key: 'Carpooling Offers', value: this.carpoolingOffers });
        console.log('Filtered Carpooling offers fetched successfully:', this.Data);
      }, error => {
        console.error('Error fetching filtered Carpooling offers:', error);
      });
  
  

    this.offerService.getAllOffers()
    .pipe(
      map((offers: Offer[]) => offers.filter(offer => offer.type === 'Delivery'))
    )
    .subscribe(filteredOffers => {
      this.deliveryOffers = filteredOffers.length;
      this.Data.push({ key: 'Delivery Offers', value: this.deliveryOffers });
      console.log('Filtered offers fetched successfully:', this.Data);
    }, error => {
      console.error('Error fetching filtered offers:', error);
    });
  }

  fetchAllUsers(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users.length - 1;
      this.Data.push({ key: 'Users', value: this.users });
      console.log('Users fetched successfully:', this.Data);
    }, error => {
      console.error('Error fetching users:', error);
    });
  }
  

}
