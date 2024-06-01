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
  selector: 'app-dialog-box',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,ReactiveFormsModule],
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.scss'
})
export class DialogBoxComponent {

  flightForm!: FormGroup;
  flight:flightdetails | undefined;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number){
    }

    ngOnInit(){
      this.flightForm = this.createPassengerForm();
    }

    createPassengerForm(): FormGroup{
      return new FormGroup({
        flight_number: new FormControl(''),
        source: new FormControl(''),
        destination: new FormControl(''),
        date: new FormControl(''),
        departure_time: new FormControl(''),
        arrival_time: new FormControl(''),
        fare:new FormControl('')
      })
    }

    save(): any {
      if (this.flightForm) {
        this.flight = this.flightForm.value;
        this.dialogRef.close(this.flight);
        // console.log(this.flightForm);
      }
    }

    close(): void {
      this.dialogRef.close();
    }
  }



