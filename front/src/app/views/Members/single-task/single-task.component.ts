import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Task } from 'src/app/models/Task';
import { Eventt } from 'src/app/models/Event';
import { TasksService } from 'src/app/services/tasks.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TaskFormComponent } from '../task-form/task-form.component';
import { reduce } from 'rxjs/operators';

@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.scss']
})
export class SingleTaskComponent implements OnInit {
  @Input() task: Task;
  @Input() event: Eventt;
  taskToUpdate: Task;
  listTasks: Task[];
  inform: String;
  bsModalRef: BsModalRef; 
  modalRef: BsModalRef;
  show: Boolean;
  val: String;
  action: boolean;
  color: string;

  constructor(private serviceTask: TasksService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.serviceTask.getTasks().subscribe(
      (data: Task[]) => {
        this.listTasks = data.filter(task => task.IdEvent === this.event._id).filter(task => task.Archive === "No");
        if (data.filter(task => task.IdEvent === this.event._id).length === 0){
          this.inform = "No tasks"
        }
      })
  }

  update (event){
    this.show = ! this.show;
    this.val = "Update Event";
    this.taskToUpdate = event;
    this.action =false;
    
    this.bsModalRef = this.modalService.show(TaskFormComponent, {
      initialState :  {
        taskToUpdate : this.taskToUpdate,
        val1: this.val,
        action1: this.action
      }
    }); 
  }

  delete(task){
    let i= this.listTasks.indexOf(task);
    this.serviceTask.deleteTask(this.listTasks[i]._id).subscribe(
      () => {this.listTasks = this.listTasks.filter(association => association._id != this.listTasks[i]._id)}
    );
    this.modalRef.hide(); 
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);

  }

  getColor(t){
    if (t.Progress === "Todo"){
      return "#f7b924";
    }
    if (t.Progress === "Done"){
      return "rgb(104, 212, 58)"
    }
    return "#f7b924";
  }

  updateTask(t){
    const task = {...t, "Progress" : "Done"}
    this.serviceTask.updateTask(task).subscribe((data) =>{
      console.log(data + "modified")
  })
  this.modalRef.hide(); 
  }

  updateT(t){
    const task = {...t, "Archive" : "Yes"}
    this.serviceTask.updateTask(task).subscribe((data) =>{
      console.log(data + "modified")
  })
  this.modalRef.hide(); 
  }
}
