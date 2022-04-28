import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Member } from '../../../models/Member';
import { User } from '../../../models/User';
import { MembersService } from '../../../services/members.service';
import { UsersService } from '../../../services/users.service';
import { RegistrationFormComponent } from '../../Authentification/registration-form/registration-form.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  action: boolean;
  user: User;
  listMembers: Member[];
  listUsers: User[];
  show: boolean;
  val: string;
  memberToUpdate: Member;
  listComplete: Member[];
  bsModalRef: BsModalRef;
  firstname: any;
  key = 'id';
  reverse: Boolean = false;
  p: number =1;
  modalRef: BsModalRef;
  config: any;

  constructor(private service: MembersService, private serviceUser: UsersService, private modalService: BsModalService) { }

  ngOnInit(): void {
    //this.listComplete = [{_id: "", Password: "", ConfirmPassword: "", Email: "", Role: "", FirstName: "", LastName: "", Picture: "", DOB: "", Adress: "", Phone: 0 , Role_Association: ""}]
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
            }else{
              this.listComplete = this.listComplete.filter(member => member.Association === JSON.parse(localStorage.getItem("User")).Association  )
            }
          }
          
        );    
      }     
    );
    this.show = false;
    this.memberToUpdate = new Member;
    this.action = true;
    this.config= {class: 'gray modal-lg'}
  }

  onUpdate (member){
    this.show = ! this.show;
    this.val = "Update member";
    this.memberToUpdate = member;
    this.action =false;
    
    this.bsModalRef = this.modalService.show(RegistrationFormComponent, {
      initialState :  {
        memberToUpdate2 : this.memberToUpdate,
        val1: this.val,
        action1: this.action
      },
    });
    
  }

  onAdd (member){
    this.memberToUpdate = new Member;
    this.show = ! this.show;
    this.val = "Add member";
    this.action= true;

    this.bsModalRef = this.modalService.show(RegistrationFormComponent ,{
      initialState: {
        val1: this.val,
        action1: this.action
      } 
    }
    );
  }

  deletMember(member: Member){
    let i= this.listComplete.indexOf(member);
    this.service.deleteMember(this.listComplete[i]._id).subscribe(
      () => this.listComplete = this.listComplete.filter(member => member._id != this.listComplete[i]._id)
    ); 
    this.modalRef.hide(); 
  }

  updateList(m : Member){
    this.listComplete = [
      ...this.listComplete
    ]
    console.log("modified and showed")
    this.show = false;
    this.memberToUpdate = new Member;
  }

  afterAdd(m: Member){
    this.listComplete = [
       ...this.listComplete, m 
    ]
    //this.listMembers.push(this.member));
    this.show = false;
    this.memberToUpdate = new Member;
  }

  Search(){
    if (this.firstname === ""){
      this.ngOnInit();
    }
    else{
      this.listComplete = this.listComplete.filter(res => {
        return (res.FirstName.toLocaleLowerCase().match(this.firstname.toLocaleLowerCase()) || res.Phone.toString().match(this.firstname) || res.LastName.toLocaleLowerCase().match(this.firstname.toLocaleLowerCase()) || res.Email.toLocaleLowerCase().match(this.firstname.toLocaleLowerCase()) )
      })
    }
  }
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);

  }
}
