import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from '../interface/iproduct';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _products$ = new BehaviorSubject<Product[]>([])
  products$ = this._products$.asObservable();

  private base = `${environment.apiUrl}/api/products`;

  constructor(private http: HttpClient) { }

  getProducts(page: number, pageSize: number) {
    this.http.get<IProduct[]>(`${this.base}?page=${page}&size=${pageSize}`).subscribe(list => {
      this._products$.next(list);
    });
  }
}
