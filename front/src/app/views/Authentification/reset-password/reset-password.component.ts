import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { Member } from '../../../models/Member';
import { Router } from '@angular/router';
import {  MatSnackBar,  MatSnackBarHorizontalPosition,  MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  member: Member;
  message: any;
  message1 : any;
  show: Boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private service: UsersService, private _snackBar: MatSnackBar, private router : Router) { }

  ngOnInit(): void {
    this.member = new Member;
    this.show = false;
    this.message1 = "Your reset link has been sent !"
    this.resetForm= new FormGroup({
      Email: new FormControl('',[Validators.required,Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4}$")])
      });
    
  }

  get Email() {return this.resetForm.get('Email')};

  forgot(){
    this.service.forgotPassword({Email : this.resetForm.get('Email').value}).subscribe((data) =>{
      console.log(data)  
    },
    (err) =>{
      if (err.error.text === "User not registred"){
        this.show = true;
        this.message = err.error.text
      }
      else {
        this.show = false;
        this._snackBar.open('Your reset link has been sent!', 'close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration : 2500,
          panelClass :['background']
        });  
      }
      console.log(err.error.text)
    })
   
  }

}
