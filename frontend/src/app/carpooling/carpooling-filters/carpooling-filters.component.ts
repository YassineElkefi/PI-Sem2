import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-carpooling-filters',
  templateUrl: './carpooling-filters.component.html',
  styleUrls: ['./carpooling-filters.component.css']
})
export class CarpoolingFiltersComponent {

  locations: string[] = ["Ben arous", "Ariana", "Tunis", "Mourouj"];

  @Output() sendFiltersToHome = new EventEmitter<any>();

  onSubmit(form: any) {
    const value = {
      location: form.location || 'All',
      nbr_ppl: form.nbr_ppl ? form.nbr_ppl : null,
      price: form.price ? form.price : null,
      date: form.date ? form.date : null,
      time: form.time ? form.time : null,
    };
    console.log(value);
    this.sendFiltersToHome.emit(value);
  }

}
