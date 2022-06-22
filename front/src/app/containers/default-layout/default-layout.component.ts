import {Component} from '@angular/core';
import { AssociationsService } from 'src/app/services/associations.service';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent {
  constructor( private service : AssociationsService) { }
  Picture;
  Name;
  public navItems;
  state: Boolean = false;
  state2: Boolean = false;
  num : Number;
  
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
}
