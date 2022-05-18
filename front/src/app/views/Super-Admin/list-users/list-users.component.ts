import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Member } from '../../../models/Member';
import { User } from '../../../models/User';
import { MembersService } from '../../../services/members.service';
import { UsersService } from '../../../services/users.service';
import { RegistrationFormComponent } from '../../Authentification/registration-form/registration-form.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements AfterViewInit {
  displayedColumns: string[] = ['Picture', 'FirstName', 'LastName', 'DOB', 'Association', 'Role_Association', 'Email', 'Phone', 'Actions'];
  dataSource: MatTableDataSource<Member>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  showFilter: Boolean;
  action: boolean;
  user: User;
  listMembers: Member[];
  listUsers: User[];
  show: boolean;
  val: string;
  memberToUpdate: Member;
  returnedMember: Member;
  listComplete: Member[];
  bsModalRef: BsModalRef;
  firstname: any;
  key = 'id';
  reverse: Boolean = false;
  p: number =1;
  modalRef: BsModalRef;
  config: any;

  constructor(private service: MembersService, private serviceUser: UsersService, private modalService: BsModalService, public dialog: MatDialog) {
    this.listComplete = new Array;
    
    this.service.getMembers().subscribe(
      (data: Member[]) => {
        this.listMembers = data,
        this.serviceUser.getUsers().subscribe(
          (data1: User[]) => {
            this.listUsers = data1.slice(1,data.length);
            for (let i = 0; i < data.length; i++) {
              this.listComplete[i] = {...data[i], ...data1[i+1]}
            }
            if (JSON.parse(localStorage.getItem("User")).Role === "superadmin" ){
              this.listComplete = this.listComplete
              this.dataSource = new MatTableDataSource(this.listComplete);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }else{
              this.listComplete = this.listComplete.filter(member => member.IdAssociation === JSON.parse(localStorage.getItem("User")).IdAssociation  )
              this.dataSource = new MatTableDataSource(this.listComplete);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
          }
          
        );    
      }     
    );
    
    console.log(this.dataSource);
    this.show = false;
    this.memberToUpdate = new Member;
    this.action = true;
    this.config= {class: 'gray modal-lg'};
    this.showFilter = false;
   }

  ngAfterViewInit(): void {
    //this.listComplete = [{_id: "", Password: "", ConfirmPassword: "", Email: "", Role: "", FirstName: "", LastName: "", Picture: "", DOB: "", Adress: "", Phone: 0 , Role_Association: ""}]

  }

  

  onUpdate (member){
    this.show = ! this.show;
    this.val = "Update member";
    this.memberToUpdate = member;
    this.action =false;

    const dialogRef = this.dialog.open(RegistrationFormComponent, {
      data: { memberToUpdate2 : this.memberToUpdate,
        val1: this.val,
        action1: this.action },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
    
  }

  onAdd (member){
    this.memberToUpdate = new Member;
    this.show = ! this.show;
    this.val = "Add member";
    this.action= true;

    const dialogRef = this.dialog.open(RegistrationFormComponent, {
      data: {
        val1: this.val,
        action1: this.action,
        returnedMember: this.returnedMember },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataSource.data.push(result.returnedMember)
      this.dataSource.data = this.dataSource.data
      console.log("Added successfully", result) 
    });

  }

  deletMember(member: Member){
    let i= this.listComplete.indexOf(member);
    this.service.deleteMember(this.listComplete[i]._id).subscribe(
      () => {this.listComplete = this.listComplete.filter(member => member._id != this.listComplete[i]._id),
        this.dataSource = new MatTableDataSource(this.listComplete),
      this.dataSource.paginator = this.paginator
    }
    ); 
    
    this.modalRef.hide(); 
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);

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

  /* Search(){
    if (this.firstname === ""){
      this.ngAfterViewInit();
    }
    else{
      this.listComplete = this.listComplete.filter(res => {
        return (res.FirstName.toLocaleLowerCase().match(this.firstname.toLocaleLowerCase()) || res.Phone.toString().match(this.firstname) || res.LastName.toLocaleLowerCase().match(this.firstname.toLocaleLowerCase()) || res.Email.toLocaleLowerCase().match(this.firstname.toLocaleLowerCase()) )
      })
    }
  }
  sortt(key){
    this.key = key;
    this.reverse = !this.reverse;
  } */

}
