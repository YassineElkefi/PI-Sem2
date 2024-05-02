import { Component, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Offer } from '../../models/Offer';

@Component({
  selector: 'app-delivery-edit-offer',
  templateUrl: './delivery-edit-offer.component.html',
  styleUrl: './delivery-edit-offer.component.css'
})
export class DeliveryEditOfferComponent {
  isOpen: boolean = false;
  locations: string[] = [''];
  locationOptions: string[] = ['Yasminet', 'Mourouj', 'Tekup'];
  isLoggedIn: boolean = false;
  user: any;
  @Output() updatedOfferToHome = new EventEmitter();
  @Output() offerToItem = new EventEmitter();
  @Input() selectedOffer?: Offer;

  @ViewChild('f') myForm: NgForm;

  constructor() { }

  addLocation() {
    this.locations.push('');
  }

  registerPath() {
    this.locations = this.locations.filter(location => location.trim() !== '');
  }

  removeLocation(index: number) {
    this.locations.splice(index, 1);
  }

  ngOnInit(): void {
    console.log(this.selectedOffer);

    }

  onSubmit(form: any) {
    this.sendUpdatedOffer(form);
    this.myForm.resetForm();
  }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  sendUpdatedOffer(form: any){
    this.updatedOfferToHome.emit(form);
  }
}
