export class User {

  
    constructor(
      public _id: number,
      public cin: number,
      public firstName: string,
      public lastName: string,
      public email: string,
      public phone: string,
      public address: string,
      public car: string,
      public price: number,
      public nb_strikes: number

    ) {
    }
  }
