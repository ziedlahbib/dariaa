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
  updatecommentaire ='http://localhost:8089/SpringMVC/commentaire/update-commentaire';
  deletecommentaireUrl ='http://localhost:8089/SpringMVC/commentaire/delete-commentaire';
  constructor(private http: HttpClient) { }

  ajoutcommentaire(cmt :Commentaire,ida:Number,idu:Number): Observable<Commentaire>{
    return this.http.post<Commentaire>("http://localhost:8089/SpringMVC/commentaire/add-commentaire/"+ida+"/"+idu,cmt);
  }
  getcommentairebyannonce(id:Number) : Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(`${this.getcommentbyannonce}/${id}`);
    }
    modifiercommentaire(id:Number,cmt :Commentaire): Observable<Commentaire>{
      return this.http.put<Commentaire>(`${this.updatecommentaire}/${id}`,cmt);
    }
    deletecommentaire(id:Number): any{
      return this.http.delete(`${this.deletecommentaireUrl}/${id}`,{ responseType: 'text' });
    }
}
