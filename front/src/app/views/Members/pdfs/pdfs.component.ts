import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { jsPDF } from 'jspdf'
import { Association } from 'src/app/models/Association';
import { Caisse } from 'src/app/models/Caisse';
import { Eventt } from 'src/app/models/Event';
import { AssociationsService } from 'src/app/services/associations.service';
import { MembersService } from 'src/app/services/members.service';
import { EventsService } from 'src/app/services/events.service';
import { CaissesService } from '../../../services/caisses.service';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Member } from 'src/app/models/Member';

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
  Financials: number = 0;
  Corporals: number = 0;
  Incorparalls: number = 0;
  Receivables: number = 0;
  Advance_payments: number = 0;
  Supplier_debt: number = 0;
  Borrowing: number = 0;
  Dispositions: number = 0;
  Other: number = 0;
  Association_Project: number = 0;
  Equity: number = 0;
  listMembers: Member[];
  picture;
  total : number;
  presentation : string;
  pdfForm;
  isLinear = false;

  constructor(private service : EventsService, private serviceMember : MembersService, private _formBuilder: FormBuilder, private serviceAssociation : AssociationsService, private serviceCaisse: CaissesService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.nameAssociation = JSON.parse(localStorage.getItem('User')).Association
    this.idAssociation = JSON.parse(localStorage.getItem('User')).IdAssociation
    this.association = new Association;
    this.total = 0;
    
    this.serviceMember.getMembers().subscribe(data =>{
      this.listMembers = data
    })
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
        for (let i=0; i<data.length ; i++){
          if(data[i].SubCategory === "Financials"){
          this.Financials = this.Financials + data[i].Montant
          }
          else if(data[i].SubCategory === "Corporals"){
            this.Corporals = this.Corporals + data[i].Montant
          }
          else if(data[i].SubCategory === "Incorparalls"){
            this.Incorparalls = this.Incorparalls + data[i].Montant
          }
          else if(data[i].SubCategory === "Receivables"){
            this.Receivables = this.Receivables + data[i].Montant
          }
          else if(data[i].SubCategory === "Advance payments"){
            this.Advance_payments = this.Advance_payments + data[i].Montant
          }
          else if(data[i].SubCategory === "Supplier-debt"){
            this.Supplier_debt = this.Supplier_debt + data[i].Montant
          }
          else if(data[i].SubCategory === "Borrowing"){
            this.Borrowing = this.Borrowing + data[i].Montant
          }
          else if(data[i].SubCategory === "Dispositions"){
            this.Dispositions = this.Dispositions + data[i].Montant
          }
          else if(data[i].SubCategory === "Other"){
            this.Other = this.Other + data[i].Montant
          }
          else if(data[i].SubCategory === "Association Project Reserve"){
            this.Association_Project = this.Association_Project + data[i].Montant
          }
          else if(data[i].SubCategory === "Equity"){
            this.Equity = this.Equity + data[i].Montant
          }
        }
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
