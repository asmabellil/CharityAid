import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  readonly url;

  constructor(private http: HttpClient) { 
    this.url = 'http://localhost:3000/users/'
   }

   login(body: any){
    return this.http.post(this.url+ "login/", body, {observe : "response"});
  }

  getUsers(){
    return this.http.get<User[]>(this.url);
  }
  deleteUser(id: string){
    return this.http.delete(this.url + id);
  }

  addUser(u: User){
    
    return this.http.post(this.url,u);
    console.log(u); 
  }

  searchUser(id){
    return this.http.get(this.url + id);
  }

  forgotPassword(email){
    return this.http.post(this.url+ 'forgot-password', email)
  }

  resetPassword(id,token,password){
    console.log(password)
    return this.http.post(this.url + 'reset-password/' + id + '/' + token, password);
    
  }
}
