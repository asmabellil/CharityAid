import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  readonly url;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/tasks/'
   }
   getTasks(){
    return this.http.get<Task[]>(this.url);
  }
  deleteTask(id: string){
    return this.http.delete(this.url + id);
  }

  addTask(e: Task){
    
    return this.http.post<Task>(this.url,e);
  }

  searchTask(id){
    return this.http.get(this.url + id);
  }

  updateTask (e: Task){
    return this.http.put<Task>(this.url+ e._id, e);
  }
}
