import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookingInfo } from '../../../type/BookingInfo';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookflightService } from '../../bookflight.service';
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas';
import { error } from 'console';


@Component({
  selector: 'app-view-booking',
  standalone: true,
  imports: [CurrencyPipe,FormsModule,DatePipe],
  templateUrl: './view-booking.component.html',
  styleUrl: './view-booking.component.scss'
})
export class ViewBookingComponent {
  bookingInfo:any[]=[];
  PNR!:string;
  dataloaded = false;

  constructor(private router:Router, private bookingservice:BookflightService){
    const navigation = this.router.getCurrentNavigation()
    // this.bookingservice.getBookingInfoByPnr(this.PNR).subscribe((res)=>{
    //   if(res){
    //     this.bookingInfo = res;
    //     this.dataloaded = true;
    //   }
    // });

    if(navigation?.extras.state){
      this.PNR = navigation.extras.state["pnr"];
      this.getBookings(this.PNR);
    }
  }

  ngOnInit(){

  }


  getBookings(PNR:string){
    console.log(PNR)
    this.bookingservice.getBookingInfoByPnr(PNR).subscribe((res)=>{
      if(res){
        this.bookingInfo = res;
      }else{
        alert("Something Went Wrong")
      }
    },
    (error)=>{
      alert("Kindly Enter a Valid PNR or Login Again")
    }
  )
  }


 async generatePDF(){
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    let yOffset = 10;

    for (let i = 0; i < this.bookingInfo.length; i++) {
      const element = document.getElementById(`booking-card-${i}`);
      if (element) {
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL('image/png');
        const imgHeight = canvas.height * pageWidth / canvas.width;

        if (yOffset + imgHeight > pageHeight) {
          doc.addPage();
          yOffset = 10;
        }

        doc.addImage(imgData, 'PNG', 10, yOffset, pageWidth - 20, imgHeight);
        yOffset += imgHeight + 10;
      }
    }

    doc.save('Booking_Details.pdf');
  }
  }


