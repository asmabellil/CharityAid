import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Eventt } from 'src/app/models/Event';

@Component({
  selector: 'app-event-description',
  templateUrl: './event-description.component.html',
  styleUrls: ['./event-description.component.scss']
})
export class EventDescriptionComponent implements OnInit {
  eventToUpdate : Eventt;
  tasks : any;

  constructor(public dialogRef: MatDialogRef<EventDescriptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {eventToUpdate : Eventt}) {
      this.eventToUpdate = data.eventToUpdate
     }

  ngOnInit(): void {
    this.tasks = this.data.eventToUpdate.Description.split('\n')
  }

}
