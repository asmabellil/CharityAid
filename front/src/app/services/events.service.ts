import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Eventt } from '../models/Event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  readonly url;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/events/'
   }
   getEvents(){
    return this.http.get<Eventt[]>(this.url);
  }
  deleteEvent(id: string){
    return this.http.delete(this.url + id);
  }

  addEvent(e: Eventt){
    
    return this.http.post<Eventt>(this.url,e);
  }

  searchEvent(id){
    return this.http.get<Eventt>(this.url + id);
  }

  updateEvent (e: Eventt){
    return this.http.put<Eventt>(this.url+ e._id, e);
  }
}
