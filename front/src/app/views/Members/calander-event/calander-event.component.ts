import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { EventsService } from '../../../services/events.service'
import { Eventt } from '../../../models/Event'
import { EventCalendar } from '../../../models/EventCalendar'
import { EventFormComponent } from '../event-form/event-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Calendar } from '@fullcalendar/core';
import { EventDescriptionComponent } from '../event-description/event-description.component';
import {  MatSnackBar,  MatSnackBarHorizontalPosition,  MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-calander-event',
  templateUrl: './calander-event.component.html',
  styleUrls: ['./calander-event.component.scss']
})
export class CalanderEventComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  listEvents: Eventt[];
  list: EventCalendar[];
  eventToAdd : EventCalendar;
  loading: Boolean;
  calendarOptions: CalendarOptions; 
  eventToUpdate : Eventt = new Eventt;
  returnedEvent: Eventt;
  val : string;
  fromCalandar : boolean;
  action : boolean;
  state : boolean;
  color : string;
  today3: Date;
  today1: Date;
  today2: Date;
  today0: Date;
  d1 :any;

  constructor(private service: EventsService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.eventToAdd = new EventCalendar;
    this.loading = true;
    this.list = new Array;
    this.today0 = new Date()
    this.today1 = new Date()
    this.today2 = new Date()
    this.today3 =  new  Date();
    this.today0.setDate(this.today0.getDate()-1)
    this.today1.setDate(this.today1.getDate()+1)
    this.today2.setDate(this.today2.getDate()+2)
    this.today3.setDate(this.today3.getDate()+3)

    this.service.getEvents().subscribe((data) =>{
      this.listEvents = data.filter(event => event.IdAssociation ===  JSON.parse(localStorage.getItem("User")).IdAssociation)
      for(let i=0; i<data.length; i++ ){
        let d1 = new Date(data[i].Start_date)
          let d2 = new Date(data[i].End_date)
          let d3 = new Date(d2.getFullYear(),d2.getMonth(), d2.getDate(), 1,0,0,0 )
        if(d3 >= (this.today0) && d3 <= (this.today3)  ){
          this.color = 'red'
        }
        else if (d3 > (this.today3) ){
          this.color = 'green'
        }
        else{
          this.color = 'none'
        }  
        if (data[i].IdAssociation === JSON.parse(localStorage.getItem('User')).IdAssociation){
           this.eventToAdd = {_id : data[i]._id, title : data[i].Title, start : d1, end : d3, backgroundColor : this.color}
        this.list.push(this.eventToAdd )
        }
      }
      this.calendarOptions ={
        events: this.list,
        headerToolbar: {
          left: 'prev,next',
          center: 'title',
          right: 'today dayGridMonth dayGridDay dayGridWeek'
        },
        editable: true,
        eventResizableFromStart : true,
        droppable: true,
        selectable : true,
        dayMaxEventRows : 3,
        select : this.handleEventSelect.bind(this),
        eventClick: this.handleEventClick.bind(this),
        eventDrop : this.handleDateDrop.bind(this)
      },
      console.log(this.calendarOptions.events , this.list)
      this.loading = false;
    },
    (error) =>{
      console.log(error)
    })
  }

  handleDateDrop(eventDropInfo){
    console.log("after drop " + eventDropInfo)
  }

  handleEventSelect(selectionInfo) {
    if(JSON.parse(localStorage.getItem('User')).Role_Association === "Chair"){
      const d = selectionInfo.endStr.split("-")
      this.d1 =  new Date(d[0], (parseInt(d[1]) -1 ), (parseInt(d[2]) -1 ))
      this.eventToUpdate = new Eventt;
      this.eventToUpdate = {...this.eventToUpdate, Start_date: selectionInfo.start, End_date : this.d1}
      this.val = "Add Event";
      this.action= true;
      this.state = false;
      this.fromCalandar= true;

      const dialogRef = this.dialog.open(EventFormComponent, {
        data: {
          val1: this.val,
          action1: this.action,
          returnedEvent: this.returnedEvent,
          state: this.state,
          eventToUpdate : this.eventToUpdate,
          fromCalandar : this.fromCalandar  },
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result.state === true ){
          this.list.push(result.eventToUpdate)
            this._snackBar.open('Your event was added successfully!', 'close', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration : 1500,
              panelClass :['background']
            });
          }
        console.log("Added successfully", result) 
      });
      
    } 
  }

  handleEventClick(arg){
    if(JSON.parse(localStorage.getItem('User')).Role_Association === "Chair"){
    this.service.searchEvent(arg.event._def.extendedProps._id).subscribe(data =>
    {this.eventToUpdate = data
    this.val = "Update Event";
    this.action= false;
    this.state = false;

    const dialogRef = this.dialog.open(EventFormComponent, {
      data: {
        val1: this.val,
        action1: this.action,
        returnedEvent: this.returnedEvent,
        state: this.state,
        eventToUpdate : this.eventToUpdate  },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result.state === true ){
        let i= this.listEvents.indexOf(this.eventToUpdate);
          console.log("i " +i)
          this.list.push(result.eventToUpdate)
        this._snackBar.open('Your event was updated successfully!', 'close', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration : 1500,
            panelClass :['background']
          });  
      }
      
      console.log("Added successfully", result) 
    });
  })
  } else{
    this.service.searchEvent(arg.event._def.extendedProps._id).subscribe(data => {
    const dialogRef = this.dialog.open(EventDescriptionComponent, {
      width : '30%',
      data : {
        eventToUpdate : data
      }
    })
 
  })}
 }
}
