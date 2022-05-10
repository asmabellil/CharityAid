import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Task } from 'src/app/models/Task';
import { TasksService } from '../../../services/tasks.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  registerForm: FormGroup;
  @Input() taskToUpdate: Task;
  @Input() val1;
  @Input() action1;
  @Input() event;
  task: Task;
  taskToAdd: Task;
  @Output() actAdd = new EventEmitter<Task>();
  @Output() returnedEvent = new EventEmitter<Task>();
  modalRef: BsModalRef;
  
  constructor(private service: TasksService, public bsModalRef: BsModalRef, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.registerForm= new FormGroup({
      Title: new FormControl('',[Validators.required,Validators.minLength(2)]),
      Description: new FormControl('',[Validators.required,Validators.minLength(10)]),
      DL: new FormControl('',Validators.required),
      });
      !this.taskToUpdate ? this.taskToUpdate = new Task : console.log(this.taskToUpdate)
  }

  get Title() {return this.registerForm.get('Title')};
  get Description() {return this.registerForm.get('Description')};

  update(){
    if (this.action1){
      this.taskToAdd = {... this.taskToUpdate, "IdEvent": this.event._id}
      this.service.addTask(this.taskToAdd).subscribe(
        (data) => {
          console.log("add")
          this.actAdd.emit(data)
    });
  }else
    {
    console.log("entred")
    this.task = {...this.taskToUpdate}
    this.service.updateTask(this.task).subscribe((data) =>{
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
