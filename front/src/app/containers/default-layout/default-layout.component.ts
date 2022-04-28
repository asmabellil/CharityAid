import {Component, SecurityContext} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  constructor(private readonly sanitizer: DomSanitizer) { }
  Picture;
  Name;
  public navItems
  ngOnInit(): void {
    this.Picture = JSON.parse(localStorage.getItem("User")).Picture
    this.Name ="Welcome " + JSON.parse(localStorage.getItem("User")).FirstName + " " + JSON.parse(localStorage.getItem("User")).LastName;
    JSON.parse(localStorage.getItem("User")).Role === "superadmin" ? this.navItems = navItems[JSON.parse(localStorage.getItem("User")).Role] : this.navItems = navItems[JSON.parse(localStorage.getItem("User")).Role_Association]
  }

  public sidebarMinimized = false;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  clearLocalStorage(){
    localStorage.clear();
  }
}
