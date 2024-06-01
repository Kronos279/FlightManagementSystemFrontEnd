import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registeradmindialogbox',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registeradmindialogbox.component.html',
  styleUrl: './registeradmindialogbox.component.scss'
})
export class RegisteradmindialogboxComponent {

  registerform!:FormGroup;

  constructor(private dialogRef: MatDialogRef<RegisteradmindialogboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number){
      this.registerform = this.createPassengerForm();
  }

  createPassengerForm(): FormGroup{
    return new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      name: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      role : new FormControl('ROLE_ADMIN')
    })
  }



  onSubmit(): any {
    if (this.registerform) {
      const confirmadd = window.confirm("Add admin to the DataBase ?");
      if(confirmadd){
        this.dialogRef.close(this.registerform.value);
        console.log(this.registerform);
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

