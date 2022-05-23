import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild, ɵɵInheritDefinitionFeature } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Member } from '../../../models/Member';
import { User } from '../../../models/User';
import { MembersService } from '../../../services/members.service';
import { UsersService } from '../../../services/users.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationFormComponent } from '../../Authentification/registration-form/registration-form.component';

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
  state: Boolean;
  update : Boolean;

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
    
    this.memberToUpdate = new Member;
    this.action = true;
    this.showFilter = false;
   }

  ngAfterViewInit(): void {

  }

  

  onUpdate (member){
    this.val = "Update member";
    this.memberToUpdate = member;
    this.action =false;
    this.update = true
    this.state =false

    const dialogRef = this.dialog.open(RegistrationFormComponent, {
      maxHeight: '500px',
      data: { memberToUpdate2 : this.memberToUpdate,
        val1: this.val,
        action1: this.action,
        update: this.update,
        text : 'Update picture',
        state: this.state },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result.state === true){
        let i= this.listComplete.indexOf(this.memberToUpdate);
        console.log("i " +i)
        this.dataSource.data.splice(i, 1, result.memberToUpdate2);
        this.dataSource.data = this.dataSource.data
      }
      console.log("Added successfully", result) 
    });
    
  }

  onAdd (member){
    this.memberToUpdate = new Member;
    this.val = "Add member";
    this.action= true;
    this.state = false;

    const dialogRef = this.dialog.open(RegistrationFormComponent, {
      maxHeight: '500px',
      data: {
        val1: this.val,
        action1: this.action,
        returnedMember: this.returnedMember,
        state: this.state,
        text : 'Drop a picture' },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Added successfully", result)
      if(result.state === true){
        this.listComplete.push(result.returnedMember)
        this.dataSource = new MatTableDataSource(this.listComplete);  
        console.log(this.listComplete)
        console.log(this.dataSource.data)
        //window.location.reload()
      } 
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
