import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { jsPDF } from 'jspdf'
import { Association } from 'src/app/models/Association';
import { Caisse } from 'src/app/models/Caisse';
import { Eventt } from 'src/app/models/Event';
import { AssociationsService } from 'src/app/services/associations.service';
import { EventsService } from 'src/app/services/events.service';
import { CaissesService } from '../../../services/caisses.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pdfs',
  templateUrl: './pdfs.component.html',
  styleUrls: ['./pdfs.component.scss']
})
export class PDFsComponent implements OnInit {
  @ViewChild('content', {static: false}) el!: ElementRef
  @ViewChild('contentt', {static: false}) ell!: ElementRef
  @ViewChild('contenttt', {static: false}) elll!: ElementRef
  nameAssociation : string;
  idAssociation : string;
  listEvents: Eventt[];
  association: Association;
  listCaisses: Caisse[];
  picture;
  total : number;
  presentation : string;
  pdfForm;
  isLinear = false;


  constructor(private service : EventsService, private _formBuilder: FormBuilder, private serviceAssociation : AssociationsService, private serviceCaisse: CaissesService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.nameAssociation = JSON.parse(localStorage.getItem('User')).Association
    this.idAssociation = JSON.parse(localStorage.getItem('User')).IdAssociation
    this.association = new Association;
    this.total = 0;
    
    this.serviceAssociation.searchAssociation(this.idAssociation).subscribe(data =>{
      this.association = data,
      this.picture = data.Picture,
      this.presentation = "This is our association " + this.association.Name + " it was founded on " + this.association.Foundation_date.substring(0,10).split("-").reverse().join("-")
      this.pdfForm = this._formBuilder.group({
      Introduction: ['This is the introduction to my report and this is our president word.', Validators.required],
      Presentation: [this.presentation, Validators.required],
      Conclusion: ['This is the conclusion to my report.', Validators.required],
      Year: ['2022', Validators.required],
    });
    })
    
  }

  get Introduction() {return this.pdfForm.get('Introduction')};
  get Presentation() {return this.pdfForm.get('Presentation')};
  get Conclusion() {return this.pdfForm.get('Conclusion')};
  get Year() {return this.pdfForm.get('Year')};

  makePDF(){
    let pdf = new jsPDF('p', 'pt', 'a4');
    console.log(this.pdfForm.get('Introduction').value)
    /* let pageHeight= pdf.internal.pageSize.height;
 
  // Before adding new content
  let y = 500 // Height position of new content
  if (y >= pageHeight)
  {
    pdf.addPage();
    y = 0 // Restart height position
  }
  pdf.text("value", 30, y);
  pdf.save('iklhoi') */

  let pageHeight = document.querySelector('#contentt').scrollHeight
  /* while(pageHeight > 500){
    pdf.addPage()
    height = height - 500
    console.log("1")
  } */
  console.log(pageHeight)
  pdf.html(this.el.nativeElement,{
    callback : (pdf) =>{
      pdf.addPage()
      pdf.html(this.elll.nativeElement,{
        callback: (pdf) =>{
          pdf.addPage()
          pdf.html(this.ell.nativeElement,{
            callback: (pdf) =>{
              pdf.save(this.nameAssociation + "-" + this.Year.value)
            }, y:1700
          })
        }, y:900
      })
    }, html2canvas: {scale: 1}
  }) 
  }

  preview(template: TemplateRef<any>){
    this.service.getEvents().subscribe(
      (data) =>{
        this.listEvents = data.filter(event => event.IdAssociation === this.idAssociation).filter(event => event.Start_date.substring(0,10).split("-")[0] === this.Year.value )
      }
    )

    this.serviceCaisse.getCaisses().subscribe(
      (data: Caisse[]) => {
        this.listCaisses = data.filter(caisse => caisse.IdAssociation === JSON.parse(localStorage.getItem("User")).IdAssociation).filter(caisse => caisse.createdAt.substring(0,10).split("-")[0] === this.Year.value )
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

    const dialogRef = this.dialog.open(template, {
      maxHeight: '600px',
      width: '100%',
    });
  }
}
