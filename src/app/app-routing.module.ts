import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutAnnonceComponent } from './annonce/ajout-annonce/ajout-annonce.component';
import { AnnonceComponent } from './annonce/annonce.component';
import { ModifierAnnonceComponent } from './annonce/modifier-annonce/modifier-annonce.component';
import { AnnoncefrontofficeComponent } from './annoncefrontoffice/annoncefrontoffice.component';
import { CommentsandnoteannonceComponent } from './commentsandnoteannonce/commentsandnoteannonce.component';
import { CommonModule } from '@angular/common'


const routes: Routes = [
{path: 'Annonce', component: AnnonceComponent},
{path: 'ajoutAnnonce', component: AjoutAnnonceComponent},
{ path: 'annonces/modifier/:id',           component: ModifierAnnonceComponent },
{path: 'Annoncefront', component: AnnoncefrontofficeComponent},
{ path: 'detail/:id',      component: CommentsandnoteannonceComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
