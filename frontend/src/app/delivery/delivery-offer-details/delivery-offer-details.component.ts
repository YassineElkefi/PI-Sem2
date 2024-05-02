import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Offer } from '../../models/Offer';
import { User } from '../../models/User';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-delivery-offer-details',
  templateUrl: './delivery-offer-details.component.html',
  styleUrl: './delivery-offer-details.component.css'
})
export class DeliveryOfferDetailsComponent implements OnInit{
  user: User;
  isLoggedIn: boolean= false;
  isOpen: boolean = false;
  @Input() selectedOffer?: Offer;
  @Output() sendRequest = new EventEmitter();
  @Output() OfferToBeDeletedToHome = new EventEmitter();

  constructor(private router: Router, private authService: AuthService){
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn){
      console.log('User is authenticated');
   }
  }

  deleteOffer(){
    this.OfferToBeDeletedToHome.emit(this.selectedOffer);
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.user = this.authService.getUser();
  }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }
  
  sendToLogin(){
    this.router.navigateByUrl('/auth');
  }

  onRequest(){
    this.sendRequest.emit();
  }
}
