import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BookingInfo } from '../type/BookingInfo';
import { CheckIn } from '../type/checkin';

@Injectable({
  providedIn: 'root'
})
export class CheckinserviceService {

  constructor() { }
  httpClient = inject(HttpClient);

  getBookingInfo(PNR:any){
    let params= new HttpParams()
    .set("pnr",PNR);
    return this.httpClient.get<BookingInfo[]>(`http://localhost:8888/checkin`,{params:params});
  }

  bookSeat(checkin:CheckIn){
    return this.httpClient.post<CheckIn>("http://localhost:8888/checkin",checkin)
  }
}
