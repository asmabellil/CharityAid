import { Component, AfterViewInit, TemplateRef, ViewChild } from '@angular/core';
import { Association } from '../../../models/Association';
import { AssociationsService } from '../../../services/associations.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AssociationFormComponent } from '../association-form/association-form.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {  MatSnackBar,  MatSnackBarHorizontalPosition,  MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-associations',
  templateUrl: './list-associations.component.html',
  styleUrls: ['./list-associations.component.scss']
})
export class ListAssociationsComponent implements AfterViewInit {

  displayedColumns: string[] = ['Picture', 'Name', 'Foundation_date', 'Siret_Number','Responsible', 'Adress', 'Email', 'Phone', 'Actions'];
  dataSource: MatTableDataSource<Association>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort; 
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  associationToUpdate2: Association;
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
  returnedAssociation: Association;
  state: Boolean;
  update: Boolean;
  loading : Boolean;

  constructor(private service: AssociationsService, private _snackBar: MatSnackBar, private modalService: BsModalService, public dialog: MatDialog) {
    this.listAssociations = new Array;
    this.loading = true;

    this.service.getAssociations().subscribe(
      (data: Association[]) => {
        this.listAssociations = data.filter(association => association.Valid === "1"),
        this.dataSource = new MatTableDataSource(this.listAssociations);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) =>{},
      () => { this.loading = false }
      )
    this.associationToUpdate2 = new Association;
    this.config= {class: 'gray modal-lg'};
    this.showFilter = false;
   }

   ngAfterViewInit(): void {
     

  }

   onUpdate (association){
    this.val = "Update Association"; 
    this.associationToUpdate2 = association;
    this.action =false;
    this.update = true
    console.log(this.associationToUpdate2)
    
    const dialogRef = this.dialog.open(AssociationFormComponent, {
       data: {
        associationToUpdate : this.associationToUpdate2,
        val1: this.val,
        action1: this.action,
        update: this.update
        } 
    }
    );

    dialogRef.afterClosed().subscribe(result => {
      if(result.state === true){
        let i= this.listAssociations.indexOf(this.associationToUpdate2);
        console.log("i " +i)
        this.dataSource.data.splice(i, 1, result.associationToUpdate);
        this.dataSource.data = this.dataSource.data
        this._snackBar.open('Your assocciation was updated successfully!', 'close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration : 1500,
          panelClass :['background']
        });
      }
      
      console.log("Added successfully", result) 
    });
  } 

  onAdd(member): void {
    this.associationToUpdate2 = new Association;
     this.val = "Add Association"; 
    this.action= true;
    this.state = false;

    const dialogRef = this.dialog.open(AssociationFormComponent, {
      data: {
        val1: this.val,
        action1: this.action,
        returnedAssociation: this.returnedAssociation,
        state: this.state },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.state === true){
        console.log(result.returnedAssociation)
        this.listAssociations.push(result.returnedAssociation)
        this.dataSource = new MatTableDataSource(this.listAssociations);
        this._snackBar.open('Your association was added successfully!', 'close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration : 1500,
          panelClass :['background']
        });
      }
      console.log("Added successfully", result) 
    });
  }

  deletMember(association){
    let i= this.listAssociations.indexOf(association);
    console.log(this.listAssociations[i], this.listAssociations[i]._id)
    this.service.deleteAssociation(this.listAssociations[i]._id).subscribe(
      () => {this.listAssociations = this.listAssociations.filter(association => association._id != this.listAssociations[i]._id),
        this.dataSource = new MatTableDataSource(this.listAssociations),
        this.dataSource.paginator = this.paginator},
      (error) =>{
        console.log(error)
      },
      () =>{
        this._snackBar.open('Your association was deleted successfully!', 'close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration : 10000,
          panelClass :['background']
        });
      }
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
