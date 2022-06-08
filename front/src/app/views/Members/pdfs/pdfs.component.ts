import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { jsPDF } from 'jspdf'
import { Association } from 'src/app/models/Association';
import { Caisse } from 'src/app/models/Caisse';
import { Eventt } from 'src/app/models/Event';
import { AssociationsService } from 'src/app/services/associations.service';
import { EventsService } from 'src/app/services/events.service';
import { CaissesService } from '../../../services/caisses.service';

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
  listCaisses: Caisse[];
  picture;
  total : number;

  constructor(private service : EventsService, private serviceAssociation : AssociationsService, private serviceCaisse: CaissesService) { }

  ngOnInit(): void {
    this.nameAssociation = JSON.parse(localStorage.getItem('User')).Association
    this.idAssociation = JSON.parse(localStorage.getItem('User')).IdAssociation
    this.association = new Association;
    this.total = 0;
    this.service.getEvents().subscribe(
      (data) =>{
        this.listEvents = data.filter(event => event.IdAssociation === this.idAssociation)
      }
    )

    this.serviceCaisse.getCaisses().subscribe(
      (data: Caisse[]) => {
        this.listCaisses = data.filter(caisse => caisse.IdAssociation === JSON.parse(localStorage.getItem("User")).IdAssociation)
        for(let i=0; i<this.listCaisses.length; i++){
      if( this.listCaisses[i].Type === "Income"){
        this.total = this.total + this.listCaisses[i].Montant
      }
      else{
        this.total = this.total - this.listCaisses[i].Montant
      }
      this.listCaisses[i].Montant
    }
    })
    
    this.serviceAssociation.searchAssociation(this.idAssociation).subscribe(data =>{
      this.association = data
      this.picture = data.Picture
    })

    
  }

  makePDF(){
    let pdf = new jsPDF('p', 'pt', 'a4');
     let pageHeight= pdf.internal.pageSize.height;
     pdf.html(this.el.nativeElement,{
      callback : (pdf) =>{
        pdf.save(this.nameAssociation)
      }
    })  
  }

}
