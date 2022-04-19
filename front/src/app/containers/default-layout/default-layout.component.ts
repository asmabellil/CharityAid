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
    this.Picture = this.sanitizer.bypassSecurityTrustResourceUrl(localStorage.getItem("Picture"))
    this.Name ="Welcome " + JSON.parse(localStorage.getItem("User")).Firstname + " " + JSON.parse(localStorage.getItem("User")).Lastname;
  }

  public sidebarMinimized = false;
  public navItems = navItems;


  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  clearLocalStorage(){
    localStorage.clear();
  }
}
