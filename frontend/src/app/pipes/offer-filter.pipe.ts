import { Pipe, PipeTransform } from '@angular/core';
import { Offer } from '../models/Offer';

@Pipe({
  name: 'offersFilter'
})
export class OfferFilterPipe implements PipeTransform {

  transform(offers: Offer[], filters: any): Offer[] {
    if (!filters || Object.keys(filters).length === 0) {
      return offers;
    }

    const location = filters['location'];
    const pkgs = filters['nbr_pkgs'];
    const price = filters['price'];
    const date = filters['date'];
    const time = filters['time'];

    let filteredOffers = offers;

    if (location && location !== "All") {
      filteredOffers = filteredOffers.filter(offer => offer.path.includes(location));
    }
    if (pkgs) {
      filteredOffers = filteredOffers.filter(offer => offer.nbr_pkgs >= pkgs);
    }
    if (price) {
      filteredOffers = filteredOffers.filter(offer => offer.price >= price);
    }
    if (date) {
      filteredOffers = filteredOffers.filter(offer => offer.departure_date === date);
    }
    if (time) {
      filteredOffers = filteredOffers.filter(offer => offer.departure_time === time);
    }

    return filteredOffers;
  }
}
