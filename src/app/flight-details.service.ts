import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { flightdetails } from '../type/flightdetails';
import { Seat } from '../type/seat';

@Injectable({
  providedIn: 'root'
})
export class FlightDetailsService {

  constructor() { }

  httpClient = inject(HttpClient);

  getFlightDetails(){
    return this.httpClient.get<flightdetails[]>("http://localhost:8081/flightdetails")
  }

  getAllSeats(flight_id:number){
    return this.httpClient.get<Seat[]>(`http://localhost:8081/flightdetails/allseats?id=${flight_id}`);
  }
}
