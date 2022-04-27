import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Injector, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Association } from '../../../models/Association';
import { AssociationsService } from '../../../services/associations.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

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
  @Input() val1;
  @Output() actAdd = new EventEmitter<Association>();
  @Output() returnedAssociation = new EventEmitter<Association>();
  modalRef: BsModalRef;

  constructor(private service: AssociationsService, public bsModalRef: BsModalRef, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.registerForm= new FormGroup({
      Name: new FormControl('',[Validators.required,Validators.minLength(2)]),
      Foundation_date: new FormControl('',Validators.required),
      Adress: new FormControl('',[Validators.required,Validators.minLength(3)]),
      Phone: new FormControl('',[Validators.required,Validators.pattern('[0-9]{8}')]),
      Email: new FormControl('',[Validators.required,Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4}$")]),
      });
      !this.associationToUpdate ? this.associationToUpdate = new Association : console.log(this.associationToUpdate)
  }

  get Name() {return this.registerForm.get('Name')};
  get Foundation_date() {return this.registerForm.get('Foundation_date')};
  get Adress() {return this.registerForm.get('Adress')};
  get Phone() {return this.registerForm.get('Phone')};
  get Email() {return this.registerForm.get('Email')};

  update(){
    if (this.action1){
      this.associationToAdd = {... this.associationToUpdate}
      this.service.addAssociation(this.associationToAdd).subscribe(
        (data) => {
          console.log("add")
          this.actAdd.emit(data)
    });
  }else
    {
    console.log("entred")
    this.association = {...this.associationToUpdate}
    this.service.updateAssociation(this.association).subscribe((data) =>{
      console.log(data + "modified")
      this.returnedAssociation.emit(data)
    })  
  }
  this.modalRef.hide();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.bsModalRef.hide()
  }

}