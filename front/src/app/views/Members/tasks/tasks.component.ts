import { Component, OnInit } from '@angular/core';
import { Eventt } from '../../../models/Event';
import { Task } from '../../../models/Task';
import { EventsService } from 'src/app/services/events.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TaskFormComponent } from '../task-form/task-form.component'
import { TasksService } from 'src/app/services/tasks.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-task',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  listEvents: Eventt[];
  listTasks: Task[];
  listT: Task[];
  bsModalRef: BsModalRef; 
  modalRef: BsModalRef;
  taskToUpdate: Task;
  show: Boolean;
  val: String;
  action: boolean;

  constructor(private service : EventsService, private serviceTask: TasksService, private modalService: BsModalService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.service.getEvents().subscribe(
      (data: Eventt[]) => {
        this.listEvents = data.filter(event => event.IdAssociation === JSON.parse(localStorage.getItem("User")).IdAssociation)
      })

      this.serviceTask.getTasks().subscribe(
        (data: Task[]) => {
          this.listTasks = data
        })
    this.listT = new Array;
  }

  onAdd (e){
    this.taskToUpdate = new Task;
    this.show = ! this.show;
    this.val = "Add Task";
    this.action= true;

    const dialogRef = this.dialog.open(TaskFormComponent,{
      data: {
        val1: this.val,
        action1: this.action,
        event: e
        }
    }
    );
  }

}