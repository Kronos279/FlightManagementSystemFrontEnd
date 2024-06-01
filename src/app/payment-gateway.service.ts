import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentGatewayService {

  constructor(private httpClient:HttpClient) { }


  createTransaction(amount:number){
    let params = new HttpParams()
    .set("amount",amount);
    return this.httpClient.get('http://localhost:1080/payment/createTransaction',{params:params});
  }
}
