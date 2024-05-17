import { Component, EventEmitter, Input, Output} from '@angular/core';
@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrl: './delivery-list.component.css'
})
export class DeliveryListComponent{

  @Input() offers?: any;
  @Input() filters?: any;
  @Output() selectedOfferToHome = new EventEmitter();
  
  handleIncomingOffer(offer: any){
    this.selectedOfferToHome.emit(offer)
  }

}
