import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-post-offer-modal',
  templateUrl: './post-offer-modal.component.html',
  styleUrl: './post-offer-modal.component.css'
})
export class PostOfferModalComponent {

  availableTimes = ['08:00 AM', '09:00 AM','10:00 AM', '11:00 AM','12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'];
  selectedOffer: any = null;
  offers: any[] = [];
  requests: any[] = [];
  title: string = '';
  description: string = '';
  path: string = '';
  nb_ppl: number = 0;
  departure_time: string = '';
  departure_date: string = '';
  id: string = '';
  price: number = 0;

  @Output() offerToHome = new EventEmitter();
  isOpen: boolean = false;
  
  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }
  sendOffer(){
    const offerData={
      title: this.title,
      description: this.description,
      path: this.path,
      type: 'Carpooling',
      nb_ppl: this.nb_ppl,
      departure_time: this.departure_time,
      departure_date: this.departure_date,
      price: this.price
    }

    this.offerToHome.emit(offerData);
  }
}
