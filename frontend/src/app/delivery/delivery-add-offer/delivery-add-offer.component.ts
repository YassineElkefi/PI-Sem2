import { Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { User } from '../../models/User';

@Component({
  selector: 'app-delivery-add-offer',
  templateUrl: './delivery-add-offer.component.html',
  styleUrl: './delivery-add-offer.component.css'
})
export class DeliveryAddOfferComponent{
  isOpen: boolean = false;
  locations: string[] = [''];
  locationOptions: string[] = [
    "Ariana",
    "Béja",
    "Ben Arous",
    "Bizerte",
    "Gabès",
    "Gafsa",
    "Jendouba",
    "Kairouan",
    "Kasserine",
    "Kebili",
    "Kef",
    "Mahdia",
    "Manouba",
    "Medenine",
    "Monastir",
    "Nabeul",
    "Sfax",
    "Sidi Bouzid",
    "Siliana",
    "Sousse",
    "Tataouine",
    "Tozeur",
    "Tunis",
    "Zaghouan"
];

  isLoggedIn: boolean = false;
  @Input() user: User;
  
  @Output() offerToHome = new EventEmitter();

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


  onSubmit(form: any) {
    form.path =this.locations;
    form.type = "Delivery";
    form.state = "pending";
    form.offeror = this.user;
    console.log(form);
    this.sendOffer(form);
    this.myForm.resetForm();
  }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  sendOffer(form: any): void{
    this.offerToHome.emit(form);
    
  }
}
