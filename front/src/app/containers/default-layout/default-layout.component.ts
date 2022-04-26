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
  ngOnInit(): void {
    this.Picture = JSON.parse(localStorage.getItem("User")).Picture
    this.Name ="Welcome " + JSON.parse(localStorage.getItem("User")).FirstName + " " + JSON.parse(localStorage.getItem("User")).LastName;
  }

  public sidebarMinimized = false;
  public navItems = navItems[JSON.parse(localStorage.getItem("User")).Role];


  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  clearLocalStorage(){
    localStorage.clear();
  }
}
