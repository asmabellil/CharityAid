import { Component, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { EventsService } from '../../../services/events.service'
import { Eventt } from '../../../models/Event'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EventFormComponent } from '../event-form/event-form.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements AfterViewInit {

  displayedColumns: string[] = ['Picture', 'Title', 'Start_date', 'End_date', 'Place', 'Number_Participants', 'Cout', 'Actions'];
  dataSource: MatTableDataSource<Eventt>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort; 

  listEvents: Eventt[];
  config: any;
  showFilter: Boolean;
  eventToUpdate: Eventt;
  show: Boolean;
  val: String;
  action: boolean;
  bsModalRef: BsModalRef; 
  modalRef: BsModalRef;
  val1: String;

  constructor(private service: EventsService, private modalService: BsModalService) { 
    this.listEvents = new Array;
    
    this.service.getEvents().subscribe(
      (data: Eventt[]) => {
        this.listEvents = data.filter(event => event.IdAssociation === JSON.parse(localStorage.getItem("User")).IdAssociation),
        this.dataSource = new MatTableDataSource(this.listEvents);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    this.eventToUpdate = new Eventt;
    this.config= {class: 'gray modal-lg'};
    this.showFilter = false;
  }

  ngAfterViewInit(): void {
    this.show = false;
    this.action = false;
  }

  onUpdate (event){
    this.show = ! this.show;
    this.val = "Update Event";
    this.eventToUpdate = event;
    this.action =false;
    
    this.bsModalRef = this.modalService.show(EventFormComponent, {
      initialState :  {
        eventToUpdate : this.eventToUpdate,
        val1: this.val,
        action1: this.action
      }
    }); 
  }

  onAdd (member){
    this.eventToUpdate = new Eventt;
    this.show = ! this.show;
    this.val = "Add Event";
    this.action= true;

    this.bsModalRef = this.modalService.show(EventFormComponent,{
      initialState: {
        val1: this.val,
        action1: this.action
      }   
    }); 
  }

  deletEvent(association){
    let i= this.listEvents.indexOf(association);
    this.service.deleteEvent(this.listEvents[i]._id).subscribe(
      () => {this.listEvents = this.listEvents.filter(association => association._id != this.listEvents[i]._id),
      this.dataSource = new MatTableDataSource(this.listEvents)}
    );
    this.modalRef.hide(); 
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
