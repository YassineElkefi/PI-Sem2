import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Offer } from '../../models/Offer';
import { User } from '../../models/User';

@Component({
  selector: 'app-request-modal',
  templateUrl: './request-modal.component.html',
  styleUrl: './request-modal.component.css'
})
export class RequestModalComponent implements OnInit {

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

  ngOnInit(): void {
    console.log(this.selectedOffer);
  }
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
