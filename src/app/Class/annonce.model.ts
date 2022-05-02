import { Avis } from "./avis.model";
import { Commentaire } from "./commentaire.model";
import { FileDB } from "./file-db.model";
import { User } from "./user.model";
import { Visite } from "./visite.model";

export class Annonce {
    id:Number;
    titre: String;
    description:String;
    prix:Number;
    transaction:String;
    typedebien:String;
    etat:String;
    localisation:String;
    superficie:Number;
    nbrchambre:Number;
    age:Number;
    etage:Number;
    numero:Number;
    datecreation:Date;
    files:FileDB;
    avis:Avis[];
    commaentaire:Commentaire[];
    user:User[];
    visite:Visite;
}
