import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { Member } from '../../../models/Member';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  resetPasswordForm: FormGroup;
  member: Member;
  id: any;
  token: any;

  constructor(private service: UsersService, private route: ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    this.resetPasswordForm= new FormGroup({
      Password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{6,50}')]),
      ConfirmPassword: new FormControl('',Validators.required),
      });
    
      this.member = new Member;

    this.route.queryParams
    .subscribe(params => {
        console.log(params); 
        this.token = params.token;
        console.log(this.token); 
      }
    );

    this.route.params.subscribe(parameter => {
      this.id = parameter.id
      this.token = parameter.token
    })
  }

  get Password() {return this.resetPasswordForm.get('Password')};
  get ConfirmPassword() {return this.resetPasswordForm.get('ConfirmPassword')};

    // to check confirm password
    onPasswordChange() {
      if (this.ConfirmPassword.value == this.Password.value) {
        this.ConfirmPassword.setErrors(null);
      } else {
        this.ConfirmPassword.setErrors({ mismatch: true });
      }
    }

  resetPassword(){
    this.service.resetPassword(this.id,this.token,{Password: this.member.Password}).subscribe((data) =>{
      console.log(data)
    })
    this.router.navigate(['/login'])
  }

}
