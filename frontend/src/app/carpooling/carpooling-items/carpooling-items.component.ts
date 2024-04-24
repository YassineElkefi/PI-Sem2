import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-carpooling-items',
  templateUrl: './carpooling-items.component.html',
  styleUrl: './carpooling-items.component.css'
})
export class CarpoolingItemsComponent {

  @Input() offer: any;
  @Output() OfferToList = new EventEmitter();

  sendOfferToList(){
    this.OfferToList.emit(this.offer);
  }
}
