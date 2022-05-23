import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild  } from '@angular/core';
import { Subscriber } from '../../../models/Subscriber';
import { SubscribersService } from 'src/app/services/subscribers.service';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as XLSX from 'xlsx';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { SubscriberFormComponent } from '../subscriber-form/subscriber-form.component';

@Component({
  selector: 'app-list-subscribers',
  templateUrl: './list-subscribers.component.html',
  styleUrls: ['./list-subscribers.component.scss']
})
export class ListSubscribersComponent implements AfterViewInit {
  displayedColumns: string[] = [ 'FirstName', 'LastName', 'DOB', 'Adress', 'Email', 'Phone', 'Actions'];
  dataSource: MatTableDataSource<Subscriber>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  listSubscribers: any;
  showFilter: Boolean;
  modalRef: BsModalRef;
  subscriberToUpdate: Subscriber;
  convertedJson!: string;
  loading : Boolean;

  constructor(private service: SubscribersService, private modalService: BsModalService, public dialog: MatDialog) { 
     this.service.getSubscribers().subscribe(
      (data : Subscriber[]) => {
        this.listSubscribers = data.filter(subscriber => subscriber.IdAssociation === JSON.parse(localStorage.getItem("User")).IdAssociation)
        this.dataSource = new MatTableDataSource(this.listSubscribers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }

  ngAfterViewInit(): void {
    this.loading = false
   
  }

  onUpdate(subscriber){
    this.subscriberToUpdate = subscriber;

    const dialogRef = this.dialog.open(SubscriberFormComponent, {
      data: { subscriberToUpdate : subscriber },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

  fileUpload(event){
    this.loading = true
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event ) =>{
      let binaryData = event.target.result;
      let workbook = XLSX.read(binaryData, {type: 'binary'});
      workbook.SheetNames.forEach(sheet=>{
        const data : Subscriber[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        console.log(data)
        for(let i=0; i<data.length; i++){
          data[i] = {...data[i],  IdAssociation : JSON.parse(localStorage.getItem("User")).IdAssociation}
        }
        //this.convertedJson = JSON.stringify(data,undefined,4);
        this.service.addSubscribersJSON(data).subscribe((result : Subscriber[])=>{
          this.loading = false
          for(let i=0; i<result.length;i++){
            this.dataSource.data.push(result[i])
          };
          this.dataSource.data = this.dataSource.data
        })
      })
      console.log(workbook);
    }
  }

  deletSubscriber(subscriber){
    let i= this.listSubscribers.indexOf(subscriber);
    this.service.deleteSubscriber(this.listSubscribers[i]._id).subscribe(
      () => {this.listSubscribers = this.listSubscribers.filter(member => member._id != this.listSubscribers[i]._id),
        this.dataSource = new MatTableDataSource(this.listSubscribers)
        this.dataSource.paginator = this.paginator;
    }
    ); 
    this.modalRef.hide(); 
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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);

  }

}
