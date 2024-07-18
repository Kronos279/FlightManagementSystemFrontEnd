import { Component, inject } from '@angular/core';
import { DataService } from '../../data.service';
import { flightdetails } from '../../../type/flightdetails';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { GetAvailableSeatsService } from '../../get-available-seats.service';
import { forkJoin } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-display-flights',
  standalone: true,
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './display-flights.component.html',
  styleUrl: './display-flights.component.scss',
})
export class DisplayFlightsComponent {
  private getavailablesearService=inject(GetAvailableSeatsService);
  constructor(){
    const navigation = this.router.getCurrentNavigation();
    if(navigation?.extras.state){
      this.flightDetails = navigation.extras.state['flightData'];
    }
  }

  router = inject(Router);

  flightDetails:flightdetails[]=[];
  dataService = inject(DataService);

  onSelectFlight(flight: flightdetails) {
    // this.dataService.setSelectedFlight(flight);
    let bookingCount: number;
    let totalSeats: number;
    let noOFSeatsAvailable: number;

    forkJoin({
      totalSeats: this.getavailablesearService.getTotalSeats(flight.flight_id),
      bookingCount: this.getavailablesearService.getbookingsCount(flight.flight_id)

    }).subscribe({
      next: ({ bookingCount, totalSeats }) => {
        console.log("Booking Count:- ", bookingCount);
        console.log("Total seats:- ", totalSeats);

        noOFSeatsAvailable = totalSeats - bookingCount;
        flight.available_seats = noOFSeatsAvailable;
        console.log(noOFSeatsAvailable);

        if (noOFSeatsAvailable >= 0) {
          this.router.navigate(['/booking'], { state: { selectedflight: flight } });
        } else {
          alert("Something went wrong!");
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error("Error fetching data:", error);
          alert("Internal Server Error try logging in");
          this.router.navigate(['/login']);

      }
    });
  }


  }
