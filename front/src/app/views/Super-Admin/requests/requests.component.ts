import { Component, ViewChild, AfterViewInit, TemplateRef } from '@angular/core';
import { Member } from 'src/app/models/Member';
import { MembersService } from 'src/app/services/members.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {  MatSnackBar,  MatSnackBarHorizontalPosition,  MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { Association } from 'src/app/models/Association';
import { AssociationsService } from 'src/app/services/associations.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements AfterViewInit {
  displayedColumns: string[] = [ 'Name', 'Foundation_date', 'Siret_Number','Responsible', 'Adress', 'Email', 'Phone', 'Actions'];
  dataSource: MatTableDataSource<Association>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  list: Association[];
  loading : Boolean;
  modalRef: BsModalRef;
  showFilter: Boolean;

  constructor(private service: AssociationsService, private modalService: BsModalService, private _snackBar: MatSnackBar) {
    this.list = new Array;
    this.loading = true;
    this.showFilter = false;
    this.service.getAssociations().subscribe(data =>{
      this.list = data.filter(member => member.Valid === "0")
      this.dataSource = new MatTableDataSource(this.list);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    (err)=>{
      console.log(err)
    },
    ()=>{
      this.loading = false
    })
   }

  ngAfterViewInit(): void {
    
  }

  onChangeFilter(){
    this.showFilter = true;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  Update(association){
    let associationToUpdate = {...association, Valid : "1"}
    this.service.updateAssociation(associationToUpdate).subscribe(data =>{
      console.log(data)
      let i= this.list.indexOf(association);
      this.list = this.list.filter(member => member._id != this.list[i]._id)
      this.dataSource = new MatTableDataSource(this.list),
      this.dataSource.paginator = this.paginator
      console.log(associationToUpdate.Email)
      this.service.confirmRequest({Email: associationToUpdate.Email}).subscribe(data =>{
        console.log(data)
      })
    })

  }

  deletMember(member){
    let i= this.list.indexOf(member);
    this.service.deleteAssociation(this.list[i]._id).subscribe(
      () => {this.list = this.list.filter(member => member._id != this.list[i]._id),
        this.dataSource = new MatTableDataSource(this.list),
      this.dataSource.paginator = this.paginator
    },
    (error) =>{

    },
    () =>{
      this._snackBar.open('Your member was deleted successfully!', 'close', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration : 1500,
        panelClass :['background']
      });
    }
    ); 
    this.modalRef.hide()
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);

  }

}
