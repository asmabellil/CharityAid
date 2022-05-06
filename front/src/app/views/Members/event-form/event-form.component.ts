import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Injector, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Eventt } from '../../../models/Event';
import { EventsService } from '../../../services/events.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

  registerForm: FormGroup;
  event: Eventt;
  eventToAdd: Eventt;
  @Input() eventToUpdate: Eventt;
  @Input() action1 = true;
  @Input() val1;
  @Output() actAdd = new EventEmitter<Eventt>();
  @Output() returnedEvent = new EventEmitter<Eventt>();
  modalRef: BsModalRef;

  constructor(private service: EventsService, public bsModalRef: BsModalRef, private modalService: BsModalService) { }

  ngOnInit(): void {
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
        this.eventToAdd = {... this.eventToUpdate}
        this.service.addEvent(this.eventToAdd).subscribe(
          (data) => {
            console.log("add")
            this.actAdd.emit(data)
      });
    }else
      {
      console.log("entred")
      this.event = {...this.eventToUpdate}
      this.service.updateEvent(this.event).subscribe((data) =>{
        console.log(data + "modified")
        this.returnedEvent.emit(data)
      })  
    }
    this.modalRef.hide();
    }
  
    openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
      this.bsModalRef.hide()
    }

}
