import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Member } from '../models/Member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  readonly url;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/members/'
   }
   getMembers(){
    return this.http.get<Member[]>(this.url);
  }
  deleteMember(id: string){
    return this.http.delete(this.url + id);
  }

  addMember(u: Member){
    
    return this.http.post<Member>(this.url,u);
    console.log(u); 
  }

  searchMember(id){
    return this.http.get(this.url + id);
  }

  updateMember (m: Member){
    return this.http.put<Member>(this.url+ m._id, m);
  }
}
