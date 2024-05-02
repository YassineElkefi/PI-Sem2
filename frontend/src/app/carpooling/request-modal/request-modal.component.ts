import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Offer } from '../../models/Offer';

@Component({
  selector: 'app-request-modal',
  templateUrl: './request-modal.component.html',
  styleUrl: './request-modal.component.css'
})
export class RequestModalComponent {

  isOpen = false;
  arrival = '';
  departure = '';

  @Input() selectedOffer?: Offer;
  @Output() requestToHome = new EventEmitter();


  constructor(private authService: AuthService) { }

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
      sender:this.authService.getUser() ,
      receiver:this.selectedOffer.offeror,
    }

    this.requestToHome.emit(requestData);
  }
}
