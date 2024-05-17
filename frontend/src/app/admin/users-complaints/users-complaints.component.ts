import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Complaint } from '../../models/Complaint';
import { ComplaintDetailsComponent } from '../complaint-details/complaint-details.component';


@Component({
  selector: 'app-users-complaints',
  templateUrl: './users-complaints.component.html',
  styleUrl: './users-complaints.component.css'
})
export class UsersComplaintsComponent{

  @Input() complaints?: Complaint[] ;
  selectedComplaint: Complaint;
  @Output() response = new EventEmitter();
  totalRecords = this.complaints?.length;
  first = 0;
  
  @ViewChild('detailsModal') detailsModal?: ComplaintDetailsComponent;

  openDetailsModal(): void {
    this.detailsModal?.openModal();
  }

  respondToComplaint(response: any){
    this.response.emit(response);
  }
  recuperer(comp: Complaint){
    this.selectedComplaint = comp
  }

}
