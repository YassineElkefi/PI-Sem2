import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-request-modal',
  templateUrl: './request-modal.component.html',
  styleUrl: './request-modal.component.css'
})
export class RequestModalComponent {

  @Input() selectedOffer: any;
  @Output() requestToHome = new EventEmitter();

  isOpen = false;
  arrival = '';
  departure = '';
  
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
      offer: this.selectedOffer._id,
      state:'Pending',
      sender:'testUser',
      receiver:this.selectedOffer.offerer,
    }

    this.requestToHome.emit(requestData);
  }
}
