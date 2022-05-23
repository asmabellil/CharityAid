import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { EventsService } from '../../../services/events.service'
import { Eventt } from '../../../models/Event'
import { EventCalendar } from '../../../models/EventCalendar'
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calander-event',
  templateUrl: './calander-event.component.html',
  styleUrls: ['./calander-event.component.scss']
})
export class CalanderEventComponent implements OnInit {
  listEvents: Eventt[];
  list: EventCalendar[];
  eventToAdd : EventCalendar;
  loading: Boolean;
  calendarOptions: CalendarOptions; 
  today = new Date();
  color : string;
  todayy: string;
  today1: string;
  today2: string;
  today0: string;
  dd;
  mm;
  yyyy;

  constructor(private service: EventsService) { }

  ngOnInit(): void {
    this.eventToAdd = new EventCalendar;
    this.loading = true;
    this.list = new Array;
    this.dd = String(this.today.getDate()).padStart(2, '0');
    this.mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
    this.yyyy = this.today.getFullYear();
    this.todayy = this.yyyy + '-' + this.mm + '-' + (parseInt(this.dd)+3);
    this.today1 = this.yyyy + '-' + this.mm + '-' + (parseInt(this.dd)+2);
    this.today2 = this.yyyy + '-' + this.mm + '-' + (parseInt(this.dd)+1);
    this.today0 = this.yyyy + '-' + this.mm + '-' + (parseInt(this.dd));
    this.service.getEvents().subscribe((data) =>{
      
      this.listEvents = data.filter(event => event.IdAssociation ===  JSON.parse(localStorage.getItem("User")).IdAssociation)
      for(let i=0; i<data.length; i++ ){
        if(data[i].End_date.substring(0,10) === (this.todayy ) || data[i].End_date.substring(0,10) === (this.today2 ) || data[i].End_date.substring(0,10) === (this.today1 ) || data[i].End_date.substring(0,10) === (this.today0 ) ){
          this.color = 'red'
        }
        else if (data[i].End_date.substring(0,10) > (this.todayy ) ){
          this.color = 'green'
        }
        else{
          this.color = 'none'
        } 
        if (data[i].IdAssociation === JSON.parse(localStorage.getItem('User')).IdAssociation){
           this.eventToAdd = {title : data[i].Title, start : data[i].Start_date, end : data[i].End_date, backgroundColor : this.color}
        this.list.push(this.eventToAdd )
        }
      }
      this.calendarOptions ={
        customButtons: {
          myCustomButton: {
            text: 'Add',
            click: function () {
              alert('clicked the custom button!');
            }
          }
        },
        events: this.list,
        headerToolbar: {
          left: 'prev,next myCustomButton',
          center: 'title',
          right: 'today dayGridMonth dayGridDay dayGridWeek'
        },
        droppable: true,
        eventClick: this.handleEventClick.bind(this),
        eventDragStop: this.handleEventDragStop.bind(this),
        dateClick: this.handleDateClick.bind(this),
      },
      console.log(this.calendarOptions.events , this.list)
      this.loading = false;
    },
    (error) =>{
      console.log(error)
    },
    () =>{

    })
  }

  handleEventDragStop(arg){
    console.log(arg)
  }

  handleEventClick(arg){
    console.log(arg.event._def);
  }

  handleDateClick(arg){
    console.log(arg)
  }

}
