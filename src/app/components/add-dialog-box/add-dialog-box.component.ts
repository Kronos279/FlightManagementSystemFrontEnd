import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'
import { flightdetails } from '../../../type/flightdetails';

@Component({
  selector: 'app-add-dialog-box',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,ReactiveFormsModule],
  templateUrl: './add-dialog-box.component.html',
  styleUrl: './add-dialog-box.component.scss'
})
export class AddDialogBoxComponent {
  flightForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: flightdetails){
    }

  ngOnInit(){
    this.flightForm = this.createPassengerForm();
  }

  createPassengerForm(): FormGroup{
    return new FormGroup({
      flight_number: new FormControl('', Validators.required),
      source: new FormControl('',Validators.required),
      destination: new FormControl('',Validators.required),
      date: new FormControl('',Validators.required),
      departure_time: new FormControl('',Validators.required),
      arrival_time: new FormControl('',Validators.required),
      fare:new FormControl('',Validators.required)
    })
  }

  save(): any {
    if (this.flightForm) {
      const confirmadd = window.confirm("Add the flight to the DataBase ?");
      if(confirmadd){
        this.dialogRef.close(this.flightForm.value);
        console.log(this.flightForm);
      }

    }
    else{
      alert("Kindly Enter all Details");
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
