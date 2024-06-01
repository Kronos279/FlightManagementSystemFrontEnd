import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../type/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor() { }
  httpClient = inject(HttpClient);
  getProducts(){
   return this.httpClient.get<Product[]>("http://localhost:4000/products");
  }

  getFlightDetails(){
    return this.httpClient.get("http://localhost:3000/flightDetails");
  }

}
