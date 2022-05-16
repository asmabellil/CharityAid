import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscriber } from '../models/Subscriber';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {
  readonly url;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/subscribers/'
   }
   getSubscribers(){
    return this.http.get<Subscriber[]>(this.url);
  }
  deleteSubscriber(id: string){
    return this.http.delete(this.url + id);
  }

  addSubscriber(a: Subscriber){
    
    return this.http.post<Subscriber>(this.url,a);
    console.log(a); 
  }

  addSubscribersJSON(json){
    
    return this.http.post(this.url + 'addJSON', json);
  }

  searchSubscriber(id){
    return this.http.get(this.url + id);
  }

  updateSubscriber (a: Subscriber){
    return this.http.put<Subscriber>(this.url+ a._id, a);
  }
}
