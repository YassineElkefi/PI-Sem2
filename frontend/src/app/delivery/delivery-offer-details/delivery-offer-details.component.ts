import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Offer } from '../../models/Offer';

@Component({
  selector: 'app-delivery-offer-details',
  templateUrl: './delivery-offer-details.component.html',
  styleUrl: './delivery-offer-details.component.css'
})
export class DeliveryOfferDetailsComponent {
  isOpen: boolean = false;
  
  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }
  @Input() selectedOffer?: Offer;
  
  @Output() request = new EventEmitter();

  onRequest(){
    this.request.emit();
  }
}
