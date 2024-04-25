import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-carpooling-details-modal',
  templateUrl: './carpooling-details-modal.component.html',
  styleUrl: './carpooling-details-modal.component.css'
})
export class CarpoolingDetailsModalComponent {
  isOpen: boolean = false;
  
  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }
  @Input() selectedOffer?: any = {};
  @Output() request = new EventEmitter();

  onRequest(){
    this.request.emit();
  }
}
