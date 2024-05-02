import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Offer } from '../../models/Offer';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-carpooling-edit-offer',
  templateUrl: './carpooling-edit-offer.component.html',
  styleUrl: './carpooling-edit-offer.component.css'
})
export class CarpoolingEditOfferComponent {
  isOpen: boolean = false;
  locations: string[] = [''];
  locationOptions: string[] = ['Yasminet', 'Mourouj', 'Tekup'];
  @Input() selectedOffer?: Offer;
  @Output() updatedOfferToHome = new EventEmitter();

  @ViewChild('f') myForm: NgForm;


  addLocation() {
    this.selectedOffer.path.push('');
  }

  removeLocation(index: number) {
    this.selectedOffer.path.splice(index, 1);
  }

  registerPath() {
    this.locations = this.locations.filter(location => location.trim() !== '');
  }

  onSubmit(form: any) {
    this.sendUpdatedOffer(form);
    this.myForm.resetForm();
  }

  openModal() {
    this.isOpen = true;
    console.log(this.selectedOffer);
  }

  closeModal() {
    this.isOpen = false;
  }

  sendUpdatedOffer(form: any){
    this.updatedOfferToHome.emit(form);
  }
}
