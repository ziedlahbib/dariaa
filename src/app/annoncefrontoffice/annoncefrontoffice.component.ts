import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Annonce } from '../Class/annonce.model';
import { Commentaire } from '../Class/commentaire.model';
import { AnnonceServiceService } from '../Service/annonce-service.service';
import { CommentaireServiceService } from '../Service/commentaire-service.service';

@Component({
  selector: 'app-annoncefrontoffice',
  templateUrl: './annoncefrontoffice.component.html',
  styleUrls: ['./annoncefrontoffice.component.css']
})
export class AnnoncefrontofficeComponent implements OnInit {

  listAnnonce : Annonce[];
  
  listofannoncePagination :Annonce[];
  start=0;
  end=6;
  listcommentaire:Commentaire[]
  public commentaireform: FormGroup;
  constructor(private as: AnnonceServiceService,private commentaireservice: CommentaireServiceService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    
    this.as.getAllAnnonce().subscribe(
      data=> {
           this.listAnnonce=data;
           this.listofannoncePagination=this.listAnnonce.slice(this.start, this.end)
          
       }
     );
   
  }
  paginate(event: PageEvent) {
    let startIndex = event.pageSize * event.pageIndex;
    this.start = startIndex;
    let endIndex = startIndex + event.pageSize;
    this.end = endIndex;
    if (endIndex > this.listAnnonce.length) {
      endIndex = this.listAnnonce.length;
    }
    this.listofannoncePagination = this.listAnnonce.slice(startIndex, endIndex);
  }

 
 

}
