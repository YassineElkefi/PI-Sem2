import { Component, OnInit, ViewChild } from '@angular/core';
import { OfferService } from '../../offer.service';
import { PostOfferModalComponent } from '../post-offer-modal/post-offer-modal.component';
import { CarpoolingDetailsModalComponent } from '../carpooling-details-modal/carpooling-details-modal.component';
import { RequestModalComponent } from '../request-modal/request-modal.component';
import { RequestService } from '../../request.service';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carpooling-home',
  templateUrl: './carpooling-home.component.html',
  styleUrl: './carpooling-home.component.css'
})
export class CarpoolingHomeComponent implements OnInit{

  selectedOffer: any;
  recupererOffre(offer: any){
  this.selectedOffer = offer;
  }

  @ViewChild('modal') modal?: PostOfferModalComponent;
  @ViewChild('modal2') modal2?: CarpoolingDetailsModalComponent;
  @ViewChild('modal3') modal3?: RequestModalComponent;

isLoggedIn: boolean= false;

constructor(private offerService: OfferService, private requestService:RequestService, private authService:AuthService, private router: Router){
  this.isLoggedIn = this.authService.isAuthenticated();
  if (this.isLoggedIn){
    console.log('User is authenticated');
 }

}



offers?: any[];
locations: string[]=[];
user:any;

ngOnInit(): void {
  this.isLoggedIn = this.authService.isAuthenticated();
  this.user = this.authService.getUser();
  this.fetchAllCarpoolingOffers();
}


fetchAllCarpoolingOffers(): void {
  this.offerService.getAllOffers()
    .subscribe(response => {
      this.offers = response;
      console.log('All offers fetched successfully:', this.offers);
    }, error => {
      console.error('Error fetching offers:', error);
    });
}

openModal(): void {
  this.modal?.openModal();
}
openModal2(): void {
  this.modal2?.openModal();
}

handleOfferPosted(offerData: any) {

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
logout(){
  this.authService.logout();
  this.router.navigateByUrl('/auth/login');
}
}
