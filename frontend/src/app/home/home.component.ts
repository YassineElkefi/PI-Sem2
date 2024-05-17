import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { OfferService } from '../services/offer.service';
import { User } from '../models/User';
import { Offer } from '../models/Offer';
import { RequestService } from '../services/request.service';
import { map, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit{
  stars: { filled: boolean }[] = [];
  showOfferRatingMessage: boolean = true;
  constructor(private cookieService: CookieService,private offerService:OfferService, private dialog: MatDialog) { }
  user: any;
  completedOffer: Offer;
  totalStars: number = 10;
  ngOnInit(): void {

    this.stars = [];
    for (let i = 0; i < this.totalStars; i++) {
    this.stars.push({ filled: false });
  }
    this.resetStars();
    if (this.cookieService.get('userData')) {
      this.user = JSON.parse(this.cookieService.get('userData'));
      this.offerService.getAllOffers()
      .pipe(
        map((offers: any[]) =>
        offers.filter((offer) => offer.state === 'Completed').filter((offer) => {
        return !this.user?.haveRated && offer.participants.some((participant) => participant.id === this.user?.id);
      })
    )
  )
  .subscribe({
    next: (notRatedOffers) => {
      console.log("Completed offers where user hasn't rated: ", notRatedOffers);

      const completedOffer = notRatedOffers.find((offer) => offer._id === this.user?.currentOffer);
      if (completedOffer) {
        this.completedOffer = completedOffer;
        this.showOfferRatingMessage = true;
        this.triggerModalButtonClick();
      }
    },
    error: (error) => {
      console.error('Error fetching completed offers:', error);
    }
  });
    } else {
      console.log('User is not authenticated');
    }
  }
  ngAfterViewInit(): void {
    if (this.user?.haveRated === false && this.user?.currentOffer._id === this.completedOffer?._id) {
      this.showOfferRatingMessage = true;
      this.triggerModalButtonClick();
    }
  }

  hoverStar(index: number): void {
    this.resetStars();
  
    for (let i = 0; i <= index; i++) {
      this.stars[i].filled = true;
    }
  }
  
  resetStars(): void {
    for (let i = 0; i < this.stars.length; i++) {
      this.stars[i].filled = false;
    }
  }

  rateOffer(index: number): void {
    if (this.completedOffer) {
      const offerId = this.completedOffer._id;
      const userId = this.user?.id;
      const rating = index + 1;
  
      this.offerService.rateOffer(offerId, userId, rating).subscribe({
    next: (response) => {
      console.log('Rating successful:', response);
      this.user.haveRated = true;
      const cookieOptions = this.cookieService.get('userData');
      this.cookieService.set('userData', JSON.stringify(this.user), null, cookieOptions);
    },
    error: (error) => {
      console.error('Error rating offer:', error);
    }
  });

    } else {
      console.error('completedOffer is not defined');
    }
  
    console.log(`Rated with ${index + 1} stars`);
}
  triggerModalButtonClick() {
    const button = document.getElementById('openModalButton');
    button.click();
  }

  closePopup() {
    console.log('Closing popup');
    this.showOfferRatingMessage = false;
  }
  
  teamMembers = [
    { name: 'John Doe', role: 'Frontend Developer', imageUrl: 'team-1.jpg' },
    { name: 'Jane Smith', role: 'Backend Developer', imageUrl: 'team-2.jpg' },
    { name: 'Alice Johnson', role: 'UI/UX Designer', imageUrl: 'team-3.jpg' },
    { name: 'Bob Brown', role: 'Project Manager', imageUrl: 'team-4.jpg' },
    { name: 'Eva White', role: 'Quality Assurance', imageUrl: 'team-1.jpg' },
    { name: 'Eva White', role: 'Quality Assurance', imageUrl: 'team-2.jpg' },
    { name: 'Eva White', role: 'Quality Assurance', imageUrl: 'team-3.jpg' },
    { name: 'Eva White', role: 'Quality Assurance', imageUrl: 'team-4.jpg' },
    { name: 'Eva White', role: 'Quality Assurance', imageUrl: 'team-1.jpg' },
    { name: 'Eva White', role: 'Quality Assurance', imageUrl: 'team-2.jpg' },
    { name: 'Eva White', role: 'Quality Assurance', imageUrl: 'team-3.jpg' },
    { name: 'Eva White', role: 'Quality Assurance', imageUrl: 'team-4.jpg' },
    { name: 'Eva White', role: 'Quality Assurance', imageUrl: 'team-1.jpg' },
    { name: 'Eva White', role: 'Quality Assurance', imageUrl: 'team-2.jpg' },
    { name: 'Eva White', role: 'Quality Assurance', imageUrl: 'team-3.jpg' },
    { name: 'Eva White', role: 'Quality Assurance', imageUrl: 'team-4.jpg' }
  ];
}