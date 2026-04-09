import { IProduct } from "../interface/iproduct";


export class Product implements IProduct {
  Id: string;
  Name: string;
  Description: string;
  Price: number;
  Quantity: number;

  constructor(data: any) {
    this.Id = data.Id ?? data.id ?? '';
    this.Name = data.Name ?? data.name ?? '';
    this.Description = data.Description ?? data.description ?? '';
    const priceconv = data.Price ?? data.price ?? 0;
    this.Price = isNaN(priceconv) ? parseFloat(priceconv.toString().replace(',', '.')) : priceconv;

    this.Price = parseFloat((data.Price ?? data.price ?? 0).toString().replace(',', '.'));
    this.Quantity = data.Quantity ?? data.quantity ?? 0;
  }
}
