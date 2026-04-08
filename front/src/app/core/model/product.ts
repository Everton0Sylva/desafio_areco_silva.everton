import { IProduct } from "../interface/iproduct";


export class Product implements IProduct {
  Id: string;
  Name: string;
  Description: string;
  Price: number;
  Quantity: number;

  constructor(data: any){
    this.Id = data.Id;
    this.Name = data.Name;
    this.Description = data.Description;
    this.Price = data.Price;
    this.Quantity = data.Quantity;
  }
}
