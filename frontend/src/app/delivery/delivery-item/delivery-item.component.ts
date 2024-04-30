import { Component,Input, OnInit } from '@angular/core';
import { Offer } from '../../models/Offer';

@Component({
  selector: 'app-delivery-item',
  templateUrl: './delivery-item.component.html',
  styleUrl: './delivery-item.component.css'
})
export class DeliveryItemComponent implements OnInit{
  @Input() offer?: Offer;

  ngOnInit(): void {
      console.log(this.offer);
  }
  
}
