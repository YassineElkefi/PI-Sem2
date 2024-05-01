import { Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-delivery-add-offer',
  templateUrl: './delivery-add-offer.component.html',
  styleUrl: './delivery-add-offer.component.css'
})
export class DeliveryAddOfferComponent implements OnInit {
  isOpen: boolean = false;
  locations: string[] = [''];
  locationOptions: string[] = ['Yasminet', 'Mourouj', 'Tekup'];
  isLoggedIn: boolean = false;
  user: any;
  
  @Output() offerToHome = new EventEmitter();

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
   
    this.isLoggedIn = this.authService.isAuthenticated();
    this.user = this.authService.getUser();

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
