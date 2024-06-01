import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { flightdetails } from '../type/flightdetails';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchflightService {

  constructor() { }

  httpClient = inject(HttpClient);

  searchFlights(url:string){
    return this.httpClient.get<flightdetails[]>(url).pipe(
      catchError((error) => {
        // Show an alert with the error message
        alert('An error occured No flights available for the given date.');
        // Forward the error downstream
        return throwError(() => error);
  }))
}
}
