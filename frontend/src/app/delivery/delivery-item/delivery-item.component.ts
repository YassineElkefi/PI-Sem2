import { Component, EventEmitter,Input, OnInit, Output, ViewChild } from '@angular/core';
import { Offer } from '../../models/Offer';

@Component({
  selector: 'app-delivery-item',
  templateUrl: './delivery-item.component.html',
  styleUrl: './delivery-item.component.css'
})
export class DeliveryItemComponent implements OnInit{
  @Input() offer?: Offer;

  @Output() selectedOfferToList = new EventEmitter();

  ngOnInit(): void {
      console.log(this.offer);
  }

  sendOfferToList(){
    this.selectedOfferToList.emit(this.offer);
  }

}
