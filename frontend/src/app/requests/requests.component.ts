import { Component, Input } from '@angular/core';
import { RequestService } from '../services/request.service';
import { OfferService } from '../services/offer.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css'
})
export class RequestsComponent implements OnInit{
  @Input() offerId: string = '';

  requests: any[] = [];
  selectedRequest: any = null;

  ngOnInit(): void {
    localStorage.removeItem('id');
    this.sender= '';
    this.receiver= '';
    this.offer= '';
    this.departure= '';
    this.arrival= '';
    this.fetchAllRequests();
  }

  fetchAllRequests(): void {
    this.requestService.getAllRequests()
      .subscribe(response => {
        this.requests = response;
        console.log('All requests fetched successfully:', this.requests);
        // Handle success response
      }, error => {
        console.error('Error fetching requests:', error);
        // Handle error response
      });
  }

  constructor(private requestService: RequestService, private offerSerive:OfferService) { }

  sender: string = '';
  receiver: string = '';
  offer: string = '';
  departure: string = '';
  arrival: string = '';
  id: string = '';


  sendRequest() {
    const request = {
      sender: this.sender,
      receiver: this.receiver,
      offer: this.offerId,
      departure: this.departure,
      arrival: this.arrival
    };
    this.requestService.postRequest(request)
      .subscribe(response => {
        console.log('Request sent successfully:', response);
        this.ngOnInit();
        // Handle success response
      }, error => {
        console.error('Error sending request:', error);
        // Handle error response
      });
  }

  deleteRequest(id: string) {
    this.requestService.deleteRequest(id)
      .subscribe(response => {
        console.log('Request deleted successfully:', response);
        this.ngOnInit();
        // Handle success response
      }, error => {
        console.error('Error deleting request:', error);
        // Handle error response
      });
  }
  fillform(request: any) {
    localStorage.setItem('id', request._id);
    this.sender = request.sender;
    this.receiver = request.receiver;
    this.offer = request.offer;
    this.departure = request.departure;
    this.arrival = request.arrival;
  }
  updateRequest(id:any){
    id = localStorage.getItem('id')
    const request = {
      sender: this.sender,
      receiver: this.receiver,
      offer: this.offer,
      departure: this.departure,
      arrival: this.arrival
    };
    this.requestService.updateRequest(id, request)
      .subscribe(response => {
        console.log('Request updated successfully:', response);
        this.ngOnInit();
        // Handle success response
      }, error => {
        console.error('Error updating request:', error);
        // Handle error response
      });
  }
  clearForm() {
    this.selectedRequest = null;
    localStorage.removeItem('id');
    this.sender= '';
    this.receiver= '';
    this.offer= '';
    this.departure= '';
    this.arrival= '';
  }
}
