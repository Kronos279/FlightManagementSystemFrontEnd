import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BookingInfo } from '../../../type/BookingInfo';
import { GetAvailableSeatsService } from '../../get-available-seats.service';
import { Seat } from '../../../type/seat';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckIn } from '../../../type/checkin';
import { CheckinserviceService } from '../../checkinservice.service';
import { error } from 'console';

@Component({
  selector: 'app-seat-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seat-select.component.html',
  styleUrl: './seat-select.component.scss'
})
export class SeatSelectComponent {

  getallseatservice = inject(GetAvailableSeatsService)
  checkinService = inject(CheckinserviceService);
  router = inject(Router);
  booking: BookingInfo | undefined;
  seats:Seat[]=[];
  selectedSeat: Seat | null = null;
  selectionofseat:string="";

  constructor(){
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.booking = navigation.extras.state['booking'];
  }
  console.log("This is select seat ", this.booking)

}
ngOnInit():void{
  if (this.booking) {
    this.getallseatservice.getAllSeats(this.booking.flight_id).subscribe((res) => {
      this.seats = res;
      console.log(this.seats);
    });
}

}
onSelectSeat(seat: Seat): void {
  if (!seat.booking_id) { // Only allow selection if the seat is not booked
    if (this.selectedSeat?.seat_id === seat.seat_id) {
      this.selectedSeat = null; // Unselect if the same seat is clicked again
    } else {
      this.selectedSeat = seat; // Select the new seat
    }
  }
}

onConfirmSeat(): void {
  const checkin:CheckIn={
    booking_id: this.booking?.booking_id,
    flight_id: this.booking?.flight_id,
    seat_id: this.selectedSeat?.seat_id
  }
  if(this.selectedSeat!=null && this.booking !=null){
    const confirmSeat = window.confirm(`Do you want to confirm seat ${this.selectedSeat.seatNumber}?`);
    if(confirmSeat){
      this.checkinService.bookSeat(checkin).subscribe((res)=> {
        console.log(res)
        this.router.navigate(["/checkin"])
      },(error)=>{
        alert("CheckIn Already Done");
      }
    );
    }
  }
}
}
