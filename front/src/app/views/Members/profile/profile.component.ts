import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Member } from 'src/app/models/Member';
import { MembersService } from 'src/app/services/members.service';
import {  MatSnackBar,  MatSnackBarHorizontalPosition,  MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  member: Member;
  registerForm: FormGroup;
  modalRef: BsModalRef;
  content : String = "Change picture";
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  files: File[] = [];
  update2: Boolean = false;

  constructor(private service: MembersService, private _snackBar: MatSnackBar, public bsModalRef: BsModalRef, private modalService: BsModalService,private service2 : UploadService) { }

  ngOnInit(): void {
   this.member = JSON.parse(localStorage.getItem("User"));

   this.registerForm= new FormGroup({
    FirstName: new FormControl('',[Validators.required,Validators.minLength(2)]),
    LastName: new FormControl('',[Validators.required,Validators.minLength(2)]),
    DOB: new FormControl('',Validators.required),
    Adress: new FormControl('',[Validators.required,Validators.minLength(3)]),
    Association: new FormControl('',Validators.required),
    Role_Association: new FormControl('',Validators.required),
    Phone: new FormControl('',[Validators.required,Validators.pattern('[0-9]{8}')]),
    Email: new FormControl('',[Validators.required,Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4}$")]),
    });
  }

  get FirstName() {return this.registerForm.get('FirstName')};
  get LastName() {return this.registerForm.get('LastName')};
  get DOB() {return this.registerForm.get('DOB')};
  get Adress() {return this.registerForm.get('Adress')};
  get Phone() {return this.registerForm.get('Phone')};
  get Email() {return this.registerForm.get('Email')};
  get Association() {return this.registerForm.get('Association')};
  get Role_Association() {return this.registerForm.get('Role_Association')};

  editProfile(member){
    const file_data = this.files[0]
    const data = new FormData();
    data.append('file', file_data)
    data.append('upload_preset', 'bv24fzos')
    data.append('cloud_name', 'dkqbdhbrp')
    this.service2.uploadImage(data).subscribe((response)=>{
      if(response){
        console.log("response " + response.secure_url);
        this.member = {...this.member, Picture: response.secure_url}
      
    this.service.updateMember(member).subscribe((data) =>{
      console.log(data + "modified")
      console.log(data)
      localStorage.setItem("User", JSON.stringify(data))
      let snack = this._snackBar.open('Your information was updated successfully!', 'close', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration : 1500,
        panelClass :['background']
      } );
      snack.afterDismissed().subscribe(() => {
        window.location.reload()
      })
    })}
  })
    this.member = {... member}
    this.modalRef.hide();
  }

  openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles); 
    const file_data = this.files[0]
    const data = new FormData();
    data.append('file', file_data)
    data.append('upload_preset', 'bv24fzos')
    data.append('cloud_name', 'dkqbdhbrp')
    this.service2.uploadImage(data).subscribe((response)=>{
      if(response){
        console.log("response " + response.secure_url);
        this.member = {...this.member, Picture: response.secure_url}
        this.update2 = false
      }
  })
  }
  
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  change(){
    console.log('iujvg')
   this.update2 = true;
}
}
