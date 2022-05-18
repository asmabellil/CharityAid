import { Component, Inject, OnInit, TemplateRef } from '@angular/core';
import { Subscriber } from '../../../models/Subscriber';
import { SubscribersService } from 'src/app/services/subscribers.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-subscriber-form',
  templateUrl: './subscriber-form.component.html',
  styleUrls: ['./subscriber-form.component.scss']
})
export class SubscriberFormComponent implements OnInit {
  subscriberToUpdate: Subscriber;
  listSubscribers: Subscriber[];
  registerForm: FormGroup;
  modalRef: BsModalRef;

  constructor(private service: SubscribersService, private modalService: BsModalService, public dialogRef: MatDialogRef<SubscriberFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {subscriberToUpdate : Subscriber}) {
      this.subscriberToUpdate = data.subscriberToUpdate
     }

  ngOnInit(): void {
    this.service.getSubscribers().subscribe(
      (data: Subscriber[]) => {
        this.listSubscribers = data
      }
    )

    this.registerForm= new FormGroup({
      FirstName: new FormControl('',[Validators.required,Validators.minLength(2)]),
      LastName: new FormControl('',Validators.required),
      Adress: new FormControl('',[Validators.required,Validators.minLength(3)]),
      Phone: new FormControl('',[Validators.required,Validators.pattern('[0-9]{8}')]),
      DOB: new FormControl('',[Validators.required]),
      Email: new FormControl('',[Validators.required,Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4}$")]),
      });
      !this.subscriberToUpdate ? this.subscriberToUpdate = new Subscriber : console.log(this.subscriberToUpdate)
  }

  get FirstName() {return this.registerForm.get('FirstName')};
  get LastName() {return this.registerForm.get('LastName')};
  get Adress() {return this.registerForm.get('Adress')};
  get Phone() {return this.registerForm.get('Phone')};
  get DOB() {return this.registerForm.get('DOB')};
  get Email() {return this.registerForm.get('Email')};

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.dialogRef.close()
  }

  update(){
    this.service.updateSubscriber(this.subscriberToUpdate).subscribe((data) =>{
      console.log(data + "modified")
    })  
    this.modalRef.hide();
  }

}
