import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Annonce } from 'src/app/Class/annonce.model';
import { FileDB } from 'src/app/Class/file-db.model';
import { AnnonceServiceService } from 'src/app/Service/annonce-service.service';

@Component({
  selector: 'app-modifier-annonce',
  templateUrl: './modifier-annonce.component.html',
  styleUrls: ['./modifier-annonce.component.css']
})
export class ModifierAnnonceComponent implements OnInit,AfterContentInit {

  public annonceForm: FormGroup;
  annonce:Annonce;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  fileInfos: Observable<any>;
  listfiles:FileDB[]=[];
  file: FileDB;
  id:number;
  idf:number[];
  constructor(private annonceservice:AnnonceServiceService,private router:ActivatedRoute,private route :Router,private formBuilder: FormBuilder) { }
  ngAfterContentInit(): void {
    this.get(this.router.snapshot.params.id)
  }

  ngOnInit(): void {
    this.annonceservice.getFiles(this.router.snapshot.params.id).subscribe(
      data => {
        console.log('data',data);
        this.file = data;
        this.listfiles.push(this.file)
        
      }
    );
  }
  initForm(data) {
      this.annonceForm = this.formBuilder.group({
        titre: [data?.titre, Validators.required],
        description: [data?.description, [Validators.required, ,Validators.maxLength(50)]],
        prix: [data?.prix, Validators.required],
        transaction: [data?.transaction, Validators.required],
        typedebien: [data?.typedebien, Validators.required],
        etat: [data?.etat, Validators.required],
        localisation: [data?.localisation, Validators.required],
        superficie: [data?.superficie, Validators.required],
        nbrchambre: [data?.nbrchambre, Validators.required],
        age: [data?.age, Validators.required],
        etage: [data?.etage, Validators.required],
        numero: [data?.numero, Validators.required],
        datecreation: [data?.datecreation, Validators.required],
        file: [null, Validators.required],
    
    
    })
}
  get(id:number){
    this.annonceservice.getAnnonce(id ).subscribe(
      data => {
        
        this.annonce = data;
      this.initForm(data)
  
      }
    );
  }
  modifier(){

    this.annonceservice.updateannonce(this.router.snapshot.params.id,this.annonceForm.value).subscribe(
      data=>{
        
        this.progress = 0;
        this.currentFile = this.selectedFiles.item(0);
       this.annonceservice.upload(this.currentFile).subscribe(
          event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.id=event.body;
              
              this.annonceservice.getFilesdetail(this.id).subscribe(
                data=>{
                  this.file=data;
                  console.log(this.id)
                  console.log('file',this.file)
                  console.log(this.router.snapshot.params.id)
                  //this.idf=[];
                  //this.idf.push(this.id);
                  this.annonceservice.affecterfileauannonce(this.router.snapshot.params.id,this.id,this.annonce).subscribe(
      
                    ()=>this.annonceservice.getFiles(this.router.snapshot.params.id).subscribe(
                      res=>{
                        this.file=res
                        this.listfiles.push(this.file);
                        this.route.navigate(["/Annonce"])
                      }
                    )
                  )
                  
                  
                }
              );
              //this.fileInfos = this.tripservice.getFiles(this.router.snapshot.params.id);
            
            
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
    upload() {
      this.progress = 0;
      this.currentFile = this.selectedFiles.item(0);
     this.annonceservice.upload(this.currentFile).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.id=event.body;
            
            this.annonceservice.getFilesdetail(this.id).subscribe(
              data=>{
                this.file=data;
                console.log(this.id)
                console.log('file',this.file)
                console.log(this.router.snapshot.params.id)
                //this.idf=[];
                //this.idf.push(this.id);
                
  
                
                
              }
            );
            //this.fileInfos = this.tripservice.getFiles(this.router.snapshot.params.id);
          
          
          }
        },
        err => {
          this.progress = 0;
          this.message = 'Could not upload the file!';
          this.currentFile = undefined;
        });
      this.selectedFiles = undefined;
    }

    supprimer(files :Number){
      this.annonceservice.deletefile(files).subscribe(
        data=>{
        this.annonceservice.getFiles(this.router.snapshot.params.id).subscribe(
          data=>{
            this.file=data
            this.listfiles.push(this.file);
        }
      )
    }
    );
    }  

}
