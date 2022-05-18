import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../models/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  readonly url;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/contacts/'
   }
   getcontacts(){
    return this.http.get<Contact[]>(this.url);
  }
  deletecontact(id: string){
    return this.http.delete(this.url + id);
  }

  addcontact(a: Contact){
    
    return this.http.post<Contact>(this.url,a);
    console.log(a); 
  }

  searchcontact(id){
    return this.http.get(this.url + id);
  }

  updatecontact (a: Contact){
    return this.http.put<Contact>(this.url+ a._id, a);
  }
}
