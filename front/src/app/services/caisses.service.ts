import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Caisse } from '../models/Caisse';

@Injectable({
  providedIn: 'root'
})
export class CaissesService {
  readonly url;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/caisses/'
   }
   getCaisses(){
    return this.http.get<Caisse[]>(this.url);
  }
  deleteCaisse(id: string){
    return this.http.delete(this.url + id);
  }

  addCaisse(a: Caisse){
    
    return this.http.post<Caisse>(this.url,a);
    console.log(a); 
  }

  searchCaisse(id){
    return this.http.get(this.url + id);
  }

  updateCaisse (a: Caisse){
    return this.http.put<Caisse>(this.url+ a._id, a);
  }
}
