import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, Injector, Input, NgZone, OnInit, Output, TemplateRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Member } from '../../../models/Member';
import { MembersService } from '../../../services/members.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AssociationsService } from 'src/app/services/associations.service';
import { Association } from 'src/app/models/Association';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploadService } from 'src/app/services/upload.service';

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
  modalRef: BsModalRef;
  testRole: Boolean;
  association: String;
  idAssociation: String;
  state: Boolean;
  files: File[] = [];
  loading : Boolean;
  update2: Boolean;
  picture: String;
  text: string ;

  constructor(private service: MembersService,private service2 : UploadService, private serviceAssociation: AssociationsService, private datePipe: DatePipe, private router : Router, public bsModalRef: BsModalRef, private modalService: BsModalService, public dialogRef: MatDialogRef<RegistrationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {memberToUpdate2 : Member, val1: String , action1: boolean, returnedMember: Member, state: Boolean, update: Boolean, text : string}) {
      this.memberToUpdate2 = data.memberToUpdate2, this.val1 = data.val1, this.action1 = data.action1, this.returnedMember =data.returnedMember, this.update2 = data.update, this.text = data.text
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

      this.state = false;
      this.dialogRef.beforeClosed().subscribe(() => this.dialogRef.close(this.data));

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
        this.idAssociation = JSON.parse(localStorage.getItem("User")).IdAssociation
      }
      this.loading = false;
      this.picture = "http://res.cloudinary.com/dkqbdhbrp/image/upload/v1629639337/teams/p0w14tfpxonfmbrjfnnj.jpg"
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
    this.loading = true;
    const file_data = this.files[0]
    const data = new FormData();
    data.append('file', file_data)
    data.append('upload_preset', 'bv24fzos')
    data.append('cloud_name', 'dkqbdhbrp')
    if(file_data){
      
    this.service2.uploadImage(data).subscribe((response)=>{
    if(response){
      console.log("response " + response.secure_url);
      this.picture = response.secure_url;
    }
  
      if (this.action1){
        if(JSON.parse(localStorage.getItem("User")).Role === "superadmin"){
          this.serviceAssociation.searchAssociation(this.memberToUpdate2.IdAssociation).subscribe(data =>{
             this.memberToAdd = {... this.memberToUpdate2, Association : data.Name,  Role: "member", Picture: response.secure_url}
              this.service.addMember(this.memberToAdd).subscribe(
                (data) => {
                console.log("add");
                this.data.state = true;
                this.data.returnedMember = data
                this.dialogRef.close(this.data);
              })
            console.log(this.memberToUpdate2);
            console.log(this.listMembers);  
          })
             
        }
        else {
            this.memberToAdd = {... this.memberToUpdate2,  Role: "member", Association: this.association, IdAssociation: this.idAssociation, Picture : response.secure_url}
            this.service.addMember(this.memberToAdd).subscribe(
              (data) => {
                this.data.state = true;
                console.log("add")
                this.data.returnedMember = data
                this.data.state = true;
                this.dialogRef.close(this.data);
                if(data._id === JSON.parse(localStorage.getItem('User'))._id){
                    localStorage.setItem('User', JSON.stringify(data))
                }
          })        
      }
    }else{
      console.log("entred")
      this.serviceAssociation.searchAssociation(this.memberToUpdate2.IdAssociation).subscribe(data =>{
      this.member = {...this.memberToUpdate2, Association : data.Name, Picture: response.secure_url}
      this.service.updateMember(this.member).subscribe((data) =>{
        this.data.state = true;
        this.data.memberToUpdate2 =data 
        console.log(data + "modified")
        this.dialogRef.close();
        if(this.memberToUpdate2._id === JSON.parse(localStorage.getItem('User'))._id){
          localStorage.setItem("User", JSON.stringify({...data, token: JSON.parse(localStorage.getItem('User')).token}))
          window.location.reload()
        }
      }) 
    }) 
    }
  })
    } else{
    if (this.action1){
      if(JSON.parse(localStorage.getItem("User")).Role === "superadmin"){
        this.serviceAssociation.searchAssociation(this.memberToUpdate2.IdAssociation).subscribe(data =>{
      this.memberToAdd = {... this.memberToUpdate2, Association : data.Name,  Role: "member", Picture : "http://res.cloudinary.com/dkqbdhbrp/image/upload/v1629639337/teams/p0w14tfpxonfmbrjfnnj.jpg"}
      this.service.addMember(this.memberToAdd).subscribe(
        (data) => {
          this.data.state = true;
          console.log("add");
          this.data.returnedMember = data
          this.dialogRef.close(this.data);
    })
    console.log(this.memberToUpdate2);
    console.log(this.listMembers);    
  })    
      }
      else {
          this.memberToAdd = {... this.memberToUpdate2,  Role: "member", Association: this.association, IdAssociation: this.idAssociation, Picture : "http://res.cloudinary.com/dkqbdhbrp/image/upload/v1629639337/teams/p0w14tfpxonfmbrjfnnj.jpg"}
          this.service.addMember(this.memberToAdd).subscribe(
            (data) => {
              this.data.state = true;
              console.log("add")
              this.data.returnedMember = data
              this.data.state = true;
              this.dialogRef.close(this.data);
        })        
    }

  }else{
    console.log("entred")
    this.serviceAssociation.searchAssociation(this.memberToUpdate2.IdAssociation).subscribe(data =>{
    this.member = {...this.memberToUpdate2, Association : data.Name}
    this.service.updateMember(this.member).subscribe((data) =>{
      this.data.state = true;
      this.data.memberToUpdate2 =data
      this.dialogRef.close();
      console.log(data + "modified")
      if(this.memberToUpdate2._id === JSON.parse(localStorage.getItem('User'))._id){
        localStorage.setItem("User", JSON.stringify({...data, token: JSON.parse(localStorage.getItem('User')).token}))
        window.location.reload()
      }
    })  
  })
  }
}
  this.modalRef.hide() 
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles); 
    this.update2 = false;
  
  }
  
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.update2 = true;
  }
  
  onUpload(){
    const file_data = this.files[0]
    const data = new FormData();
    data.append('file', file_data)
    data.append('upload_preset', 'ml_default')
    data.append('cloud_name', 'dkqbdhbrp')
  
    this.service2.uploadImage(data).subscribe((response)=>{
      if(response){
        console.log(response);
      }
      
    })
  }
}
