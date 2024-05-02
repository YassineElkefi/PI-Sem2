import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/User';
import { Router } from '@angular/router';
import { Offer } from '../../models/Offer';

@Component({
  selector: 'app-carpooling-details-modal',
  templateUrl: './carpooling-details-modal.component.html',
  styleUrl: './carpooling-details-modal.component.css'
})
export class CarpoolingDetailsModalComponent {
  isOpen: boolean = false;
  @Input() user?: User;
  @Input() selectedOffer?: Offer;
  @Output() request = new EventEmitter();
  @Output() OfferToBeDeletedToHome = new EventEmitter();

constructor(private router: Router){}

  openModal() {
    this.isOpen = true;
    console.log(this.selectedOffer);
    
  }

  closeModal() {
    this.isOpen = false;
  }

  deleteOffer(){
    this.OfferToBeDeletedToHome.emit(this.selectedOffer);
  }

  sendToLogin(){
    this.router.navigateByUrl('/auth');
  }

  onRequest(){
    this.request.emit();
  }
}
