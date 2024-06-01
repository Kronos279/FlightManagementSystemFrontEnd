import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DisplayFlightsComponent } from './components/display-flights/display-flights.component';
import { BookFlightComponent } from './components/book-flight/book-flight.component';
import { CheckinComponent } from './components/checkin/checkin.component';
import { SeatSelectComponent } from './components/seat-select/seat-select.component';
import { authGuard } from './AuthGuard/auth.guard';
import { ViewBookingComponent } from './components/view-booking/view-booking.component';
import { UnAuthorisedComponent } from './components/un-authorised/un-authorised.component';
import { AdminComponent } from './components/admin/admin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

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
    component:BookFlightComponent,
    canActivate:[authGuard],
    data:{expectedRoles:["ROLE_ADMIN","ROLE_USER"]}
  },
  {
    path:"search-flights",
    component:HomeComponent

  },
  {
    path:"checkin",
    component:CheckinComponent
  },
  {
    path:"seatselect",
    component:SeatSelectComponent
  },
  {
    path:"login",
    component:SignupComponent
  },
  {
    path:"viewbooking",
    component:ViewBookingComponent,
    canActivate:[authGuard],
    data:{expectedRoles:["ROLE_ADMIN","ROLE_USER"]}
  },
  {
    path:"unAuthorised",
    component:UnAuthorisedComponent
  },
  {
    path:"admin",
    component:AdminComponent,
    canActivate:[authGuard],
    data:{expectedRoles:["ROLE_ADMIN"]}
  },
  {
    path:"signup",
    component:SignupComponent
  },
  {
    path:"about-us",
    component:AboutUsComponent
  }
];
