import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchFlightComponent } from './components/search-flight/search-flight.component';
import { DisplayFlightsComponent } from './components/display-flights/display-flights.component';
import { BookFlightComponent } from './components/book-flight/book-flight.component';

export const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"displayflights",
    component:DisplayFlightsComponent
  },
  {
    path:"booking",
    component:BookFlightComponent
  }
];
