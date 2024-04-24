import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-carpooling-list',
  templateUrl: './carpooling-list.component.html',
  styleUrl: './carpooling-list.component.css'
})
export class CarpoolingListComponent {

  @Input() offers?: any[];
  @Output() offerToHome = new EventEmitter();

  sendOfferToHome(offer: any){
    this.offerToHome.emit(offer);
  }

}
