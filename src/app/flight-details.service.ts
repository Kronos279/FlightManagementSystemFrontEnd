import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { flightdetails } from '../type/flightdetails';

@Injectable({
  providedIn: 'root'
})
export class FlightDetailsService {

  constructor() { }

  httpClient = inject(HttpClient);

  getFlightDetails(){
    return this.httpClient.get<flightdetails[]>("http://localhost:8081/flightdetails")
  }
}
