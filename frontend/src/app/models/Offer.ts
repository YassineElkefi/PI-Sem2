import { User } from "./User";

export class Offer {
  constructor(
    public _id: number,
    public title: string,
    public path: string[],
    public type: string,
    public departure_time: string,
    public departure_date: string,
    public price: number,
    public offeror: User,
    public nb_ppl: number ,
    public nb_pkg: number ,
    public state: string ,

  ) {}
}
