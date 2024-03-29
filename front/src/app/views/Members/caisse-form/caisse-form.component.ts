import { DatePipe } from '@angular/common';
import { Inject, Component, EventEmitter, Injector, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Caisse } from '../../../models/Caisse';
import { CaissesService } from '../../../services/caisses.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-caisse-form',
  templateUrl: './caisse-form.component.html',
  styleUrls: ['./caisse-form.component.scss']
})
export class CaisseFormComponent implements OnInit {
  registerForm: FormGroup;
  caisse: Caisse;
  caisseToAdd: Caisse;
  @Input() caisseToUpdate: Caisse;
  @Input() action1 = true;
  val1;
  returnedCaisse: Caisse
  modalRef: BsModalRef;
  listCaisses: Caisse[];

  constructor(private service: CaissesService, public bsModalRef: BsModalRef, private modalService: BsModalService,public dialogRef: MatDialogRef<CaisseFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {caisseToUpdate : Caisse, val1: String , action1: boolean, returnedCaisse: Caisse, state: Boolean}) { 
      this.caisseToUpdate = data.caisseToUpdate, this.val1 = data.val1, this.action1 = data.action1, this.returnedCaisse =data.returnedCaisse
    }

  ngOnInit(): void {
    this.dialogRef.beforeClosed().subscribe(() => this.dialogRef.close(this.data));

    console.log(this.val1)

    this.service.getCaisses().subscribe(
      (data: Caisse[]) => {
        this.listCaisses = data.filter(caisse => caisse.IdAssociation === JSON.parse(localStorage.getItem("User")).IdAssociation)
      }
    )

    this.registerForm= new FormGroup({
      Montant: new FormControl('',[Validators.required,Validators.minLength(2)]),
      Type: new FormControl('',Validators.required),
      Category: new FormControl('',[Validators.required]),
      SubCategory : new FormControl('', [Validators.required]),
      Description: new FormControl('',[Validators.required,Validators.minLength(5)]),
      });
      !this.caisseToUpdate ? this.caisseToUpdate = new Caisse : console.log(this.caisseToUpdate)
  }

  get Montant() {return this.registerForm.get('Montant')};
  get Type() {return this.registerForm.get('Type')};
  get Source() {return this.registerForm.get('Source')};
  get Description() {return this.registerForm.get('Description')};

  update(){
    if (this.action1){
      if(this.caisseToUpdate.SubCategory === "Financials" || this.caisseToUpdate.SubCategory === "Corporals" || this.caisseToUpdate.SubCategory === "Incorparalls"){
        this.caisseToAdd = {...this.caisseToUpdate, Category : "Immobilisations", Type : "Expenses", Association : JSON.parse(localStorage.getItem("User")).Association, IdAssociation: JSON.parse(localStorage.getItem("User")).IdAssociation}
      }
      else if(this.caisseToUpdate.SubCategory === "Advance payments" || this.caisseToUpdate.SubCategory === "Receivables"){
        this.caisseToAdd = {...this.caisseToUpdate, Category : "Circulations", Type : "Expenses", Association : JSON.parse(localStorage.getItem("User")).Association, IdAssociation: JSON.parse(localStorage.getItem("User")).IdAssociation}
      }
      else if (this.caisseToUpdate.SubCategory === "Other" ||this.caisseToUpdate.SubCategory === "Supplier-debt" || this.caisseToUpdate.SubCategory === "Borrowing" || this.caisseToUpdate.SubCategory === "Dispositions" ){
        this.caisseToAdd = {...this.caisseToUpdate, Category : "Debts", Type : "Expenses", Association : JSON.parse(localStorage.getItem("User")).Association, IdAssociation: JSON.parse(localStorage.getItem("User")).IdAssociation}
      }
      else if (this.caisseToUpdate.SubCategory === "Income"){
        this.caisseToAdd = {...this.caisseToUpdate, Category : "Income", Type : "Income", Association : JSON.parse(localStorage.getItem("User")).Association, IdAssociation: JSON.parse(localStorage.getItem("User")).IdAssociation}
      }
      if(this.caisseToUpdate.SubCategory === "Association Project Reserve" || this.caisseToUpdate.SubCategory === "Equity"){
        this.caisseToAdd = {...this.caisseToUpdate, Category : "Association fund", Type : "Expenses"}
      }
      else (
        this.caisseToAdd = {...this.caisseToUpdate, Association : JSON.parse(localStorage.getItem("User")).Association, IdAssociation: JSON.parse(localStorage.getItem("User")).IdAssociation}
      )
      this.service.addCaisse(this.caisseToAdd).subscribe(
        (data) => {
          console.log("add")
          this.data.state = true
          this.data.returnedCaisse = data
          this.dialogRef.close(this.data);
    });
  }else
    {
        console.log("entred")
        if(this.caisseToUpdate.SubCategory === "Financials" || this.caisseToUpdate.SubCategory === "Corporals" || this.caisseToUpdate.SubCategory === "Incorparalls"){
          this.caisse = {...this.caisseToUpdate, Category : "Immobilisations", Type : "Expenses"}
        }
        else if(this.caisseToUpdate.SubCategory === "Advance payments" || this.caisseToUpdate.SubCategory === "Receivables"){
          this.caisse = {...this.caisseToUpdate, Category : "Circulations", Type : "Expenses"}
        }
        else if (this.caisseToUpdate.SubCategory === "Other" ||this.caisseToUpdate.SubCategory === "Supplier-debt" || this.caisseToUpdate.SubCategory === "Borrowing" || this.caisseToUpdate.SubCategory === "Dispositions" ){
          this.caisse = {...this.caisseToUpdate, Category : "Debts", Type : "Expenses"}
        }
        else if (this.caisseToUpdate.SubCategory === "Income"  ){
          this.caisse = {...this.caisseToUpdate, Category : "Income", Type : "Income"}
        }
        if(this.caisseToUpdate.SubCategory === "Association Project Reserve" || this.caisseToUpdate.SubCategory === "Equity"){
          this.caisse = {...this.caisseToUpdate, Category : "Association fund", Type : "Expenses"}
        }
        else (
          this.caisse = {...this.caisseToUpdate}
        )
        this.service.updateCaisse(this.caisse).subscribe((data) =>{
          console.log(data + "modified")
          this.data.caisseToUpdate = data
          this.data.state = true
          this.dialogRef.close(this.data);
    })  
  }
  this.modalRef.hide();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


}
