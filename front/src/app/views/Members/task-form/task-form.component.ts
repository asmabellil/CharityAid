import { Component, EventEmitter, Inject, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Eventt } from 'src/app/models/Event';
import { Task } from 'src/app/models/Task';
import { EventsService } from 'src/app/services/events.service';
import { TasksService } from '../../../services/tasks.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  registerForm: FormGroup;
  taskToUpdate: Task;
  val1;
  action1;
  event;
  task: Task;
  taskToAdd: Task;
  returnedEvent: Task;
  modalRef: BsModalRef;
  listEvents: Eventt[];
  filteredOptions: Observable<Eventt[]>;
  options: string[];
  state: Boolean
  
  constructor(private service: TasksService, private serviceEvent: EventsService, public bsModalRef: BsModalRef, private modalService: BsModalService, public dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.taskToUpdate = data.taskToUpdate, this.val1 = data.val1, this.action1 = data.action1, this.state = data.state
    }

  ngOnInit(): void {
    this.dialogRef.beforeClosed().subscribe(() => this.dialogRef.close(this.data));
    this.serviceEvent.getEvents().subscribe(
      (data: Eventt[]) => {
        this.listEvents = data.filter(event => event.IdAssociation === JSON.parse(localStorage.getItem("User")).IdAssociation)
      })
      
    this.registerForm= new FormGroup({
      Title: new FormControl('',[Validators.required,Validators.minLength(2)]),
      Description: new FormControl('',[Validators.required,Validators.minLength(10)]),
      DL: new FormControl('',Validators.required),
      IdEvent: new FormControl('',Validators.required)
      });
      !this.taskToUpdate ? this.taskToUpdate = new Task : console.log(this.taskToUpdate)
  }

  get Title() {return this.registerForm.get('Title')};
  get Description() {return this.registerForm.get('Description')};
  get DL() {return this.registerForm.get('DL')};
  get IdEvent() {return this.registerForm.get('IdEvent')}

  update(){
    if (this.action1){
      this.taskToAdd = {... this.taskToUpdate, "Archive": "No", "Progress": "ToDo", "MemberName":  JSON.parse(localStorage.getItem("User")).FirstName + " " + JSON.parse(localStorage.getItem("User")).LastName}
      this.service.addTask(this.taskToAdd).subscribe(
        (data) => {
            this.data.state = true;
            this.data.returnedEvent = data
          console.log("add" + this.taskToAdd)
    });
  }else
    {
    console.log("entred")
    this.task = {...this.taskToUpdate}
    this.service.updateTask(this.task).subscribe((data) =>{
      console.log(data + "modified")
    })  
  }
  this.modalRef.hide();
  }

  openModal(template: TemplateRef<any>) {
    this.dialogRef.close();
    this.modalRef = this.modalService.show(template);
  }

}
