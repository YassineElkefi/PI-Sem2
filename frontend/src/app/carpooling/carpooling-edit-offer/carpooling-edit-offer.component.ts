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

  @ViewChild('f') myForm: NgForm;

  ngOnInit(): void {
    console.log(this.selectedOffer);
  }

  addLocation() {
    this.locations.push('');
  }

  registerPath() {
    this.locations = this.locations.filter(location => location.trim() !== '');
  }

  removeLocation(index: number) {
    this.locations.splice(index, 1);
  }

  onSubmit(form: any) {
    /*form.path =this.locations;
    form.type = "Delivery";
    form.state = "pending";
    form.offeror = null;
    console.log(form);
    this.sendOffer(form);
    this.myForm.resetForm();*/
  }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }
}
