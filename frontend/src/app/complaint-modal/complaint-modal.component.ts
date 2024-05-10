import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ComplaintsService } from '../services/complaints.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-complaint-modal',
  templateUrl: './complaint-modal.component.html',
  styleUrl: './complaint-modal.component.css'
})
export class ComplaintModalComponent {
  
  constructor(private complaintService: ComplaintsService, private cookieService:CookieService) { }

  isOpen: boolean = false;
  @Input() selectedRequest?: any;
  @ViewChild('f') myForm: NgForm;


  openModal() {
    this.isOpen = true;
    console.log(this.selectedRequest); 
  }

  closeModal() {
    this.isOpen = false;
  }

  onSubmit(form: any){
    form.offer = this.selectedRequest.offer;
    const userDataString = this.cookieService.get('userData');
        if (userDataString) {
          form.user = JSON.parse(userDataString);
        }
    form.state='Pending';
    this.postComplaint(form);
    this.myForm.resetForm();
  }

  postComplaint(form: any){
    this.complaintService.addComplaint(form)
        .subscribe(response => {
          console.log('Offer posted successfully:', response);
        }, error => {
          console.error('Error posting the offer:', error);
        });
  }
}
