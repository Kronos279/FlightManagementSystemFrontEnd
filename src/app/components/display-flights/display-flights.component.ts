import { Component, inject } from '@angular/core';
import { DataService } from '../../data.service';
import { flightdetails } from '../../../type/flightdetails';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-flights',
  standalone: true,
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './display-flights.component.html',
  styleUrl: './display-flights.component.scss',
})
export class DisplayFlightsComponent {
  constructor(){
  }

  router = inject(Router);

  flightDetails:flightdetails[]=[];
  dataService = inject(DataService);
  ngOnInit() {
      this.dataService.flightData$.subscribe((data) => {
      this.flightDetails = data;
      console.log(data);
    });
  }

  onSelectFlight(flight: flightdetails) {
    this.dataService.setSelectedFlight(flight);
    console.log(flight)
    this.router.navigate(['/booking']);
  }
}
