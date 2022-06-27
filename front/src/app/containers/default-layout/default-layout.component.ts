import {Component} from '@angular/core';
import { Member } from 'src/app/models/Member';
import { AssociationsService } from 'src/app/services/associations.service';
import { MembersService } from 'src/app/services/members.service';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent {
  Picture;
  Name;
  public navItems;
  state: Boolean = false;
  state2: Boolean = false;
  num : Number;
  member : Member;

  constructor( private service : AssociationsService, private serviceMember : MembersService, private router : Router) { }
  
  ngOnInit(): void {
    this.service.getAssociations().subscribe(data =>{
      this.num = data.filter(ass => ass.Valid === "0").length
    })
    this.Picture = JSON.parse(localStorage.getItem("User")).Picture
    this.Name ="Welcome " + JSON.parse(localStorage.getItem("User")).FirstName + " " + JSON.parse(localStorage.getItem("User")).LastName;
    JSON.parse(localStorage.getItem("User")).Role === "superadmin" ? this.navItems = navItems[JSON.parse(localStorage.getItem("User")).Role] : this.navItems = navItems[JSON.parse(localStorage.getItem("User")).Role_Association]
    if(JSON.parse(localStorage.getItem("User")).Role === "member"){
      this.state = true;
      if(JSON.parse(localStorage.getItem("User")).Role_Association === "Chair"){
        this.state2 = true;
      }
    }else{
      this.state = false;
    }
  }

  public sidebarMinimized = false;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  clearLocalStorage(){
    localStorage.clear();
  }

  lock(){
    this.serviceMember.searchMember(JSON.parse(localStorage.getItem('User'))._id).subscribe(data => {
      this.member = data
      this.serviceMember.updateMember({...this.member, Valid: "0"}).subscribe((data) =>{
      console.log(data)
    }) 
    })
    
    this.router.navigate(['login'])
    localStorage.clear();
  }
}
