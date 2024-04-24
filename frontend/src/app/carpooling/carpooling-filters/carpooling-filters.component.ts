import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-carpooling-filters',
  templateUrl: './carpooling-filters.component.html',
  styleUrl: './carpooling-filters.component.css'
})
export class CarpoolingFiltersComponent {

  @Input() locations: string[] = [];
  @Output() filtersChnaged = new EventEmitter<any>();

  times: string[] = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"];
  
}
