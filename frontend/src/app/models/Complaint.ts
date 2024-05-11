import { Offer } from "./Offer"
import { User } from "./User"

export class Complaint {
  
    constructor(
      public _id: string,
      public object: string,
      public description: string,
      public user: User,
      public offer: Offer,
      public state: string
    ) {
    }
  }
  
