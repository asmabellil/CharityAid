import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Member } from '../../models/Member';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  member: Member;

  constructor(private service: UsersService, private router : Router) { }

  ngOnInit(): void {
    this.member = new Member;
    this.loginForm= new FormGroup({
      Email: new FormControl('',Validators.required),
      Password: new FormControl('',Validators.required),
      });
  }
  get Email() {return this.loginForm.get('Email')};
  get Password() {return this.loginForm.get('Password')};

  reset(){
    this.router.navigate(['/reset'])
  }

  register(){
    this.router.navigate(['/register'])
  }

  login(){
    this.service.login(this.loginForm.value).subscribe(
      response => {
      console.log(response);
      console.log(response.headers.get('Authorization'))
      localStorage.setItem('token', response.headers.get("Authorization"))
      this.router.navigate(['/allusers'])
    },
    error => {
      
    });
  }

}
