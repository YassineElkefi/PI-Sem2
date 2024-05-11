import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Complaint } from '../../models/Complaint';
import { ComplaintDetailsComponent } from '../complaint-details/complaint-details.component';


@Component({
  selector: 'app-users-complaints',
  templateUrl: './users-complaints.component.html',
  styleUrl: './users-complaints.component.css'
})
export class UsersComplaintsComponent implements OnInit{

  @Input() complaints?: Complaint[] ;
  selectedComplaint: Complaint;
  @Output() response = new EventEmitter();
  totalRecords = this.complaints?.length;
  first = 0;
  
  @ViewChild('detailsModal') detailsModal?: ComplaintDetailsComponent;

  ngOnInit(): void {
  }
  
  pageChange(event: any) {
    console.log('Page changed:', event);
  }

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
