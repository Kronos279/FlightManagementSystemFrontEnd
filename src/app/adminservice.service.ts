import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { flightdetails } from '../type/flightdetails';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {

  constructor(private httpClient:HttpClient) { }

  deleteFlight( flight_id:number) {

  console.log("Adminservice called")
   return  this.httpClient.delete(`http://localhost:8888/flightdetails/${flight_id}`);
  }

  updateFlightDetails(flight:flightdetails,flight_id:number){
    return this.httpClient.put<any>(`http://localhost:8888/flightdetails?id=${flight_id}`,flight);
  }


  addFlight(flight:flightdetails){
    return this.httpClient.post<flightdetails>(`http://localhost:8888/flightdetails`,flight);
  }
}
