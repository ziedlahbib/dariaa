import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Annonce } from '../Class/annonce.model';
import { Commentaire } from '../Class/commentaire.model';
import { AnnonceServiceService } from '../Service/annonce-service.service';
import { CommentaireServiceService } from '../Service/commentaire-service.service';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-commentsandnoteannonce',
  templateUrl: './commentsandnoteannonce.component.html',
  styleUrls: ['./commentsandnoteannonce.component.css']
})
export class CommentsandnoteannonceComponent implements OnInit {

  listcommentaire:Commentaire[];
  public commentaireform: FormGroup;
  a:Annonce;
  cmt:Commentaire;
  currentRate = 8;
  userid=1;
  constructor(private as: AnnonceServiceService,private commentaireservice: CommentaireServiceService,private formBuilder: FormBuilder,private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();
    this.commentaireservice.getcommentairebyannonce(this.router.snapshot.params.id).subscribe(
      data=>{
          this.listcommentaire=data;
      }
    )
    this.as.getAnnonce(this.router.snapshot.params.id).subscribe(
      res=>{
        this.a=res;
        console.log(this.a)
      }
    )
  }
  initForm() {
  
    this.commentaireform = this.formBuilder.group({
      commentaire: [''],
     
   
  
  });
  this.commentaireform.valueChanges.subscribe(
    data=>{console.log(this.commentaireform)}
  )
  }
  ajouter(annonceid:Number){
    
    this.commentaireservice.ajoutcommentaire(this.commentaireform.value,annonceid,this.userid).subscribe(
      data=>{
        console.log(data)
        this.cmt=data;
       }
       );
  }

}
