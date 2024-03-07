import { Component, OnInit } from '@angular/core';
import { OfferService } from '../offer.service';
import { RequestService } from '../request.service';


@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css'
})

export class OffersComponent implements OnInit{

  availableTimes = ['08:00 AM', '09:00 AM','10:00 AM', '11:00 AM','12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'];
  selectedOffer: any = null;
  offers: any[] = [];
  requests: any[] = [];
  title: string = '';
  description: string = '';
  path: string = '';
  type: string = '';
  nb_ppl: number = 0;
  nb_pkg: number = 0;
  departure_time: string = '';
  departure_date: string = '';
  id: string = '';

  constructor(private offerService: OfferService, private requestService: RequestService) { }

  ngOnInit(): void {
    
    localStorage.removeItem('id');
    this.title,
    this.description,
    this.path,
    this.type,
    this.nb_ppl,
    this.nb_pkg,
    this.departure_time,
    this.departure_date
    this.fetchAllOffers();
    this.fetchAllRequests();
  }

  fetchAllRequests(): void {
    this.requestService.getAllRequests()
      .subscribe(response => {
        this.requests = response;
        console.log('All requests fetched successfully:', this.requests);
      }, error => {
        console.error('Error fetching requests:', error);
      });
  }

  fetchAllOffers(): void {
    this.offerService.getAllOffers()
      .subscribe(response => {
        this.offers = response;
        console.log('All offers fetched successfully:', this.offers);
      }, error => {
        console.error('Error fetching offers:', error);
      });
  }

  sendOffer() {
    const offer = {
      title: this.title,
      description: this.description,
      path: this.path,
      type: this.type,
      nb_ppl: this.nb_ppl,
      nb_pkg: this.nb_pkg,
      departure_time: this.departure_time,
      departure_date: this.departure_date
    };
    this.offerService.postOffer(offer)
      .subscribe(response => {
        console.log('Offer posted successfully:', response);
        this.ngOnInit();
      }, error => {
        console.error('Error posting the offer:', error);
      });
  }

  editOffer(id:any){
    id = localStorage.getItem('id')
    const offer = {
      title: this.title,
      description: this.description,
      path: this.path,
      type: this.type,
      nb_ppl: this.nb_ppl,
      nb_pkg: this.nb_pkg,
      departure_time: this.departure_time,
      departure_date: this.departure_date
    };
    this.offerService.editOffer(id, offer)
      .subscribe(response => {
        console.log('Offer edited successfully:', response);
        this.ngOnInit();
      }, error => {
        console.error('Error editing the offer:', error);
      });
  }

  fillform(offer: any) {
    localStorage.setItem('id', offer._id);
    this.title = offer.title;
    this.description = offer.description;
    this.path = offer.path;
    this.type = offer.type;
    this.nb_ppl = offer.nb_ppl;
    this.nb_pkg = offer.nb_pkg;
    this.departure_time = offer.departure_time;
    this.departure_date = offer.departure_date;
  }
  
  onTypeChange() {
    if (this.type === 'Delivery') {
      this.nb_ppl = 0;
    } else if (this.type === 'Carpooling') {
      this.nb_pkg = 0;
    }
  }

  deleteOffer(id: string) {
    this.offerService.deleteOffer(id)
      .subscribe(response => {
        console.log('Offer deleted successfully:', response);
        this.ngOnInit();
      }, error => {
        console.error('Error deleting the offer:', error);
      });
  }

  clearForm() {
    this.selectedOffer = null;
    localStorage.removeItem('id');
    this.title = '',
    this.description = '',
    this.path = '',
    this.type = '',
    this.nb_ppl = 0,
    this.nb_pkg = 0,
    this.departure_time = '',
    this.departure_date = ''
  }

  recupererId(_id:string){
    this.id = _id;
  }
acceptRequest(id:any, OfferId:string){
  OfferId = "65e8e799fdf51532813b289d";
  console.log(id);
  id = localStorage.getItem('id')
    const offer = {
      title: this.title,
      description: this.description,
      path: this.path,
      type: this.type,
      nb_ppl: this.nb_ppl,
      nb_pkg: this.nb_pkg,
      departure_time: this.departure_time,
      departure_date: this.departure_date
    };
    this.offerService.acceptRequest(id, offer, OfferId)
      .subscribe(response => {
        console.log('Request accepted and Offer edited successfully:', response);
        this.ngOnInit();
      }, error => {
        console.error('Error acceping the request:', error);
      });
}


declineRequest(id: any) {
  this.offerService.declineRequest(id)
      .subscribe(response => {
          console.log('Request declined successfully:', response);
          this.ngOnInit();
      }, error => {
          console.error('Error declining the request:', error);
      });
}




}
