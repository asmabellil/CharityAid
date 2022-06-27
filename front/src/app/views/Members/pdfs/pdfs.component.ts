import { Component, ViewChild, ElementRef, TemplateRef, AfterViewInit } from '@angular/core';
import { jsPDF } from 'jspdf'
import { Association } from 'src/app/models/Association';
import { Caisse } from 'src/app/models/Caisse';
import { Eventt } from 'src/app/models/Event';
import { AssociationsService } from 'src/app/services/associations.service';
import { SubscribersService } from 'src/app/services/subscribers.service';
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
export class PDFsComponent implements AfterViewInit {
  @ViewChild('content', {static: false}) el!: ElementRef
  @ViewChild('contentt', {static: false}) ell!: ElementRef
  @ViewChild('contenttt', {static: false}) elll!: ElementRef
  @ViewChild('header', {static: false}) header!: ElementRef
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
  isLinear = true;
  subNumber;
  event : Boolean = false;

  constructor(private service : EventsService, private serviceSub: SubscribersService, private serviceMember : MembersService, private _formBuilder: FormBuilder, private serviceAssociation : AssociationsService, private serviceCaisse: CaissesService, public dialog: MatDialog) 
  {
    this.nameAssociation = JSON.parse(localStorage.getItem('User')).Association
    this.idAssociation = JSON.parse(localStorage.getItem('User')).IdAssociation
    this.association = new Association;

    setTimeout(() => {
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
    }, 10);

    this.serviceSub.getSubscribers().subscribe(data =>{
      this.subNumber = data.length;
    })
    
    this.serviceMember.getMembers().subscribe(data =>{
      this.listMembers = data.filter(member => member.IdAssociation === JSON.parse(localStorage.getItem('User')).IdAssociation)
    })
   }

   ngAfterViewInit(): void {

    
    
  }

  get Introduction() {return this.pdfForm.get('Introduction')};
  get Presentation() {return this.pdfForm.get('Presentation')};
  get Conclusion() {return this.pdfForm.get('Conclusion')};
  get Year() {return this.pdfForm.get('Year')};

  makePDF(){
    var pdf = new jsPDF('p', 'pt', 'a4');
   
  let pageHeight = document.querySelector('#contentt').scrollHeight
  pdf.html(this.el.nativeElement,{
    callback : (pdf) =>{
      pdf.addPage()
      pdf.html(this.elll.nativeElement,{
        callback: (pdf) =>{
          pdf.addPage()
          pdf.html(this.ell.nativeElement,{
            callback: (pdf) =>{
              const keys = Object.keys(pdf.internal.pages);
              for(let i=2; i<keys.length ; i++){
                  pdf.setPage(+keys[i]);
                  pdf.text(this.association.Name+  " - " + this.Year.value, 550,  20, { align: 'right' });
              }
                  keys.forEach(key => {
                    pdf.setPage(+key);                    
                    pdf.text(key, pdf.internal.pageSize.width - 10, pdf.internal.pageSize.height - 6, { align: 'right' });
              });
              pdf.save(this.nameAssociation + "-" + this.Year.value)
            }, y:1560, margin : [40,0,30,0] // top right bottom left
          })
        }, y:900
      }) 
    }
  }) 
  }

  preview(template: TemplateRef<any>){
    this.service.getEvents().subscribe(
      (data) =>{
        this.listEvents = data.filter(event => event.IdAssociation === this.idAssociation).filter(event => event.Start_date.substring(0,10).split("-")[0] === this.Year.value )
        
        if(this.listEvents.length === 0){
          this.event = false;
        }
        else{
          this.event = true;
        }
      }
    )

    this.serviceCaisse.getCaisses().subscribe(
      (data: Caisse[]) => {
        this.listCaisses = data.filter(caisse => caisse.IdAssociation === JSON.parse(localStorage.getItem("User")).IdAssociation).filter(caisse => caisse.createdAt.substring(0,10).split("-")[0] === this.Year.value )

        for (let i=0; i<this.listCaisses.length ; i++){
          if(this.listCaisses[i].SubCategory === "Financials"){
          this.Financials = this.Financials + this.listCaisses[i].Montant
          }
          else if(this.listCaisses[i].SubCategory === "Corporals"){
            this.Corporals = this.Corporals + this.listCaisses[i].Montant
          }
          else if(this.listCaisses[i].SubCategory === "Incorparalls"){
            this.Incorparalls = this.Incorparalls + this.listCaisses[i].Montant
          }
          else if(this.listCaisses[i].SubCategory === "Receivables"){
            this.Receivables = this.Receivables + this.listCaisses[i].Montant
          }
          else if(this.listCaisses[i].SubCategory === "Advance payments"){
            this.Advance_payments = this.Advance_payments + this.listCaisses[i].Montant
          }
          else if(this.listCaisses[i].SubCategory === "Supplier-debt"){
            this.Supplier_debt = this.Supplier_debt + this.listCaisses[i].Montant
          }
          else if(this.listCaisses[i].SubCategory === "Borrowing"){
            this.Borrowing = this.Borrowing + this.listCaisses[i].Montant
          }
          else if(this.listCaisses[i].SubCategory === "Dispositions"){
            this.Dispositions = this.Dispositions + this.listCaisses[i].Montant
          }
          else if(this.listCaisses[i].SubCategory === "Other"){
            this.Other = this.Other + this.listCaisses[i].Montant
          }
          else if(this.listCaisses[i].SubCategory === "Association Project Reserve"){
            this.Association_Project = this.Association_Project + this.listCaisses[i].Montant
          }
          else if(this.listCaisses[i].SubCategory === "Equity"){
            this.Equity = this.Equity + this.listCaisses[i].Montant
          }
        }
    })

    const dialogRef = this.dialog.open(template, {
      maxHeight: '600px',
      width: '100%',
    });    
  }
}
