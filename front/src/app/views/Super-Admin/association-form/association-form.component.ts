import { DatePipe } from '@angular/common';
import { Inject, Component, EventEmitter, Injector, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Association } from '../../../models/Association';
import { AssociationsService } from '../../../services/associations.service';
import { UploadService } from '../../../services/upload.service'
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ThemeService } from 'ng2-charts';


@Component({
  selector: 'app-association-form',
  templateUrl: './association-form.component.html',
  styleUrls: ['./association-form.component.scss'],
  providers: [ UploadService ]
})
export class AssociationFormComponent implements OnInit {
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

  constructor(private service: AssociationsService,private service2 : UploadService, public bsModalRef: BsModalRef, private modalService: BsModalService,public dialogRef: MatDialogRef<AssociationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {associationToUpdate : Association, val1: String , action1: boolean, returnedAssociation: Association, state: Boolean, update : Boolean}) { 
      this.associationToUpdate = data.associationToUpdate, this.val1 = data.val1, this.action1 = data.action1, this.returnedAssociation =data.returnedAssociation, this.update2 = data.update
    }

  ngOnInit(): void {
    this.dialogRef.beforeClosed().subscribe(() => this.dialogRef.close(this.data));
    
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

  update(){
      if (this.action1){
        const file_data = this.files[0]
      const data = new FormData();
      data.append('file', file_data)
      data.append('upload_preset', 'bv24fzos')
      data.append('cloud_name', 'dkqbdhbrp')
 
      if(file_data){
        this.loading = true;
        this.service2.uploadImage(data).subscribe((response)=>{
        if(response){
          console.log("response " + response.secure_url);
          this.associationToAdd = {... this.associationToUpdate, Picture : response.secure_url}
          this.service.addAssociation(this.associationToAdd).subscribe(
            (data) => {
              console.log("add")
              this.data.state = true
              this.data.returnedAssociation = data
              this.dialogRef.close(this.data); 
        },
        (err) => {
          this.loading = false
          console.log(err)
        });        
        }
        })
      }else{
        this.loading  = true;
        this.associationToAdd = {... this.associationToUpdate, Picture : "http://res.cloudinary.com/dkqbdhbrp/image/upload/v1629639337/teams/p0w14tfpxonfmbrjfnnj.jpg"}
        this.service.addAssociation(this.associationToAdd).subscribe(
          (data) => {
            console.log("add")
            this.data.state = true
            this.data.returnedAssociation = data
            this.dialogRef.close(this.data); 
      });        
      }

      
  }else
    {
    console.log("entred")
    const file_data = this.files[0]
      const data = new FormData();
      data.append('file', file_data)
      data.append('upload_preset', 'bv24fzos')
      data.append('cloud_name', 'dkqbdhbrp')
 
      if(file_data){
        this.loading = true;
        this.service2.uploadImage(data).subscribe((response)=>{
        if(response){
          console.log("response " + response.secure_url);
          this.association = {...this.associationToUpdate, Picture : response.secure_url}
          this.service.updateAssociation(this.association).subscribe((data) =>{
            console.log(data + "modified")
            this.data.state = true
            this.data.associationToUpdate = data
            this.dialogRef.close(this.data);
          },
        (err) => {
          this.loading = false
          console.log(err)
        });        
        }
        })
      }else{
        this.loading = true;
        this.association = {...this.associationToUpdate, Picture : "http://res.cloudinary.com/dkqbdhbrp/image/upload/v1629639337/teams/p0w14tfpxonfmbrjfnnj.jpg"}
        this.service.updateAssociation(this.association).subscribe((data) =>{
          console.log(data + "modified")
          this.data.state = true
          this.data.associationToUpdate = data
          this.dialogRef.close(this.data)
        },
      (err) => {
        this.loading = false
        console.log(err)
      });   
      }
  }
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

  onUpload(){
    const file_data = this.files[0]
    const data = new FormData();
    data.append('file', file_data)
    data.append('upload_preset', 'ml_default')
    data.append('cloud_name', 'dkqbdhbrp')

    this.service2.uploadImage(data).subscribe((response)=>{
      if(response){
        console.log(response);
      }
      
    })
  }

}
