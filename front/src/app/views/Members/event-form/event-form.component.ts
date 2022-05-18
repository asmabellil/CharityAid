import { DatePipe } from '@angular/common';
import { Component, EventEmitter, HostListener, Inject, Injector, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Eventt } from '../../../models/Event';
import { EventsService } from '../../../services/events.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

  registerForm: FormGroup;
  event: Eventt;
  eventToAdd: Eventt;
  eventToUpdate: Eventt;
  action1 = true;
  val1;
  returnedEvent : Eventt;
  modalRef: BsModalRef;

  constructor(private service: EventsService, public bsModalRef: BsModalRef, private modalService: BsModalService, public dialogRef: MatDialogRef<EventFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {eventToUpdate : Eventt, val1: String , action1: boolean, returnedEvent: Eventt}) {
      this.eventToUpdate = data.eventToUpdate, this.val1 = data.val1, this.action1 = data.action1, this.returnedEvent =data.returnedEvent
     }

  ngOnInit(): void {
    this.dialogRef.beforeClosed().subscribe(() => this.dialogRef.close(this.data));
    this.registerForm= new FormGroup({
      Title: new FormControl('',[Validators.required,Validators.minLength(2)]),
      Description: new FormControl('',[Validators.required,Validators.minLength(10)]),
      Start_date: new FormControl('',Validators.required),
      End_date: new FormControl('',Validators.required),
      Place: new FormControl('',Validators.required),
      Number_Participants: new FormControl('',Validators.required),
      Cout: new FormControl('',Validators.required),
      });
      !this.eventToUpdate ? this.eventToUpdate = new Eventt : console.log(this.eventToUpdate)
    }

    get Title() {return this.registerForm.get('Title')};
    get Description() {return this.registerForm.get('Description')};
    get Start_date() {return this.registerForm.get('Start_date')};
    get End_date() {return this.registerForm.get('End_date')};
    get Place() {return this.registerForm.get('Place')};
    get Number_Participants() {return this.registerForm.get('Number_Participants')};
    get Cout() {return this.registerForm.get('Cout')};

    update(){
      if (this.action1){
        this.eventToAdd = {... this.eventToUpdate, "IdAssociation": JSON.parse(localStorage.getItem("User")).IdAssociation, "MemberName": JSON.parse(localStorage.getItem("User")).FirstName + " " + JSON.parse(localStorage.getItem("User")).LastName, "Picture":"http://res.cloudinary.com/dkqbdhbrp/image/upload/v1629639337/teams/p0w14tfpxonfmbrjfnnj.jpg"}
        this.service.addEvent(this.eventToAdd).subscribe(
          (data) => {
            console.log("add", data)
            this.data.returnedEvent = data
            this.dialogRef.close(this.data);
          });
      }else
        {
        console.log("entred")
        this.event = {...this.eventToUpdate}
        this.service.updateEvent(this.event).subscribe((data) =>{
          console.log(data + "modified")
          this.eventToUpdate = data
        })  
        this.dialogRef.close(this.data);
      }
    this.modalRef.hide()
    
    }
  
    openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
    }

}
