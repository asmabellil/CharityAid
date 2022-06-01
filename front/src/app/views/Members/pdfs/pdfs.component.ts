import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { jsPDF } from 'jspdf'
import { Association } from 'src/app/models/Association';
import { Eventt } from 'src/app/models/Event';
import { AssociationsService } from 'src/app/services/associations.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-pdfs',
  templateUrl: './pdfs.component.html',
  styleUrls: ['./pdfs.component.scss']
})
export class PDFsComponent implements OnInit {
  @ViewChild('content', {static: false}) el!: ElementRef
  nameAssociation : string;
  idAssociation : string;
  listEvents: Eventt[];
  association: Association;
  picture : string;

  constructor(private service : EventsService, private serviceAssociation : AssociationsService) { }

  ngOnInit(): void {
    this.nameAssociation = JSON.parse(localStorage.getItem('User')).Association
    this.idAssociation = JSON.parse(localStorage.getItem('User')).IdAssociation
    this.association = new Association;
    this.service.getEvents().subscribe(
      (data) =>{
        this.listEvents = data.filter(event => event.IdAssociation === this.idAssociation)
      }
    )

    this.serviceAssociation.searchAssociation(this.idAssociation).subscribe(data =>{
      this.association = data
      this.picture = data.Picture
      console.log(this.picture)
    })
  }

  makePDF(){
    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.addImage(this.picture, 15, 40, 180, 180);
    pdf.html(this.el.nativeElement,{
      callback : (pdf) =>{
        
      }
    }) 
    pdf.save(this.nameAssociation)
  }

}
