import { Annonce } from "./annonce.model";
import { User } from "./user.model";

export class Commentaire {
    id:Number;
    commentaire:String;
    annonce:Annonce;
    user:User;
}
