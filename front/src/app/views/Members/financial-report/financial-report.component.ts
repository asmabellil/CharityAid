import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Caisse } from 'src/app/models/Caisse';
import { CaissesService } from 'src/app/services/caisses.service';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-financial-report',
  templateUrl: './financial-report.component.html',
  styleUrls: ['./financial-report.component.scss']
})
export class AnnuelReportComponent implements OnInit {
  listCaisses: Caisse[];
  Financials: number = 0;
  Corporals: number = 0;
  Incorparalls: number = 0;
  Receivables: number = 0;
  Advance_payments: number = 0;
  Supplier_debt: number = 0;
  Borrowing: number =0 ;
  Dispositions: number =0 ;
  Other: number =0 ;
  Association_Project: number = 0;
  Equity: number = 0;
  Income: number = 0;
  Year: string ;
  nameAssociation: string;
  exemple: String;
  @ViewChild('report', {static: false}) report!: ElementRef
  @ViewChild('excel', {static: false}) excel!: ElementRef

  constructor( private serviceCaisse : CaissesService) { }

  ngOnInit(): void {
    this.Year = "2022";
    this.nameAssociation = JSON.parse(localStorage.getItem('User')).Association
    this.serviceCaisse.getCaisses().subscribe(
      (data: Caisse[]) => {
        this.listCaisses = data.filter(caisse => caisse.IdAssociation === JSON.parse(localStorage.getItem("User")).IdAssociation).filter(caisse => caisse.createdAt.substring(0,10).split("-")[0] === this.Year)

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
          else if(this.listCaisses[i].SubCategory === "Income"){
            this.Income = this.Income + this.listCaisses[i].Montant
            this.exemple = this.listCaisses[i].Description
          }
        }
    })
  }

  downloadPDF(){
    console.log('pdf')
    var pdf = new jsPDF('l', 'pt', 'a4');
    pdf.html(this.report.nativeElement,{
      callback: (pdf) =>{
        pdf.save(this.nameAssociation + "-" + this.Year)
      }, margin : [10,0,0,10] // top right bottom left
    })
  }

  downloadExcel(){
    console.log('excel')
    var wb = XLSX.utils.table_to_book(this.excel.nativeElement,{sheet: "sheet1"});
    return XLSX.writeFile(wb, this.nameAssociation+"."+"xlsx" || ('mySheetName' + ('xlsx' || 'xlsx')));
  }

}
