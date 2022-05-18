import { Component, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { EventsService } from '../../../services/events.service'
import { Eventt } from '../../../models/Event'
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EventFormComponent } from '../event-form/event-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements AfterViewInit {

  displayedColumns: string[] = ['Picture', 'Title', 'Start_date', 'End_date', 'Place', 'Number_Participants', 'Cout', 'MemberName', 'Actions'];
  dataSource: MatTableDataSource<Eventt>;

  @ViewChild(MatTable) table: MatTable<Eventt>;
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
  returnedEvent: Eventt;
  state: Boolean;

  constructor(private service: EventsService, private modalService: BsModalService, public dialog: MatDialog) { 
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

    const dialogRef = this.dialog.open(EventFormComponent, {
      data: { eventToUpdate : this.eventToUpdate,
        val1: this.val,
        action1: this.action},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }

  onAdd (member){
    this.eventToUpdate = new Eventt;
    this.show = ! this.show;
    this.val = "Add Event";
    this.action= true;
    this.state = false;

    const dialogRef = this.dialog.open(EventFormComponent, {
      data: {
        val1: this.val,
        action1: this.action,
        returnedEvent: this.returnedEvent,
        state: this.state  },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.state === true ){
        this.dataSource.data.push(result.returnedEvent)
        this.dataSource.data = this.dataSource.data
      }
      
      console.log("Added successfully", result) 
    });
  }

  deletEvent(association){
    let i= this.listEvents.indexOf(association);
    this.service.deleteEvent(this.listEvents[i]._id).subscribe(
      () => {this.listEvents = this.listEvents.filter(association => association._id != this.listEvents[i]._id),
      this.dataSource = new MatTableDataSource(this.listEvents),
      this.dataSource.paginator = this.paginator}
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
