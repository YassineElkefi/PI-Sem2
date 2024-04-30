import { Component, Input} from '@angular/core';
import { Offer } from '../../models/Offer';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrl: './delivery-list.component.css'
})
export class DeliveryListComponent{

  @Input() offers?: Offer[];
  @Input() filters?: any;
  
}
