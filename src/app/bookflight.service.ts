import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BookingInfo } from '../type/BookingInfo';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookflightService {

  constructor() { }
  httpClient = inject(HttpClient);

  bookingInfo:any = new Subject<any>();
  bookingInfo$ = this.bookingInfo.asObservable();

  setBookingInfo(data:BookingInfo){
    console.log("Set Booking Called")
    this.bookingInfo.next(data);
  }

  getBookingInfo(){
    return this.bookingInfo.value;
  }

  bookFlight(bookingInfo:any) {
    console.log("Service",bookingInfo)
    return this.httpClient.post<BookingInfo[]>("http://localhost:8888/booking",bookingInfo);
  }

  getBookingInfoByPnr(PNR:string){
   return this.httpClient.get<BookingInfo[]>(`http://localhost:8888/checkin?pnr=${PNR}`);
  }

}
