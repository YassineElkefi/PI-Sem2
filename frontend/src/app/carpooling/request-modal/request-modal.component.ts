import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../auth.service';

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
constructor(private authService: AuthService) { }
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
