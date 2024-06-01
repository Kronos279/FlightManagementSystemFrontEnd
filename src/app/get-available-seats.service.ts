import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Seat } from '../type/seat';

@Injectable({
  providedIn: 'root'
})
export class GetAvailableSeatsService {

  constructor() { }
  httpClient = inject(HttpClient)

  getTotalSeats(flight_id:number|undefined){
    return this.httpClient.get<number>(`http://localhost:8081/flightdetails/count?id=${flight_id}`);
  }
  getbookingsCount(flight_id:number|undefined){
    return this.httpClient.get<number>(`http://localhost:8888/booking/bookingcount?id=${flight_id}`);
  }
  getAllSeats(flight_id:number|undefined){
    return this.httpClient.get<Seat[]>(`http://localhost:8888/checkin/allseats?id=${flight_id}`);
  }
}
