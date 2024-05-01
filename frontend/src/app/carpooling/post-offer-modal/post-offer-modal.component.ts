import { Component, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-offer-modal',
  templateUrl: './post-offer-modal.component.html',
  styleUrl: './post-offer-modal.component.css'
})
export class PostOfferModalComponent {

  availableTimes = ['08:00 AM', '09:00 AM','10:00 AM', '11:00 AM','12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'];
  selectedOffer: any = null;
  requests: any[] = [];
  id: string = '';
  isLoggedIn: boolean = false;
  user: any;
  car: any;
  path: string[] = [];
  locations: string[] = [''];
  locationOptions: string[] = ['Yasminet', 'Mourouj', 'Tekup'];
  isOpen: boolean = false;
  
  @Output() offerToHome = new EventEmitter();

  @ViewChild('f') myForm: NgForm;

  constructor(private authService: AuthService) { }


  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
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

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.user = this.authService.getUser();
  }

  onSubmit(form: any) {
    form.path =this.locations;
    form.type = "Carpooling";
    form.state = "pending";
    form.offeror = this.user;
    console.log(form);
    this.sendOffer(form);
    this.myForm.resetForm();
  }

  sendOffer(form: any){
    this.offerToHome.emit(form);
  }
}
