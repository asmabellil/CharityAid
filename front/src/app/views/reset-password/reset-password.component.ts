import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Member } from '../../models/Member';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  member: Member;

  constructor(private service: UsersService, private router : Router) { }

  ngOnInit(): void {
    this.member = new Member;
    this.resetForm= new FormGroup({
      Email: new FormControl('',[Validators.required,Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4}$")])
      });
    
  }

  get Email() {return this.resetForm.get('Email')};

  forgot(){
    this.service.forgotPassword({Email: this.Email}).subscribe((data) =>{
      console.log("data "+ data)
    })
    this.router.navigate(['/login'])
  }

}
