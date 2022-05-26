import { Component,  Inject,  OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Eventt } from '../../../models/Event';
import { EventsService } from '../../../services/events.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  MatSnackBar,  MatSnackBarHorizontalPosition,  MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  registerForm: FormGroup;
  event: Eventt;
  eventToAdd: Eventt;
  eventToUpdate: Eventt;
  action1 = true;
  val1;
  returnedEvent : Eventt;
  modalRef: BsModalRef;
  state: Boolean;
  start : Date;
  fromCalandar : boolean;

  constructor(private service: EventsService, public bsModalRef: BsModalRef, private modalService: BsModalService, private _snackBar: MatSnackBar , public dialogRef: MatDialogRef<EventFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {eventToUpdate : Eventt, val1: String , action1: boolean, returnedEvent: Eventt, state: Boolean, start : Date, fromCalandar: boolean}) {
      this.eventToUpdate = data.eventToUpdate, this.val1 = data.val1, this.action1 = data.action1, this.returnedEvent =data.returnedEvent, this.state = data.state, this.start =data.start, this.fromCalandar = data.fromCalandar
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
      if (this.fromCalandar){
        this.eventToAdd = {... this.eventToUpdate ,"IdAssociation": JSON.parse(localStorage.getItem("User")).IdAssociation, "MemberName": JSON.parse(localStorage.getItem("User")).FirstName + " " + JSON.parse(localStorage.getItem("User")).LastName}
        console.log("event "+ JSON.stringify(this.eventToAdd.Start_date ).substring(1,11))
        this.service.addEvent(this.eventToAdd).subscribe(
          (data) => {
            this.data.state = true;
            this.data.returnedEvent = data
            this.dialogRef.close(this.data);
          });
          this.modalRef.hide()
      }else{
       if (this.action1){
        this.eventToAdd = {... this.eventToUpdate,"IdAssociation": JSON.parse(localStorage.getItem("User")).IdAssociation, "MemberName": JSON.parse(localStorage.getItem("User")).FirstName + " " + JSON.parse(localStorage.getItem("User")).LastName}
        console.log("event "+ JSON.stringify(this.eventToAdd.Start_date ).substring(1,11))
        this.service.addEvent(this.eventToAdd).subscribe(
          (data) => {
            this.data.state = true;
            this.data.returnedEvent = data
            this.dialogRef.close(this.data);
          });
          this.modalRef.hide()
          
          
      }else
        {
        console.log("entred")
        this.event = {...this.eventToUpdate}
        this.service.updateEvent(this.event).subscribe((data) =>{
          this.data.state = true;
          console.log(data + "modified")
          this.eventToUpdate = data
          this.dialogRef.close(this.data);
        })  
        this.modalRef.hide()
       
      }
      }
    
    }
  
    openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
    }

}
