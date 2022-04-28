import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Injector, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Member } from '../../../models/Member';
import { MembersService } from '../../../services/members.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-regitration-page',
  templateUrl: './regitration-page.component.html',
  styleUrls: ['./regitration-page.component.scss']
})
export class RegitrationPageComponent implements OnInit {
  registerForm: FormGroup;
  listMembers: Member[];
  memberToAdd: Member;
  member: Member;
  @Input() val1 = "Create an account";
  @Input() memberToUpdate2: Member;
  @Input() action1 = true;
  @Output() returnedMember = new EventEmitter<Member>();
  @Output() actAdd = new EventEmitter<Member>();
  modalRef: BsModalRef;

  constructor(private service: MembersService,private serviceUser: UsersService, private datePipe: DatePipe, private router : Router, public bsModalRef: BsModalRef, private modalService: BsModalService) { }

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
      !this.memberToUpdate2 ? this.memberToUpdate2 = new Member : console.log(this.memberToUpdate2)
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
      } else {
        this.ConfirmPassword.setErrors({ mismatch: true });
      }
    }

  save(){
    this.router.navigate(['/login'])
    /* this.serviceUser.login({"Email": this.Email.value, "Password": this.Password.value}).subscribe(
      (response : any) => {
      console.log(response);
      this.router.navigate(['/main/allusers'])
      localStorage.setItem("User", JSON.stringify(response.body))
    })  */
    this.modalRef.hide();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);

    this.memberToAdd = {... this.memberToUpdate2,  Role: "member"}
    this.service.addMember(this.memberToAdd).subscribe(
      (data) => {
        console.log("add")
        this.actAdd.emit(data)
    })
  }

}
