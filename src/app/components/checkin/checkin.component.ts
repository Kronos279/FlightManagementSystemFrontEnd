import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingInfo } from '../../../type/BookingInfo';
import { CheckinserviceService } from '../../checkinservice.service';
import { Router} from '@angular/router';
import { error } from 'console';


@Component({
  selector: 'app-checkin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './checkin.component.html',
  styleUrl: './checkin.component.scss'
})
export class CheckinComponent {

  pnr:string="";
  Bookinginfo:BookingInfo[]=[];

  constructor(){
  }
  router = inject(Router);

  Checkinservice = inject(CheckinserviceService);

  fetchBookingDetails(){
    this.Checkinservice.getBookingInfo(this.pnr).subscribe((res)=>{
      this.Bookinginfo = res;
      console.log("Booking Info Recieved Successfully");
      console.log(this.Bookinginfo);
      },(error)=>{
        alert("Kindly Enter a Valid PNR or Login again")
      }
  );
    if(this.Bookinginfo !=null){
    }
  }

  onClick(booking:BookingInfo){
    if(booking.seat_number!=null){
      alert("Your Web CheckIn is already done kindly check your email")
    }
    else{
    this.router.navigate(['/seatselect'], { state: { booking: booking } });
    }
  }


}
