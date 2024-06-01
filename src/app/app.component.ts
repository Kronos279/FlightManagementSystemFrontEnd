import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { HomeComponent } from './components/home/home.component';
import { SearchFlightComponent } from './components/search-flight/search-flight.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, MatButtonModule, HomeComponent, SearchFlightComponent, RouterOutlet, RouterLink, RouterLinkActive, ReactiveFormsModule, FormsModule, NavBarComponent]
})
export class AppComponent {
  title = 'FlightManagementSystemFrontEnd';
  constructor(private httpClient:HttpClient){
    this.httpClient.get("http://localhost:8083/booking");

  }
}
