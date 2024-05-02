import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Offer } from '../../models/Offer';
import { User } from '../../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-offer-details',
  templateUrl: './delivery-offer-details.component.html',
  styleUrl: './delivery-offer-details.component.css'
})
export class DeliveryOfferDetailsComponent{

  isOpen: boolean = false;
  @Input() user?: User;
  @Input() selectedOffer?: Offer;
  @Output() sendRequest = new EventEmitter();
  @Output() OfferToBeDeletedToHome = new EventEmitter();

  constructor(private router: Router){}

  deleteOffer(){
    this.OfferToBeDeletedToHome.emit(this.selectedOffer);
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
