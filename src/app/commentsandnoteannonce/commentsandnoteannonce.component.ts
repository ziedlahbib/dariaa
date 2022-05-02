import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Annonce } from '../Class/annonce.model';
import { Commentaire } from '../Class/commentaire.model';
import { AnnonceServiceService } from '../Service/annonce-service.service';
import { CommentaireServiceService } from '../Service/commentaire-service.service';
import { CommonModule } from '@angular/common'
import { Avis } from '../Class/avis.model';
import { AvisServiceService } from '../Service/avis-service.service';

@Component({
  selector: 'app-commentsandnoteannonce',
  templateUrl: './commentsandnoteannonce.component.html',
  styleUrls: ['./commentsandnoteannonce.component.css']
})
export class CommentsandnoteannonceComponent implements OnInit {

  listcommentaire:Commentaire[];
  public commentaireform: FormGroup;
  feedback:Avis;
  public feedbackForm: FormGroup;
  a:Annonce;
  cmt:Commentaire;
  moyenne:Number;
  currentRate =8;
  userid=1;
  constructor(private as: AnnonceServiceService,private commentaireservice: CommentaireServiceService,private avisservice:AvisServiceService,private formBuilder: FormBuilder,private router:ActivatedRoute)
   { this.feedback = new Avis()}

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
    this.avisservice.moyenneparannonce(this.router.snapshot.params.id).subscribe(
      data=>{
        this.moyenne=data;
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
    
    this.commentaireservice.ajoutcommentaire(this.commentaireform.value,annonceid,1).subscribe(
      data=>{
        console.log(data)
        this.cmt=data;
        this.commentaireservice.getcommentairebyannonce(this.router.snapshot.params.id).subscribe(
          res=>{
            this.listcommentaire=res;
          }
        )
       }
       );
  }
  modifier(id:Number){
    this.commentaireservice.modifiercommentaire(id,this.commentaireform.value).subscribe(
      data=>{
        this.commentaireservice.getcommentairebyannonce(this.router.snapshot.params.id).subscribe(
          res=>{
            this.listcommentaire=res;
          }
        )
      }

    )
  }
  supprimer(cmt:any){

    this.commentaireservice.deletecommentaire(cmt.id).subscribe(
      ()=>this.commentaireservice.getcommentairebyannonce(this.router.snapshot.params.id).subscribe(
        data=>{
          this.listcommentaire=data;
        }
      )
    )
  }
  addFeedback(ida:Number,idu :Number,note:Number){
    this.avisservice.ajoutavis(this.feedback,ida,idu,this.currentRate).subscribe(
      
      data=>{
        console.log(data);
        this.avisservice.moyenneparannonce(this.router.snapshot.params.id).subscribe(
          data=>{
            this.moyenne=data;
          }
        )
      
      }
    );
    
  }


}
