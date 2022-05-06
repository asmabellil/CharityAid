import { Component, AfterViewInit, TemplateRef, ViewChild } from '@angular/core';
import { Association } from '../../../models/Association';
import { AssociationsService } from '../../../services/associations.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AssociationFormComponent } from '../association-form/association-form.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-list-associations',
  templateUrl: './list-associations.component.html',
  styleUrls: ['./list-associations.component.scss']
})
export class ListAssociationsComponent implements AfterViewInit {

  displayedColumns: string[] = ['Picture', 'Name', 'Foundation_date', 'Adress', 'Email', 'Phone', 'Actions'];
  dataSource: MatTableDataSource<Association>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort; 

  associationToUpdate: Association;
  listAssociations: Association[];
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

  constructor(private service: AssociationsService, private modalService: BsModalService) {
    this.listAssociations = new Array;
    
    this.service.getAssociations().subscribe(
      (data: Association[]) => {
        this.listAssociations = data,
        this.dataSource = new MatTableDataSource(this.listAssociations);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    this.associationToUpdate = new Association;
    this.config= {class: 'gray modal-lg'};
    this.showFilter = false;
    
   }

   ngAfterViewInit(): void {

  }

  onUpdate (association){
    this.show = ! this.show;
    this.val = "Update Association";
    this.associationToUpdate = association;
    this.action =false;
    
    this.bsModalRef = this.modalService.show(AssociationFormComponent, {
      initialState :  {
        associationToUpdate : this.associationToUpdate,
        val1: this.val,
        action1: this.action
      }
    });
  }

  onAdd (member){
    this.associationToUpdate = new Association;
    this.show = ! this.show;
    this.val = "Add Association";
    this.action= true;

    this.bsModalRef = this.modalService.show(AssociationFormComponent,{
      initialState: {
        val1: this.val,
        action1: this.action
      }   
    });
  }

  deletMember(association){
    let i= this.listAssociations.indexOf(association);
    this.service.deleteAssociation(this.listAssociations[i]._id).subscribe(
      () => {this.listAssociations = this.listAssociations.filter(association => association._id != this.listAssociations[i]._id),
      this.dataSource = new MatTableDataSource(this.listAssociations)}
    );
    this.modalRef.hide(); 
  }

  /* Search(){
    if (this.firstname === ""){
      this.ngAfterViewInit();
    }
    else{
      this.listAssociations = this.listAssociations.filter(res => {
        return (res.Name.toLocaleLowerCase().match(this.firstname.toLocaleLowerCase()) || res.Phone.toString().match(this.firstname) || res.Adress.toLocaleLowerCase().match(this.firstname.toLocaleLowerCase()) || res.Email.toLocaleLowerCase().match(this.firstname.toLocaleLowerCase()) )
      })
    }
  }
  sortt(key){
    this.key = key;
    this.reverse = !this.reverse;
  } */

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
