import { User } from "./User";

export class Notif {

  
    constructor(
      public _id: string,
      public text: string,
      public user: any,
      public state: string, 
    ) {}
  }
