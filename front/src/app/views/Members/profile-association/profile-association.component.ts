import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Association } from 'src/app/models/Association';
import { AssociationsService } from 'src/app/services/associations.service';
import { ContactsService } from 'src/app/services/contacts.service';
import { EventsService } from 'src/app/services/events.service';
import { MembersService } from 'src/app/services/members.service';
import { SubscribersService } from 'src/app/services/subscribers.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-profile-association',
  templateUrl: './profile-association.component.html',
  styleUrls: ['./profile-association.component.scss']
})
export class ProfileAssociationComponent implements OnInit {
  associationId: string;
  state: Boolean = false;
  registerForm: FormGroup;
  associationToUpdate: Association;
  modalRef: BsModalRef;
  files: File[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  membersNumber: Number;
  subscribersNumber: Number;
  eventsNumber: Number;
  contactsNumber: Number;

  constructor( private serviceAssociation: AssociationsService, private modalService: BsModalService,private service2 : UploadService, private _snackBar: MatSnackBar,
    private service : MembersService, private serviceSub : SubscribersService, private serviceEvent: EventsService, private serviceContact: ContactsService) { }

  ngOnInit(): void {
    this.associationToUpdate = new Association;
    this.associationId = JSON.parse(localStorage.getItem('User')).IdAssociation
    this.serviceAssociation.searchAssociation(this.associationId).subscribe(data =>{
      this.associationToUpdate = data
   })

   this.service.getMembers().subscribe(data =>{
    this.membersNumber = data.filter(member => member.IdAssociation === JSON.parse(localStorage.getItem('User')).IdAssociation).length
   })

   this.serviceSub.getSubscribers().subscribe(data =>{
    this.subscribersNumber = data.filter(member => member.IdAssociation === JSON.parse(localStorage.getItem('User')).IdAssociation).length
   })

   this.serviceEvent.getEvents().subscribe(data =>{
    this.eventsNumber = data.filter(member => member.IdAssociation === JSON.parse(localStorage.getItem('User')).IdAssociation).length
   })

   this.serviceContact.getcontacts().subscribe(data =>{
    this.contactsNumber = data.filter(member => member.IdAssociation === JSON.parse(localStorage.getItem('User')).IdAssociation).length
   })

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
    this.state = true;
  }

  cancel(){
    this.state = false;
  }

  updateAsso(associationToUpdate){
    const file_data = this.files[0]
    const data = new FormData();
    data.append('file', file_data)
    data.append('upload_preset', 'bv24fzos')
    data.append('cloud_name', 'dkqbdhbrp')
    if(file_data){
      this.service2.uploadImage(data).subscribe((response)=>{
      if(response){
          console.log("response " + response.secure_url);
          let association = {...associationToUpdate, Picture: response.secure_url}
      this.serviceAssociation.updateAssociation(association).subscribe((data) =>{
        console.log(data + "modified")
        this.state = false;
      }) 
      } 
    })
    }
    else{
        let association = {...associationToUpdate}
    this.serviceAssociation.updateAssociation(association).subscribe((data) =>{
      console.log(data + "modified")
      this.state = false;
      })
    }
  
    this.modalRef.hide() 
    let snack = this._snackBar.open('Your information was updated successfully!', 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration : 1500,
      panelClass :['background']
    } );
    snack.afterDismissed().subscribe(() => {
      window.location.reload()
    })
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles); 
    const file_data = this.files[0]
    const data = new FormData();
    data.append('file', file_data)
    data.append('upload_preset', 'bv24fzos')
    data.append('cloud_name', 'dkqbdhbrp')
    this.service2.uploadImage(data).subscribe((response)=>{
      if(response){
        console.log("response " + response.secure_url);
        let association = {...this.associationToUpdate, Picture: response.secure_url}

      }
  })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

}
