import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delivery-filter',
  templateUrl: './delivery-filter.component.html',
  styleUrls: ['./delivery-filter.component.css']
})
export class DeliveryFilterComponent {
  locations: string[] = ["Ben arous", "Ariana", "Tunis", "Mourouj"];

  @Output() sendFiltersToHome = new EventEmitter<any>();

  onSubmit(form: any) {
    const value = {
      location: form.location || 'All',
      nbr_pkgs: form['nbr_pkgs'] ? form['nbr_pkgs'] : null,
      price: form['price'] ? form['price'] : null,
      date: form['date'] ? form['date'] : null,
      time: form['time'] ? form['time'] : null,
    };
    console.log(value);
    this.sendFiltersToHome.emit(value);
  }
}
