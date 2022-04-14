import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Member } from '../../models/Member';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  resetPasswordForm: FormGroup;
  match: boolean;
  member: Member;
  id: any;
  token: any;

  constructor(private service: UsersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.resetPasswordForm= new FormGroup({
      Password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{6,50}')]),
      ConfirmPassword: new FormControl('',Validators.required),
      });
    
      this.match = true;
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
      this.match = false;
    } else {
      this.ConfirmPassword.setErrors({ mismatch: true });
      this.match = true;
    }
  }

  resetPassword(){
    this.service.resetPassword(this.id,this.token,{Password: this.member.Password}).subscribe((data) =>{
      console.log(data)
    })
  }

}
