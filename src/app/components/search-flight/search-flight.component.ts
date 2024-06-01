import { Component, inject } from '@angular/core';
import { FlightDetailsService } from '../../flight-details.service';
import { flightdetails } from '../../../type/flightdetails';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { SearchflightService } from '../../searchflight.service';
import { search } from '../../../type/search';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-search-flight',
  standalone: true,
  imports: [RouterLink,RouterModule,FormsModule],
  templateUrl: './search-flight.component.html',
  styleUrl: './search-flight.component.scss'
})
export class SearchFlightComponent {


  router = inject(Router);

  constructor(){
    this.details.getFlightDetails().subscribe((res)=>{this.flightDetails=res as any[];
      this.getUniqueSource()
      this.getUniqueDestination()
    })

  }
  flightDetails:flightdetails[]=[];
  details = inject(FlightDetailsService)
  uniquesource:string[]=[];
  uniquedestination:string[]=[];
  getUniqueSource(){
    this.flightDetails.forEach((i)=>{
      if(!this.uniquesource.includes(i.source)){
          this.uniquesource.push(i.source)
      }
    })
  }

  getUniqueDestination(){
    this.flightDetails.forEach((i)=>{
      if(!this.uniquesource.includes(i.destination)){
          this.uniquesource.push(i.destination)
      }
    })
  }

  dataService = inject(DataService)
  searchform:search={
    source: "",
    destination:"",
    date:""
  }
  searchflightservice = inject(SearchflightService)

  onSubmit(){
    const { source, destination, date } = this.searchform;
    const url = `http://localhost:8082/search?source=${source}&destination=${destination}&date=${date}`;
    console.log(url);
    this.searchflightservice.searchFlights(url).subscribe((res) => {
      if (res && res.length > 0) {
        this.dataService.setFlightData(res);
        this.router.navigate(['displayflights']);
      } else {
        // Response is empty, handle accordingly (show error message, etc.)
        alert('No flights found.');
      }
  })
}

}
