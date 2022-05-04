import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Annonce } from '../Class/annonce.model';
import { Commentaire } from '../Class/commentaire.model';
import { AnnonceServiceService } from '../Service/annonce-service.service';
import { CommentaireServiceService } from '../Service/commentaire-service.service';
import { CommonModule } from '@angular/common'
import { Avis } from '../Class/avis.model';
import { AvisServiceService } from '../Service/avis-service.service';
import { VERSION } from "@angular/core";
import { FormArray, Validators } from '@angular/forms';


@Component({
  selector: 'app-commentsandnoteannonce',
  templateUrl: './commentsandnoteannonce.component.html',
  styleUrls: ['./commentsandnoteannonce.component.css']
})
export class CommentsandnoteannonceComponent implements OnInit {

  listcommentaire:Commentaire[];
  public commentaireform: FormGroup;
  public modifiercommentaire:FormGroup;
  forms: any[];
  thisIsMyForm: FormGroup;
  feedback:Avis;
  public feedbackForm: FormGroup;
  a:Annonce;
  id:Number;
  cmt:Commentaire;
  moyenne:Number;
  currentRate =8;
 
  userconn=1;
  constructor(private as: AnnonceServiceService,private commentaireservice: CommentaireServiceService,private avisservice:AvisServiceService,private route :Router,private fb: FormBuilder,private forbuilder: FormBuilder,private router:ActivatedRoute)
   { this.feedback = new Avis()}
   public readonly fields = {
    commentaire: { formControlName: "commentaire", hasValidator: true, disabled: true },

  };

  ngOnInit(): void {
    this.forms = [this.fields]; // forms array can be based on selections
    this.thisIsMyForm = this.fb.group({
      formData: this.fb.array([])
    });
    this.setupForm();
    
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
    this.id=this.router.snapshot.params.id;
  }

  initForm() {
  
    this.commentaireform = this.forbuilder.group({
      commentaire: [''],


   
  
  }),
 
 

  this.commentaireform.valueChanges.subscribe(
    data=>{console.log(this.commentaireform)}
  )

  }
  toggleEdit(i) {
    const controlArray = this.thisIsMyForm.get('formData') as FormArray;
    if(controlArray.controls[i].status === 'DISABLED'){
      controlArray.controls[i].enable()
    } else {
      controlArray.controls[i].disable()
    }
  }

  formControlState(i){
    const controlArray = this.thisIsMyForm.get('formData') as FormArray;
    return controlArray.controls[i].disabled
  }

  setupForm() {
    const controlArray = this.thisIsMyForm.get('formData') as FormArray;
    this.forms.forEach(form => {
      const formObject = Object.keys(form).reduce((acc, el) => {
        console.log(this.fields[el])
      const { formControlName, hasValidator, disabled } = this.fields[el];
        acc[formControlName] = hasValidator
          ? [{value: null, disabled}, Validators.required]
          : [{value: null, disabled}];
        return acc;
      }, {});
      controlArray.push(this.fb.group(formObject))
    });
  }
  onSubmit() {
    // Here I would like to be able to access the values of the 'forms'
    console.log(this.thisIsMyForm.value);
  }

  ajouter(annonceid:Number){
    
    this.commentaireservice.ajoutcommentaire(this.commentaireform.value,annonceid,this.userconn).subscribe(
      data=>{
        console.log(data)
        console.log(this.commentaireform.value)
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
    console.log(id)
    this.commentaireservice.modifiercommentaire(id,this.thisIsMyForm.value.formData[0]).subscribe(
      
     
      data=>{
        this.cmt = data;
        
      
        console.log(data)
        console.log(this.thisIsMyForm.value.formData[0]);
        //window.location.reload();
        
        this.commentaireservice.getcommentairebyannonce(this.router.snapshot.params.id).subscribe(
          res=>{
           
            this.listcommentaire=res;
            /*
            this.thisIsMyForm.patchValue({
              commentaire: ''
              
            });
            this.thisIsMyForm.controls.commentaire.patchValue({commentaire:''});
            */
            var arrayControl = this.thisIsMyForm.get('formData') as FormArray;
            var item = arrayControl.at(0);
            item.get('commentaire').patchValue(''); 
          }
        )
          
        }
      
    
       
      
    
    );

    
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
