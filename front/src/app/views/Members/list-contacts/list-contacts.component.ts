import { Component, AfterViewInit, TemplateRef, ViewChild } from '@angular/core';
import { Contact } from '../../../models/Contact';
import { ContactsService } from '../../../services/contacts.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.scss']
})
export class ListContactsComponent implements AfterViewInit {
  
  displayedColumns: string[] = [ 'Name', 'Type', 'Responsible', 'Adress', 'Phone', 'Email', 'Actions'];
  dataSource: MatTableDataSource<Contact>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort; 

  contactToUpdate2: Contact;
  listContacts: Contact[];
  show: Boolean;
  val: String;
  action: boolean;
  bsModalRef: BsModalRef;  
  firstname: any;
  key = 'id';
  reverse: Boolean = false;
  p: number =1;
  modalRef: BsModalRef;
  config: any;
  showFilter: Boolean;
  returnedContact: Contact;
  state: Boolean;

  constructor(private service: ContactsService, private modalService: BsModalService, public dialog: MatDialog) { 
    this.listContacts = new Array;
    
    this.service.getcontacts().subscribe(
      (data: Contact[]) => {
        this.listContacts = data,
        this.dataSource = new MatTableDataSource(this.listContacts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    this.contactToUpdate2 = new Contact;
    this.showFilter = false;
  }

  ngAfterViewInit(): void {
  }

  onUpdate (contact){
    this.show = ! this.show;
    this.val = "Update Contact"; 
    this.contactToUpdate2 = contact;
    this.action =false;
    console.log(this.contactToUpdate2)
    
    const dialogRef = this.dialog.open(ContactFormComponent, {
       data: {
        contactToUpdate : this.contactToUpdate2,
        val1: this.val,
        action1: this.action
        } 
    }
    ); 
  } 

  onAdd(member): void {
    this.contactToUpdate2 = new Contact;
    this.show = ! this.show;
     this.val = "Add Contact"; 
    this.action= true;
    this.state = false;

    const dialogRef = this.dialog.open(ContactFormComponent, {
      data: {
        val1: this.val,
        action1: this.action,
        returnedContact: this.returnedContact,
        state: this.state },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.state === true){
        this.dataSource.data.push(result.returnedContact)
        this.dataSource.data = this.dataSource.data
      }
      
      console.log("Added successfully", result) 
    }); 
   
  }

  deletMember(contact){
    let i= this.listContacts.indexOf(contact);
    this.service.deletecontact(this.listContacts[i]._id).subscribe(
      () => {this.listContacts = this.listContacts.filter(contact => contact._id != this.listContacts[i]._id),
        this.dataSource = new MatTableDataSource(this.listContacts),
        this.dataSource.paginator = this.paginator}
    );
    this.modalRef.hide(); 
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
