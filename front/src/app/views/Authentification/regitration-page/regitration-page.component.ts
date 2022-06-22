import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Injector, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Member } from '../../../models/Member';
import { MembersService } from '../../../services/members.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UsersService } from 'src/app/services/users.service';
import { Association } from 'src/app/models/Association';
import { AssociationsService } from 'src/app/services/associations.service';
import {  MatSnackBar,  MatSnackBarHorizontalPosition,  MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-regitration-page',
  templateUrl: './regitration-page.component.html',
  styleUrls: ['./regitration-page.component.scss']
})
export class RegitrationPageComponent implements OnInit {
  registerForm: FormGroup;
  association: Association;
  associationToAdd: Association;
  associationToUpdate: Association;
  action1 = true;
  val1;
  returnedAssociation: Association
  modalRef: BsModalRef;
  listAssociations: Association[];
  PreviewSource;
  fileVal;
  files: File[] = [];
  loading : Boolean;
  update2: Boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private service: AssociationsService,private serviceUser: UsersService, private datePipe: DatePipe, private router : Router, public bsModalRef: BsModalRef, private modalService: BsModalService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
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
      Picture: new FormControl('',Validators.required),
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
  get Picture() {return this.registerForm.get('Picture')};

  save(){
    this.associationToUpdate = {... this.associationToUpdate, Valid : "0"}
    this.service.addAssociation(this.associationToUpdate).subscribe(
      (data) => {
        console.log("add")
        this._snackBar.open('We sent a request to the admin!', 'close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration : 2500,
          panelClass :['background']
        });  
    })
    this.router.navigate(['/login'])
    this.modalRef.hide();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template); 
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles); 
    this.update2 = false;

  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.update2 = true;
  }

}
