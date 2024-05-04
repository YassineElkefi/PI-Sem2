import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Offer } from '../../models/Offer';
import { User } from '../../models/User';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-delivery-send-request',
  templateUrl: './delivery-send-request.component.html',
  styleUrl: './delivery-send-request.component.css'
})
export class DeliverySendRequestComponent {

  isOpen = false;
  arrival = '';
  departure = '';
  locationOptions: string[] = ['Yasminet', 'Mourouj', 'Tekup'];
  selectedPickup = "";
  selectedArrival="";
  @Input() selectedOffer?: Offer;
  @Output() requestToHome = new EventEmitter();
  @Input() user: User;


  constructor(private authService: AuthService) { }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  sendRequest() {
    if (!this.selectedOffer) {
      console.error('Selected offer is undefined!');
      return;
    }
    const requestData = {
      arrival: this.selectedArrival,
      departure: this.selectedPickup,
      offer: this.selectedOffer,
      state:'Pending',
      sender:this.authService.getUser() ,
      receiver:this.selectedOffer.offeror,
    }

    this.requestToHome.emit(requestData);
  }
}
