import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutAnnonceComponent } from './annonce/ajout-annonce/ajout-annonce.component';
import { AnnonceComponent } from './annonce/annonce.component';
import { ModifierAnnonceComponent } from './annonce/modifier-annonce/modifier-annonce.component';


const routes: Routes = [
{path: 'Annonce', component: AnnonceComponent},
{path: 'ajoutAnnonce', component: AjoutAnnonceComponent},
{ path: 'annonces/modifier/:id',           component: ModifierAnnonceComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
