import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Avis } from '../Class/avis.model';

@Injectable({
  providedIn: 'root'
})
export class AvisServiceService {

  addcommentaire ='http://localhost:8089/SpringMVC/avis/add-avis';
  moyenneparannonceurl ='http://localhost:8089/SpringMVC/avis/moyennenoteparannonce';
  constructor(private http: HttpClient) { }
  ajoutavis(avis :Avis,ida:Number,idu:Number,note:Number): Observable<Avis>{
    return this.http.post<Avis>("http://localhost:8089/SpringMVC/avis/add-avis/"+ida+"/"+idu+"/"+note,avis);
  }
  moyenneparannonce(id:Number) : Observable<Number> {
    return this.http.get<Number>(`${this.moyenneparannonceurl}/${id}`);
    }
}
