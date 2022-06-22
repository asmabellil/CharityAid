import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Association } from '../models/Association';
import { Emitter } from '@fullcalendar/angular';

@Injectable({
  providedIn: 'root'
})
export class AssociationsService {

  readonly url;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/associations/'
   }
   getAssociations(){
    return this.http.get<Association[]>(this.url);
  }
  deleteAssociation(id: string){
    return this.http.delete(this.url + id);
  }

  addAssociation(a: Association){
    
    return this.http.post<Association>(this.url,a);
    console.log(a); 
  }

  searchAssociation(id){
    return this.http.get<Association>(this.url + id);
  }

  updateAssociation (a: Association){
    return this.http.put<Association>(this.url+ a._id, a);
  }

  confirmRequest (Email){
    return this.http.post(this.url + 'confirmRequest/',Email)
  }
}
