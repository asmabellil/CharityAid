import { Component, AfterViewInit, TemplateRef, ViewChild } from '@angular/core';
import { Caisse } from '../../../models/Caisse';
import { CaissesService } from '../../../services/caisses.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CaisseFormComponent } from '../caisse-form/caisse-form.component';

@Component({
  selector: 'app-caisse',
  templateUrl: './caisse.component.html',
  styleUrls: ['./caisse.component.scss']
})
export class CaisseComponent implements AfterViewInit {

  displayedColumns: string[] = ['Montant', 'Type', 'Source', 'Description', 'Actions'];
  dataSource: MatTableDataSource<Caisse>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort; 

  caisseToUpdate2: Caisse;
  listCaisses: Caisse[];
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
  returnedCaisse: Caisse;
  state: Boolean;

  constructor(private service: CaissesService, private modalService: BsModalService, public dialog: MatDialog) { 
    this.listCaisses = new Array;
    
    this.service.getCaisses().subscribe(
      (data: Caisse[]) => {
        this.listCaisses = data.filter(caisse => caisse.IdAssociation === JSON.parse(localStorage.getItem("User")).IdAssociation),
        this.dataSource = new MatTableDataSource(this.listCaisses);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    this.caisseToUpdate2 = new Caisse;
    this.config= {class: 'gray modal-lg'};
    this.showFilter = false;
  }

  ngAfterViewInit(): void {
  }

  onUpdate (caisse){
    this.show = ! this.show;
    this.val = "Update Caisse"; 
    this.caisseToUpdate2 = caisse;
    this.action =false;
    console.log(this.caisseToUpdate2)
    
    const dialogRef = this.dialog.open(CaisseFormComponent, {
      width: '25%',
       data: {
        caisseToUpdate : this.caisseToUpdate2,
        val1: this.val,
        action1: this.action
        } 
    }
    );
  } 

  onAdd(member): void {
    this.caisseToUpdate2 = new Caisse;
    this.show = ! this.show;
     this.val = "Add Caisse"; 
    this.action= true;
    this.state = false;

    const dialogRef = this.dialog.open(CaisseFormComponent, {
      width : '25%',
      data: {
        val1: this.val,
        action1: this.action,
        returnedCaisse: this.returnedCaisse,
        state: this.state },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.state === true){
        this.dataSource.data.push(result.returnedCaisse)
        this.dataSource.data = this.dataSource.data
      }
      
      console.log("Added successfully", result) 
    });
   
  }

  deletMember(caisse){
    let i= this.listCaisses.indexOf(caisse);
    this.service.deleteCaisse(this.listCaisses[i]._id).subscribe(
      () => {this.listCaisses = this.listCaisses.filter(caisse => caisse._id != this.listCaisses[i]._id),
        this.dataSource = new MatTableDataSource(this.listCaisses),
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
