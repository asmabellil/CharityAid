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
  Email: Text;

  constructor(private service: UsersService, private router : Router) { }

  ngOnInit(): void {
    
  }

  forgot(){
    this.service.forgotPassword({Email: this.Email}).subscribe((data) =>{
      console.log("data "+ data)
    })
    this.router.navigate(['/login'])
  }

}
