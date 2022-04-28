import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Member } from 'src/app/models/Member';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  member: Member;
  registerForm: FormGroup;
  modalRef: BsModalRef;

  constructor(private service: MembersService, public bsModalRef: BsModalRef, private modalService: BsModalService) { }

  ngOnInit(): void {
   this.member = JSON.parse(localStorage.getItem("User"));

   this.registerForm= new FormGroup({
    FirstName: new FormControl('',[Validators.required,Validators.minLength(2)]),
    LastName: new FormControl('',[Validators.required,Validators.minLength(2)]),
    DOB: new FormControl('',Validators.required),
    Adress: new FormControl('',[Validators.required,Validators.minLength(3)]),
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

  editProfile(member){
    this.service.updateMember(member).subscribe((data) =>{
      console.log(data + "modified")
      localStorage.setItem("User", JSON.stringify(data))
    })
    this.member = {... member}
    this.modalRef.hide();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
