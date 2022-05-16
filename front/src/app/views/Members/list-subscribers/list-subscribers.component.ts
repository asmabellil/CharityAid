import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild  } from '@angular/core';
import { Subscriber } from '../../../models/Subscriber';
import { SubscribersService } from 'src/app/services/subscribers.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-list-subscribers',
  templateUrl: './list-subscribers.component.html',
  styleUrls: ['./list-subscribers.component.scss']
})
export class ListSubscribersComponent implements AfterViewInit {
  displayedColumns: string[] = ['Picture', 'FirstName', 'LastName', 'DOB', 'Adress', 'Email', 'Phone', 'Actions'];
  dataSource: MatTableDataSource<Subscriber>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  listSubscribers: Subscriber[];
  showFilter: Boolean;
  modalRef: BsModalRef;

  constructor(private service: SubscribersService, private modalService: BsModalService) { 
     this.service.getSubscribers().subscribe(
      (data : Subscriber[]) => {
        this.listSubscribers = data
        this.dataSource = new MatTableDataSource(this.listSubscribers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }

  ngAfterViewInit(): void {
   
  }

  onAdd(subscriber){

  }

  onUpdate(subscriber){

  }

  deletSubscriber(subscriber){
    let i= this.listSubscribers.indexOf(subscriber);
    this.service.deleteSubscriber(this.listSubscribers[i]._id).subscribe(
      () => {this.listSubscribers = this.listSubscribers.filter(member => member._id != this.listSubscribers[i]._id),
        this.dataSource = new MatTableDataSource(this.listSubscribers)
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
