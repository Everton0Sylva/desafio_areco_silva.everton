import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from '../interface/iproduct';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Product } from '../model/product';
import { IRestResponse } from '../interface/irestresponse';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _products$ = new BehaviorSubject<IRestResponse<Product>>({
    data: [],
    pageNumber: 0,
    pageSize: 0,
    totalCount: 0,
    totalPages: 0
  });
  products$ = this._products$.asObservable();

  private base = `${environment.apiUrl}/api/product`;

  constructor(private http: HttpClient) { }

  getProducts(page: number, pageSize: number) {
    this.http.get<IRestResponse<Product>>(`${this.base}?pageNumber=${page}&pageSize=${pageSize}`).subscribe(rest => {
      this._products$.next(rest);
    });
  }
  getProductById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.base}/${id}`);
  }

  createProduct(data: Product) {
    return this.http.post<Product>(this.base, data);
  }

  updateProduct(id: string, data: IProduct) {
    return this.http.put<IProduct>(`${this.base}/${id}`, data);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.base}/${id}`);
  }


}
