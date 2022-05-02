import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Annonce } from '../Class/annonce.model';
import { Observable } from 'rxjs';
import { FileDB } from '../Class/file-db.model';
import { HttpHeaders, HttpParams,  } from '@angular/common/http';

const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
@Injectable({
  providedIn: 'root'
})
export class AnnonceServiceService {
 getannonce ='http://localhost:8089/SpringMVC/annonces/retreive-annonces';
addannonce='http://localhost:8089/SpringMVC/annonces/add-annonces';
uploadfilef="http://localhost:8089/SpringMVC/File/uploadf";
getfiledetail="http://localhost:8089/SpringMVC/File/filesdetail";
getannonceUrl="http://localhost:8089/SpringMVC/annonces/annonceById";
updateannonceUrl="http://localhost:8089/SpringMVC/annonces/update-annonces";
getfile="http://localhost:8089/SpringMVC/File/filesannonce";
deletefiles="http://localhost:8089/SpringMVC/File/delete-file";
  constructor(private http: HttpClient) { 

    }
   getAllAnnonce():Observable<Annonce[]> {
     return this.http.get<Annonce[]>(`${this.getannonce}`)
   }
   ajoutAnnonce(annonce :Annonce): Observable<Annonce>{
    return this.http.post<Annonce>(`${this.addannonce}`,annonce);
  }
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.uploadfilef}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
   
    return this.http.request(req);   
  }
  getFilesdetail(id:number): Observable<FileDB> {
    return this.http.get<FileDB>(`${this.getfiledetail}/${id}`);
  }
  affecterfileauannonce(id:Number,idf:number,annonce :Annonce):Observable<Annonce>{
    return this.http.put<Annonce>("http://localhost:8089/SpringMVC/Trip/affecter-fileToAnnonce/"+id+"/"+idf,annonce);
  }
  getAnnonce(id:number): Observable<Annonce>{
    return this.http.get<Annonce>(`${this.getannonceUrl}/${id}`);
  
  }
  updateannonce(id:number,annonce :Annonce): Observable<Annonce>{
    return this.http.put<Annonce>(`${this.updateannonceUrl}/${id}`,annonce);
  }
  getFiles(id:Number): Observable<FileDB> {
    return this.http.get<FileDB>(`${this.getfile}/${id}`);
  }
  deletefile(id:Number): any{
    return this.http.delete(`${this.deletefiles}/${id}`);
  }

  }

