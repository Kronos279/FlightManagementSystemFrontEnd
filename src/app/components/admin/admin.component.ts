import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { flightdetails } from '../../../type/flightdetails';
import { CurrencyPipe } from '@angular/common';
import { AdminserviceService } from '../../adminservice.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';
import { FlightDetailsService } from '../../flight-details.service';
import { Seat } from '../../../type/seat';
import { AddDialogBoxComponent } from '../add-dialog-box/add-dialog-box.component';
import { RegisteradmindialogboxComponent } from '../registeradmindialogbox/registeradmindialogbox.component';
import { LoginRegisterService } from '../../login-register.service';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  flightDetails: flightdetails[] = [];
  FlightSeats: Seat[] = [];
  flight: flightdetails | undefined;

  constructor(private httpClient: HttpClient, private adminService: AdminserviceService, private dialog: MatDialog, private flightService: FlightDetailsService, private loginregisterService: LoginRegisterService) {
    httpClient.get<flightdetails[]>("http://localhost:8888/flightdetails").subscribe((res) => this.flightDetails = res);
  }

  deleteFlight(flight: flightdetails, index: number) {
    const confirm = window.confirm("Confirm you want to Delete this Flight");
    if (confirm) {
      this.adminService.deleteFlight(flight.flight_id).subscribe((res) => {
        console.log(res)
        this.flightDetails.splice(index, 1);
      });
    }
  }


  updateFlight(flight_id: number) {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: "60%",
      height: "500px",
      data: { flight_id },
    })

    dialogRef.afterClosed().subscribe((result: flightdetails) => {
      if (result) {
        console.log('The dialog was closed with the following data:', result);
        this.adminService.updateFlightDetails(result, flight_id).subscribe((res) => { console.log(res) });
      }
    });
  }


  addFlight() {
    const dialogRef = this.dialog.open(AddDialogBoxComponent, {
      width: "60%",
      height: "500px"
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('The dialog was closed with the following data:', result);
        this.adminService.addFlight(result).subscribe((res) => {
          console.log(res);
        });
      }
    });
  }

  addAdmin() {
    const dialogRef = this.dialog.open(RegisteradmindialogboxComponent, {
      width: "60%",
      height: "500px"
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('The dialog was closed with the following data:', result);
        this.loginregisterService.registerUser(result).subscribe((res) => {
          console.log(res);
        });
      }
    });
  }

}
