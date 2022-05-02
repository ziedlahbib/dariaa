import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commentaire } from '../Class/commentaire.model';

@Injectable({
  providedIn: 'root'
})
export class CommentaireServiceService {

  addcommentaire ='http://localhost:8089/SpringMVC/commentaire/add-commentaire';
  getcommentbyannonce='http://localhost:8089/SpringMVC/commentaire/listcommentairebyannoce'
  constructor(private http: HttpClient) { }

  ajoutcommentaire(cmt :Commentaire,ida:Number,idu:Number): Observable<Commentaire>{
    return this.http.post<Commentaire>("http://localhost:8089/SpringMVC/commentaire/add-commentaire/"+ida+"/"+idu,cmt);
  }
  getcommentairebyannonce(id:Number) : Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(`${this.getcommentbyannonce}/${id}`);
    }
}
