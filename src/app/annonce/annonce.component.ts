import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AnnonceServiceService } from '../Service/annonce-service.service';
import { Annonce } from '../Class/annonce.model';
////////////////////////////////////:
import { ViewChild} from '@angular/core';;
import {MatSort, SortDirection} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { FileDB } from '../Class/file-db.model';





@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.css']
})
export class AnnonceComponent implements OnInit {
  prix:any;
  listAnnonce : Annonce[];
  form : boolean = false;
  annonce!: Annonce;
  closeResult! : string;
  fileById:FileDB[];
  imageSource:String;
  counters = [100, 200, 10];
  meilleurDestination:any;
  displayedColumns = ['image','titre', 'description', 'prix',
   'transaction','typedebien','etat','localisation',
  'superficie','nbrchambre','age','etage'
  ,'numero','datecreation','option'];
  dataSource: MatTableDataSource<Annonce>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private as: AnnonceServiceService) {

   }

   applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  ngOnInit(): void {
    this.as.getAllAnnonce().subscribe(
     data=> {
          this.listAnnonce=data;
          this.dataSource = new MatTableDataSource(this.listAnnonce);
          this.dataSource._renderChangesSubscription;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      }
    );
    
   }
   supprimer(annonce :any){
    this.as.deleteannonce(annonce.id).subscribe(()=>this.as.getAllAnnonce().subscribe(
      data=>{
        this.listAnnonce=data
        this.dataSource = new MatTableDataSource(this.listAnnonce);
      }
    )
    );
  }
  
  }

 


