import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Member } from '../../models/Member';
import { MembersService } from '../../services/members.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  listMembers: Member[];
  memberToAdd: Member;
  member: Member;
  match: boolean;
  @Input() val1: String;
  @Input() memberToUpdate2: Member;
  @Input() action1: boolean;
  @Output() returnedMember = new EventEmitter<Member>();
  @Output() actAdd = new EventEmitter<Member>();

  constructor(private service: MembersService, private datePipe: DatePipe, private router : Router) { }

  ngOnInit(): void {
    this.registerForm= new FormGroup({
      FirstName: new FormControl('',[Validators.required,Validators.minLength(2)]),
      LastName: new FormControl('',[Validators.required,Validators.minLength(2)]),
      DOB: new FormControl('',Validators.required),
      Adress: new FormControl('',[Validators.required,Validators.minLength(3)]),
      Phone: new FormControl('',[Validators.required,Validators.pattern('[0-9]{8}')]),
      Role_Association: new FormControl('',Validators.required),
      Email: new FormControl('',[Validators.required,Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4}$")]),
      Password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{6,50}')]),
      ConfirmPassword: new FormControl('',Validators.required),
      });

      this.service.getMembers().subscribe(
        (data: Member[]) => this.listMembers = data
      ); 
      this.member = new Member;
      this.memberToUpdate2 = new Member;
      this.match = true;
  }

  get FirstName() {return this.registerForm.get('FirstName')};
  get LastName() {return this.registerForm.get('LastName')};
  get DOB() {return this.registerForm.get('DOB')};
  get Adress() {return this.registerForm.get('Adress')};
  get Phone() {return this.registerForm.get('Phone')};
  get Role_Association() {return this.registerForm.get('Role_Association')};
  get Email() {return this.registerForm.get('Email')};
  get Password() {return this.registerForm.get('Password')};
  get ConfirmPassword() {return this.registerForm.get('ConfirmPassword')};

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

  save(){
    this.memberToAdd = {... this.memberToUpdate2,  Role: "member"}
    this.service.addMember(this.memberToAdd).subscribe(
      (data) => {
        console.log("add")
        this.actAdd.emit(data)
    })
    this.router.navigate(['/dashboard'])
      console.log(this.memberToUpdate2);
      console.log(this.listMembers);
  }

 update(){
   if (this.action1){
     this.memberToAdd = {... this.memberToUpdate2,  Role: "member"}
    this.service.addMember(this.memberToAdd).subscribe(
      (data) => {
        console.log("add")
        this.actAdd.emit(data)
    })
      
      console.log(this.memberToUpdate2);
      console.log(this.listMembers);
      
   }else{
   console.log("entred")
   this.member = {...this.memberToUpdate2}
   this.service.updateMember(this.member).subscribe((data) =>{
      console.log(data + "modified")
      this.returnedMember.emit(data) 
   })  
   }
 }
}
