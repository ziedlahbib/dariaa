import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Annonce } from 'src/app/Class/annonce.model';
import { FileDB } from 'src/app/Class/file-db.model';
import { AnnonceServiceService } from 'src/app/Service/annonce-service.service';

@Component({
  selector: 'app-ajout-annonce',
  templateUrl: './ajout-annonce.component.html',
  styleUrls: ['./ajout-annonce.component.css']
})
export class AjoutAnnonceComponent implements OnInit {
  public annonceForm: FormGroup;
  listfile:FileDB[];
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  annonce:Annonce;
  fileInfos: Observable<any>;
  file: FileDB
  constructor(private annonceservice:AnnonceServiceService,private router:Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm()
    this.listfile=[];
  }

  initForm() {/*
  this.tripForm = new FormGroup({
      destination: new FormControl('',[Validators.required,Validators.minLength(3)]),
      startDate: new FormControl('',[Validators.required]),
      endDate: new FormControl('',[Validators.required]),
      object: new FormControl('',[Validators.required,Validators.maxLength(40)]),
  })*/
  this.annonceForm = this.formBuilder.group({
    titre: ['', Validators.required],
    description: ['', [Validators.required, ,Validators.maxLength(50)]],
    prix: ['', Validators.required],
    transaction: ['', Validators.required],
    typedebien: ['', Validators.required],
    etat: ['', Validators.required],
    localisation: ['', Validators.required],
    superficie: ['', Validators.required],
    nbrchambre: ['', Validators.required],
    age: ['', Validators.required],
    etage: ['', Validators.required],
    numero: ['', Validators.required],
    datecreation: ['', Validators.required],
    file: [null, Validators.required],

});
this.annonceForm.valueChanges.subscribe(
  data=>{console.log(this.annonceForm)}
)
}

ajouter(){
  console.log(this.annonceForm.value);
this.annonceservice.ajoutAnnonce(this.annonceForm.value).subscribe(
  data=>{
    console.log(data)
    this.annonce=data;
    this.progress = 0;
  this.currentFile = this.selectedFiles.item(0);
  this.annonceservice.upload(this.currentFile).subscribe(
    event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.message = event.body.message;
        this.annonceservice.getFilesdetail(event.body).subscribe(
          res=>{
            this.file=res;
            console.log(this.annonce)
            console.log(res)
            this.annonceservice.affecterfileauannonce(this.annonce.id,res.id,this.annonce).subscribe(
              res=>{
               //this.listfile=res;
               this.router.navigate(["/Annonce"])
              }
           
          );
          }
        );

      }
    },
    err => {
      this.progress = 0;
      this.message = 'Could not upload the file!';
      this.currentFile = undefined;
    });
  this.selectedFiles = undefined;
 }
);
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  upload() :FileDB{
    this.progress = 0;
    this.currentFile = this.selectedFiles.item(0);
    this.annonceservice.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.annonceservice.getFilesdetail(event.body).subscribe(
            data=>{
              this.file=data;
              console.log('file',this.file)
           
              this.listfile.push(this.file);   
              console.log(this.listfile)           
              
            }
          );
  
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });
    this.selectedFiles = undefined;
    return this.file;
  }
  
  supprimer(file :FileDB){
    
    this.listfile.splice(this.listfile.indexOf(file),1)
  }

}
