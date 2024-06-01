import { Component, inject, NgZone } from '@angular/core';
import { DataService } from '../../data.service';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CurrencyPipe,DatePipe } from '@angular/common';
import { flightdetails } from '../../../type/flightdetails';
import { BookingInfo } from '../../../type/BookingInfo';
import { BookflightService } from '../../bookflight.service';
import { catchError, ConnectableObservable, throwError } from 'rxjs';
import { PaymentGatewayService } from '../../payment-gateway.service';
import { Router } from '@angular/router';
import { rejects } from 'assert';
import { error } from 'console';
// import Razorpay from 'razorpay';

declare var Razorpay:any;

@Component({
  selector: 'app-book-flight',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,DatePipe,CurrencyPipe],
  templateUrl: './book-flight.component.html',
  styleUrl: './book-flight.component.scss'
})

export class BookFlightComponent {

  router = inject(Router);
  dataService = inject(DataService)
  bookingservice = inject(BookflightService)
  numberOfPassengers: number = 1;
  passengerForms: FormArray<FormGroup>;
  selectedFlight: flightdetails | undefined ;
  BookingInfo:BookingInfo[]=[];
  noOFSeatsAvailable:number=0;
  totalfare:number=0;
  payment:boolean=false;
  PNR!:string;

  constructor(private paymentService:PaymentGatewayService,
    private ngZone:NgZone
  ) {
    // this.dataService.selectedFlight$.subscribe((flight: flightdetails | null) => {
      const navigation = this.router.getCurrentNavigation();
      if(navigation?.extras.state){
        this.selectedFlight = navigation.extras.state["selectedflight"];
        this.totalfare = this.selectedFlight!.fare}
      else{
        alert("Select a Filght first");
        catchError((err)=>{
          return throwError(()=>err);
      });
    }
    // });

    this.passengerForms = new FormArray<FormGroup>([]);
    this.passengerForms.push(this.createPassengerForm());
  }

  onSubmit() {
    this.passengerForms.clear();  // Clear previous form controls
    for (let i = 0; i < this.numberOfPassengers; i++) {
      this.passengerForms.push(this.createPassengerForm());
    }
  }


  OnDecrease(index:number){
    if(this.numberOfPassengers > 0){
      this.numberOfPassengers -=1;
      this.passengerForms.removeAt(index)
      if(this.selectedFlight !=null){
      this.totalfare-=this.selectedFlight.fare;}
    }
  }

  OnIncrease(){
    if(this.selectedFlight != undefined){
    if(this.passengerForms.length < this.selectedFlight.available_seats){
    this.numberOfPassengers++;
    this.passengerForms.push(this.createPassengerForm());
    this.totalfare += this.selectedFlight.fare;}
    }else{
      alert("No more seats available")
    }
  }
  createPassengerForm(): FormGroup {
    return new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)])
    });
  }

  onFormSubmit(passengerForm: FormGroup){
    if(passengerForm.valid){
      this.BookingInfo = this.passengerForms.value
      for(let i of this.BookingInfo){
        i.flight_id = this.selectedFlight?.flight_id;
      }
      this.paymentService.createTransaction(this.totalfare).subscribe((response)=>{
        console.log(response);
        this.openTransaction(response);
      }, (error)=>{console.log(error)} );
    }
    else{
      alert("Kindly Enter all the details as per the requirements")
    }
  }

  BookFlightDetailsApi():Promise<void>{
    return new Promise((resolve,reject)=>{

    if(this.payment === true){
      this.bookingservice.bookFlight(this.BookingInfo).subscribe((res:any)=>{
        this.PNR=res[0].pnrNumber;
      alert(`Booking Successful Your PNR is ${res[0].pnrNumber}`);
      console.log(res);
      this.bookingservice.setBookingInfo(res);
      resolve();
    },(err)=>{
      console.log(err);
      reject(err);
    });
    }
    else{
      alert("Payment failed");
      reject("Payment failed");
    }
  })
  }
  openTransaction(response:any){
    var options={
        order_id:response.order_id,
        key:response.key_id,
        amount:response.amount,
        currency:response.currency,
        name:"Ather Airlines Flight",
        description:`Payment for ${this.selectedFlight?.flight_number}`,
        image:"assets/logo.jpg",
        handler:(response:any)=>{
          this.processResponse(response);
        },
        prefill:{
          name:"Ather Air",
          email:"ather@example.com",
          contact:"9900909091"
        },
        notes:{
          address:"Flight Booking"
        },
        theme:{
          color:"#007bff"
        }
    };
    const razorpay = new Razorpay(options);
    if(razorpay){
    razorpay.open()
    }
    else{
      console.log("Null value");
    }
  }

  processResponse(res:any){
    console.log("This is Payment Response",res);
    this.payment=true;
    if(res.razorpay_payment_id){
      this.BookFlightDetailsApi().then(()=>{
        this.ngZone.run(()=>{
          this.router.navigate(["/viewbooking"],{state:{pnr:this.PNR}}).catch((error)=>{console.error("Booking Failed Or Payment Failed")});
        });
      });
      this.payment=false;
      console.log("This is paynment process",this.BookingInfo);

    }
  }

}
