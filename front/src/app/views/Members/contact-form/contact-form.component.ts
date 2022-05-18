import { DatePipe } from '@angular/common';
import { Inject, Component, EventEmitter, Injector, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../../../models/Contact';
import { ContactsService } from '../../../services/contacts.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  registerForm: FormGroup;
  contact: Contact;
  contactToAdd: Contact;
  @Input() contactToUpdate: Contact;
  @Input() action1 = true;
  val1;
  returnedContact: Contact
  modalRef: BsModalRef;
  listContacts: Contact[];

  constructor(private service: ContactsService, public bsModalRef: BsModalRef, private modalService: BsModalService,public dialogRef: MatDialogRef<ContactFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {contactToUpdate : Contact, val1: String , action1: boolean, returnedContact: Contact, state: Boolean}) { 
      this.contactToUpdate = data.contactToUpdate, this.val1 = data.val1, this.action1 = data.action1, this.returnedContact =data.returnedContact
    }

  ngOnInit(): void {
    this.dialogRef.beforeClosed().subscribe(() => this.dialogRef.close(this.data));

    console.log(this.val1)

    this.service.getcontacts().subscribe(
      (data: Contact[]) => {
        this.listContacts = data
      }
    )

    this.registerForm= new FormGroup({
      Name: new FormControl('',[Validators.required,Validators.minLength(2)]),
      Adress: new FormControl('',[Validators.required,Validators.minLength(3)]),
      Phone: new FormControl('',[Validators.required,Validators.pattern('[0-9]{8}')]),
      Type: new FormControl('',Validators.required),
      Responsible: new FormControl('',[Validators.required,Validators.minLength(2)]),
      Email: new FormControl('',[Validators.required,Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4}$")]),
      });
      !this.contactToUpdate ? this.contactToUpdate = new Contact : console.log(this.contactToUpdate)
  }

  get Name() {return this.registerForm.get('Name')};
  get Adress() {return this.registerForm.get('Adress')};
  get Phone() {return this.registerForm.get('Phone')};
  get Type() {return this.registerForm.get('Type')};
  get Responsible() {return this.registerForm.get('Responsible')};
  get Email() {return this.registerForm.get('Email')};

  update(){
    if (this.action1){
      this.contactToAdd = {... this.contactToUpdate}
      this.service.addcontact(this.contactToAdd).subscribe(
        (data) => {
          console.log("add")
          this.data.state = true
          this.data.returnedContact = data
          this.dialogRef.close(this.data);
    });
  }else
    {
    console.log("entred")
    this.contact = {...this.contactToUpdate}
    this.service.updatecontact(this.contact).subscribe((data) =>{
      console.log(data + "modified")
      this.contactToUpdate = data
    })  
    this.dialogRef.close(this.data);
  }
  this.modalRef.hide();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
