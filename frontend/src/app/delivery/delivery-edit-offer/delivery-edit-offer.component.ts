import { Component, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
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
  
  @Output() offerToItem = new EventEmitter();
  @Input() selectedOffer?: Offer;

  @ViewChild('f') myForm: NgForm;

  constructor(private authService: AuthService) { }

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
   
    /*this.isLoggedIn = this.authService.isAuthenticated();
    this.user = this.authService.getUser();*/

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

  sendOffer(form: any): void{
    this.offerToItem.emit(form);
    
  }
}
