import { DatePipe } from '@angular/common';
import { Inject, Component, EventEmitter, Injector, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Association } from '../../../models/Association';
import { AssociationsService } from '../../../services/associations.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-association-form',
  templateUrl: './association-form.component.html',
  styleUrls: ['./association-form.component.scss']
})
export class AssociationFormComponent implements OnInit {
  registerForm: FormGroup;
  association: Association;
  associationToAdd: Association;
  @Input() associationToUpdate: Association;
  @Input() action1 = true;
  val1;
  @Output() actAdd = new EventEmitter<Association>();
  @Output() returnedAssociation = new EventEmitter<Association>();
  modalRef: BsModalRef;
  listAssociations: Association[];

  constructor(private service: AssociationsService, public bsModalRef: BsModalRef, private modalService: BsModalService,public dialogRef: MatDialogRef<AssociationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    console.log(this.val1)

    this.service.getAssociations().subscribe(
      (data: Association[]) => {
        this.listAssociations = data
      }
    )

    this.registerForm= new FormGroup({
      Name: new FormControl('',[Validators.required,Validators.minLength(2)]),
      Foundation_date: new FormControl('',Validators.required),
      Adress: new FormControl('',[Validators.required,Validators.minLength(3)]),
      Phone: new FormControl('',[Validators.required,Validators.pattern('[0-9]{8}')]),
      Siret_Number: new FormControl('',[Validators.required,Validators.pattern('[0-9]{9}')]),
      Type: new FormControl('',Validators.required),
      Responsible: new FormControl('',[Validators.required,Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4}$")]),
      Username: new FormControl('',Validators.required),
      Email: new FormControl('',[Validators.required,Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4}$")]),
      });
      !this.associationToUpdate ? this.associationToUpdate = new Association : console.log(this.associationToUpdate)
  }

  get Name() {return this.registerForm.get('Name')};
  get Foundation_date() {return this.registerForm.get('Foundation_date')};
  get Adress() {return this.registerForm.get('Adress')};
  get Phone() {return this.registerForm.get('Phone')};
  get Siret_Number() {return this.registerForm.get('Siret_Number')};
  get Type() {return this.registerForm.get('Type')};
  get Responsible() {return this.registerForm.get('Responsible')};
  get Username() {return this.registerForm.get('Username')};
  get Email() {return this.registerForm.get('Email')};

  update(){
    if (this.action1){
      this.associationToAdd = {... this.associationToUpdate}
      this.service.addAssociation(this.associationToAdd).subscribe(
        (data) => {
          console.log("add")
          this.actAdd.emit(data)
    });
    this.dialogRef.close();
  }else
    {
    console.log("entred")
    this.association = {...this.associationToUpdate}
    this.service.updateAssociation(this.association).subscribe((data) =>{
      console.log(data + "modified")
      this.returnedAssociation.emit(data)
    })  
    this.dialogRef.close();
  }
  this.modalRef.hide();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.dialogRef.close()
    this.dialogRef.afterClosed().subscribe((result)=>{
      /* this.listAssociations ={...this.listAssociations, result}  */
      console.log("uhjbmkl" + result)
    })
  }

}
