import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, Injector, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Member } from '../../../models/Member';
import { MembersService } from '../../../services/members.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AssociationsService } from 'src/app/services/associations.service';
import { Association } from 'src/app/models/Association';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  registerForm: FormGroup;
  listMembers: Member[];
  memberToAdd: Member;
  member: Member;
  listAssociations: Association[];
  val1 : String = "Create an account";
  memberToUpdate2: Member;
  action1 = true;
  returnedMember : Member;
  registerPage : boolean;
  closeBtnName: string;
  modalRef: BsModalRef;
  testRole: Boolean;
  association: String;

  constructor(private service: MembersService, private serviceAssociation: AssociationsService, private datePipe: DatePipe, private router : Router, public bsModalRef: BsModalRef, private modalService: BsModalService, public dialogRef: MatDialogRef<RegistrationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {memberToUpdate2 : Member, val1: String , action1: boolean, returnedMember: Member}) {
      this.memberToUpdate2 = data.memberToUpdate2, this.val1 = data.val1, this.action1 = data.action1, this.returnedMember =data.returnedMember
     }

  ngOnInit(): void {
    this.registerForm= new FormGroup({
      FirstName: new FormControl('',[Validators.required,Validators.minLength(2)]),
      LastName: new FormControl('',[Validators.required,Validators.minLength(2)]),
      DOB: new FormControl('',Validators.required),
      Adress: new FormControl('',[Validators.required,Validators.minLength(3)]),
      Phone: new FormControl('',[Validators.required,Validators.pattern('[0-9]{8}')]),
      Association: new FormControl('',Validators.required),
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

      this.listAssociations = new Array;

      this.serviceAssociation.getAssociations().subscribe(
        (data: Association[]) => {
        this.listAssociations = data
      }
      )
      this.testRole= false;
      this.association = "";
      if (JSON.parse(localStorage.getItem("User")).Role === "superadmin" ){
        this.testRole = true;
      }else{
        this.testRole = false;
        this.association = JSON.parse(localStorage.getItem("User")).Association
      }
  
      /* if (JSON.parse(localStorage.getItem("User")).Role === "superadmin" ){
        this.testRole = "1";
      }else if (JSON.parse(localStorage.getItem("User")).Role_Association === "Chair" ){
        this.testRole = "2";
      }else {
        this.testRole="3"
      } */
  }

  get FirstName() {return this.registerForm.get('FirstName')};
  get LastName() {return this.registerForm.get('LastName')};
  get DOB() {return this.registerForm.get('DOB')};
  get Adress() {return this.registerForm.get('Adress')};
  get Phone() {return this.registerForm.get('Phone')};
  get Role_Association() {return this.registerForm.get('Role_Association')};
  get Association() {return this.registerForm.get('Association')};
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

  update(){
    if (this.action1){
      if(JSON.parse(localStorage.getItem("User")).Role === "superadmin"){
      this.memberToAdd = {... this.memberToUpdate2,  Role: "member"}
      this.service.addMember(this.memberToAdd).subscribe(
        (data) => {
          console.log("add");
          this.data.returnedMember = data
            this.dialogRef.close(this.data);
    })
    console.log(this.memberToUpdate2);
    console.log(this.listMembers);        
      }
      else {
          this.memberToAdd = {... this.memberToUpdate2,  Role: "member", Association: this.association}
          this.service.addMember(this.memberToAdd).subscribe(
            (data) => {
              console.log("add")
              this.data.returnedMember = data
            this.dialogRef.close(this.data);
        })        
    }

  }else{
    console.log("entred")
    this.member = {...this.memberToUpdate2}
    this.service.updateMember(this.member).subscribe((data) =>{
      console.log(data + "modified")
    })  
    this.dialogRef.close(this.data);
  }
  this.modalRef.hide()
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
