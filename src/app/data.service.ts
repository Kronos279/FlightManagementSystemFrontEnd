import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { flightdetails } from '../type/flightdetails';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private flightDataSubject = new BehaviorSubject<any>(null);
  flightData$ = this.flightDataSubject.asObservable();

  constructor() {}

  setFlightData(data: any) {
    this.flightDataSubject.next(data);
  }

  private selectedFlight = new BehaviorSubject<flightdetails | null>(null);
  selectedFlight$ = this.selectedFlight.asObservable();

  setSelectedFlight(flight: flightdetails) {
    this.selectedFlight.next(flight);
  }
}
