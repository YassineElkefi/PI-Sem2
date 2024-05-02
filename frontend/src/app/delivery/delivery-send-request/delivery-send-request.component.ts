import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Offer } from '../../models/Offer';
import { User } from '../../models/User';

@Component({
  selector: 'app-delivery-send-request',
  templateUrl: './delivery-send-request.component.html',
  styleUrl: './delivery-send-request.component.css'
})
export class DeliverySendRequestComponent {
  isOpen = false;
  arrival = '';
  departure = '';
  @Input() user?: User;
  @Input() selectedOffer?: Offer;
  @Output() requestToHome = new EventEmitter();


  constructor() { }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  sendRequest() {
    const requestData = {
      arrival: this.arrival,
      departure: this.departure,
      offer: this.selectedOffer,
      state:'Pending',
      sender:this.user,
      receiver:this.selectedOffer.offeror,
    }

    this.requestToHome.emit(requestData);
  }
}
