import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Complaint } from '../../models/Complaint';

@Component({
  selector: 'app-complaint-details',
  templateUrl: './complaint-details.component.html',
  styleUrl: './complaint-details.component.css'
})
export class ComplaintDetailsComponent {

  @Input() complaint?: Complaint;
  isOpen: boolean = false;
  @Output() response = new EventEmitter();

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  respondToComplaint(complaint: Complaint, response: boolean){
    this.response.emit({response, complaint});
  }

}
